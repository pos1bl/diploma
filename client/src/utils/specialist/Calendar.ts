import { ISession, SESSION_STATUSES } from "@models/ISession";
import { IUnavaibility } from "@models/IUnavaibility";
import { Views } from "react-big-calendar";

export const VIEW_OPTIONS = [
  { id: Views.DAY, label: "День" },
  { id: Views.WEEK, label: "Тиждень" },
];

export const EVENT_STATUS_COLOR = {
  [SESSION_STATUSES.COMPLETED]: "#c7edca",
  [SESSION_STATUSES.SCHEDULED]: "#bee2fa",
  [SESSION_STATUSES.CANCELLED]: "#f8d7da",
  [SESSION_STATUSES.CANCELLED_WITH_REFUND]: "#f8d7da",
  [SESSION_STATUSES.NO_SHOW]: "#f8d7da",
}

export type EventItem = {
  start: Date;
  end: Date;
  data: { appointment?: ISession; blockout?: IUnavaibility };
  resourceId?: number;
};

export const dateWithoutTimezone = (date: Date) => {
  const withoutTimezone = new Date(date.valueOf()).toISOString().slice(0, -1);
  return withoutTimezone;
};
