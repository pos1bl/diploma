import { ContainedButton } from "@components/shared/ContainedButton";
import { StyledSubtitle } from "@components/styled/base";
import { StyleddAppForm } from "@components/styled/default/career";
import { FormControl, FormControlLabel, FormHelperText, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { FC, Ref } from "react";
import ResumeService from "@services/ResumeService";
import { useAuthStore } from "@hooks/useStore";
import { useNavigate } from "@tanstack/react-router";
import { DEFAULT_PAGES } from "@utils/NavigationList";

type Props = {
  ref: Ref<HTMLDivElement>
};


export const ApplicationForm: FC<Props> = ({ ref }) => {
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();

  const redirectToLogin = () => {
    sessionStorage.setItem('afterLoginScrollTo', 'career-form');
    navigate({
      to: DEFAULT_PAGES.LOGIN as '/sign-in',
      search: { redirect: DEFAULT_PAGES.CAREER as '/career' }
    });
  }

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      experienceYears: 0,
      education: "",
      about: "",
      availability: "",
      profileLink: "",
      motivation: "",
    },
    onSubmit: async ({ value, formApi }) => {
      if (!isAuth) {
        redirectToLogin();
        return;
      }

      await ResumeService.sendResume(value);
      formApi.reset();
    },
  });

  return (
    <StyleddAppForm sx={{ py: { xs: 8, md: 10 } }} ref={ref} data-scroll-target="career-form">
      <Stack spacing={3} textAlign="center" mb={2}>
        <StyledSubtitle>
          Подати заявку
        </StyledSubtitle>
        <Typography variant="body1" color="text.secondary">
          Заповніть анкету, щоб стати частиною нашої команди
        </Typography>
      </Stack>

      <Paper
        elevation={4}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          bgcolor: "#F5F1FA",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Stack spacing={3}>
            <Field
              name="fullName"
              validators={{ onSubmit: ({ value }) => !value && "ПІБ обов'язковий" }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="ПІБ"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                  />
                </FormControl>
              )}
            </Field>

            <Field
              name="phone"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value) return "Телефон обов'язковий";
                  const cleaned = value.replace(/\D/g, "");
                  if (cleaned.length !== 12) {
                    return "Телефон має містити 12 цифр і починатися з +380";
                  }
                  if (!/^380\d{9}$/.test(cleaned)) {
                    return "Телефон має починатися з +380";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => {
                const handlePhoneChange = (input: string) => {
                  let digits = input.replace(/\D/g, "");

                  // Якщо стерли менше ніж 3 символи — примусово тримаємо "380"
                  if (digits.length <= 3) {
                    digits = "380";
                  }

                  digits = digits.slice(0, 12); // максимум 12 цифр
                  field.handleChange("+" + digits);
                };

                return (
                  <FormControl fullWidth>
                    <TextField
                      label="Телефон"
                      placeholder="+380XXXXXXXXX"
                      value={field.state.value}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      error={!!field.state.meta.errors.length}
                      helperText={field.state.meta.errors[0]}
                      type="tel"
                    />
                  </FormControl>
                );
              }}
            </Field>

            {/* Email */}
            <Field
              name="email"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value) return "Email обов'язковий";
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value)) return "Некоректний email";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                  />
                </FormControl>
              )}
            </Field>

            {/* Досвід роботи */}
            <Field
              name="experienceYears"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value) return "Вкажіть досвід роботи";
                  const number = Number(value);
                  if (isNaN(number)) return "Має бути числове значення";
                  if (number < 0 || number > 99) return "Введіть число від 0 до 99";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="Досвід роботи (років)"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(+e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                    type="number"
                  />
                </FormControl>
              )}
            </Field>

            {/* Освіта */}
            <Field
              name="education"
              validators={{ onSubmit: ({ value }) => !value && "Освіта обов'язкова" }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="Освіта (Назва ВНЗ, спеціальність)"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                  />
                </FormControl>
              )}
            </Field>

            {/* Про себе */}
            <Field
              name="about"
              validators={{ onSubmit: ({ value }) => !value && "Опис обов'язковий" }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="Короткий опис себе та досвіду"
                    multiline
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                  />
                </FormControl>
              )}
            </Field>

            {/* Бажання працювати */}
            <Field
              name="availability"
              validators={{ onSubmit: ({ value }) => !value && "Оберіть кількість годин" }}
            >
              {(field) => (
                <FormControl component="fieldset" error={!!field.state.meta.errors.length}>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    Бажання працювати з нами (годин на тиждень)
                  </Typography>
                  <RadioGroup
                    name="availability"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <FormControlLabel value="5" control={<Radio />} label="5 годин" />
                    <FormControlLabel value="10" control={<Radio />} label="10 годин" />
                    <FormControlLabel value="20" control={<Radio />} label="20 годин" />
                    <FormControlLabel value="30" control={<Radio />} label="30 годин" />
                    <FormControlLabel value="40" control={<Radio />} label="40 годин" />
                  </RadioGroup>
                  <FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
                </FormControl>
              )}
            </Field>

            {/* Посилання на резюме */}
            <Field
              name="profileLink"
              validators={{ onSubmit: ({ value }) => !value && "Посилання обов'язкове" }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="Посилання на резюме або профіль"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                  />
                </FormControl>
              )}
            </Field>

            {/* Мотиваційне повідомлення */}
            <Field
              name="motivation"
              validators={{ onSubmit: ({ value }) => !value && "Мотиваційне повідомлення обов'язкове" }}
            >
              {(field) => (
                <FormControl fullWidth>
                  <TextField
                    label="Коротке мотиваційне повідомлення"
                    multiline
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                  />
                </FormControl>
              )}
            </Field>

            {/* Кнопка */}
            <Subscribe
              selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <ContainedButton
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  onClick={() => {
                    if (!isAuth) {
                      redirectToLogin();
                    }
                  }}
                >
                  Надіслати заявку
                </ContainedButton>
              )}
            </Subscribe>
          </Stack>
        </form>
      </Paper>
    </StyleddAppForm>
  );
};
