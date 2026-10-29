import { ClientsPage } from '@pages/specialist/ClientsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/clients/')({
  component: ClientsPage,
  loader: async ({ context, location }) => {
    const { fetchClientNames, fetchClients } = context.stores.clientsStore;
    const { search } = location;

    await fetchClients(search)  
    await fetchClientNames()
  },
})
