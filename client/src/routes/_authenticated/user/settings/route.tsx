import { UserSettingsPage } from '@pages/user/SettingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/settings')({
  component: UserSettingsPage,
})
