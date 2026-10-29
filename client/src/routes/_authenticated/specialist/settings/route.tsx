import { SpecialistSettingsPage } from '@pages/specialist/SettingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/settings')({
  component: SpecialistSettingsPage,
})
