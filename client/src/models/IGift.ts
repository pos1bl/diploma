export interface IGiftPayload {
  to: string;
  from: string;
  email: string;
  priceId: string;
  amount: number;
  expirationDate: string;
  userId: string;
}

export interface IGift {
  _id: string,
  user: string,
  to: string;
  from: string;
  expirationDate: string;
  code: string;
  amount: number;
}
