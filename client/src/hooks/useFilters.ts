import cleanEmptyParams from '@helpers/cleanEmptyParams';
import { getRouteApi, useNavigate } from '@tanstack/react-router';

//@ts-expect-error type
export default function useFilters(routeId) {
  const navigate = useNavigate();
  const routeApi = getRouteApi(routeId);
  const filters = routeApi.useSearch();

  const setFilters = (partialFilters: Partial<typeof filters>) =>
    navigate({
      //@ts-expect-error type
      search: (prev) => cleanEmptyParams({ ...prev, ...partialFilters })
    });

  //@ts-expect-error type
  const resetFilters = () => {navigate({ search: {}, replace: true })};

  return { filters, setFilters, resetFilters };
}
