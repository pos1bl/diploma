import { VerifyVictimPage } from '@pages/user/VerifyVictimPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/verify-victim')({
  component: VerifyVictimPage,
});
