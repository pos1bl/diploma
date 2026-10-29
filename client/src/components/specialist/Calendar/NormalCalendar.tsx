import { Views } from "react-big-calendar";
import { Box } from "@mui/material";
import Calendar from "./Calendar";
import moment from "moment";

export default function NormalCalendar() {
  return (
    <Box
      height="100%"
      sx={{
        overflow: "auto"
      }}
    >
      <Calendar
        defaultDate={moment().toDate()}
        defaultView={Views.WEEK}
        min={moment().startOf('day').add(6, "hours").toDate()}
        max={moment().startOf('day').add(23, "hours").toDate()}
      />
    </Box>
  );
}