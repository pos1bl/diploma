import CustomizedCalendar from "@components/specialist/Calendar/CustomizedCalendar/CustomizedCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const CalendarPage = () => {
  return (
    <div style={{ height: 'calc(100vh - 64px)', padding: 16 }}>
      <CustomizedCalendar />
    </div>
  )
}