import { ISSUES_LIST, SPECIAL_GROUPS_LIST, THERAPY_METHODS_LIST } from "@utils/shared";
import { IUser } from "./IUser";

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export enum Gender {
  ANY = 'any',
  MALE = 'male',
  FEMALE = 'female'
}

export interface AvailabilitySlot {
  dayOfWeek: DayOfWeek;
  from: string;
  to: string;
}

export interface ISpecialist {
  _id: string,
  dateOfBirth: string;
  gender: Gender;
  bio: string;
  dateOfStart: string;
  mainAreas: string[];
  secondaryAreas: string[];
  excludedAreas: string[];
  methods: string[];
  specialNeeds: string[];
  availability: AvailabilitySlot[];
  avatarUrl: string;

  user?: IUser;
  isFired: boolean;
}

export type ISpecialistCard = Omit<ISpecialist, "isFired">;

export const AGE_GROUPS = ['30-', '30-40', '40+'];
export const FILTER_MULTISELECT_LIST = [
  {
    key: "areas",
    options: ISSUES_LIST,
    label: "Про що хочете поспілкуватись?"
  },
  {
    key: "methods",
    options: THERAPY_METHODS_LIST,
    label: "Які методи вам цікаві?"
  },
  {
    key: "specialNeeds",
    options: SPECIAL_GROUPS_LIST,
    label: "Спеціальні потреби"
  },
];

export const GENDER_LIST = [
  {
    key: Gender.MALE,
    label: "Чоловік"
  },
  {
    key: Gender.FEMALE,
    label: "Жінка"
  },
];
