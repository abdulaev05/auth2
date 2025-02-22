import { TUser } from "../TUser"

export type TAuthResponse = {
    accessToken: string,
    refreshToken: string,
    user: TUser
}