import useFilters from "@hooks/useFilters";
import { Box, Grid, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@utils/Filters";
import { specialistsQueryOptions } from "@utils/QueryOptioms";
import { SpecialistCard } from "./SpecialistCard";
import { StyledSubtitle } from "@components/styled/base";
import { Loader } from "@components/shared/Loader";

export const SpecialistsMain = () => {
  const { filters, setFilters } = useFilters('/_default/specialists');
  const pageIndex = filters.pageIndex ?? DEFAULT_PAGE_INDEX;
  
  const { data, isLoading } = useQuery(specialistsQueryOptions(filters));
  const { specialists = [], totalCount = 0 } = data ?? {};
  const count = Math.ceil(totalCount / DEFAULT_PAGE_SIZE);

  const handlePageChange = (value: number) => {
    return setFilters({ pageIndex: value - 1 });
  }

  if (isLoading) {
    return <Loader />
  }

  if (!specialists.length) {
    return (
      <Box textAlign="center" p={4}>
        <StyledSubtitle>
          На жаль, жоден з наших фахівціів не відповідає обраним запитам
        </StyledSubtitle>
      </Box>
    );
  }
 
  return (
    <Grid container spacing={2}>
      <Grid>
        <Grid container spacing={2}>
          {specialists.map(s => (
            <Box key={s._id}>
              <SpecialistCard specialist={s}/>
            </Box>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={count}
            page={pageIndex + 1}
            onChange={(_, v: number) => handlePageChange(v)}
            sx={{ color: "#AC98D1" }}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      </Grid>
    </Grid>
  )
};
