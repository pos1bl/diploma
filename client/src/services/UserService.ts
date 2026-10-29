import { AxiosResponse } from 'axios';
import $api from "../http";
import { IUser } from '@models/IUser';
import { IFetchSpecialistResponse, IFetchSpecialistsResponse } from '@models/response/SpecialistsResponse';
import { IVictimRequest } from '@models/IVictimRequet';
import { VictimFormValues } from '@utils/user/Victimrequest';
import { FormValues } from '@utils/default/Form';
import { ISpecialist } from '@models/ISpecialist';

export default class UserService {
  static async changeName(name: string): Promise<void> {
    return $api.post('change_name', { name });
  }

  static async changeEmail(email: string): Promise<void> {
    return $api.post('change_email', { email });
  }

  static async changePassword(curPass: string, newPass: string): Promise<void> {
    return $api.post('change_password', { curPass, newPass });
  }

  static async fetchSpecialists(filters: Record<string,string>): Promise<IFetchSpecialistsResponse> {
    const { data } = await $api.get<IFetchSpecialistsResponse>('specialists', { params: filters });
  
    return data;
  }

  static async fetchSpecialist(specialistId: string, userId: string): Promise<IFetchSpecialistResponse> {
    const { data } = await $api.get<IFetchSpecialistResponse>(`specialists/${specialistId}`, { params: { userId } });
  
    return data;
  }

  static async fetchVictimRequest(): Promise<IVictimRequest> {
   const { data } = await $api.get<IVictimRequest>(`user/victim-request`);

   return data;
  }

  static async sendVictimRequest(payload: VictimFormValues): Promise<void> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'file' && value instanceof File) {
        formData.append('file', value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    return $api.post(
      'send_victim_request',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  static async fetchFormSpecialists(vals: FormValues): Promise<ISpecialist[]> {
    const { data } = await $api.post<ISpecialist[]>('form', vals);

    return data;
  }
}
