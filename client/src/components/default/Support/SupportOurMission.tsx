import { ContainedButton } from "@components/shared/ContainedButton";
import { StyledSubtitle } from "@components/styled/base";
import { StyledMissionImageBox, StyledMissionInfoBlock, StyledSupportMission } from "@components/styled/default/support";
import { Typography } from "@mui/material";

export const SupportOurMission = () => (
  <StyledSupportMission>
    <StyledMissionInfoBlock>
      <StyledSubtitle>Підтримайте нашу місію</StyledSubtitle>

      <Typography variant="body1" color="text.secondary">
        Ми створили «Точку опори», щоб допомогти тим, хто пережив війну,
        втрату, травму, тривогу або емоційне виснаження. Кожен внесок
        наближає нас до суспільства, в якому кожна людина отримує підтримку,
        на яку заслуговує.
      </Typography>

      <a href="https://donate.stripe.com/test_aFa00bh0o2kHa2f2SM6Na0C" target="_blank">
        <ContainedButton>
          Підтримати нашу місію
        </ContainedButton>
      </a>
    </StyledMissionInfoBlock>

    <StyledMissionImageBox>
      <img
        src="/images/support/otter-mission.png"
        alt="Support illustration"
        width="100%"
      />
    </StyledMissionImageBox>
  </StyledSupportMission>
);
