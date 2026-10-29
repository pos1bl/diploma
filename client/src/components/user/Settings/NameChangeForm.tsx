import {
  Box,
  TextField,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import UserService from '@services/UserService';
import { useAuthStore } from '@hooks/useStore';

export const NameChangeForm = () => {
  const {updateUserInfo, user } = useAuthStore();
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      await UserService.changeName(value.name);
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
          disabled
          label="Поточне ім'я"
          fullWidth
          value={user.name}
        />
        <Field
          name="name"
          validators={{ onChange: ({ value }) => !value && 'Ім’я обов’язкове' }}
        >
          {(field) => (
            <TextField
              label="Нове ім'я"
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
