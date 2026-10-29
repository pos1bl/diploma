import {
  Box,
  TextField,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import UserService from '@services/UserService';
import { useAuthStore } from '@hooks/useStore';

export const EmailChangeForm = () => {
  const { updateUserInfo, user } = useAuthStore();
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      await UserService.changeEmail(value.email);
      await updateUserInfo();
      reset();
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Поточний"
          fullWidth
          disabled
          value={user.email}
        />

        <Field
          name="email"
          validators={{
            onSubmit: ({ value }) => {
              if (!value) return 'Email обов’язковий';
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) return 'Некоректний формат email';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextField
              label="Новий Email"
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
