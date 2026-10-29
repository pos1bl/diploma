import { AxiosResponse } from 'axios';
import $api from "../http";
import { Role } from '@models/IUser';
import { IFreeSessionPayload, IGiftSessionPayload, IMoveSessionPayload, ISession, ISessionPayload, SESSION_STATUSES } from '@models/ISession';
import { PaymentResponse } from '@models/response/PaymentResponse';
import { USER_PAGES } from '@utils/NavigationList';

export default class SessionsService {
  static async fetchSessions(role: Role, filters?: Record<string,string>): Promise<AxiosResponse<ISession[]>> {
    const prefix = role === Role.SPECIALIST ? 'specialist' : 'user';
    return $api.get<ISession[]>(`${prefix}/sessions`, { params: filters });
  }

  static async fetchSession(role: Role, id: string): Promise<ISession> {
    const prefix = role === Role.SPECIALIST ? 'specialist' : 'user';

   const { data } = await $api.get<ISession>(`${prefix}/sessions/${id}`);

   return data;
  }

  static async createSessionPaymentLink(payload: ISessionPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_payment_link/session', { payload, redirectLink: USER_PAGES.SUCCESS_PAYMENT })
  }

  static async createFreeSession(payload: IFreeSessionPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_session', { payload })
  }

  static async createGiftSession(payload: IGiftSessionPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_session', { payload })
  }

  static async refundSession(role: Role,id: string): Promise<void> {
    const prefix = role === Role.SPECIALIST ? 'specialist' : 'user';
    return $api.post(`${prefix}/refund/${id}`)
  }

  static async cancelSession(id: string): Promise<void> {
    return $api.post(`cancel/${id}`)
  }

  static async changeSessionStatus(id: string, status: SESSION_STATUSES): Promise<void> {
    return $api.post(`change_status/${id}`, { status })
  }

  static async moveSession(id: string, payload: IMoveSessionPayload): Promise<void> {
    return $api.post(`move/${id}`, { payload })
  }

  static async changeNotes(id: string, notes: string): Promise<void> {
    return $api.post(`change_notes/${id}`, { notes })
  }
}
