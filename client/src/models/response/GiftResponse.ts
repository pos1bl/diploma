import { IGiftPayload } from "@models/IGift";

export interface GiftResponse {
  message: string;
  gift: IGiftPayload;
}
