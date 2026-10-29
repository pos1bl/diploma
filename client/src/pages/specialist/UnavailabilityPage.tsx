import { ContainedButton } from '@components/shared/ContainedButton';
import { UnavailabilitytForm } from '@components/specialist/Unavaiability/UnavailabilityForm';
import { UnavailabilityMain } from '@components/specialist/Unavaiability/UnavailabilityMain';
import { StyledSubtitle } from '@components/styled/base';
import { Container } from '@mui/material';
import { useState } from 'react';

export const UnavailabilityPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", py: 4, gap: 4 }}>
      <StyledSubtitle>Відсутності</StyledSubtitle>
      <div>
        <ContainedButton onClick={() => setShowForm(!showForm)}>{showForm ? "Приховати" : "Показати"} форму</ContainedButton>
      </div>  
      {showForm && <UnavailabilitytForm />}
      <UnavailabilityMain />
    </Container>
  )
};
