import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { DEFAULT_PAGES, getNavigationList, HEADER_NAVIGATION_LIST, USER_NAVIGATION_LIST } from "@utils/NavigationList";
import { useAuthStore } from "@hooks/useStore";
import { checkPermission } from "@helpers/checkPermission";
import { StyledBigHeaderLink, StyledSmallHeaderLink } from "@components/styled/base";
import Logo from "./Logo";

export const Header = () => {
  const { isAuth, user, logout } = useAuthStore();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: '#A891D2'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledSmallHeaderLink to={DEFAULT_PAGES.HOME_PAGE}>
            <Logo width="70" color="#fff" />
          </StyledSmallHeaderLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {HEADER_NAVIGATION_LIST.map(({ name, navigateTo, availableRoles }) => {
                if (!availableRoles.length || isAuth && checkPermission(user.role, availableRoles)) {
                  return (
                    <MenuItem key={name} onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: 'center', mr: 2, padding: 0 }}>
                        <Link
                          to={navigateTo as '/'}
                          preload={false}
                          activeProps={{
                            style: {
                              borderBottom: '1px solid black',
                            },
                          }}
                        >
                          {name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  )
                }
              })}
            </Menu>
          </Box>
          <StyledBigHeaderLink to={DEFAULT_PAGES.HOME_PAGE}>
            <Logo width="70" color="#fff" />
          </StyledBigHeaderLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '20px' } }}>
            {HEADER_NAVIGATION_LIST.map(({ name, navigateTo, availableRoles }) => {
              if (!availableRoles.length || isAuth && checkPermission(user.role, availableRoles)) {
                return (
                  <Link
                    key={name}
                    to={navigateTo as '/'}
                    preload={false}
                    activeProps={{
                      style: {
                        borderBottom: '2px solid white',
                      },
                    }}
                  >
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      {name}
                    </Button>
                  </Link>
                )
              }
            })}
          </Box>
          {isAuth && (<
            Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Параметри користувача">
                <IconButton onClick={handleOpenUserMenu} sx={{ border: '2px solid #fff', borderRadius: '8px', padding: '6px 16px', display: 'flex', gap: '8px' }}>
                  <PersonIcon sx={{ color: 'white' }} />
                  <Typography color="#fff">{user.name}</Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {getNavigationList(user.role).map(({ name, navigateTo, availableRoles }) => {
                  if (!availableRoles.length || isAuth && checkPermission(user.role, availableRoles)) {
                    return (
                      <Link to={navigateTo as unknown as "/"} key={name}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography sx={{ textAlign: 'center' }}>{name}</Typography>
                        </MenuItem>
                      </Link>
                    )
                  }
                })}
                <MenuItem onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}>
                  <Typography sx={{ textAlign: 'center' }}>Вийти</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!isAuth && (
            <Link to={DEFAULT_PAGES.LOGIN as '/'}>
              <Button color="inherit" sx={{ my: 2, color: 'white', display: 'block' }}>Увійти</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
