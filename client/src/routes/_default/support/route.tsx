import { SupportPage } from '@pages/default/SupportPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/support')({
  component: SupportPage,
})
