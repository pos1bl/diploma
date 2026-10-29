import { IUnavaibility, UNAVAIBILITIES_NAMES } from "@models/IUnavaibility"
import { Box, Card, CardContent, Typography } from "@mui/material"
import dayjs from "dayjs"
import { FC } from "react"

type Props = {
  unavailabilities: IUnavaibility[]
}

export const UnavailabilityList:FC<Props> = ({ unavailabilities }) => {
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 2,
      }}
    >
      {unavailabilities.map((u: IUnavaibility) => (
        <Box key={u._id}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ color: "#AC98D1", fontWeight: 700 }} gutterBottom>
                {UNAVAIBILITIES_NAMES[u.type]}
              </Typography>

              <Typography variant="subtitle1">
                {dayjs.utc(u.start).format('DD.MM.YYYY HH:mm')}
                {' – '}
                {dayjs.utc(u.end).format('DD.MM.YYYY HH:mm')}
              </Typography>

              {u.note && (
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {u.note}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}