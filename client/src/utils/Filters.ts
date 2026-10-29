import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('uk');

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_DATE = null;
export const DEFAULT_START_DATE = dayjs.utc().startOf("month");
export const DEFAULT_END_DATE = dayjs.utc().endOf("month");
export const DEFAULT_INPUT = "";
export const DEFAULT_SELECT = [];
