import { Availability, AvailabilityFormatted } from "@models/response/SpecialistsResponse";
import { Box } from "@mui/material"
import { FC, useState } from "react"
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc"
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { BookingPanel } from "./BookingPanel";
import { PaymentPanel } from "./PaymentPanel";
import { DEFAULT_DATE } from "@utils/Filters";
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('uk');

type Props = {
  availabilityByDay: Availability[],
  specialistId: string,
};

export const BookingFlow:FC<Props> = ({ availabilityByDay, specialistId }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
    
  const availabilites: AvailabilityFormatted[] = availabilityByDay.map(item => ({
    date: dayjs.utc(item.date),
    timeSlots: item.timeSlots
  }));

  const nearestDate = availabilites[0].date;

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(nearestDate || DEFAULT_DATE);

  return (
    <Box
      flex="0 0 auto"
      width={{ xs: '100%', md: 400 }}
      textAlign="center"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        p: { xs: 2, md: 4 },
      }}
    >
      {!!selectedSlot && !!selectedDate && (
        <PaymentPanel
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          specialistId={specialistId}
        />
        )}

      {!selectedSlot && (
        <BookingPanel
          nearestDate={nearestDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          availabilites={availabilites}
          setSelectedSlot={setSelectedSlot}
          selectedSlot={selectedSlot}
        />
      )}
    </Box>
  )
}
