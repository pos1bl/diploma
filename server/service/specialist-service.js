import { Types } from "mongoose";
import SessionModel from "../models/session-model.js";
import SpecialistModel from "../models/specialist-model.js";
import UserModel from "../models/user-model.js";
import DiplomModel from "../models/diploma-model.js";
import CourseModel from "../models/course-model.js";
import UnavaibilityModel from "../models/unavaibility-model.js";
import { buildClientFilter, buildConflictUnavCheckPipeline, buildIsSessionsInUnavPipeline, buildUnavailabilityFilter, buildSessionFilter, SESSIONS_ROLES } from "../utils/queryHelper.js";
import ApiError from "../exceptions/api-error.js";
import specialistModel from "../models/specialist-model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import sessionModel from "../models/session-model.js";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { computeScore } from "../utils/computeScore.js";
dayjs.extend(customParseFormat);

class SpecialistService {
  async getSessions(id, query) {
    const { filter, options } = buildSessionFilter({ roleField: SESSIONS_ROLES.SPECIALIST, id, query });
    const sessions = await SessionModel.find(filter, null, options).populate({ path: 'user', model: 'User', select: 'name' });
    return sessions;
  }

  async getSession(id, specId) {
    const sessionDocumet = await SessionModel.findById(id)
      .populate({ path: 'user',  model: 'User', select: 'name' });
    const session = JSON.parse(JSON.stringify(sessionDocumet))
    session.specialistId = session.specialist;
    if (specId !== session.specialistId) throw ApiError.BadRequest('Це не ваша сесія!')
    session.userId = session.user._id;
    delete session.specialist;
    return session;
  }

  async getClients(id, query) {
    const { filter, options } = buildClientFilter({ id, query });

    const pipeline = [
      { $match: filter },
      { 
        $group: {
          _id: '$user',
          completedSessions: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'completed'] },
                1,
                0
              ]
            }
          }
        }
      },
      { 
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'profile'
        }
      },
      { $unwind: '$profile' },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$profile',
              { completedSessions: '$completedSessions' }
            ]
          }
        }
      }
    ];

    if (options.sort) {
      pipeline.push({ $sort: options.sort });
    }

    const clients = await SessionModel.aggregate(pipeline)

    return clients;
  }

  async getClientNames(id) {
    const docs = await SessionModel.aggregate([
      { $match: { specialist: new Types.ObjectId(id) } },
      { $group: { _id: '$user' } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'profile'
        }
      },
      { $unwind: '$profile' },
      {
        $project: {
          _id: 0,
          name: '$profile.name'
        }
      }
    ])

    return docs.map(d => d.name)
  }

  async getUserInfo(id) {
    return await UserModel.findById(id)
  }

  async isOwnClient(id, specId) {
    return await SessionModel.exists({ specialist: specId, id: id })
  }

  async getUnavailabilities(id, query) {
    const find = buildUnavailabilityFilter({id, query});
    const unavailabilities = await UnavaibilityModel.find(find).sort({ start: 1 });
  
    return unavailabilities;
  }

  async getEducation(id) {
    const idObj = new Types.ObjectId(id);
    const [result] = await DiplomModel.aggregate([
      {
        $facet: {
          diploms: [{ $match: { specialist: idObj } }],
          courses: [
            {
              $unionWith: {
                coll: 'courses',
                pipeline: [{ $match: { specialist: idObj } }]
              }
            },
            { $match: { provider: { $exists: true } } }
          ]
        }
      }
    ]);
    return result || { diploms: [], courses: [] };
  }

  async addDiplom(req) {
    const {
      title,
      institution,
      specialty,
      degree,
      year,
    } = req.body;

    const specialist = await specialistModel.findById(req.specialist._id);
    if (!specialist) throw ApiError.BadRequest('Виникла помилка, спробуйте пізніше');

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, `education_${specialist._id}`);
    }
    
    const diplomaData = {
      institution: institution,
      year,
      specialist,
      title,
      specialty,
      degree,
      imageUrl
    };

    await DiplomModel.create(diplomaData);
  }

  async addCourse(req) {
    const {
      title,
      provider,
      hours,
      year,
    } = req.body;

    const specialist = await specialistModel.findById(req.specialist._id);
    if (!specialist) throw ApiError.BadRequest('Виникла помилка, спробуйте пізніше');

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, `education_${specialist._id}`);
    }
    
    const courseData = {
      specialist,
      title,
      provider,
      imageUrl,
      year
    };

    if (hours) courseData.hours = hours;

    await CourseModel.create(courseData);
  }

  async addUnavailability(req) {
    const {
      start,
      end,
      type,
      note,
    } = req.body;

    const specialist = await specialistModel.findById(req.specialist._id);
    if (!specialist) throw ApiError.BadRequest('Виникла помилка, спробуйте пізніше');

    const sessions = await sessionModel.aggregate(buildIsSessionsInUnavPipeline());

    if (sessions.length) throw ApiError.BadRequest('У Вас є запланована зустріч на вибраний час');

    const unavailabilities = await UnavaibilityModel.aggregate(buildConflictUnavCheckPipeline());
    if (unavailabilities.length) throw ApiError.BadRequest('Вибраний Вами час охоплює вже існуючі відсутності');

    const unavailabilityData = {
      start: dayjs.utc(start, 'DD.MM.YYYY HH:mm'),
      end: dayjs.utc(end, 'DD.MM.YYYY HH:mm'),
      type,
      note,
      specialist
    };

    await UnavaibilityModel.create(unavailabilityData);
  }

  async changeBio(specId, newBio) {
    const specialist = await specialistModel.findById(specId);
  
    if (!specialist) {
      throw ApiError.BadRequest('Виникла помилка при оновленні "Біо". Спробуйте пізніше');
    }
  
    specialist.bio = newBio;
    await specialist.save();
  }

  async changeMultiselect(specId, name, value) {
    const specialist = await specialistModel.findById(specId);
  
    if (!specialist) {
      throw ApiError.BadRequest(`Виникла помилка при оновленні "${name}". Спробуйте пізніше`);
    }
  
    specialist[name] = value;
    await specialist.save();
  }

  async changeSchedule(specId, availability) {
    const specialist = await specialistModel.findById(specId);
  
    if (!specialist) {
      throw ApiError.BadRequest('Виникла помилка при оновленні розкладу. Спробуйте пізніше');
    }
  
    specialist.availability = availability;
    await specialist.save();
  }

  async getSuitableSpecialists(vals) {
    const specs = await SpecialistModel.find().lean();
    if (!specs.length) throw ApiError.BadRequest("Не вдалося отримати список спеціалістів")

    const scored = specs.map(sp => ({
      specialist: sp,
      score: computeScore(sp, vals)
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map(s => s.specialist);
  }
}

export default new SpecialistService();
