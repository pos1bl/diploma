import moment from "moment";
import 'moment/locale/uk';

import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Views,
} from "react-big-calendar";

moment.locale('uk', { week: { dow: 1 } })  
const localizer = momentLocalizer(moment);

const ukMessages = {
  allDay: 'Увесь день',
  previous: '‹',
  next: '›',
  today: 'Сьогодні',
  month: 'Місяць',
  week: 'Тиждень',
  day: 'День',
  agenda: 'Порядок денний',
  date: 'Дата',
  time: 'Час',
  event: 'Подія',
  noEventsInRange: 'Немає подій',
  showMore: (count: number) => `+ ще ${count}…`,
};

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      culture="uk"
      messages={ukMessages}
      formats={{
        // Повні назви днів тижня (понеділок, вівторок, …)
        weekdayFormat: 'dddd',
        // Заголовок колонки дня («22 травня»)
        dayHeaderFormat: 'D MMMM',
        // Формат часової сітки («08:00», «14:30»)
        timeGutterFormat: 'HH:mm',
      }}
      views={[Views.DAY, Views.WEEK]}
    />
  );
}