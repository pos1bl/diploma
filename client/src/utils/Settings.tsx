import { ReactElement } from "react"
import { NameChangeForm } from "@components/user/Settings/NameChangeForm";
import { NotificationSettings } from "@components/user/Settings/NotificationSettings";
import { EmailChangeForm } from "@components/shared/Settings/EmailChangeForm";
import { PassChangeForm } from "@components/shared/Settings/PassChangeForm";
import { BioChangeForm } from "@components/specialist/Settings/BioChangeForm";
import { MultiselectChangeForm } from "@components/specialist/Settings/MultiselectChangeForm";
import { ISSUES_LIST, SPECIAL_GROUPS_LIST, THERAPY_METHODS_LIST } from "./shared";
import { ScheduleChangeForm } from "@components/specialist/Settings/ScheduleChangeForm";

interface AccordionItem {
  id: number
  title: string
  render: () => ReactElement;
}

export type SettingProps = {
  settingsAccordions: AccordionItem[]
}

export enum MULTISELECT_INPUT_NAMES {
  METHODS = "methods",
  MAIN_AREAS = "mainAreas",
  SECONDARY_AREAS = "secondaryAreas",
  EXCLUDED_AREAS = "excludedAreas",
  SPECIAL_NEEDS = "specialNeeds"
}

export const MULTISELECT_LABELS = {
  [MULTISELECT_INPUT_NAMES.METHODS]: "Методи роботи",
  [MULTISELECT_INPUT_NAMES.MAIN_AREAS]: "Основні напрямки",
  [MULTISELECT_INPUT_NAMES.SECONDARY_AREAS]: "Також працюю з",
  [MULTISELECT_INPUT_NAMES.EXCLUDED_AREAS]: "З чим не працюю",
  [MULTISELECT_INPUT_NAMES.SPECIAL_NEEDS]: "Спеціальні потреби",
}

export type AvailableFormValues = {
  availability: {
    dayOfWeek: string;
    from: string;
    to: string;
  }[];
};

export const USER_SETTINGS_ACCORDIONS: AccordionItem[] = [
  {
    id: 0,
    title: "Змінити ім'я",
    render: () => <NameChangeForm />,
  },
  {
    id: 1,
    title: "Змінити email",
    render: () => <EmailChangeForm />,
  },
  {
    id: 2,
    title: "Змінити пароль",
    render: () => <PassChangeForm />,
  },
  {
    id: 3,
    title: "Сповіщення",
    render: () => <NotificationSettings />,
  },
];

export const SPECIALiST_SETTINGS_ACCORDIONS: AccordionItem[] = [
  {
    id: 0,
    title: "Змінити email",
    render: () => <EmailChangeForm />
  },
  {
    id: 1,
    title: "Змінити пароль",
    render: () => <PassChangeForm />,
  },
  {
    id: 2,
    title: 'Змінити "Біо"',
    render: () => <BioChangeForm />,
  },
  {
    id: 3,
    title: `Змінити "${MULTISELECT_LABELS[MULTISELECT_INPUT_NAMES.METHODS]}"`,
    render: () => <MultiselectChangeForm
      name={MULTISELECT_INPUT_NAMES.METHODS}
      isRequired={true}
      options={THERAPY_METHODS_LIST}
    />,
  },
  {
    id: 4,
    title: `Змінити "${MULTISELECT_LABELS[MULTISELECT_INPUT_NAMES.MAIN_AREAS]}"`,
    render: () => <MultiselectChangeForm
      name={MULTISELECT_INPUT_NAMES.MAIN_AREAS}
      isRequired={true}
      unavailableKeys={[MULTISELECT_INPUT_NAMES.SECONDARY_AREAS, MULTISELECT_INPUT_NAMES.EXCLUDED_AREAS]}
      options={ISSUES_LIST}
    />,
  },
  {
    id: 5,
    title: `Змінити "${MULTISELECT_LABELS[MULTISELECT_INPUT_NAMES.SECONDARY_AREAS]}"`,
    render: () => <MultiselectChangeForm
      name={MULTISELECT_INPUT_NAMES.SECONDARY_AREAS}
      unavailableKeys={[MULTISELECT_INPUT_NAMES.MAIN_AREAS, MULTISELECT_INPUT_NAMES.EXCLUDED_AREAS]}
      options={ISSUES_LIST}
    />,
  },
  {
    id: 6,
    title: `Змінити "${MULTISELECT_LABELS[MULTISELECT_INPUT_NAMES.EXCLUDED_AREAS]}"`,
    render: () => <MultiselectChangeForm
      name={MULTISELECT_INPUT_NAMES.EXCLUDED_AREAS}
      unavailableKeys={[MULTISELECT_INPUT_NAMES.SECONDARY_AREAS, MULTISELECT_INPUT_NAMES.MAIN_AREAS, MULTISELECT_INPUT_NAMES.SPECIAL_NEEDS]}
      options={ISSUES_LIST}
    />,
  },
  {
    id: 7,
    title: `Змінити "${MULTISELECT_LABELS[MULTISELECT_INPUT_NAMES.SPECIAL_NEEDS]}"`,
    render: () => <MultiselectChangeForm
      name={MULTISELECT_INPUT_NAMES.SPECIAL_NEEDS}
      unavailableKeys={[MULTISELECT_INPUT_NAMES.EXCLUDED_AREAS]}
      options={SPECIAL_GROUPS_LIST}
    />,
  },
  {
    id: 8,
    title: `Змінити "Розклад"`,
    render: () => <ScheduleChangeForm />,
  },
];
