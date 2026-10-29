import GiftModel from "../models/gift-model.js";
import mailService from "./mail-service.js";
import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import { v4 } from 'uuid';
import dayjs from 'dayjs';

async function generateUniqueCode() {
  for (let i = 0; i < 5; i++) {
    const code = v4().slice(0, 8).toUpperCase();
    const exists = await GiftModel.exists({ code });
    if (!exists) {
      return code;
    }
  }

  throw ApiError.BadRequest('Не вдалося згенерувати унікальний код, спробуйте пізніше');
}

class GiftService {
  async sendGift(payload) {
    const { to, from, email, amount, expirationDate, userId, paymentIntentId } = payload;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Користувача з таким id не знайдено');
    }

    const code = await generateUniqueCode();

    await GiftModel.create({ to, from, email, amount, expirationDate, user, code, paymentIntentId });
    await mailService.sendGift({ to, from, email, amount, expirationDate, code }); 
  }

  async getGift(code) {
    if (!code) throw ApiError.BadRequest('Промокод сертифікату не переданий');

    const gift = await GiftModel.findOne({ code });

    if (!gift) throw ApiError.BadRequest('Сертифікат за введеним промокодом не знайдено');
    if (!gift.amount) throw ApiError.BadRequest('За цим промокод всі сеанси вичерпані!');
    
    const today = dayjs.utc().startOf('day');
    const expirationDate = dayjs(gift.expirationDate, "DD.MM.YYYY").startOf('day');

    if (expirationDate.isBefore(today)) throw ApiError.BadRequest('Термін дії сертифіката вичерпано');

    return gift;
  }
}

export default new GiftService();
