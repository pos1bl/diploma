import { Box, Card, CardContent, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

type Props = {
  label: ReactNode;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  value: string;
}

export const HomeCard:FC<Props> = ({ label, Icon, value }) => (
  <Card
    elevation={3}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: 2,
    }}
  >
    <CardContent
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="center">
        <Icon sx={{ color: "#AC98D1", mr: 1, fontSize: "36px" }} />
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Box>
      
      <Typography color="#AC98D1" variant="h3" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
)