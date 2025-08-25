export interface IParcel {
  _id: string;
  parcelType: string;
  deliveryAddress: string;
  status: string;
  weight: number;
  deliveryDate: string; // ISO string from backend
  receiverInfo?: {
    _id: string;
    name: string;
  };
}