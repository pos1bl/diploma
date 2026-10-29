import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser.ts";
import AuthService from "../services/AuthService.ts";
import { AuthResponse } from "@models/response/AuthResponse.ts";
import router from "@utils/Route.ts";

export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    } finally {
      router.invalidate();
    }
  }

  registration = async (email: string, name: string, password: string) => {
    try {
      const response = await AuthService.registration(email, name, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    } finally {
      router.invalidate();
    }
  }

  logout = async() => {
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
      await AuthService.logout();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    } finally {
      router.invalidate();
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_BASE_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data?.message);
      } else {
        console.error('Unexpected error:', e);
      }
    } finally {
      this.setLoading(false);
    }
  }

  updateUserInfo = async () => {
    try {
      const response = await AuthService.refresh();
      this.setUser(response.data.user);
      return response.data.user;
    } catch (e) {
      console.error('❌ Не вдалося оновити інформацію про користувача');
    }
  };
}
