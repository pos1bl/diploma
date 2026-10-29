import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'
dayjs.extend(utc)

const combineDateAndSlot = (selectedDate, selectedSlot) => {
  const [hour, minute] = selectedSlot.split(':').map((v) => parseInt(v, 10));
  
  return dayjs.utc(selectedDate)
    .hour(hour)
    .minute(minute)
    .second(0)
    .millisecond(0)
    .toDate()
}

export default combineDateAndSlot;
