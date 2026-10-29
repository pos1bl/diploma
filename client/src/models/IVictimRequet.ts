export enum VICTIM_REQUEST_STATUS {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  VERIFIED = 'verified'
};

export enum VICTIM_REQUEST_TYPE {
  CIVILIAN = 'civilian',
  MILITARY = 'military',
  VETERAN = 'veteran'
};

export interface IVictimRequest {
  _id: string,
  user: string,
  type: VICTIM_REQUEST_TYPE;
  status: VICTIM_REQUEST_STATUS;
  description: string;
  fileUrl: string;
}
