import { baseApi } from "../baseApi";



export interface IParcel {
  parcelType: string;
  weight: number;
  deliveryFee: number;
  deliveryAddress: string;
  deliveryDate: Date;
  senderInfo: string;
  receiverInfo: string;
}

interface parcelResponse {
  success: boolean
  message: string
}




export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // parcel
    createParcel: builder.mutation<parcelResponse, IParcel>({
      query: (parcelInfo) => ({
        url: "/parcel",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"], // so user data refreshes
    }),

  }),
})


export const {useCreateParcelMutation} = parcelApi