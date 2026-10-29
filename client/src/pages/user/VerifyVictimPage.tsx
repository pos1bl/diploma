import { Loader } from "@components/shared/Loader";
import { StyledSection, StyledTitle } from "@components/styled/base";
import { VictimForm } from "@components/user/Victim/VictimForm";
import { useAuthStore } from "@hooks/useStore";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { victimRequestQueryOptions } from "@utils/QueryOptioms";
import { CancelledSection, PendingSection, VerifiedSection } from "@utils/user/Victimrequest";

export const VerifyVictimPage = () => {
  const { user } = useAuthStore();
  const { data: request, isLoading, refetch } =  useQuery(victimRequestQueryOptions());

  if (isLoading) {
    return <Loader />
  }

  if (user.isVictim || request?.status === 'verified') {
    return <VerifiedSection />;
  }

  if (request?.status === 'pending') {
    return <PendingSection />;
  }
  if (request?.status === 'cancelled') {
    return <CancelledSection />;
  }
 
  return (
    <StyledSection sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <StyledTitle sx={{ mb: 3 }}>
        Підтвердіть статус «Постраждалий від війни»
      </StyledTitle>

       <Typography textAlign="center" variant="body1" mb={3}>
          Якщо Ви постраждали внаслідок військових дій, є військовим чи ветераном — будь ласка, надайте короткий опис
          вашої ситуації і завантажте відповідні документи. Це дасть нам змогу надавати
          вам безкоштовну допомогу.
        </Typography>

      <VictimForm refetch={refetch} />
    </StyledSection>
  )
};
