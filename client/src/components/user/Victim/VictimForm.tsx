import {
  Box,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { ContainedButton } from '@components/shared/ContainedButton';
import { FilesUploadField } from '@components/shared/FileUploadField';
import { VICTIM_REQUEST_TYPE_LIST, VictimFormValues } from '@utils/user/Victimrequest';
import UserService from '@services/UserService';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { IVictimRequest } from '@models/IVictimRequet';
import { FC } from 'react';

type Props = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IVictimRequest, Error>>
}

export const VictimForm:FC<Props> = ({ refetch }) => {
  const { Field, Subscribe, handleSubmit, reset } = useForm<VictimFormValues, any, any, any, any, any, any, any, any, any>({
    defaultValues: {
      file: null,
      type: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      const payload = {
        file: value.file,
        type: value.type,
        description: value.description,
      };
      await UserService.sendVictimRequest(payload);
      
      reset();
      refetch();
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Stack sx={{ maxWidth: { xs: 300, sm: 500 } }} gap={3}>
        <Field
          name="type"
          validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
        >
          {(field) => (
            <TextField
              select
              label="Ваш статус"
              fullWidth
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            >
              {VICTIM_REQUEST_TYPE_LIST.map(row => <MenuItem value={row.value}>{row.option}</MenuItem>)}
            </TextField>
          )}
        </Field>

        <Field name="description" validators={{ onChange: ({ value }) => !value.length && 'Обовʼязкове поле' }}>
          {(field) => (
            <TextField
              label="Опис вашої ситуації"
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

        <Field name="file" validators={{ onChange: ({ value }) => !value && 'Завантажте необхідний файл для пітдвердження' }}>
          {(field) => (
            <FilesUploadField
              file={field.state.value}
              onFileChange={field.handleChange}
              onClear={() => field.handleChange(null)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          )}
        </Field>

        <Box display="flex" justifyContent="flex-end">
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <ContainedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Відправити заявку'}
              </ContainedButton>
            )}
          </Subscribe>
        </Box>
      </Stack>
    </form>
  );
};
