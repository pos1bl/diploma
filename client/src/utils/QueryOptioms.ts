import { Role } from "@models/IUser";
import SessionsService from "@services/SessionsService";
import SpecialistService from "@services/SpecialistService";
import UserService from "@services/UserService";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const specialistsQueryOptions = (filters: any) => {
  return queryOptions({
    queryKey: ['specialists', filters],
    queryFn: () => UserService.fetchSpecialists(filters),
    placeholderData: keepPreviousData
  });
};

export const specialistQueryOptions = (id: string, userId: string) => {
  return queryOptions({
    queryKey: ['specialist', id, userId],
    queryFn: () => UserService.fetchSpecialist(id, userId),
    placeholderData: keepPreviousData
  });
};

export const sessionQueryOptions = (role: Role, id: string) => {
  return queryOptions({
    queryKey: ['session', role, id],
    queryFn: () => SessionsService.fetchSession(role, id),
    placeholderData: keepPreviousData
  });
};

export const victimRequestQueryOptions = () => {
  return queryOptions({
    queryKey: ['victim-request'],
    queryFn: () => UserService.fetchVictimRequest(),
    placeholderData: keepPreviousData
  });
};

export const userInfoQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['clients', id],
    queryFn: () => SpecialistService.fetchUserInfo(id),
    placeholderData: keepPreviousData
  });
};

export const educationDataQueryOptions = () => {
  return queryOptions({
    queryKey: ['education'],
    queryFn: () => SpecialistService.fetchEducation(),
    placeholderData: keepPreviousData
  })
}

export const specialistOwnInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['specialist'],
    queryFn: () => SpecialistService.fetchSpecialist(),
    placeholderData: keepPreviousData
  });
};

export const unavailabilitiesQueryOptions = (filters? : Record<string,any>) => {
  return queryOptions({
    queryKey: ['unavailabilities', filters],
    queryFn: () => SpecialistService.fetchUnavailabilities(filters),
    placeholderData: keepPreviousData
  });
};
