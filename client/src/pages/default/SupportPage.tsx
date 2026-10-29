import { EmergencyContacts } from "@components/default/Support/EmergencyContacts";
import { SelfHelpMethods } from "@components/default/Support/SelfHelpMethods";
import { SupportGlossary } from "@components/default/Support/SupportGlossary";
import { Hero } from "@components/default/Support/SupportHero";
import { Info } from "@components/default/Support/SupportInfo";
import { InspiringStories } from "@components/default/Support/SupportInspiringStories";
import { SupportOurMission } from "@components/default/Support/SupportOurMission";
import { StyledMain } from "@components/styled/base";
import { useRef } from "react";

export const SupportPage = () => {
  const supportRef = useRef<HTMLDivElement>(null);

  const handleScrollToSupport = () => {
    supportRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledMain>
      <Hero onScrollToSupport={handleScrollToSupport} />
      <Info />
      <EmergencyContacts />
      <SelfHelpMethods />
      <InspiringStories />
      <SupportOurMission />
      <SupportGlossary />
    </StyledMain>
  )
}
