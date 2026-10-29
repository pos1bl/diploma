import { Hero } from "@components/default/Homepage/Hero";
import { StyledMain } from "@components/styled/base";
import { About } from "@components/default/Homepage/About";
import { HowItWorks } from "@components/default/Homepage/HowItWorks";
import { FreeHelp } from "@components/default/Homepage/FreeHelp";
import { PsychologistShowcase } from "@components/default/Homepage/PsychologistShowcase";
import { FAQ } from "@components/default/Homepage/FAQ";

export const HomePage = () => (
  <StyledMain>
    <Hero />
    <About/>
    <HowItWorks />
    <FreeHelp />
    <PsychologistShowcase />
    <FAQ />
  </StyledMain>
);
