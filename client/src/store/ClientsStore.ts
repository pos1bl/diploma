import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Client } from "../models/IUser.ts";
import SpecialistService from "@services/SpecialistService.ts";

export default class ClientsStore {
  clients: Client[] = [];
  clientNames: string[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: Client[]) {
    this.clients = clients;
  }

  setClientNames(clientNames: string[]) {
    this.clientNames = clientNames;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  fetchClients = async(filters?: Record<string,string>) => {
    this.setLoading(true);
    try {
      const response = await SpecialistService.fetchClients(filters);
      this.setClients(response.data);
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

  fetchClientNames = async() => {
    this.setLoading(true);
    try {
      const response = await SpecialistService.fetchClientsNames();
      this.setClientNames(response.data);
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
