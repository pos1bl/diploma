import { ISpecialist } from "./ISpecialist";

export interface IDiplom {
  _id: string;
  specialist: ISpecialist;
  title: string;
  institution: string;
  specialty?: string,
  degree: string,
  year?: number,
  imageUrl: string,
}
