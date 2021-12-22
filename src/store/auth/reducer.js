import { ACT_LOGIN, ACT_LOGOUT } from "./actions"


const initState = {
  token : localStorage.getItem("access_token"),
  currentUser: null
}

function reducer(authState = initState, action) {
  switch (action.type){
    case ACT_LOGIN:
      localStorage.setItem("access_token",action.payload.token)
      return {
        ...authState,
        token : action.payload.token,
        currentUser: action.payload.user
      }
    case ACT_LOGOUT:
      localStorage.removeItem("access_token")
      return{
        token: "",
        currentUser: ""
      }
    default:
      return authState
  }
}

export default reducer