import { Box, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  price: number;
}

export const PaymentPriceText:FC<Props> = ({ price }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h5" fontWeight={600} color="#AC98D1">
      До сплати:
    </Typography>
    <Typography variant="h5" fontWeight={600} color="#AC98D1">
      {price} грн
    </Typography>
  </Box>
)