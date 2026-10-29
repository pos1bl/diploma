import { StyledTitle } from "@components/styled/base";
import { ContainedButton } from "@components/shared/ContainedButton";
import { StyledHero, StyledHeroImageBox, StyledInfoBlock } from "@components/styled/default/career";
import { SectionProps } from "@utils/default/Careerpage";
import { FC } from "react";

export const Hero:FC<SectionProps> = ({ onScrollToForm }) => (
  <StyledHero>
    <StyledInfoBlock>
      <StyledTitle>
        Ми шукаємо тих,
        <br />
        хто хоче змінювати життя.
      </StyledTitle>
      <p>Наша команда об’єднує фахівців, які щодня підтримують людей, постраждалих від війни, та тих, хто шукає психічну рівновагу. Приєднуйся до нас!</p>
      <ContainedButton onClick={onScrollToForm}>
        Приєднатися до нас!
      </ContainedButton>
    </StyledInfoBlock>
    <StyledHeroImageBox>
      <img width="100%" src="/images/career/hero.png" alt="specialists" />
    </StyledHeroImageBox>
  </StyledHero>
)