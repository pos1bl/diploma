import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DevicesIcon from "@mui/icons-material/Devices";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';

export const REQUIREMENTS_LIST = [
  "Вища освіта в сфері психології",
  "Досвід практичної роботи (від 2 років — бажано)",
  "Етичний підхід до клієнтів",
  "Бажання вчитись і бути частиною команди",
];

export const FEATURES_LIST = [
  {
    icon: <AccessTimeIcon fontSize="large" />,
    title: "Гнучкий графік",
    description: "Ти самостійно обираєш зручний час для проведення сесій — повна свобода в розкладі.",
  },
  {
    icon: <SupportAgentIcon fontSize="large" />,
    title: "Супервізії та підтримка",
    description: "Наша команда надає регулярну професійну підтримку, щоб ти не залишався/лась наодинці з викликами.",
  },
  {
    icon: <DevicesIcon fontSize="large" />,
    title: "Зручна онлайн-платформа",
    description: "Відео, чат, оплати — все в одному місці. Просто заходиш та працюєш.",
  },
  {
    icon: <VolunteerActivismIcon fontSize="large" />,
    title: "Місія, яка надихає",
    description: "Кожна твоя сесія має значення. Ти реально допомагаєш людям у складні моменти життя.",
  },
];

export const TESTIMONIALS_LIST = [
  {
    name: "Олена К.",
    role: "Психолог",
    text: "Я вперше працюю в місці, де відчувається цінність того, що ти робиш. Команда надихає, а клієнти — мотивують.",
    avatar: "images/career/avatars/olena.png",
  },
  {
    name: "Марко Л.",
    role: "Кризовий консультант",
    text: "Платформа дуже зручна, підтримка команди на рівні. Є відчуття, що я на своєму місці.",
    avatar: "images/career/avatars/marko.png",
  },
  {
    name: "Ірина М.",
    role: "Психотерапевт",
    text: "Супервізії та відкритість команди — це те, чого не вистачало мені в попередніх місцях роботи.",
    avatar: "images/career/avatars/iryna.png",
  },
];

export const ROTATION_INTERVAL = 7000;

export const JOIN_STEPS_LIST = [
  {
    number: 1,
    title: "Заповніть анкету",
    description: "Надішліть нам коротку анкету зі своїми даними, освітою та досвідом роботи.",
    image: "images/career/joinSteps/form.png",
    button: true,
  },
  {
    number: 2,
    title: "Проходження співбесіди",
    description: "Ми домовимось про коротку онлайн-співбесіду, щоб краще познайомитися.",
    image: "images/career/joinSteps/interview.png",
  },
  {
    number: 3,
    title: "Підписання договору",
    description: "Оформляємо нашу співпрацю офіційно. Ви отримуєте доступ до платформи.",
    image: "images/career/joinSteps/contract.png",
  },
  {
    number: 4,
    title: "Початок роботи",
    description: "Після реєстрації ви можете одразу починати приймати клієнтів!",
    image: "images/career/joinSteps/start.png",
  },
];

export type SectionProps = {
  onScrollToForm: () => void
};

export const CAREER_FAQ_ITEMS = [
  {
    id: 1,
    question: 'Як стати частиною команди?',
    answer: 'Заповніть анкету на сайті і ми з вами зв’яжемось для співбесіди.',
  },
  {
    id: 2,
    question: 'Чи обов’язково мати досвід роботи?',
    answer: 'Ми цінуємо досвід, однак відкриті і для фахівців-початківців з відповідною освітою.',
  },
  {
    id: 3,
    question: 'Який графік роботи?',
    answer: 'Гнучкий — ви самостійно обираєте кількість годин на тиждень.',
  },
  {
    id: 4,
    question: 'Чи можна працювати віддалено?',
    answer: 'Так, наша платформа підтримує повністю дистанційну роботу.',
  },
];

export const SUPPORT_CARDS_LIST = [
  {
    id: 1,
    title: 'Email',
    icon: EmailIcon,
    text: 'buk.bukov18@gmail.com',
    link: 'mailto:buk.bukov18@gmail.com'
  },
  {
    id: 2,
    title: 'Підтримка',
    icon: TelegramIcon,
    text: '@platform_for_help',
    link: 'https://pleso.me/ua/telegram-support',
  },
];
