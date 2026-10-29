import { ContainedButton } from "@components/shared/ContainedButton"
import { ActionBar } from "@components/styled/base"
import useFilters from "@hooks/useFilters";
import { useState } from "react";
import { ControlPanel } from "@components/user/Appointments/ControlPanel";

export const AppointmentsActionBar = () => {
  const { filters } = useFilters('/_authenticated/user/appointments');
  const [showFilters, setShowFilters] = useState<boolean>(!!Object.keys(filters).length);

  return (
    <ActionBar sx={{ flexDirection: "row", justifyContent: "start", padding: "10px 35px", alignItems: "start" }}>
      <ContainedButton sx={{ textWrap: "nowrap" }} onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Сховати" : "Показати"} фільтри
      </ContainedButton>
      {showFilters && <ControlPanel />}
    </ActionBar>
  )
}
