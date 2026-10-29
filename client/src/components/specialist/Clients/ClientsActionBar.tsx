import { ContainedButton } from "@components/shared/ContainedButton"
import { ActionBar } from "@components/styled/base"
import useFilters from "@hooks/useFilters";
import { useState } from "react";
import { ClientsControlPanel } from "./ClientsControlPanel";

export const ClientsActionBar = () => {
  const { filters } = useFilters('/_authenticated/specialist/clients');
  const [showFilters, setShowFilters] = useState<boolean>(!!Object.keys(filters).length);

  return (
    <ActionBar sx={{ flexDirection: "row", justifyContent: "start", padding: "10px 35px", alignItems: "start" }}>
      <ContainedButton sx={{ textWrap: "nowrap" }} onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Сховати" : "Показати"} фільтри
      </ContainedButton>
      {showFilters && <ClientsControlPanel />}
    </ActionBar>
  )
}
