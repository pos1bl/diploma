import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@hooks/useStore';
import { DEFAULT_PAGES, getNavigationList } from '@utils/NavigationList';
import Logo from './Logo';
import { DRAWER_WIDTH } from '@utils/Sidebar';

export const Sidebar = () => {
  const { user, logout } = useAuthStore();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: "#f9f9f9",
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Link
        to={DEFAULT_PAGES.HOME_PAGE as "/"}
        style={{ textAlign: 'center', display: 'block' }}
      >
        <Logo width="80%" />
      </Link>

      <List>
        {getNavigationList(user.role).map(({ name, icon, navigateTo }) => (
          <ListItemButton
            key={name}
            component={Link}
            to={navigateTo}
            activeOptions={{ exact: name === "Головна", includeSearch: false, }}
            activeProps={{ className: 'active' }}
            sx={{
              '&.active': {
                backgroundColor: '#AC98D1',
                color: '#fff',
              },
              '&.active .MuiListItemIcon-root .MuiSvgIcon-root': {
                color: '#fff',
              },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        ))}
      </List>

      <List>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon sx={{ color: '#AC98D1' }} />
          </ListItemIcon>
          <ListItemText primary="Вихід" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
