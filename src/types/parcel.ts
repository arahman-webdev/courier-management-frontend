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
  senderInfo?: {
    _id: string;
    name: string;
  };
}


export type ParcelQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  isBlocked?: string;
};

// export type ParcelQueryParams = {
//   parcelType?: string;
//   deliveryDate?: string; // YYYY-MM-DD
//   page?: number;
//   limit?: number;
// };

 type Parcel = {
  _id: string;
  trackingId: string;
  parcelType: string;
  status: string;
  isBlocked: boolean;
  createdAt: string;
};

export type ParcelResponse = {
  data: Parcel[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
