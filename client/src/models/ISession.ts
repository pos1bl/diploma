import { Dayjs } from "dayjs";
import { ISpecialist } from "./ISpecialist";
import { IUser } from "./IUser";
import { IGift } from "./IGift";

export enum SESSION_STATUSES {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  CANCELLED_WITH_REFUND = 'cancelled with refund',
  NO_SHOW = 'no-show',
}

export enum SESSION_TYPES {
  FREE = 'free',
  GIFT = 'gift',
  PAID = 'paid',
}

export interface ISession {
  _id: string;
  status: SESSION_STATUSES;
  notes: string;
  type: SESSION_TYPES;
  scheduledAt: string;
  specialistId: string;
  userId: string;
  isMoved: boolean;
  specialist?: ISpecialist & { user: Pick<IUser, 'name'> };
  user: string | Pick<IUser, "name">;
  gift?: IGift;
}

export interface ISessionPayload {
  selectedDate: Dayjs;
  selectedSlot: string;
  priceId: string;
  specialistId: string;
}

export type IFreeSessionPayload = Omit<ISessionPayload, "priceId">
export type IGiftSessionPayload = Omit<ISessionPayload, "priceId"> & { giftId: string }
export type IMoveSessionPayload = Pick<ISessionPayload, "selectedDate" | "selectedSlot">
