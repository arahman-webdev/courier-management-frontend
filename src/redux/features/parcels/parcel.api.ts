import { baseApi } from "../baseApi";



export interface IParcel {
  trackingId: string
  parcelType: string
  weight: number
  deliveryFee: number
  deliveryDate: string
  deliveryAddress: string
  senderInfo: string
  receiverInfo: string
  isConfirmed: boolean
  isCancelled: boolean
  isBlocked: boolean
  status: string
  _id: string
  statusLog: any[]
  createdAt: string
  updatedAt: string
}

interface parcelResponse {
  success: boolean
  message: string
}




export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // parcel
    createParcel: builder.mutation<parcelResponse, IParcel>({
      query: (userInfo) => ({
        url: "/parcels",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["PARCEL"], // so user data refreshes
    }),

  }),
})


export const {useCreateParcelMutation} = parcelApi