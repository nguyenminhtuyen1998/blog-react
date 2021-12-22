import { api } from "./api"

export const authService = {
  login(username, password){
      return api.call().post("/jwt-auth/v1/token",{
          username,
          password
      }
      )
  },
  register(
   {
    nickname,username,email,password  
   }
  ){
    return api.call().post("/wp/v2/users/register",{
      nickname,
      username,
      email,
      password
  }
  )
  },

  fetchMe(token){
    return api.call().get("/wp/v2/users/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  }
}