import { AddSpecialistForm } from '@components/admin/AddSpecialistForm';
import { StyledSection, StyledTitle } from '@components/styled/base';

export const AddSpecialistPage = () => {
  return (
    <StyledSection sx={{ p: 3 }}>
        <StyledTitle sx={{ mb: 3 }}>
          Додати нового фахівця
        </StyledTitle>

        <AddSpecialistForm />
    </StyledSection>
  );
}
