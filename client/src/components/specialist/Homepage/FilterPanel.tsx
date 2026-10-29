import useDebounce from '@hooks/useDebounce';
import useFilters from '@hooks/useFilters';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from 'react';
import { StyledFilter } from '@components/styled/user/appointemts';
import { ContainedButton } from '@components/shared/ContainedButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DEFAULT_DATE, DEFAULT_END_DATE, DEFAULT_START_DATE } from '@utils/Filters';
import { useAuthStore, useSessionStore } from '@hooks/useStore';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Etc/GMT");

export const FilterPanel = () => {
  const { user } = useAuthStore();
  const { fetchSessions } = useSessionStore()
  const { filters, setFilters, resetFilters } = useFilters('/_authenticated/specialist');
  const [currentFilters, setCurrentFilters] = useState<Partial<any>>(() => ({
    ...filters,
    startDate: filters.startDate ?? DEFAULT_START_DATE,
    endDate:   filters.endDate   ?? DEFAULT_END_DATE,
  }));
  const debouncedFilters = useDebounce(currentFilters, 500);
  
  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
      setFilters(debouncedFilters);
      fetchSessions(user.role, debouncedFilters);
    }
  }, [debouncedFilters]);

  const handleDateChange = (fieldName: string, field: any) => {
    const date = dayjs.utc(field).startOf("day")
    const newValue = !date || !date.isValid() ? undefined : date.toDate();
  
    return setCurrentFilters((prevFilters) => ({ ...prevFilters, [fieldName]: newValue }));
  };
  
  return (
    <Box sx={{ borderRadius: "8px", border: "solid 1px #F5F1FA", display: "flex", flexWrap: "wrap" }}>
      <StyledFilter>
        <DatePicker
          label="Початкова дата"
          value={currentFilters.startDate ? dayjs.utc(currentFilters.startDate).startOf('day') : DEFAULT_DATE}
          onChange={(newValue) => handleDateChange("startDate", newValue)}
        />
      </StyledFilter>

      <StyledFilter>
        <DatePicker
          label="Кінцева дата"
          value={currentFilters.endDate ? dayjs.utc(currentFilters.endDate).endOf('day') : DEFAULT_DATE}
          onChange={(newValue) => handleDateChange("endDate", newValue)}
        />
      </StyledFilter>

      <StyledFilter>
        <ContainedButton
        onClick={() => {
          if (resetFilters) {
            setCurrentFilters({});
            setTimeout(() => {
              resetFilters();
            }, 0);
          }
        }}
      >
        Очистити фільтр
      </ContainedButton>
      </StyledFilter>
    </Box>
  )
};
