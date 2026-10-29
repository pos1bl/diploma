import { ICourse } from "@models/ICourse";
import { IDiplom } from "@models/IDiplom";
import { ISpecialist } from "@models/ISpecialist";
import { IUser } from "@models/IUser";
import { Dayjs } from "dayjs";


export interface IFetchSpecialistsResponse {
  specialists: Omit<ISpecialist, "isFired">[];
  totalCount: number;
}

export type Availability = {
  date: string,
  timeSlots: string[]
}

export type AvailabilityFormatted = {
  date: Dayjs,
  timeSlots: string[]
} 

type SpecialistAditionalsFields = {
  diploms: IDiplom[],
  courses: ICourse[],
  availabilities: Availability[],
}

export type IFetchSpecialistResponse = Omit<ISpecialist, "specialNeeds" | "availability" | "user"> & Pick<IUser, "name"> & SpecialistAditionalsFields;
