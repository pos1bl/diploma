import SectionWrapper from "@components/user/Victim/SectionWrapper";
import { VICTIM_REQUEST_TYPE } from "@models/IVictimRequet";

export const VerifiedSection = () => (
  <SectionWrapper
    imgPath="/images/victim-request/otter-verified.png"
    title="Ви вже верифіковані"
    description="Дякуємо! Ваш статус підтверджено, і ви маєте доступ до безкоштовної допомоги."
  />
);

export const PendingSection= () => (
  <SectionWrapper
    imgPath="/images/victim-request/otter-pending.png"
    title="Статус: Очікується підтвердження"
    description="Ваша заявка на верифікацію подана та перебуває на розгляді. Ми зв’яжемося з вами найближчим часом."
  />
);

export const CancelledSection = () => (
  <SectionWrapper
    imgPath="/images/victim-request/otter-cancelled.png"
    title="Заявку відхилено"
    description="На жаль, ваша заявка була відхилена."
  />
);

export type VictimFormValues = {
  file: File | null;
  type: string;
  description: string;
};

export const VICTIM_REQUEST_TYPE_LIST = [
  {
    option: "Цивільний",
    value: VICTIM_REQUEST_TYPE.CIVILIAN
  },
  {
    option: "Військовий",
    value: VICTIM_REQUEST_TYPE.MILITARY
  },
  {
    option: "Ветеран",
    value: VICTIM_REQUEST_TYPE.VETERAN
  },
]
