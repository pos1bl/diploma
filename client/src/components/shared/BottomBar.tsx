import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './Logo';
import { useAuthStore } from '@hooks/useStore';
import { DEFAULT_PAGES, getNavigationList } from '@utils/NavigationList';

export const BottomBar = () => {
  const theme = useTheme();
  const { logout, user } = useAuthStore();
  const { pathname } = useLocation();

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        pb: `env(safe-area-inset-bottom)`,
        backgroundColor: "#f9f9f9",
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <BottomNavigation
          value={pathname}
          sx={{
            margin: '0 auto',
            display: 'inline-flex',
            flexWrap: 'nowrap',
            width: 'max-content',
            backgroundColor: 'transparent',
          }}
        >
          <BottomNavigationAction
            value={DEFAULT_PAGES.HOME_PAGE}
            icon={<Logo width='85px' />}
            to={DEFAULT_PAGES.HOME_PAGE as '/'}
            component={Link}
          />
          {getNavigationList(user.role).map(({ name, navigateTo, icon }) => (
            <BottomNavigationAction
              key={name}
              label={name}
              value={navigateTo}
              to={navigateTo}
              icon={icon}
              component={Link}
              sx={{ textAlign: "center",  '&.Mui-selected': {
                bgcolor: "#F5F1FA",
                borderRadius: "5px",
              } }}
            />
          ))}
          <BottomNavigationAction
            label="Вихід"
            value="logout"
            icon={<ExitToAppIcon sx={{ color: "#AC98D1" }} />}
            onClick={logout}
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
};
