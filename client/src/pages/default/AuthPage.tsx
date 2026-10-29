import { Box } from "@mui/material";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import { StyledAuthPage, StyledTab, StyledTabs } from "@components/styled/default/login";
import Logo from "@components/shared/Logo";
import AuthForm from "@components/default/Authorization/AuthForm";
import { FormType } from "@utils/default/Auth";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGES } from "@utils/NavigationList";

export const AuthPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledAuthPage>
      <Link to={DEFAULT_PAGES.HOME_PAGE as '/'}>
        <Logo width="300" />
      </Link>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="Увійти" value={0}/>
            <StyledTab label="Зареєструватись" value={1}/>
          </StyledTabs>
        </Box>
        <TabPanel value={0}>
          <AuthForm type={FormType.LOGIN} />
        </TabPanel>
        <TabPanel value={1}>
          <AuthForm type={FormType.REGISTER} />
        </TabPanel>
      </TabContext>
    </StyledAuthPage>
  )
};
