import { VictimPage } from '@pages/admin/VictimPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/verify-victim')({
  component: VictimPage,
})
