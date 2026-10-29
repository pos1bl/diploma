import { WelcomeBanner } from '@components/shared/WelcomeBanner';
import { useSessionStore } from '@hooks/useStore';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FilterPanel } from '@components/specialist/Homepage/FilterPanel';
import { partOfSpecialist, sessionPrice } from '@utils/shared';
import { SESSION_STATUS_OPTIONS } from '@utils/user/Appointment';
import { SESSION_STATUSES } from '@models/ISession';
import { getSessionsOverview } from '@utils/user/Homepage';
import { NextSessionSection } from '@components/specialist/Homepage/NextSessionSection';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { HomeCard } from '@components/specialist/Homepage/HomeCard';
import { QuickActions } from '@components/specialist/Homepage/QuickActions';

export const HomePage = observer(() => {
  const { sessions } = useSessionStore();
  const { nextSession } = getSessionsOverview(sessions);
  
  const revenue = sessions.filter(row => [SESSION_STATUSES.CANCELLED, SESSION_STATUSES.NO_SHOW, SESSION_STATUSES.COMPLETED].includes(row.status)).length * sessionPrice * partOfSpecialist;
  return (
    <Box>
      <Box mb={6}>
        <WelcomeBanner />
      </Box>

      <Box mb={3}>
        <FilterPanel />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
          alignItems: 'stretch',
        }}
        mb={6}
      >
        {SESSION_STATUS_OPTIONS.map(({ status, Icon, label }) => (
          <Box key={status}>
            <HomeCard
              Icon={Icon}
              label={<>
                Сесій зі статусом:
                <br/>
                <b>"{label}"</b>
              </>}
              value={`${sessions.filter(s => s.status === status).length}`}
            />
          </Box>
        ))}

        <HomeCard
          Icon={AttachMoneyIcon}
          label='Дохід (₴)'
          value={revenue.toLocaleString('uk-UA', {
            style: 'currency',
            currency: 'UAH',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        />
      </Box >
      
      <Box display="flex" gap={2}>
        {nextSession && (
          <Box sx={{ flexBasis: '50%', flexShrink: 0 }}>
            <NextSessionSection session={nextSession} />
          </Box>
        )}
        <QuickActions />
      </Box>
    </Box>
  )
});
