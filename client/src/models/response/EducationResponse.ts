import { ICourse } from "@models/ICourse";
import { IDiplom } from "@models/IDiplom";

export interface EducationResponse {
  diploms: IDiplom[];
  courses: ICourse[];
}
