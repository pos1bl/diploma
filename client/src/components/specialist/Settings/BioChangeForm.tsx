import {
  Box,
  TextField,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { useQuery } from '@tanstack/react-query';
import { specialistOwnInfoQueryOptions } from '@utils/QueryOptioms';
import { Loader } from '@components/shared/Loader';
import SpecialistService from '@services/SpecialistService';

export const BioChangeForm = () => {
  const { data, isLoading, refetch } = useQuery(specialistOwnInfoQueryOptions())
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      bio: data?.bio || '',
    },
    onSubmit: async ({ value }) => {
      await SpecialistService.changeBio(value.bio);
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
          name="bio"
          validators={{ onChange: ({ value }) => value?.trim() === (data?.bio?.trim() ?? '') && "Нове біо ніяк не відрізняється від попереднього."}}
        >
          {(field) => (
            <TextField
              multiline
              label="Ваше біо"
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
