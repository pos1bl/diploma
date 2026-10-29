import { StyledBox, StyledSidepanelTitle } from "@components/styled/default/specialist";
import { getSlotRange } from "@helpers/getSlotRange";
import { useAuthStore } from "@hooks/useStore";
import { AvailabilityFormatted } from "@models/response/SpecialistsResponse";
import { Box, Chip, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useLocation, useNavigate } from "@tanstack/react-router";
import { DEFAULT_PAGES } from "@utils/NavigationList";
import { Dayjs } from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  nearestDate: Dayjs,
  selectedDate: Dayjs | null,
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>,
  selectedSlot: string,
  availabilites: AvailabilityFormatted[],
  setSelectedSlot: Dispatch<SetStateAction<string>>,
};

export const BookingPanel:FC<Props> = ({
  nearestDate, selectedDate, setSelectedDate, availabilites, setSelectedSlot, selectedSlot
}) => {
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation()

  const handleSelect = (slot: string) => {
    if (!isAuth) {
      navigate({ to: DEFAULT_PAGES.LOGIN as "/sign-in", search: { redirect: pathname } })
    }
    setSelectedSlot(slot)
  }

  return (
    <StyledBox>
      <StyledSidepanelTitle>
        Оберіть зручний день та час сеансу
      </StyledSidepanelTitle>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        Найближчий час
      </Typography>
      <Typography variant="h5" color="#AC98D1" textAlign="center">
        {nearestDate.locale('uk').format("DD MMMM")}
      </Typography>
      <DatePicker
        orientation="landscape"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        shouldDisableDate={(date) => {
          return !availabilites.find(day => day.date.isSame(date)) || date.isBefore()
        }}
      />
      {selectedDate && (
        <StyledBox>
          <Typography variant="subtitle1">
            {selectedDate.locale('uk').format('dddd, D MMMM')}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
            {availabilites.find(day => day.date.isSame(selectedDate))?.timeSlots.map((slot) => {
              const label = getSlotRange(slot);
              return (
                <Chip
                  key={slot}
                  label={label}
                  clickable
                  onClick={() => handleSelect(slot)}
                  sx={{ bgcolor: '#F5F1FA', py: 3, px: 1, fontSize: 16 }}
                />
              )
            })}
          </Box>
        </StyledBox>
      )}
    </StyledBox>
  )
}