import { useContext } from "react";
import { StoresContext } from "../main";

export const useAuthStore = () => { return useContext(StoresContext).authStore };
export const useSessionStore = () => { return useContext(StoresContext).sessionStore };
export const useClientsStore = () => { return useContext(StoresContext).clientsStore };
