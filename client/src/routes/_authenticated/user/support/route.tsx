import { SupportPage } from '@pages/user/SupportPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/support')({
  component: SupportPage,
});
