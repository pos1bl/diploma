import { ICourse } from "@models/ICourse";
import { IDiplom } from "@models/IDiplom";

export enum DIALOG_TYPE {
  DEFAULT = "",
  DIPLOM = "diplom",
  COURSE = "course"
};

export type DIALOG_SELECTED = IDiplom | ICourse | null; 

export const DIPLOM_FORM_FIELDS = [
  { label: "Назва", name: "title" },
  { label: "Спеціальність", name: "specialty" },
  { label: "Ступінь", name: "degree" },
  { label: "Рік", name: "year", type: "number" },
];

export const COURSE_FORM_FIELDS = [
  { label: "Назва", name: "title" },
  { label: "Організатор", name: "provider" },
  { label: "Кількість годин", name: "hours", type: "number" },
  { label: "Рік", name: "year", type: "number" },
];

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export type DiplomFormState = {
  title: string;
  specialty: string;
  degree: string;
  year: number;
  image: File | null;
};

export type CourseFormState = {
  title: string;
  provider: string;
  hours?: number;
  year: number;
  image: File | null;
};
