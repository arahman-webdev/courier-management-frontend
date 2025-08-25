// export interface ISidebarItem {

// }


import type { LucideIcon } from "lucide-react"
import type { ComponentType } from "react"

// export type {IOtpSend, ILogin, IVerifyOtpSend} from "./auth.type"

export interface IResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export interface ISidebarItem {
  title: string,
  icon?: LucideIcon;
  items: {
    title: string,
    icon?: LucideIcon;
    url: string,
    Component: ComponentType
  }[];
}


export type TRole = "ADMIN" | "RECEIVER" | "SENDER"