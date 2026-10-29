import { BookingPanel } from "@components/default/Specialist/BookingPanel";
import { useAuthStore } from "@hooks/useStore";
import { AvailabilityFormatted } from "@models/response/SpecialistsResponse";
import { Box } from "@mui/material";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { specialistQueryOptions } from "@utils/QueryOptioms";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc"
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ContainedButton } from "@components/shared/ContainedButton";
import { ISession } from "@models/ISession";
import SessionsService from "@services/SessionsService";
import { toast } from "react-toastify";
import { Loader } from "@components/shared/Loader";
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('uk');

type Props = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ISession, Error>>
  specialistId: string
  appointmentId: string
  setIsMoved: Dispatch<SetStateAction<boolean>>
}

export const MoveSection:FC<Props> = ({ specialistId, refetch, appointmentId, setIsMoved }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const { user } = useAuthStore();
  const { data: employeeInfo, isLoading, isError  } = useQuery(specialistQueryOptions(specialistId, user.id));
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (employeeInfo?.availabilities?.length) {
      const first = employeeInfo.availabilities[0];
      setSelectedDate(dayjs.utc(first.date));
    }
  }, [employeeInfo]);

  if (isLoading || !employeeInfo) {
    return <Loader />
  }

  if (isError) {
    return <div>Сталася помилка при завантаженні спеціаліста</div>
  }

  const availabilites: AvailabilityFormatted[] = employeeInfo?.availabilities.map(item => ({
    date: dayjs.utc(item.date),
    timeSlots: item.timeSlots
  }));

  const nearestDate = availabilites[0].date;

  const moveSession = async () => {
    setIsButtonLoading(true);
  
      try {
        await SessionsService.moveSession(appointmentId, { selectedDate: selectedDate as Dayjs, selectedSlot });
        setIsMoved(false)
        toast("Сесія успішно перенесена", { type: "info" });
      } finally {
        setIsButtonLoading(false);
        refetch();
      }
  }

  return (
    <Box
      width={{ xs: '100%', md: 400 }}
      textAlign="center"
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        p: { xs: 2, md: 4 },
        margin: "0 auto",
        mb: 3
      }}
    >
      <BookingPanel
        nearestDate={nearestDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        availabilites={availabilites}
        setSelectedSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
      />

      <ContainedButton sx={{ alignSelf: "self-end" }} onClick={moveSession} loading={isButtonLoading} disabled={!selectedSlot}>
        Перенести зустріч
      </ContainedButton>
    </Box>
  )
  
}