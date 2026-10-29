import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Role } from "../models/IUser.ts";
import SessionsService from "@services/SessionsService.ts";
import { ISession } from "@models/ISession.ts";

export default class SessionStore {
  sessions: ISession[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSessions(sessions: ISession[]) {
    this.sessions = sessions;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  fetchSessions = async(role: Role, filters?: Record<string,any>) => {
    this.setLoading(true);
    try {
      const response = await SessionsService.fetchSessions(role, filters);
      this.setSessions(response.data);
      return response.data;
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
}
