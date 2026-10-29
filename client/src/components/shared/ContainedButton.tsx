import { FC } from "react";
import { Button } from "@mui/material";
import { ButtonProps } from "@utils/shared";

export const ContainedButton:FC<ButtonProps> = ({ children, sx, ...props }) => (
  <Button
    variant="contained"
    size="large"
    sx={{
      px: 5,
      py: 1.5,
      borderRadius: 8,
      textTransform: 'none',
      backgroundColor: "#A891D2",
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
      '&:hover': { backgroundColor: '#9678C1' },
      ...sx
    }}
    {...props}
  >
    {children}
  </Button>
);