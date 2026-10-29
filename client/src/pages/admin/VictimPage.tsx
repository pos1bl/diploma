import { VerifyVictimForm } from '@components/admin/VerifyVictim';
import { StyledSection, StyledTitle } from '@components/styled/base';

export const VictimPage = () => {
  return (
    <StyledSection sx={{ p: 3 }}>
        <StyledTitle sx={{ mb: 3 }}>
          Обробити заявку
        </StyledTitle>

        <VerifyVictimForm />
    </StyledSection>
  );
}
