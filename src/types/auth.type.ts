export interface IOtpSend {
    email: string
}



export interface IVerifyOtpSend {
    email: string,
    otp: string
}



export interface ILogin {
    email: string,
    password: string
}
