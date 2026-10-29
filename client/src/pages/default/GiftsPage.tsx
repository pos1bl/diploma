import {CertificateHelps} from "@components/default/Gifts/GiftCertificateHelps";
import { Info } from "@components/default/Gifts/GiftInfo";
import { FAQ } from "@components/default/Gifts/GiftsFaq";
import { Steps } from "@components/default/Gifts/GiftSteps";
import { Hero } from "@components/default/Gifts/GiftsHero";
import { StyledMain } from "@components/styled/base";
import { useEffect, useRef } from "react";
import { Flow } from "@components/default/Gifts/GiftFlow";

export const GiftsPage = () => {
  const giftOptionsRef = useRef<HTMLDivElement>(null);

  const handleScrollToOptions = () => {
    giftOptionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('afterLoginScrollTo');
    if (scrollTarget === 'gift-options') {
      sessionStorage.removeItem('afterLoginScrollTo');
      setTimeout(() => {
        giftOptionsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <StyledMain>
      <Hero onScrollToOptions={handleScrollToOptions} />
      <Steps onScrollToOptions={handleScrollToOptions} />
      <Flow ref={giftOptionsRef} />
      <Info />
      <CertificateHelps onScrollToOptions={handleScrollToOptions}/>
      <FAQ />
    </StyledMain>
  )
}
