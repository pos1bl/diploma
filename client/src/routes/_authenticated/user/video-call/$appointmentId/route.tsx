import { VideoPage } from '@pages/shared/VideoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/video-call/$appointmentId',
)({
  component: VideoPage,
})
