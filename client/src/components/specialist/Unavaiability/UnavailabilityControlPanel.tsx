import useDebounce from "@hooks/useDebounce";
import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { StyledFilter } from "@components/styled/user/appointemts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DEFAULT_DATE, DEFAULT_SELECT } from "@utils/Filters";
import { getMultiselectStyles } from "@utils/mui-styles";
import { UNAVAIBILITIES_NAMES, UNAVAIBILITY_TYPES, UnavType } from "@models/IUnavaibility";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Etc/GMT");

type Props = {
  filters: Record<string, any>,
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const UnavailabilityControlPanel:FC<Props> = ({ filters, setFilters }) => {
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

  const handleDateChange = (fieldName: string, date: any) => {
    const newValue = !date || !date.isValid() ? undefined : date;

    return setCurrentFilters((prevFilters) => ({ ...prevFilters, [fieldName]: newValue }));
  };
  return (
    <Box sx={{ borderRadius: "8px", border: "solid 1px #F5F1FA", display: "flex", flexWrap: "wrap" }}>
      <StyledFilter>
        <DatePicker
          label="Початкова дата"
          value={currentFilters.startDate ? currentFilters.startDate : DEFAULT_DATE}
          onChange={(newValue) => handleDateChange("startDate", dayjs(newValue).startOf("day"))}
        />
      </StyledFilter>

      <StyledFilter>
        <DatePicker
          label="Кінцева дата"
          value={currentFilters.endDate ? currentFilters.endDate : DEFAULT_DATE}
          onChange={(newValue) => handleDateChange("endDate", dayjs(newValue).endOf("day"))}
        />
      </StyledFilter>

      <StyledFilter>
        <Autocomplete<UnavType, true, false, false>
          multiple
          options={Object.keys(UNAVAIBILITIES_NAMES) as UnavType[]}
          getOptionLabel={(option) => UNAVAIBILITIES_NAMES[option]}
          disableCloseOnSelect
          isOptionEqualToValue={(opt, val) => opt === val}
          sx={{ ...getMultiselectStyles(!!filters.status), width: "259px" }}
          value={currentFilters.type || DEFAULT_SELECT}
          onChange={(_, v: string[]) => handleArrayChange('type', v)}
          renderInput={(params) => <TextField sx={getMultiselectStyles(!!filters.status)} {...params} label="Причина" />}
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
                {UNAVAIBILITIES_NAMES[option]}
              </li>
            );
          }}

        />
      </StyledFilter>
    </Box>
  );
}
