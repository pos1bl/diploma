import { AxiosResponse } from 'axios';
import { AuthResponse } from "@models/response/AuthResponse";
import $api from "../http";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('login', { email, password });
  }

  static async registration(email: string, name: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('registration', { email, name, password });
  }

  static async logout(): Promise<void> {
    return $api.post('logout');
  }

  static async resendActivation(email: string): Promise<void> {
    return $api.post('resend_activation', { email });
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get('refresh');
  }
}
