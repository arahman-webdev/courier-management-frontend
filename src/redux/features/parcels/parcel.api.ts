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
      invalidatesTags: ["PARCEL"], 
    }),

    // cancel parcel ---------
    cancelParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"], 
    }),

    // cancel parcel ---------
    confirmlParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"], 
    }),


    // get all parcells ------------

    getAllParcels: builder.query({
      query: ()=>({
        url: "/parcel",
        method: "GET",
      }),
      providesTags: ["PARCEL"]
    }),
    
    getParcelMe: builder.query({
      query: ()=>({
        url: "/parcel/me",
        method: "GET",
      }),
      
      providesTags: ["PARCEL"]
    })
  }),
})


export const {useCreateParcelMutation, useGetParcelMeQuery, useCancelParcelMutation, useConfirmlParcelMutation} = parcelApi