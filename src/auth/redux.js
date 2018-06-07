// Selectors
export const getLoggedInUser = (state) => (
  state[AUTH_NAMESPACE].user
)

export const getIsLoggedIn = (state) => (
  !!getLoggedInUser(state)
)

// Action Creators
export const logIn = (email, password) => ({
  type: AuthActionType.LoginRequest,
  payload: { email, password },
})

export const loginSuccess = (user) => ({
  type: AuthActionType.LoginSuccess,
  payload: user,
})

export const register = (email, password) => ({
  type: AuthActionType.RegisterRequest,
  payload: { email, password },
})

export const logOut = () => ({
  type: AuthActionType.LogOutRequest,
})

export const logOutSuccess = () => ({
  type: AuthActionType.LogOutSuccess,
})

export const AuthActionType = {
  LoginRequest: 'civicApp/auth/loginRequest',
  LoginSuccess: 'civicApp/auth/loginSuccess',
  LogOutRequest: 'civicApp/auth/logOutRequest',
  LogOutSuccess: 'civicApp/auth/logOutSuccess',
  RegisterRequest: 'civicApp/auth/registerRequest',
  RegisterSuccess: 'civicApp/auth/registerSuccess',
}

// Reducer
export const AUTH_NAMESPACE = 'auth'

// TODO: errors and maybe loading
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case AuthActionType.LoginSuccess:
    return {
      user: action.payload,
    }
  case AuthActionType.LogOutSuccess:
    return {
      user: undefined
    }
  default:
    return state
  }
}

const initialState = {
  user: undefined,
}

export default reducer

