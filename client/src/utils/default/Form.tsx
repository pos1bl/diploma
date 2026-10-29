import { Gender } from "@models/ISpecialist";
import { SPECIAL_GROUPS_LIST, THERAPY_METHODS_LIST } from "@utils/shared";

export const TARGET_ISSUE = [
  {
    value: "coping_with_anxiety",
    label: "Подолання тривоги"
  },
  {
    value: "build_healthy_relationships",
    label: "Побудувати здорові стосунки"
  },
  {
    value: "build_career",
    label: "Побудувати блискучу кар'єру"
  },
  {
    value: "improve_quality_life",
    label: "Покращити якість життя"
  },
  {
    value: "other",
    label: "Інше"
  },
];

export const SPECIAL_NEEDS = SPECIAL_GROUPS_LIST.filter(row => row !== "Чи тебе турбують суїцидальні думки?");
export const METHODS = ["Ні, допоможіть мені обрати метод", ...THERAPY_METHODS_LIST];

export const GENDER_LIST = [
  {
    value: Gender.ANY,
    label: "Без різниці"
  },
  {
    value: Gender.MALE,
    label: "З чоловіком"
  },
  {
    value: Gender.FEMALE,
    label: "З жінкою"
  },
];

export const IS_SUICIDIAL = [
  {
    value: false,
    label: "Ні"
  },
  {
    value: true,
    label: "Так"
  },
];

export type FormValues = {
  target: string[],
  gender: Gender,
  age: string[],
  specialNeeds: string[],
  method: string,
  is_suicidial: boolean,
  issues: Record<string, number>,
}

export type HandleToggle = (key: keyof Pick<FormValues, "age" | "target" | "specialNeeds">, value: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleGenderSelect = (e: React.ChangeEvent<HTMLInputElement>, value: string) => void
export type HandleSuicideSelect = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => void
export type HandleSelect = (key: keyof Pick<FormValues, "method">, value: string) => void
export type HandleSlider = (issue: string, value: number) => void;

export type CheckboxStepProps = {
  values: FormValues,
  handleToggle: HandleToggle;
  label: string,
}

export type SecondStepProps = {
  values: FormValues,
  handleToggle: HandleToggle;
  handleSelect: HandleGenderSelect;
}

export type RadioStepProps = {
  values: FormValues,
  label: string,
  handleSelect: HandleSelect;
}

export type FifthStepProps = {
  values: FormValues,
  label: string,
  handleSelect: HandleSuicideSelect;
}

export type IssuesStepProps = {
  values: FormValues,
  label: string,
  handleSlider: HandleSlider;
}

export const steps = [
  'Визначіть свою мету',
  'Визначіть вік і стать фахівця',
  'Чи потрібен тобі фахівець, який працює в цих напрямках?',
  'Чи у тебе є побажання щодо методу, який буде використовувати психотерапевт?',
  'Чи турбують тебе суїцидальні думки?',
  'Будь ласка, заповни шкалу в залежності від твоїх запитів',
  'Підготовка результатів',
]
