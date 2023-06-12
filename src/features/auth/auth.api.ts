import {instance} from "common/api/common.api";
import {ResponseType} from "common/types/common.types";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type MeResponseType = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<MeResponseType>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}