import {
  Box,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import SpecialistService from '@services/SpecialistService';
import { ContainedButton } from '@components/shared/ContainedButton';
import { UnavailabilityFormValues } from '@utils/specialist/Unavailability';
import { UNAVAIBILITIES_NAMES, UNAVAIBILITY_TYPES } from '@models/IUnavaibility';
import { useSessionStore } from '@hooks/useStore';
import { useQuery } from '@tanstack/react-query';
import { unavailabilitiesQueryOptions } from '@utils/QueryOptioms';
import { Loader } from '@components/shared/Loader';


export const UnavailabilitytForm = () => {
  const { data: unavailabilities, isLoading, refetch } = useQuery(unavailabilitiesQueryOptions());
  const { sessions } = useSessionStore();
  
  const minDate = dayjs();

  const { Field, Subscribe, handleSubmit, getFieldValue, reset } = useForm<UnavailabilityFormValues, any, any, any, any, any, any, any, any, any>({
    defaultValues: {
      type: '',
      start: '',
      end: '',
      note: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await SpecialistService.addUnavailability(value);
        refetch()
        reset();
      } catch (e) {
        console.error(e)
      } 
    },
  });

  if (isLoading || !unavailabilities) {
    return <Loader />
  }
  const isSessionInDates = () => {
    return sessions.some(session => {
      const scheduledAtFormatted = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');

      return scheduledAtFormatted > getFieldValue("start") && scheduledAtFormatted < getFieldValue("end")
    })
  }

  const isAnotherUnavailability = () => {
    return unavailabilities.some(u => {
      const formattedStart = dayjs.utc(u.start).format('DD.MM.YYYY HH:mm');
      const formattedEnd = dayjs.utc(u.end).format('DD.MM.YYYY HH:mm');

      return formattedStart < getFieldValue("end") || formattedEnd > getFieldValue("start")
    })
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Stack sx={{ maxWidth: { xs: 300, sm: 500 } }} gap={3}>

        <Field
          name="start"
          validators={{
            onChange: ({ value }) => !value && 'Обовʼязкове поле',
            onSubmit: ({ value }) => {
              if (minDate.format('DD.MM.YYYY HH:mm') > value) return 'Відмітити відсутнісь можна лише в майбутьному часі!'
              if (isSessionInDates()) return 'У Вас є запланована зустріч на вибраний час'
              if (isAnotherUnavailability()) return 'Вибраний Вами час охоплює вже існуючі відсутності'
              return undefined;
            }
          }}
        >
          {(field) => (
            <DateTimePicker
              label="Дата початку"
              format="YYYY-MM-DD HH:mm"
              minDate={minDate}
              value={field.state.value ? dayjs.utc(field.state.value, "DD.MM.YYYY HH:mm") : null}
              onChange={(date: Dayjs | null) => field.handleChange(date ? date.format('DD.MM.YYYY HH:mm') : '')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!field.state.meta.errors.length,
                  helperText: field.state.meta.errors[0],
                },
              }}
            />
          )}
        </Field>

        <Field
          name="end"
          validators={{
            onChange: ({ value }) => !value && 'Обовʼязкове поле',
            onSubmit: () => {
              if (isSessionInDates()) return 'У Вас є запланована зустріч на вибраний час'
              if (isAnotherUnavailability()) return 'Вибраний Вами час охоплює вже існуючі відсутності'
              return undefined;
            }
          }}
        >
          {(field) => (
            <DateTimePicker
              label="Дата кінця"
              format="YYYY-MM-DD HH:mm"
              minDate={minDate}
              value={field.state.value ? dayjs.utc(field.state.value, "DD.MM.YYYY HH:mm") : null}
              onChange={(date: Dayjs | null) => field.handleChange(date ? date.format('DD.MM.YYYY HH:mm') : '')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!field.state.meta.errors.length,
                  helperText: field.state.meta.errors[0],
                },
              }}
            />
          )}
        </Field>

        <Field
          name="type"
          validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <TextField
              select
              label="Причина"
              fullWidth
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            >
              {Object.entries(UNAVAIBILITIES_NAMES).map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
            </TextField>
          )}
        </Field>

        <Field
          name="note"
          validators={{ onChange: ({ value }) => !value && getFieldValue("type") === UNAVAIBILITY_TYPES.OTHER && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <TextField
              label="Примітка"
              multiline
              minRows={2}
              fullWidth
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          )}
        </Field>

        <Box display="flex" justifyContent="flex-end">
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <ContainedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Відмітити відсутність'}
              </ContainedButton>
            )}
          </Subscribe>
        </Box>
      </Stack>
    </form>
  );
};
