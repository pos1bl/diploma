import { ISpecialist } from "./ISpecialist";

export interface ICourse {
  _id: string;
  specialist: ISpecialist;
  title: string;
  provider: string;
  hours?: string,
  year?: number,
  imageUrl: string,
}