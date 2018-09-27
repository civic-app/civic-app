export const USER_NAMESPACE = 'user';

// Actions
export const UserActionType = {
  Request: 'civicApp/user/REQUEST',
  RequestSuccess: 'civicApp/user/REQUEST_SUCCESS',
};

// Action creators
export const userFetchSuccess = ({ responses, favorites, district, user }) => ({
  type: UserActionType.RequestSuccess,
  payload: { responses, favorites, district, user },
});

export const loadUser = (force = false) => ({
  type: UserActionType.Request,
  payload: force
});

export const initialState = {
  district: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UserActionType.RequestSuccess:
      return {
        ...state,
        district: action.payload.district,
      };
    default:
      return state;
  }
}

export default reducer;
