import { OutlinedButton } from "@components/shared/OutlinedButton";
import { ISession } from "@models/ISession";
import { Box, TextField } from "@mui/material";
import SessionsService from "@services/SessionsService";
import { useForm } from "@tanstack/react-form";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FC } from "react";
import { toast } from "react-toastify";

type Props = {
  id: string;
  notes: string;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ISession, Error>>
}

export const NotesSection:FC<Props> = ({ id, notes, refetch }) => {
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      notes: notes || '',
    },
    onSubmit: async ({ value }) => {
      await SessionsService.changeNotes(id, value.notes);
      await refetch();
      toast("Нотатки успішно оновлені", { type: "info" });
      reset();
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Field
          name="notes"
          validators={{ onSubmit: ({ value }) => value?.trim() === (notes?.trim() ?? '') && "Нові нотатки ніяк не відрізняються від попередніз."}}
        >  
          {(field) => (
            <TextField
              multiline
              label="Ваші нотатки"
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
