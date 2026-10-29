import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Link } from '@tanstack/react-router'
import { ISession, SESSION_STATUSES } from '@models/ISession'
import { AvatarName, StyledSessionTitle } from '@components/styled/user/home'
import { ContainedButton } from '@components/shared/ContainedButton'
import { formatSessionDate } from '@utils/user/Homepage'

interface Props {
  session: ISession
}

export const RepeatBookingSection: React.FC<Props> = ({ session }) => (
  <Box sx={{ mb: 4 }}>
    <StyledSessionTitle sx={{ mb: 2 }}>Записатися повторно</StyledSessionTitle>

    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: 'visible',
        p: 2
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar
          src={session.specialist?.avatarUrl}
          sx={{ width: 160, height: 160, mr: 3 }}
        >
          {session.specialist?.user.name.charAt(0)}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <AvatarName sx={{ mb: 0.2 }}>
            {session.specialist?.user.name}
          </AvatarName>

          <Typography
            variant="body1"
            mb={0.5}
            sx={{
              color: [SESSION_STATUSES.CANCELLED, SESSION_STATUSES.CANCELLED_WITH_REFUND].includes(session.status)
                ? 'error.main'
                : '#AC98D1',
              mb: 1,
            }}
          >
            {[SESSION_STATUSES.CANCELLED, SESSION_STATUSES.CANCELLED_WITH_REFUND].includes(session.status) ? 'Скасований' : 'Завершений'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon
              fontSize="small"
              sx={{ color: '#AC98D1', mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {formatSessionDate(session.scheduledAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
        <Link
           to={`/specialists/${session.specialist?._id}` as '/specialists/$specialistId'}
          params={{ specialistId: session.specialistId }}
          style={{ alignSelf: "flex-end", width: "50%" }}
        >
          <ContainedButton sx={{ width: "100%" }}>Записатися повторно</ContainedButton>
        </Link>
    </Card>
  </Box>
)
