import { NextSessionSection } from '@components/user/Homepage/NextSessionSection';
import { PromoSections } from '@components/user/Homepage/PromoSections';
import { RepeatBookingSection } from '@components/user/Homepage/RepeatBookingSection';
import { WelcomeBanner } from '@components/shared/WelcomeBanner';
import { useSessionStore } from '@hooks/useStore';
import { Box } from '@mui/material';
import { getSessionsOverview } from '@utils/user/Homepage';

export const HomePage = () => {
  const { sessions } = useSessionStore();

  const { nextSession, lastPastSession } = getSessionsOverview(sessions);

  return (
    <Box sx={{ pb: 1 }}>
      <Box mb={4}>
        <WelcomeBanner />
      </Box>

      {(nextSession || lastPastSession) && (
        <Box display="flex" mb={4} gap={2}>
          {nextSession && (
            <Box sx={{ flexBasis: '50%', flexShrink: 0 }}>
              <NextSessionSection session={nextSession} />
            </Box>
          )}
          {lastPastSession && (
            <Box sx={{ flexBasis: '50%', flexShrink: 0 }}>
              <RepeatBookingSection session={lastPastSession} />
            </Box>
          )}
        </Box>
      )}

      <PromoSections />
    </Box>
  );
};
