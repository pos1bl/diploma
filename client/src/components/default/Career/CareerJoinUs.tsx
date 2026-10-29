import { ContainedButton } from "@components/shared/ContainedButton";
import { StyledSubtitle } from "@components/styled/base";
import { StyledJoinUsImageBox, StyledJoinUs, StyledInfoBlock } from "@components/styled/default/career";
import { SectionProps } from "@utils/default/Careerpage";
import { FC } from "react";

export const JoinUs:FC<SectionProps> = ({ onScrollToForm }) => {
  return (
    <StyledJoinUs>
      <StyledInfoBlock>
        <StyledSubtitle>
          Приєднуйтеся до нас!
        </StyledSubtitle>
        <ContainedButton sx={{ width: 'fit-content' }} onClick={onScrollToForm}>Приєднатися до нас</ContainedButton>
      </StyledInfoBlock>

      <StyledJoinUsImageBox>
        <img width="100%" src="/images/career/join-us.png" alt="join us" />
      </StyledJoinUsImageBox>
    </StyledJoinUs>
  );
};
