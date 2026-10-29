import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { useQuery } from '@tanstack/react-query';
import { specialistOwnInfoQueryOptions } from '@utils/QueryOptioms';
import { Loader } from '@components/shared/Loader';
import SpecialistService from '@services/SpecialistService';
import { MULTISELECT_INPUT_NAMES, MULTISELECT_LABELS } from '@utils/Settings';
import { FC } from 'react';
import { getStyles } from '@utils/admin/Addspecialistform';
import { MenuProps } from '@utils/shared';

type Props = {
  name: MULTISELECT_INPUT_NAMES,
  options: string[],
  isRequired?: boolean,
  unavailableKeys?: MULTISELECT_INPUT_NAMES[]
}

export const MultiselectChangeForm:FC<Props> = ({ name, isRequired, options, unavailableKeys }) => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useQuery(specialistOwnInfoQueryOptions())
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      [name]: data ? data[name] : [],
    },
    onSubmit: async ({ value }) => {
      await SpecialistService.changeMultiselect(name, value[name]);
      await refetch();
      reset();
    }
  });

  if (isLoading || !data) return (<Loader />)
  
  let filteredOptions = options;

  if (unavailableKeys?.length) {
    const unavailable = new Set(unavailableKeys.reduce((total: string[], uKey) => {
      total.push(...data[uKey])
      
      return total;
    }, []))
    filteredOptions = options.filter((item) => !unavailable.has(item));
  }
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Field
          name={name}
          validators={{ onChange: ({ value }) => {
            if (!value.length && isRequired) return `Має бути хоч одна вибрана опція`;
            if (value.length === data[name].length || value.every((val, index) => val === data[name][index])) return 'Нові опції нічим не відрізняються від попередніх'
            return undefined;
          }}}
        >
          {(field) => (
            <FormControl fullWidth error={!!field.state.meta.errors.length}>
              <InputLabel id={`${name}-label`}>{MULTISELECT_LABELS[name]}</InputLabel>
              <Select
                labelId={`${name}-label`}
                label="Основні напрямки"
                multiple
                value={field.state.value}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                onChange={(event) => {
                  const value = event.target.value;
                  field.handleChange(typeof value === 'string' ? value.split(',') : value);
                }}
              >
                {filteredOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, field.state.value, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {field.state.meta.errors[0] && (
                <Typography variant="caption" color="error">
                  {field.state.meta.errors[0]}
                </Typography>
              )}
            </FormControl>
            )}
        </Field>

        <Box display="flex" justifyContent="flex-end">
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <OutlinedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Змінити'}
              </OutlinedButton>
            )}
          </Subscribe>
        </Box>
      </Box>
    </form>
  );
};
