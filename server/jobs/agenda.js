import Agenda from 'agenda';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import mailService from '../service/mail-service.js';
import SessionModel from '../models/session-model.js';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('uk');   

const agenda = new Agenda();
agenda.database(process.env.DB_URL, "agendaJobs");

agenda.define('send-session-reminder', { lockLifetime: 5 * 60 * 1000 }, async job => {
  const { sessionId } = job.attrs.data;
  const session = await SessionModel
    .findById(sessionId)
    .populate('user')
    .populate({
      path: 'specialist',
      populate: { path: 'user', model: 'User' }
    });
  
  if (!session || session.status !== 'scheduled') return;
  await mailService.sendSessionReminder(session);
  console.log(`🕒 Reminder sent for session ${sessionId}`);
});

export async function runAgenda() {
  await agenda.start();
  console.log('✅ Agenda started');
}

export async function scheduleSessionReminder(session) {
  const remindAt = dayjs.utc(session.scheduledAt).subtract(1, 'hour').toDate();
  await agenda.cancel({
    name: 'send-session-reminder',
    'data.sessionId': session._id.toString(),
  });

  await agenda.schedule(remindAt, 'send-session-reminder', {
    sessionId: session._id.toString(),
  });
}

export async function cancelSessionReminder(sessionId) {
  await agenda.cancel({
    name: 'send-session-reminder',
    'data.sessionId': sessionId,
  });
}
