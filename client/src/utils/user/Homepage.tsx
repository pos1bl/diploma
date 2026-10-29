import PaidIcon from '@mui/icons-material/Paid'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { SESSION_STATUSES, ISession } from '@models/ISession'
import { IUser, Role } from '@models/IUser';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/uk'
dayjs.extend(utc)
dayjs.locale('uk')

export const getVictimOptions = (user: IUser) => {
  const { role, isVictim } = user;

  let statusText = '';
  let StatusIcon: React.ElementType | undefined;

  if (role === Role.USER) {
    if (isVictim) {
      statusText = 'Безкоштовний акаунт';
      StatusIcon = VolunteerActivismIcon;
    } else {
      statusText = 'Звичайний акаунт';
      StatusIcon = PaidIcon;
    }
  } else if (role === Role.ADMIN) {
    statusText = 'Адмін';
    StatusIcon = SupervisorAccountIcon;
  } else if (role === Role.SPECIALIST) {
    statusText = 'Фахівець';
    StatusIcon = AssignmentIndIcon;
  }
  
  return {
    StatusIcon,
    statusText,
  }
};

interface SessionsOverview {
  nextSession: ISession | null
  lastPastSession: ISession | null
}

const getNextSession = (sessions: ISession[]): ISession | null => {
  const now = new Date().getTime()
  let next: ISession | null = null

  for (const s of sessions) {
    const t = new Date(s.scheduledAt).getTime()
    if (s.status === SESSION_STATUSES.SCHEDULED && t >= now) {
      if (next === null || t < new Date(next.scheduledAt).getTime()) {
        next = s
      }
    }
  }

  return next
}

const getLastPastSession = (sessions: ISession[]): ISession | null => {
  let last: ISession | null = null

  for (const s of sessions) {
    const t = new Date(s.scheduledAt).getTime()
    if (
      [SESSION_STATUSES.COMPLETED, SESSION_STATUSES.CANCELLED, SESSION_STATUSES.CANCELLED_WITH_REFUND, SESSION_STATUSES.NO_SHOW].includes(s.status)
    ) {
      if (last === null || t > new Date(last.scheduledAt).getTime()) {
        last = s
      }
    }
  }

  return last
}

export const getSessionsOverview = (sessions: ISession[]): SessionsOverview => ({
  nextSession: getNextSession(sessions),
  lastPastSession: getLastPastSession(sessions),
})

export const formatSessionDate = (iso: string) =>
  dayjs.utc(iso)
    .format('dd, DD.MM.YYYY [р.] HH:mm')
  + ' (за Києвом)';

export const formatSessionDateCard = (iso: string) => dayjs.utc(iso).format('dd, DD.MM.YYYY');
export const formatSessionTimeCard = (iso: string) => {
  const startDate = dayjs.utc(iso);
  const endDate = startDate.add(50, 'minutes');

  return `${startDate.format('HH:mm')} - ${endDate.format('HH:mm')}`;
};
