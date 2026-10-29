import { Role } from "@models/IUser";
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpIcon from '@mui/icons-material/Help';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';

export const enum DEFAULT_PAGES {
  LOGIN = '/sign-in',
  SETTINGS = '/settings',
  HOME_PAGE = '/',
  FORM = '/form',
  SPECIALISTS = '/specialists',
  ALL_SPECIALISTS = '/specialists',
  SPECIALIST = '/specialists/$specialistId',
  GIFTS = '/gifts',
  SUPPORT = '/support',
  CAREER = '/career',
  GIFTS_SUCCESS_PAYMENT = '/gifts/payment-success',
};

export const enum USER_PAGES {
  HOME = '/user',
  APPOINTMENTS = '/user/appointments',
  VERIFY_VICTIM = '/user/verify-victim',
  SUPPORT = '/user/support',
  SETTINGS = '/user/settings',
  SUCCESS_PAYMENT = '/user/payment-success',
};

export const enum SPECIALIST_PAGES {
  HOME = '/specialist',
  CLIENTS = '/specialist/clients',
  CALENDAR = '/specialist/calendar',
  ANALYTICS = '/specialist/analytics',
  UNAVAILABILITIES = '/specialist/unavailabilities',
  EDUCATION = '/specialist/education',
  SETTINGS = '/specialist/settings',
};

export const enum ADMIN_PAGES {
  HOME = '/admin',
  ADD_SPECIALIST = '/admin/add-specialist',
  VERIFY_VICTIM = '/admin/verify-victim',
};

export const HEADER_NAVIGATION_LIST = [
  {
    name: 'Наші фахівці',
    navigateTo: DEFAULT_PAGES.SPECIALISTS,
    availableRoles: []
  },
  {
    name: 'Підібрати спеціаліста',
    navigateTo: DEFAULT_PAGES.FORM,
    availableRoles: []
  },
  {
    name: 'Подарункові сертифікати',
    navigateTo: DEFAULT_PAGES.GIFTS,
    availableRoles: []
  },
  {
    name: 'Точка опори',
    navigateTo: DEFAULT_PAGES.SUPPORT,
    availableRoles: []
  },
  {
    name: 'Фахівцям',
    navigateTo: DEFAULT_PAGES.CAREER,
    availableRoles: []
  },
];

export const USER_NAVIGATION_LIST = [
  {
    name: 'Головна',
    navigateTo: USER_PAGES.HOME,
    icon: <HomeIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Мої сеанси',
    navigateTo: USER_PAGES.APPOINTMENTS,
    icon: <CalendarTodayIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Ключ до Опори',
    navigateTo: USER_PAGES.VERIFY_VICTIM,
    icon: <PeopleIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Підтримка',
    navigateTo: USER_PAGES.SUPPORT,
    icon: <HelpIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Налаштування',
    navigateTo: USER_PAGES.SETTINGS,
    icon: <SettingsIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  }
];

export const ADMIN_NAVIGATION_LIST = [
  {
    name: 'Головна',
    navigateTo: ADMIN_PAGES.HOME,
    icon: <HomeIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.ADMIN]
  },
  {
    name: 'Додати фахівця',
    navigateTo: ADMIN_PAGES.ADD_SPECIALIST,
    icon: <PersonAddIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.ADMIN]
  },
  {
    name: 'Обробити заявки',
    navigateTo: ADMIN_PAGES.VERIFY_VICTIM,
    icon: <ContactPageIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.ADMIN]
  },
];

export const SPECIALIST_NAVIGATION_LIST = [
  {
    name: 'Головна',
    navigateTo: SPECIALIST_PAGES.HOME,
    icon: <DashboardIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.SPECIALIST]
  },
  {
    name: 'Мої клієнти',
    navigateTo: SPECIALIST_PAGES.CLIENTS,
    icon: <GroupIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.SPECIALIST]
  },
  {
    name: 'Мій розклад',
    navigateTo: SPECIALIST_PAGES.CALENDAR,
    icon: <CalendarViewWeekIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.SPECIALIST]
  },
  {
    name: 'Відсутності',
    navigateTo: SPECIALIST_PAGES.UNAVAILABILITIES,
    icon: <EventBusyIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.SPECIALIST]
  },
  {
    name: 'Освіта',
    navigateTo: SPECIALIST_PAGES.EDUCATION,
    icon: <SchoolIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.SPECIALIST]
  },
  {
    name: 'Налаштування',
    navigateTo: SPECIALIST_PAGES.SETTINGS,
    icon: <SettingsIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.SPECIALIST]
  },
]

export const getNavigationList = (role: Role) => {
  switch(role) {
    case Role.ADMIN:
      return ADMIN_NAVIGATION_LIST;
    case Role.SPECIALIST:
      return SPECIALIST_NAVIGATION_LIST;
    default:
      return USER_NAVIGATION_LIST;
  }
}
