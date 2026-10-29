import ApiError from "../exceptions/api-error.js";
import { parse, uploadToCloudinary } from "../utils/uploadToCloudinary.js";

import mailService from "./mail-service.js";
import SpecialistModel from "../models/specialist-model.js";
import UserModel from "../models/user-model.js";
import victim_requestModel from "../models/victim_request-model.js";

class AdminService {
  async addSpecialist(req) {
    const {
      email,
      dateOfBirth,
      gender,
      bio,
      dateOfStart,
      mainAreas,
      secondaryAreas,
      excludedAreas,
      methods,
      specialNeeds,
      availability
    } = req.body;

    const user = await UserModel.findOne({ email: parse(email) });
    if (!user) throw ApiError.BadRequest('Користувача з таким email не знайдено');

    let avatarUrl = '';
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.buffer, 'specialists_avatars');
    }

    user.role = 'specialist';
    await user.save(); 

    const specialistData = {
      user,
      dateOfBirth: parse(dateOfBirth),
      gender: parse(gender),
      bio: parse(bio),
      dateOfStart: parse(dateOfStart),
      mainAreas: parse(mainAreas),
      secondaryAreas: parse(secondaryAreas),
      excludedAreas: parse(excludedAreas),
      methods: parse(methods),
      specialNeeds: parse(specialNeeds),
      availability: parse(availability),
      avatarUrl
    };

    await SpecialistModel.create(specialistData);
  }

  async verifyVictim(formResponse) {
    const {
      id,
      status,
    } = formResponse;

    const request = await victim_requestModel.findOne({ user: id });
    if (!request) throw ApiError.BadRequest('Такого запиту не знайдено');

    const user = await UserModel.findById(id);
    if (!user) throw ApiError.BadRequest('Автора запиту не знайдено');

    request.status = status;

    if (status === "verified") {
      user.isVictim = true;
    }

    await user.save()
    await request.save()
    await mailService.sendVictimVerify(user, status);
  }
}

export default new AdminService();
