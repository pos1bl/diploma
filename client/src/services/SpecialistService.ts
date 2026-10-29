import { AxiosResponse } from 'axios';
import $api from "../http";
import { Client, IUser } from '@models/IUser';
import { EducationResponse } from '@models/response/EducationResponse';
import { CourseFormState, DiplomFormState } from '@utils/specialist/Education';
import { AvailabilitySlot, ISpecialist } from '@models/ISpecialist';
import { MULTISELECT_INPUT_NAMES } from '@utils/Settings';
import { UnavailabilityFormValues } from '@utils/specialist/Unavailability';
import { IUnavaibility } from '@models/IUnavaibility';


export default class SpecialistService {
  static async fetchClients(filters?: Record<string,string>): Promise<AxiosResponse<Client[]>> {
    return $api.get<Client[]>('clients', { params: filters });
  }

  static async fetchUserInfo(clientId: string): Promise<IUser> {
    const { data } = await $api.get<IUser>(`clients/${clientId}`);

    return data;
  }

  static async fetchSpecialist(): Promise<ISpecialist> {
    const { data } = await $api.get<ISpecialist>('specialist');

    return data;
  }

  static async fetchClientsNames(): Promise<AxiosResponse<string[]>> {
    return $api.get<string[]>('clients/names');
  }

  static async fetchUnavailabilities(filters?: Record<string,any>): Promise<IUnavaibility[]> {
    const { data } = await $api.get<IUnavaibility[]>('unavailabilities', { params: filters });

    return data;
  }

  static async fetchEducation(): Promise<EducationResponse> {
    const { data } = await $api.get<EducationResponse>('education');

    return data;
  }

  static async addDiplom(payload: DiplomFormState): Promise<void> {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else {
        formData.append(key, String(value));
      }
    });

    return $api.post(
      'add_diplom',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  static async addCourse(payload: CourseFormState): Promise<void> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else {
        formData.append(key, String(value));
      }
    });

    return $api.post(
      'add_course',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  static async changeBio(bio: string): Promise<void> {
    return $api.post('change_bio', { bio });
  }

  static async changeMultiselect(name: MULTISELECT_INPUT_NAMES, value: string[]): Promise<void> {
    return $api.post('change_multiselect', { name, value });
  }

  static async changeSchedule(schedule: AvailabilitySlot[]) {
    return $api.post('change_schedule', { schedule });
  }

  static async addUnavailability(payload: UnavailabilityFormValues) {
    return $api.post('add_unavailability', payload);
  }
}
