import { StyledTitle } from "@components/styled/base";
import { ContainedButton } from "@components/shared/ContainedButton";
import { FC } from "react";
import { StyledHero, StyledHeroImageBox, StyledHeroInfoBlock } from "@components/styled/default/support";
import { Typography } from "@mui/material";
import { SectionProps } from "@utils/default/Supportpage";

export const Hero:FC<SectionProps> = ({ onScrollToSupport }) => (
  <StyledHero>
    <StyledHeroInfoBlock>
      <StyledTitle>
        Точка опори:
        <br />
        місце, де починається шлях до зцілення
      </StyledTitle>
      <Typography variant="h6" color="text.secondary" style={{ fontStyle: 'italic' }}>Ми поруч, щоб допомогти вам знайти спокій і силу навіть у найтемніші часи.</Typography>
      <ContainedButton sx={{ width: 'fit-content' }} onClick={onScrollToSupport}>
        Отримати допомогу!
      </ContainedButton>
    </StyledHeroInfoBlock>
    <StyledHeroImageBox>
      <img width="100%" src="/images/support/hero.png" alt="support" />
    </StyledHeroImageBox>
  </StyledHero>
)