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
    // Queries
    // --------------------------------------------------

    // ✅ Get all parcels
    getAllParcels: builder.query<any, Record<string, string> | void>({
      query: (query) => {
        const params = new URLSearchParams(query || {}).toString();
        return {
          url: `/parcel?${params}`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),

    // Get a user's parcels
    getParcelMe: builder.query({
      query: () => ({
        url: "/parcel/me",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    // Get a  parcel using id
    getParcelById: builder.query({
      query: (parcelId: string) => ({
        url: `parcel/${parcelId}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    // Get a  parcel using tracking id
    getParcelByTrackingId: builder.query({
      query: (trackingId: string) => ({
        url: `parcel/tracking/${trackingId}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    // Mutations
    // --------------------------------------------------

    // Create a new parcel
    createParcel: builder.mutation<parcelResponse, IParcel>({
      query: (parcelInfo) => ({
        url: "/parcel",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Block a parcel
    blocklParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Cancel a parcel
    cancelParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Confirm a parcel
    confirmlParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Unblock a parcel
    unblocklParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/unblcok/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Update parcel status
    updateParcelStatus: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcel/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

// Sorted exports for consistency
export const {
  useGetAllParcelsQuery,
  useGetParcelMeQuery,
  useBlocklParcelMutation,
  useCancelParcelMutation,
  useConfirmlParcelMutation,
  useCreateParcelMutation,
  useUnblocklParcelMutation,
  useUpdateParcelStatusMutation,
  useGetParcelByIdQuery,
  useGetParcelByTrackingIdQuery
} = parcelApi;