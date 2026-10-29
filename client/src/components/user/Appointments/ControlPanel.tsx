import useDebounce from "@hooks/useDebounce";
import useFilters from "@hooks/useFilters";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { StyledFilter } from "@components/styled/user/appointemts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DEFAULT_SELECT } from "@utils/Filters";
import { getMultiselectStyles } from "@utils/mui-styles";
import { SESSION_STATUSES } from "@models/ISession";
import { ContainedButton } from "@components/shared/ContainedButton";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Etc/GMT");

export const ControlPanel = () => {
  const { filters, setFilters, resetFilters } = useFilters('/_authenticated/user/appointments');
  const [currentFilters, setCurrentFilters] = useState<Partial<any>>(filters);
  const debouncedFilters = useDebounce(currentFilters, 500);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
      setFilters(debouncedFilters);
    }
  }, [debouncedFilters]);

  const handleArrayChange = (fieldName: string, value: string[]) => {
    return setCurrentFilters((prevFilters) => ({ ...prevFilters, [fieldName]: value }));
  };

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
          value={currentFilters.startDate ? dayjs.utc(currentFilters.startDate).startOf('day') : null}
          onChange={(newValue) => handleDateChange("startDate", newValue)}
        />
      </StyledFilter>

      <StyledFilter>
        <DatePicker
          label="Кінцева дата"
          value={currentFilters.endDate ? dayjs.utc(currentFilters.endDate).endOf('day') : null}
          onChange={(newValue) => handleDateChange("endDate", newValue)}
        />
      </StyledFilter>

      <StyledFilter>
        <Autocomplete
          multiple
          options={Object.values(SESSION_STATUSES)}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon  fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  sx={{
                    mr: '8px',
                    color: '#AC98D1',
                    '&.Mui-checked': {
                      color: '#AC98D1',
                    }
                  }}
                  checked={selected}
                />
                {option}
              </li>
            );
          }}
          sx={{ ...getMultiselectStyles(!!filters.status), width: "259px" }}
          value={currentFilters.status || DEFAULT_SELECT}
          onChange={(_, v: string[]) => handleArrayChange('status', v)}
          renderInput={(params) => <TextField sx={getMultiselectStyles(!!filters.status)} {...params} label="Статус" />}
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
  );
}
