import {
  Box,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import AdminService from '@services/AdminService';
import { ContainedButton } from '@components/shared/ContainedButton';
import { VictimFormValues } from '@utils/admin/Verifyvictim';
import { VICTIM_REQUEST_STATUS } from '@models/IVictimRequet';

export const VerifyVictimForm = () => {
  const { Field, Subscribe, handleSubmit, reset } = useForm<VictimFormValues, any, any, any, any, any, any, any, any, any>({
    defaultValues: {
      id: '',
      status: '',
    },
    onSubmit: async ({ value }) => {
      const payload = {
        id: value.id,
        status: value.status,
      };
      await AdminService.verifyVictim(payload);
      
      reset();
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Stack sx={{ maxWidth: { xs: 300, sm: 500 } }} gap={3}>
        <Field
          name="id"
          validators={{
            onSubmit: ({ value }) => {
              if (!value) return "ID обов'язковий";
              return undefined;
            },
          }}
        >
          {(field) => (
            <TextField
              label="ID користувача"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          )}
        </Field>

        <Field
          name="status"
          validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <TextField
              select
              label="Що зробити?"
              fullWidth
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            >
              <MenuItem value={VICTIM_REQUEST_STATUS.VERIFIED}>Верифікувати</MenuItem>
              <MenuItem value={VICTIM_REQUEST_STATUS.CANCELLED}>Скасувати</MenuItem>
            </TextField>
          )}
        </Field>

        <Box display="flex" justifyContent="flex-end">
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <ContainedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Відповісти на заявку'}
              </ContainedButton>
            )}
          </Subscribe>
        </Box>
      </Stack>
    </form>
  );
};
