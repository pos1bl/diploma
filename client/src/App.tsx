import { useContext, useEffect } from 'react'
import './App.css'
import { StoresContext } from './main'
import { observer } from 'mobx-react-lite'
import { useQueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import router from '@utils/Route'
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/uk';
import './assets/styles/index.scss';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@utils/Theme'
import { Loader } from '@components/shared/Loader'
function App() {
  const queryClient = useQueryClient();
  const stores = useContext(StoresContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      stores.authStore.checkAuth();
    }
  }, []);

  if (stores.authStore.isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <CssBaseline />
        <ToastContainer />
        <RouterProvider
          router={router}
          context={{ stores, queryClient }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default observer(App);
