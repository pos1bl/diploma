import SessionModel from "../models/session-model.js";
import mailService from "./mail-service.js";
import paymentService from "./payment-service.js";
import SpecialistModel from "../models/specialist-model.js";
import UserModel from "../models/user-model.js";
import GiftModel from "../models/gift-model.js";
import ApiError from "../exceptions/api-error.js";
import combineDateAndSlot from "../utils/compineDateAndSlot.js";
import { Types } from "mongoose"
import dayjs from "dayjs";
import { buildConflictCheckPipeline } from "../utils/queryHelper.js";
import { cancelSessionReminder, scheduleSessionReminder } from "../jobs/agenda.js";
import sessionModel from "../models/session-model.js";

class SessionService {
  async createSession(payload) {
    const { selectedDate, selectedSlot, specialistId, user: userId, giftId, priceId, isVictim, paymentIntentId } = payload;

    if (!isVictim && !priceId && !giftId) throw ApiError.BadRequest('Сесія не була оплачена');

    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.BadRequest('Спецаліста з таким id не знайдено');

    const specialist = await SpecialistModel.findById(specialistId).populate({ path: 'user', model: 'User' });
    if (!specialist) throw ApiError.BadRequest('Спецаліста з таким id не знайдено');

    const sessionCreated = { user, specialist, status: 'scheduled', paymentIntentId };

    if (giftId) {
      const today = dayjs.utc().startOf('day').toDate();
      const gift = await GiftModel.findOne({
        _id: new Types.ObjectId(giftId),
        $expr: {
          $gte: [
            {
              $dateFromString: {
                dateString: '$expirationDate',
                format: '%d.%m.%Y',
                onError: new Date(0),
                onNull:  new Date(0),
              },
            },
            today,
          ],
        },
        amount: {$gte: 1} 
      });
      if (!gift) throw ApiError.BadRequest('Діючого сертифіката з таким кодом не знайдено');

      sessionCreated.gift = gift;

      gift.amount -= 1;
      await gift.save();
    }

    sessionCreated.scheduledAt = combineDateAndSlot(selectedDate, selectedSlot);

    const conflicts = await SessionModel.aggregate(buildConflictCheckPipeline(user.id, specialistId, sessionCreated.scheduledAt));
    if (conflicts.length) throw ApiError.BadRequest('Цей час вже недоступний для бронювання. Оберіть, будь ласка, інший');

    sessionCreated.type = isVictim ? "free" : giftId ? "gift" : "paid";
    const session = await SessionModel.create(sessionCreated);

    await scheduleSessionReminder(session)
    await mailService.sendInfoAboutSession(session);
    return { message: "Сесія успішно створена" };
  }

  async refund(id) {
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });
    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.type !== "paid") throw ApiError.BadRequest("Неможливо повернути кошти за даний тип сесії");
    if (session.isMoved) throw ApiError.BadRequest("Неможливо повернути кошти після перенесення сеансу");
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо повернути кошти за завершену сесію");

    const dateIn24hours = dayjs().add(24, 'hours').format('DD.MM.YYYY HH:mm');
    const formattedScheduledDate = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');

    if (dateIn24hours > formattedScheduledDate) throw ApiError.BadRequest("Ви можете скасувати сеанс (та повернути гроші) не пізніше ніж за 24 години до його початку");
    
    session.status = "cancelled with refund";

    await paymentService.refund(session.paymentIntentId);
    await session.save();
    await cancelSessionReminder(id)
    await mailService.sendInfoAboutRefund(session);
    return { message: "Запит на повернення коштів успішно створено" };
  }

  async refundBySpecialist(id) {
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });
    if (!session) throw ApiError.BadRequest('Невалідна сесія');

    const isRefund = session.type === "paid";

    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо скасувати завершену сесію");

    session.status = isRefund ? "cancelled with refund" : "cancelled";

    await session.save();
    await cancelSessionReminder(id)

    if (isRefund) {
      await paymentService.refund(session.paymentIntentId);
      await mailService.sendInfoAboutRefund(session);
    } else {
      await mailService.sendInfoAboutCancel(session);
    }
    
    return { message: "Сесія скасована" };
  }

  async cancel(id) {
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });
    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо скасувати завершену сесію");

    session.status = "cancelled";

    await session.save();
    await cancelSessionReminder(id)
    await mailService.sendInfoAboutCancel(session);
    return { message: "Зустріч скасовано" };
  }

  async moveSession(payload) {
    const { selectedDate, selectedSlot, id } = payload;
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });

    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо перенести завершену сесію");
    if (session.isMoved) throw ApiError.BadRequest("Неможливо повторно перенести цей сеанс");

    const dateIn12hours = dayjs().add(12, 'hours').format('DD.MM.YYYY HH:mm');
    const formattedScheduledDate = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');

    if (dateIn12hours > formattedScheduledDate) throw ApiError.BadRequest("Ви можете перенести сеанс не пізніше ніж за 12 годин до його початку");
    const newScheduledAt = combineDateAndSlot(selectedDate, selectedSlot);

    const conflicts = await SessionModel.aggregate(buildConflictCheckPipeline(session.user._id, session.specialist._id, newScheduledAt));
    if (conflicts.length) throw ApiError.BadRequest('Цей час вже недоступний для бронювання. Оберіть, будь ласка, інший');

    const start = dayjs(session.scheduledAt)
    const end = start.add(50, 'minute')
    const oldWhenLine = `${start.format('dddd, D MMM YYYY · h:mm a')} – ${end.format('h:mm a')} (Eastern European Time - Kyiv)`

    session.isMoved = true;
    session.scheduledAt = newScheduledAt;

    await session.save();
    await scheduleSessionReminder(session)
    await mailService.sendInfoAboutSessionMove(session, oldWhenLine);

    return { message: "Сеанс перенесено" };
  }

  async changeStatus(status, id) {
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });

    const now = dayjs().format('DD.MM.YYYY HH:mm');
    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо завершити завершену сесію");

    if (status === "completed") {
      const sceduledDateIn50Minutes = dayjs.utc(session.scheduledAt).add(50, 'm').format('DD.MM.YYYY HH:mm');

      if (now < sceduledDateIn50Minutes) throw ApiError.BadRequest("Неможливо завершити сеанс до його закінчення");
    } else if (status === "no-show") {
      const sceduledDateIn15Minutes = dayjs.utc(session.scheduledAt).add(15, 'm').format('DD.MM.YYYY HH:mm');

      if (now < sceduledDateIn15Minutes) throw ApiError.BadRequest("Ви можете відмітити, що клієнт не з'явився лише через 15хв після початку");
    } else throw ApiError.BadRequest("Невалідний статус");

    session.status = status;

    await session.save();
    await cancelSessionReminder(id)
    return { message: "Сеанс завершено" };
  }

  async changeNotes(id, newNotes) {
      const session = await sessionModel.findById(id);
    
      if (!session) {
        throw ApiError.BadRequest('Виникла помилка при оновленні нотатків. Спробуйте пізніше');
      }
  
      session.notes = newNotes;
      await session.save();
    }
}

export default new SessionService();
