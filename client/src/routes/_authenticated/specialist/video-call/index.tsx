import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/video-call/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/specialist/video-call/"!</div>
}
