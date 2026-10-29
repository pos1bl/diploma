import { FC } from "react";
import { Button } from "@mui/material";
import { ButtonProps } from "@utils/shared";

export const OutlinedButton:FC<ButtonProps> = ({ children, sx, ...props }) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      px: 5,
      py: 1.5,
      borderRadius: 8,
      textTransform: 'none',
      borderColor: "#A891D2",
      textDecoration: 'none',
      color: "#9678C1",
      fontWeight: 'bold',
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: '#9678C1',
        color: '#fff',
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Button>
);