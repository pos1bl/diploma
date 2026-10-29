import { AxiosResponse } from 'axios';
import { PaymentResponse } from "@models/response/PaymentResponse";
import $api from "../http";
import { IGift, IGiftPayload } from '@models/IGift';
import { DEFAULT_PAGES } from '@utils/NavigationList';

export default class GiftService {
  static async createGiftPaymentLink(payload: IGiftPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_payment_link/gift', { payload, redirectLink: DEFAULT_PAGES.GIFTS_SUCCESS_PAYMENT })
  }

  static async fetchGift(code: string): Promise<IGift> {
    const { data } = await $api.get<IGift>('gift', { params: { code } });
    
    return data;
  }
}
