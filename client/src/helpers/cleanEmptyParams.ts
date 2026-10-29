import { DEFAULT_PAGE_INDEX } from "@utils/Filters";

export default function cleanEmptyParams<T extends Record<string, unknown>>(search: T) {
  const newSearch = { ...search };

  Object.keys(newSearch).forEach((key) => {
    const value: any = newSearch[key];
    if (value === undefined || value === '' || (typeof value === 'number' && isNaN(value)) || (value instanceof Array && !value.length)) {
      delete newSearch[key];
    }
  });

  if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex;

  return newSearch;
}
