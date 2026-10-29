import { StyledHero, StyledHeroInfoBlock, StyledImageBox } from "@components/styled/default/homepage";
import { StyledTitle } from "@components/styled/base";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGES } from "@utils/NavigationList";
import hero from "@images/homepage/hero.png"
import { ContainedButton } from "@components/shared/ContainedButton";

export const Hero = () => (
  <StyledHero>
    <StyledImageBox>
      <img width="100%" src={hero} alt="hero" />
    </StyledImageBox>
    <StyledHeroInfoBlock>
      <StyledTitle className="hero__title">
        Психологічна підтримка <span style={{color: "#8164B9"}}>поруч.</span>
      </StyledTitle>
      <p className="hero__subtitle" style={{ maxWidth: '750px' }}>
        Для кожного, хто шукає опору, турботу та шлях до себе. Безкоштовна підтримка для захисників та тих, кого торкнулась війна.
      </p>
      <Box display="flex" gap="20px">
        <Link to={DEFAULT_PAGES.FORM as "/"}>
          <ContainedButton>
            Знайти саме свого фахівця
          </ContainedButton>
        </Link>
        <Link to={DEFAULT_PAGES.SUPPORT as "/"}>
          <ContainedButton> 
            Безкоштовна підтримка для військових і постраждалих
          </ContainedButton>
        </Link>
      </Box>
    </StyledHeroInfoBlock>
  </StyledHero>
)