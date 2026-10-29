import { ContainedButton } from "@components/shared/ContainedButton";
import useDebounce from "@hooks/useDebounce";
import useFilters from "@hooks/useFilters";
import { AGE_GROUPS, FILTER_MULTISELECT_LIST, GENDER_LIST } from "@models/ISpecialist";
import { Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DEFAULT_SELECT } from "@utils/Filters";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { OutlinedButton } from "@components/shared/OutlinedButton";

export const ControlPanel = () => {
  const { filters, setFilters, resetFilters } = useFilters('/_default/specialists');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Partial<any>>(filters);
  const debouncedFilters = useDebounce(currentFilters, 500);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
      setFilters(debouncedFilters);
    }
  }, [debouncedFilters]);

  const handleArrayChange = (fieldName: string, value: string[]) => {
    return setCurrentFilters((prevFilters) => ({ ...prevFilters, [fieldName]: value }));
  };

  const handleCheckboxChange = (fieldName: string, checked: boolean, option: string) => {
    return setCurrentFilters((prevFilters) => {
      const base: [] = prevFilters[fieldName] || [];
      const value = checked ? [...base, option] : base.filter(b => b !== option);
      return { ...prevFilters, [fieldName]: value }
    });
  };

  return (
    <Box minWidth="350px">
      {isMobile && (
        <Box mb={2} display="flex" justifyContent="center">
          <OutlinedButton onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Закрити фільтри' : 'Налаштувати фільтри'}
          </OutlinedButton>
        </Box>
      )}

      {(!isMobile || showFilters) && (
        <Box borderRadius="5px" border="3px solid #AC98D1">
          <Box sx={{ backgroundColor: '#F5F1FA', p: 3 }}>
            <Typography variant="body2">
              Єдина вартість: <Typography component="span" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>1000 грн/сеанс</Typography>, кожен фахівець верифікований експертом.
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
            <Typography sx={{ color: "#AC98D1", fontWeight: 600 }} variant="h5" mb={2}>
            Про вас
          </Typography>

          {FILTER_MULTISELECT_LIST.map(({ key, options, label }, index) => (
            <Autocomplete
              key={key}
              multiple
              options={options}
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
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
              value={currentFilters[key] || DEFAULT_SELECT}
              onChange={(_, v: string[]) => handleArrayChange(key, v)}
              renderInput={(params) => <TextField sx={{  '& .MuiInputLabel-root': { fontSize: '0.875rem' } }} {...params} label={label} />}
              sx={{ mb: index !== FILTER_MULTISELECT_LIST.length - 1 ? 2 : 4 }}
            />
          ))}
        
          <Typography sx={{ color: "#AC98D1", fontWeight: 600 }} variant="h5" mb={2}>
            Про психотерапевта
          </Typography>
          <FormGroup sx={{ mb: 4 }}>
            <Typography variant="subtitle2">Стать</Typography>
            {GENDER_LIST.map(({ key, label }) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={currentFilters.gender?.includes(key) ?? false}
                    onChange={(_, checked: boolean) => handleCheckboxChange("gender", checked, key)}
                  />
                }
                label={label}
              />
            ))}
            <Box mt={2} />
              <Typography variant="subtitle2">Вік</Typography>
              {AGE_GROUPS.map((a) => (
                <FormControlLabel
                  key={a}
                  control={
                    <Checkbox
                      checked={currentFilters.age?.includes(a) ?? false}
                      onChange={(_, checked: boolean) => handleCheckboxChange("age", checked, a)}
                    />
                  }
                  label={a}
                />
              ))}
            </FormGroup>

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
          </Box>
          </Box>
      )}
    </Box>
  )
}
