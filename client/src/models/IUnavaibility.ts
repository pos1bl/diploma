import { ISpecialist } from "./ISpecialist";
import { IUser } from "./IUser";

export enum UNAVAIBILITY_TYPES {
  VACATION = 'vacation',
  DAYOFF = 'dayOff',
  SICK = 'sick',
  OTHER = 'other',
}

export const UNAVAIBILITIES_NAMES = {
  [UNAVAIBILITY_TYPES.VACATION]: 'Відпустка',
  [UNAVAIBILITY_TYPES.DAYOFF]: 'Вихідні',
  [UNAVAIBILITY_TYPES.SICK]: 'Лікарняний',
  [UNAVAIBILITY_TYPES.OTHER]: 'Інше',
}

export type UnavType = keyof typeof UNAVAIBILITIES_NAMES;

export interface IUnavaibility {
  _id: string;
  specialist: ISpecialist & { user: IUser };
  type: UNAVAIBILITY_TYPES;
  note: string;
  start: string;
  end: string;
}
