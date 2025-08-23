

import type {  IResponse } from "@/types";
import { baseApi } from "../baseApi";
import type { IOtpSend, IVerifyOtpSend } from "@/types/auth.type";




export const authApi = baseApi.injectEndpoints({
    endpoints: (build)=>({
        CreateUser: build.mutation({
            query: (userData)=>({
                url: "/user/register",
                method: "POST",
                data: userData
            })
        }),
        LoginUser: build.mutation({
            query: (userData)=>({
                url: "/auth/login",
              
                method: "POST",
                data: userData
            })
        }),
        LogoutUser: build.mutation({
            query: ()=>({
                url: "/auth/logout",
                
                method: "POST",
            })
        }),
        sendOtp: build.mutation<IResponse<null>, IOtpSend>({
            query: (userData)=>({
                url: "/otp/send",
                method: "POST",
                data: userData
            })
        }),
        verifyOtp: build.mutation<IResponse<null>, IVerifyOtpSend>({
            query: (userData)=>({
                url: "/otp/verify",
                method: "POST",
                data: userData
            })
        }),
        getUser: build.query({
            query: ()=>({
                url: "/user/all-users",
                method: "GET",
            })
        }),
        getMe: build.query({
            query: ()=>({
                url: "/user/me",
                method: "GET",
            })
        })
    })
})

export const {useCreateUserMutation, useLoginUserMutation} = authApi
