import { StyledHero, StyledHeroInfoBlock, StyledHeroImageBox } from "@components/styled/default/gifts";
import { StyledTitle } from "@components/styled/base";
import { ContainedButton } from "@components/shared/ContainedButton";
import { FC } from "react";
import { SectionProps } from "@utils/default/Giftspage";
import { Box } from "@mui/material";

export const Hero:FC<SectionProps> = ({ onScrollToOptions }) => (
  <StyledHero>
    <StyledHeroInfoBlock>
      <StyledTitle>
        Подаруй підтримку — зміни чиєсь життя
      </StyledTitle>
      <p>Замість матеріального подарунка — допомога тим, хто цього найбільше потребує</p>
      <Box>
        <ContainedButton onClick={onScrollToOptions}>
          Подарувати сертифікат
        </ContainedButton>
      </Box>
    </StyledHeroInfoBlock>
    <StyledHeroImageBox>
      <img width="100%" src="/images/gifts/otter-gift.png" alt="otter with gift" />
    </StyledHeroImageBox>
  </StyledHero>
)