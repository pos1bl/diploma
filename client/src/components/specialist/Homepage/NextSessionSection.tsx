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
import { ISession } from '@models/ISession'
import { AvatarName, StyledSessionTitle } from '@components/styled/user/home'
import { ContainedButton } from '@components/shared/ContainedButton'
import { formatSessionDate } from '@utils/user/Homepage'
import { IUser } from '@models/IUser'

interface Props {
  session: ISession
}

export const NextSessionSection: React.FC<Props> = ({ session }) => {
  const { name } = session.user as Pick<IUser, "name">
  return (
    <Box sx={{ mb: 4 }}>
      <StyledSessionTitle sx={{ mb: 2 }}>Найближчий сеанс:</StyledSessionTitle>

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
            sx={{ width: 160, height: 160, mr: 3, fontSize: '4rem', }}
          >
            {name.charAt(0)}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <AvatarName sx={{ mb: 0.2 }}>
              {name}
            </AvatarName>

            <Typography
              variant="body1"
              color='success.main'
              mb={0.5}
            >
              Заплановано
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
          to={`/specialist/appointment/${session._id}` as '/specialist/appointment/$appointmentId'}
          params={{ appointmentId: session._id }}
          style={{ alignSelf: "flex-end", width: "50%" }}
        >
          <ContainedButton sx={{ width: "100%" }}>Деталі</ContainedButton>
        </Link>
      </Card>
    </Box>
  )
}
