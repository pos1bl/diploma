import bcrypt from "bcrypt";
import { v4 } from 'uuid';
import UserModel from "../models/user-model.js";
import SessionModel from "../models/session-model.js";
import SpecialistModel from "../models/specialist-model.js";
import VictimRequestModel from "../models/victim_request-model.js";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import { buildFullSpecialistInfoPipeline, buildSessionFilter, buildSpecialistsPipeline, SESSIONS_ROLES } from "../utils/queryHelper.js";
import { getAvailability } from "../utils/getAvailability.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import { parse, uploadToCloudinary } from "../utils/uploadToCloudinary.js";
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('uk');    

class UserService {
  _buildAuthResponse(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async registration(email, name, password) {
    const candidate = await UserModel.findOne({email});

    if (candidate) {
      throw ApiError.BadRequest(`Користувач з таким поштовим адресом ${email} вже існує`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const user = await UserModel.create({ email, name, password: hashPassword, activationLink });

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    return this._buildAuthResponse(user);
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Некоректне посилання активації');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('Користувача з таким email не знайдено');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неправильний пароль');
    }

    return this._buildAuthResponse(user);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    
    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnathorizedError();
    }

    const userData = tokenService.validateToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    
    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }
    const user = await UserModel.findById(userData.id);

    return this._buildAuthResponse(user);
  }

  async getSessions(id, query) {
    const { filter, options } = buildSessionFilter({ roleField: SESSIONS_ROLES.USER, id, query });
    const sessions = await SessionModel.find(filter, null, options)
      .populate({ path: 'specialist', populate: { path: 'user', model: 'User', select: 'name' } });

    return sessions;
  }

  async getSession(id) {
    const session = await SessionModel.findById(id)
      .populate({ path: 'specialist', populate: { path: 'user', model: 'User', select: 'name' } });

    return session;
  }

  async getVictimRequest(userId) {
    const victimRequest = await VictimRequestModel.findOne({user: userId});

    return victimRequest;
  }

  async sendVictimRequest(req) {
    const {
      type,
      description,
      userId
    } = req.body;
    
    const user = await UserModel.findById(parse(req.user.id));
    if (!user) throw ApiError.BadRequest('Користувача з таким email не знайдено');

    let fileUrl = '';
    if (req.file) {
      fileUrl = await uploadToCloudinary(req.file.buffer, 'victim_requests');
    }

    const requestData = {
      user,
      type: parse(type),
      description: parse(description),
      fileUrl
    };

    await VictimRequestModel.create(requestData);
    await mailService.sendVictimRequest(requestData);
  }

  async getSpecialists(query) {
    const pipeline = buildSpecialistsPipeline(query);
    const [result] = await SpecialistModel.aggregate(pipeline);

    return {
      specialists: result?.data || [],
      totalCount: result?.totalCount || 0
    };
  }

  async getSpecialistInfo(id, userId) {
    const today = dayjs.utc().startOf('day');

    const dateProps = {
      startDate: today.add(1, 'day'),
      endDate: today.add(4, 'weeks')
    }

    const pipeline = await buildFullSpecialistInfoPipeline(id, userId, dateProps);
    const [specialistData] = await SpecialistModel.aggregate(pipeline);

    if (!specialistData) throw ApiError.BadRequest('Спеціаліста з таким id не знайдено')

    specialistData.availabilities = getAvailability(specialistData, dateProps);
    delete specialistData.unavailabilities;
    delete specialistData.sessions;
    delete specialistData.availability;

    return specialistData;
  }

  async resendActivation(email) {
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      throw ApiError.BadRequest('Користувача з таким email не знайдено');
    }
  
    if (user.isActivated) {
      throw ApiError.BadRequest('Цей email вже підтверджено');
    }
  
    const activationLink = v4();
    user.activationLink = activationLink;
    await user.save();
  
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
  
    return { message: 'Активаційний лист надіслано' };
  }

  async changeName(userId, newName) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Такого юзера не знайдено');
    }

    user.name = newName;
    await user.save();
  }

  async changeEmail(userId, newEmail) {
    const candidate = await UserModel.findOne({ email: newEmail });

    if (candidate) {
      throw ApiError.BadRequest(`Користувач з таким поштовим адресом ${newEmail} вже існує`);
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Такого юзера не знайдено');
    }

    const activationLink = v4();
    user.activationLink = activationLink;
    user.isActivated = false;
    user.email = newEmail;

    await user.save();
    await mailService.sendActivationMail(newEmail, `${process.env.API_URL}/api/activate/${activationLink}`);
  }

  async changePassword(userId, curPass, newPass) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Такого юзера не знайдено');
    }

    const isPassEquals = await bcrypt.compare(curPass, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неправильний поточний пароль');
    }

    const hashPassword = await bcrypt.hash(newPass, 3);

    user.password = hashPassword;

    await user.save();
  }
}

export default new UserService();
