import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import UserService from '@services/UserService';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useNotifyToast from '@hooks/useNotifyToats';
import { PASSWORD_FIELDS, PASSWORD_NAME_FIELD } from '@utils/user/Settingspage';

export const PassChangeForm = () => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleShow = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const { showError } = useNotifyToast();

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      if (value.newPassword !== value.confirmPassword) {
        showError('Паролі не співпадають')
        return
      }

      if (value.newPassword === value.currentPassword) {
        showError('Паролі мають відрізнятися')
        return
      }

      if (value.newPassword.length < 3) {
        showError('Мінімальна довжина паролю 3 символи')
        return
      }

      await UserService.changePassword(value.currentPassword, value.newPassword);
      reset();
    }
  });

  const renderPasswordField = (
    name: PASSWORD_NAME_FIELD,
    label: string,
  ) => (
    <Field
      name={name}
      validators={{
        onSubmit: ({ value }) => !value && 'Обов`язкове поле',
      }}
      children={field => (
        <FormControl fullWidth>
          <InputLabel error={!!field.state.meta.errors.length} htmlFor={name}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            label={label}
            placeholder={label}
            value={field.state.value}
            type={showPassword[name] ? 'text' : 'password'}
            onChange={e => field.handleChange(e.target.value)}
            error={!!field.state.meta.errors.length}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword[name] ? 'Сховати пароль' : 'Показати пароль'}
                  onClick={() => toggleShow(name)}
                  edge="end"
                >
                  {showPassword[name] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={!!field.state.meta.errors.length}>
            {field.state.meta.errors[0]}
          </FormHelperText>
        </FormControl>
      )}
    />
  );

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        {PASSWORD_FIELDS.map(({ name, label }) => renderPasswordField(name, label))}

        <Box display="flex" justifyContent="flex-end">
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <OutlinedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Змінити пароль'}
              </OutlinedButton>
            )}
          </Subscribe>
        </Box>
      </Box>
    </form>
  );
};
