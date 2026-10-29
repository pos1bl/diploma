import { Loader } from "@components/shared/Loader";
import { ActionBar } from "@components/styled/base";
import { useQuery } from "@tanstack/react-query";
import { unavailabilitiesQueryOptions } from "@utils/QueryOptioms";
import dayjs from "dayjs";
import { useState } from "react";
import { UnavailabilityControlPanel } from "./UnavailabilityControlPanel";
import { UnavailabilityList } from "./UnavailabilityList";

export const UnavailabilityMain = () => {
  const [filters, setFilters] = useState<Record<string,any>>({ startDate: dayjs().startOf("month"), endDate: dayjs().endOf("month") });
  const { data, isLoading } = useQuery(unavailabilitiesQueryOptions(filters));

  if (isLoading || !data) {
    return <Loader />
  }
  
  return (
    <>
      <ActionBar sx={{ flexDirection: "row", justifyContent: "start", padding: "10px 35px", alignItems: "start" }}>
        <UnavailabilityControlPanel filters={filters} setFilters={setFilters} />
      </ActionBar>
      <UnavailabilityList unavailabilities={data} />
    </>
  )
}