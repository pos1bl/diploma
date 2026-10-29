import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { useQuery } from '@tanstack/react-query';
import { specialistOwnInfoQueryOptions } from '@utils/QueryOptioms';
import { Loader } from '@components/shared/Loader';
import SpecialistService from '@services/SpecialistService';
import { dayLabels, days, DEFAULT_AVAILABILITY } from '@utils/admin/Addspecialistform';
import { Delete } from '@mui/icons-material';
import { AvailabilitySlot, DayOfWeek } from '@models/ISpecialist';
import { AvailableFormValues } from '@utils/Settings';
import isEqual from 'lodash.isequal';

export const ScheduleChangeForm = () => {
  const { data, isLoading, refetch } = useQuery(specialistOwnInfoQueryOptions())

  const { Field, Subscribe, handleSubmit, reset } = useForm<AvailableFormValues, any, any, any, any, any, any, any, any, any>({
    defaultValues: {
      availability: data?.availability || DEFAULT_AVAILABILITY,
    },
    onSubmit: async ({ value }) => {
      await SpecialistService.changeSchedule(value.availability as AvailabilitySlot[]);
      await refetch();
      reset();
    }
  });

  if (isLoading) return (<Loader />)


  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Field
          name="availability"
          validators={{
            onChange: ({ value }) => {
              if (!value.length) return 'Мінімум один слот обовʼязковий';

              for (let i = 0; i < value.length; i++) {
                const { dayOfWeek, from, to } = value[i];

                if (!dayOfWeek || !from || !to) {
                  return `Слот #${i + 1}: всі поля мають бути заповнені`;
                }

                if (from >= to) {
                  return `Слот #${i + 1}: час "До" має бути пізніше за "Від"`;
                }
              }
  
              if (isEqual(value, data?.availability)) return 'Новий розклад нічим не відрізняються від попереднього'

              return undefined;
            },
          }}
        >
          {(field) => {
            const slots = field.state.value;

            return (
              <>
                <Typography variant="h6" sx={{ color: "#AC98D1" }}>Доступність</Typography>
                
                {slots.map((slot, index) => {
                  const usedDays = slots.map(s => s.dayOfWeek).filter((_, i) => i !== index);

                  const availableDays = days.filter(
                    (day) => !usedDays.includes(day as DayOfWeek) || day === slot.dayOfWeek
                  );

                  return (
                    <Box key={index} display="flex" gap={2} alignItems="center" justifyContent="center" mb={1}>
                      <TextField
                        select
                        label="День"
                        value={slot.dayOfWeek}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(slots));
                          updated[index].dayOfWeek = e.target.value as DayOfWeek;
                          field.handleChange(updated);
                        }}
                        sx={{ minWidth: 140 }}
                        error={!!field.state.meta.errors.length}
                        helperText={field.state.meta.errors[0]}
                      >
                        {availableDays.map((day) => (
                          <MenuItem key={day} value={day}>
                            {dayLabels[day]}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        type="time"
                        value={slot.from}
                        onChange={(e) => {
                          const updated = [...slots];
                          updated[index].from = e.target.value;
                          field.handleChange(updated);
                        }}
                      />

                      <TextField
                        type="time"
                        value={slot.to}
                        onChange={(e) => {
                          const updated = [...slots];
                          updated[index].to = e.target.value;
                          field.handleChange(updated);
                        }}
                      />

                      <IconButton
                        onClick={() => {
                          const updated = [...slots];
                          updated.splice(index, 1);
                          field.handleChange(updated);
                        }}
                      >
                        <Delete sx={{ color: "#AC98D1" }} />
                      </IconButton>
                    </Box>
                  )
                })}

                <OutlinedButton
                  onClick={() =>
                    field.handleChange([
                      ...field.state.value,
                      { dayOfWeek: '', from: '', to: '' },
                    ])
                  }
                >
                  + Додати слот
                </OutlinedButton>
              </>
            )
          }}
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
