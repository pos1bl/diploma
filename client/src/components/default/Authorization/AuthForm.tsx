
import React, { useState, FormEvent } from "react";
import { observer } from "mobx-react-lite";

import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { SigninForm } from "@components/styled/default/login";
import { useForm } from '@tanstack/react-form';
import { FormType } from "@utils/default/Auth";
import { useAuthStore } from "@hooks/useStore";

type Props = {
  type: FormType
};

const AuthForm: React.FC<Props> = ({ type }) => {
  const store = useAuthStore();

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: '',
      ...(type === FormType.REGISTER ? { name: '' } : {})
    },
    onSubmit: ({ value }) => type === FormType.REGISTER ? store.registration(value.email, value.name!, value.password) : store.login(value.email, value.password)
  });

  const [showPassword, setIsShowPassword] = useState(false);

  return (
    <SigninForm
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
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
        children={(field) => (
          <FormControl fullWidth>
            <TextField
              size="small"
              id="email"
              label="Email"
              placeholder="Введіть Ваш email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          </FormControl>
        )}
      />

      {type === FormType.REGISTER && (
        <Field
          name="name"
          validators={{
            onSubmit: ({ value }) => !value && 'Ім’я обов’язкове'
          }}
          children={(field) => (
            <FormControl fullWidth>
              <TextField
                size="small"
                id="name"
                label="Як до вас звертатись?"
                placeholder="Введіть ім’я"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={!!field.state.meta.errors.length}
                helperText={field.state.meta.errors[0]}
              />
            </FormControl>
          )}
        />
      )}

      <Field
        name="password"
        validators={{
          onSubmit: ({ value }) => !value && 'Пароль обов`язковий'
        }}
        children={(field) => (
          <FormControl fullWidth>
            <InputLabel
              size="small"
              error={!!field.state.meta.errors.length}
              htmlFor="password">
              Пароль
            </InputLabel>
            <OutlinedInput
              size="small"
              id="password"
              label="password"
              autoComplete="current-passwoprd"
              placeholder="Enter your password"
              onChange={(e) => field.handleChange(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              error={!!field.state.meta.errors.length}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={() => setIsShowPassword((show) => !show)}>
                    {showPassword ? (
                      <VisibilityOff color={field.state.meta.errors.length ? 'error' : 'inherit'} />
                    ) : (
                      <Visibility color={field.state.meta.errors.length ? 'error' : 'inherit'} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={!!field.state.meta.errors.length}>{field.state.meta.errors[0]}</FormHelperText>
          </FormControl>
        )}
      />

      <Subscribe
        selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
        children={([canSubmit]) => (
          <Button
            variant="contained"
            disabled={!canSubmit}
            type="submit"
            sx={{
              backgroundColor: "#AC98D1",
              color: "fff"
            }}
          >
            {type === FormType.LOGIN ? 'Увійти' : 'Зареєструватись'}
          </Button>
        )}
      />
    </SigninForm>
  );
};

export default observer(AuthForm);
