import { ContainedButton } from "@components/shared/ContainedButton";
import { ImageUploadField } from "@components/shared/ImageUploadField";
import { OutlinedButton } from "@components/shared/OutlinedButton";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import SpecialistService from "@services/SpecialistService";
import { useForm } from "@tanstack/react-form";
import { DialogProps, DIPLOM_FORM_FIELDS, DiplomFormState } from "@utils/specialist/Education";
import moment from "moment";
import { FC } from "react";

export const  DiplomDialog:FC<DialogProps> = ({ open, onClose, onSuccess }) => {
  const { Field, Subscribe, handleSubmit, reset } = useForm<DiplomFormState, any, any, any, any, any, any, any, any, any>({
    defaultValues: {
      image: null,
      title: '',
      specialty: '',
      degree: '',
      year: +moment.utc().format('YYYY'),
    },
    onSubmit: async ({ value }) => {
      const payload: DiplomFormState = {
        image: value.image,
        title: value.title,
        specialty: value.specialty,
        degree: value.degree,
        year: value.year,
      };

      await SpecialistService.addDiplom(payload);
      
      reset();
      onSuccess();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h4" fontWeight={700} sx={{ p: 2, color: "#AC98D1" }}>Додати диплом</DialogTitle>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
          {DIPLOM_FORM_FIELDS.map(({ label, name, type }) => (
            <Field name={name as keyof Omit<DiplomFormState, "image">} validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}>
              {(field) => (
                <TextField
                  label={label}
                  type={type || "text"}
                  fullWidth
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                />
              )}
            </Field>
          ))}

          <Field name="image" validators={{ onChange: ({ value }) => !value && 'Завантажте диплом' }}>
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
        </DialogContent>
        <DialogActions>
          <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <ContainedButton type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Обробка...' : 'Додати диплом'}
              </ContainedButton>
            )}
          </Subscribe>
          <OutlinedButton onClick={onClose}>Скасувати</OutlinedButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
