import {
  Box,
  TextField,
  MenuItem,
  Stack,
  Select,
  IconButton,
  Typography,
  Chip,
  useTheme,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Delete } from '@mui/icons-material';
import { dayLabels, days, DEFAULT_AVAILABILITY, getStyles, SpecialistFormValues } from '@utils/admin/Addspecialistform';
import AdminService from '@services/AdminService';
import { AvailabilitySlot, DayOfWeek, Gender } from '@models/ISpecialist';
import { ISSUES_LIST, MenuProps, SPECIAL_GROUPS_LIST, THERAPY_METHODS_LIST } from '@utils/shared';
import { ContainedButton } from '@components/shared/ContainedButton';
import { ImageUploadField } from '@components/shared/ImageUploadField';

export const AddSpecialistForm = () => {
  const theme = useTheme();
  const maxYear = dayjs().subtract(18, 'years');
  const now = dayjs();

  const { Field, Subscribe, handleSubmit, reset, getFieldValue } = useForm<SpecialistFormValues, any, any, any, any, any, any, any, any, any>({
    defaultValues: {
      avatar: null,
      email: '',
      dateOfBirth: '',
      gender: '',
      bio: '',
      dateOfStart: '',
      mainAreas: [],
      secondaryAreas: [],
      excludedAreas: [],
      methods: [],
      specialNeeds: [],
      availability: DEFAULT_AVAILABILITY,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        avatar: value.avatar,
        email: value.email,
        dateOfBirth: value.dateOfBirth,
        gender: value.gender as Gender,
        bio: value.bio,
        dateOfStart: value.dateOfStart,
        mainAreas: value.mainAreas,
        secondaryAreas: value.secondaryAreas,
        excludedAreas: value.excludedAreas,
        methods: value.methods,
        specialNeeds: value.specialNeeds,
        availability: value.availability as AvailabilitySlot[],
      };
      await AdminService.addSpecialist(payload);
      
      reset();
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Stack sx={{ maxWidth: { xs: 300, sm: 500 } }} gap={3}>
        <Field name="avatar" validators={{ onChange: ({ value }) => !value && 'Завантажте фото профілю спецаліста' }}>
          {(field) => (
            <ImageUploadField
              file={field.state.value}
              onFileChange={field.handleChange}
              onClear={() => field.handleChange(null)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          )}
        </Field>

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
            <TextField
              label="Email спеціаліста"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          )}
        </Field>

        <Field
          name="dateOfBirth"
          validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <DatePicker
              label="Дата народження"
              format="YYYY-MM-DD"
              maxDate={maxYear}
              value={field.state.value ? dayjs(field.state.value) : null}
              onChange={(date: Dayjs | null) => field.handleChange(date ? date.format("YYYY-MM-DD") : '')}
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
          name="dateOfStart"
          validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <DatePicker
              label="Дата початку роботи фахівцем"
              format="YYYY-MM-DD"
              maxDate={now}
              value={field.state.value ? dayjs(field.state.value) : null}
              onChange={(date: Dayjs | null) => field.handleChange(date ? date.format("YYYY-MM-DD") : '')}
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
          name="gender"
          validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <TextField
              select
              label="Стать"
              fullWidth
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            >
              <MenuItem value={Gender.MALE}>Чоловіча</MenuItem>
              <MenuItem value={Gender.FEMALE}>Жіноча</MenuItem>
            </TextField>
          )}
        </Field>

        <Field name="bio" validators={{ onChange: ({ value }) => !value.length && 'Обовʼязкове поле' }}>
          {(field) => (
            <TextField
              label="Біо"
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

        <Field
          name="methods"
          validators={{ onChange: ({ value }) => !value.length && 'Обовʼязкове поле' }}
        >
          {(field) => {
            const labelId = 'methods-label';

            return (
              <FormControl fullWidth error={!!field.state.meta.errors.length}>
                <InputLabel id={labelId}>Методи роботи</InputLabel>
                <Select
                  labelId={labelId}
                  label="Методи роботи"
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
                  {THERAPY_METHODS_LIST.map((name) => (
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
            );
          }}
        </Field>

        <Field name="mainAreas" validators={{ onChange: ({ value }) => !value.length && 'Обовʼязкове поле' }}>
          {(field) => (
            <Subscribe
              selector={() => [
                getFieldValue('secondaryAreas'),
                getFieldValue('excludedAreas')
              ]}
            >
              {([secondaryAreas, excludedAreas]) => {
                const labelId = 'main-areas-label';
                const unavailable = new Set([...secondaryAreas, ...excludedAreas]);
                const filteredOptions = ISSUES_LIST.filter((item) => !unavailable.has(item));

                return (
                  <FormControl fullWidth error={!!field.state.meta.errors.length}>
                    <InputLabel id={labelId}>Основні напрямки</InputLabel>
                    <Select
                      labelId={labelId}
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
                );
              }}
            </Subscribe>)
          }
        </Field>

        <Field name="secondaryAreas">
          {(field) => (
            <Subscribe
              selector={() => [
                getFieldValue('mainAreas'),
                getFieldValue('excludedAreas')
              ]}
            >
              {([mainAreas, excludedAreas]) => {
                const labelId = 'secondary-areas-label';
                const unavailable = new Set([...mainAreas, ...excludedAreas]);
                const filteredOptions = ISSUES_LIST.filter((item) => !unavailable.has(item));

                return (
                  <FormControl fullWidth error={!!field.state.meta.errors.length}>
                    <InputLabel id={labelId}>Також працює з</InputLabel>
                    <Select
                      labelId={labelId}
                      label="Також працює з"
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
                );
              }}
            </Subscribe>)
          }
        </Field>

        <Field name="specialNeeds">
          {(field) => (
            <Subscribe
              selector={() => [
                getFieldValue('excludedAreas')
              ]}
            >
              {([excludedAreas]) => {
                const labelId = 'special-needs-label';
                const unavailable = new Set([...excludedAreas]);
                const filteredOptions = SPECIAL_GROUPS_LIST.filter((item) => !unavailable.has(item));

                return (
                  <FormControl fullWidth error={!!field.state.meta.errors.length}>
                    <InputLabel id={labelId}>Спеціальні потреби</InputLabel>
                    <Select
                      labelId={labelId}
                      label="Спеціальні потреби"
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
                );
              }}
            </Subscribe>)
          }
        </Field>

        <Field name="excludedAreas">
          {(field) => (
            <Subscribe
              selector={() => [
                getFieldValue('mainAreas'),
                getFieldValue('secondaryAreas'),
                getFieldValue('specialNeeds')
              ]}
            >
              {([mainAreas, secondaryAreas, specialNeeds]) => {
                const labelId = 'excluded-areas-label';
                const unavailable = new Set([...mainAreas, ...secondaryAreas, ...specialNeeds]);
                const filteredOptions = [...ISSUES_LIST, ...SPECIAL_GROUPS_LIST].filter((item) => !unavailable.has(item));

                return (
                  <FormControl fullWidth error={!!field.state.meta.errors.length}>
                    <InputLabel id={labelId}>З чим не працює</InputLabel>
                    <Select
                      labelId={labelId}
                      label="З чим не працює"
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
                );
              }}
            </Subscribe>)
          }
        </Field>

        <Box display="flex" justifyContent="flex-end">
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <ContainedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Додати спеціаліста'}
              </ContainedButton>
            )}
          </Subscribe>
        </Box>
      </Stack>
    </form>
  );
};
