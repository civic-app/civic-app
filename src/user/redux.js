export const USER_NAMESPACE = 'user';

// Actions
export const UserActionType = {
  Request: 'civicApp/user/REQUEST',
  RequestSuccess: 'civicApp/user/REQUEST_SUCCESS',
  SaveDistrict: 'civicApp/user/SAVE_DISTRICT',
};

// Action creators
export const userFetchSuccess = ({ responses, favorites, district, user }) => ({
  type: UserActionType.RequestSuccess,
  payload: { responses, favorites, district, user },
});

export const loadUser = (force = false) => ({
  type: UserActionType.Request,
  payload: force,
});

/*
 * @param district: string - user's congressional district
 * {STATE}-{DISTRICT_NUMBER} e.g. CA-10
 */
export const saveDistrict = district => ({
  type: UserActionType.SaveDistrict,
  payload: district,
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
    case UserActionType.SaveDistrict:
      return {
        ...state,
        district: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
