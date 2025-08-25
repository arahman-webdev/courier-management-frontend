/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/features/auth/auth.api.ts
// import { baseApi } from "../baseApi"

import { baseApi } from "./baseApi"

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  data: any
  success: boolean
  token?: string // if your backend returns token
  user?: {
    _id: string
    name: string
    email: string
    role: string
  }
}

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  success: boolean
  message: string
}

// interface UserResponse {
//   _id: string
//   name: string
//   email: string
//   role: string
// }

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"], // so user data refreshes
    }),

    // Register
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (newUser) => ({
        url: "/user/register",
        method: "POST",
        data: newUser,
      }),
    }),

    // Get Current User Profile
    me: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    // Get All Users
    allUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    // Get All Users
    allReceivers: builder.query({
      query: () => ({
        url: "/user/receivers",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // Logout
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
})



export const {
  useLoginMutation, useRegisterMutation, useMeQuery, useLogoutMutation, useAllUsersQuery, useAllReceiversQuery
}  = authApi
