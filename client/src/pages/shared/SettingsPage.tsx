import { Box } from '@mui/material'
import { StyledTitle } from '@components/styled/base'
import { SettingsAccordions } from '@components/specialist/Settings/SettingsAccordions'
import { SettingProps } from '@utils/Settings'
import { FC } from 'react'

export const SettingsPage:FC<SettingProps> = ({ settingsAccordions }) => (
  <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
    <StyledTitle sx={{ mb: 4, color: '#AC98D1', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: "center" }}>
      Налаштування
    </StyledTitle>
    <SettingsAccordions settingsAccordions={settingsAccordions} />
  </Box>
)
