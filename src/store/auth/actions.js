// Action Types

import { MESSAGE_FORM_ERROR } from "../../constants"
import { mappingUser } from "../../helpers"
import { authService } from "../../services/auth"


export const ACT_LOGIN = "ACT_LOGIN"
export const ACT_LOGOUT = "ACT_LOGOUT"

// Action

export function actLogin({token, user}){
    return{
        type: ACT_LOGIN,
        payload: {
            token,
            user
        }
    }
}

export function actLogout(){
    return{
        type: ACT_LOGOUT
    }
}

// Action Async

export function actFetchMeAsync(token){
    return async dispatch => {
        try{
            const response = await authService.fetchMe(token)
            const user = mappingUser(response.data)
            dispatch(actLogin({token, user}))
            return {
                ok: true,
            }
        }catch(error){
            return {
                ok: false,
                error: "tài khoản hoặc mật khẩu không hợp lệ"
            }
        }
    }
}

export function actLoginAsync(username,password){
    return async dispatch => {
        try{
            const response = await authService.login(username,password)
            const token = response.data.token
            const responseMe = await dispatch(actFetchMeAsync(token))
            return {
                ok: responseMe.ok,
                error: responseMe.error
            }
        }catch(error){
            return {
                ok: false,
                error: "tài khoản hoặc mật khẩu không hợp lệ"
            }
        }
    }
}

export function actRegister(
   {
    nickname,
    username,
    email,
    password
   }
){
    return async dispatch => {
        try{
            const response = await authService.register({nickname,
                username,
                email,
                password})
            const responseLogin = await dispatch(actLoginAsync(username,password))
            if(responseLogin.ok){
                return {
                    ok: true,
                    // error: responseMe.error
                }
            }
            
            throw new Error("có lỗi xảy ra vui lòng thử lại")
            
        }catch(error){
            let message_error = "có lỗi xảy ra vui lòng thử lại"
        
            if(error.response || error.response.data || error.response.data.code){
                message_error = MESSAGE_FORM_ERROR[error.response.data.code]
            }
            // console.log(message_error)
            
            return {
                ok: false,
                error: message_error
            }
        }
    }
}