export const USER_NAMESPACE = 'user';

// Actions
export const UserActionType = {
  Request: 'civicApp/user/REQUEST',
  RequestSuccess: 'civicApp/user/REQUEST_SUCCESS',
  SaveDistrict: 'civicApp/user/SAVE_DISTRICT',
  SaveUserRegistered: 'civicApp/user/saveUserRegistered',
};

// Action creators
export const userFetchSuccess = ({ responses, favorites, district, isRegisteredToVote, user }) => ({
  type: UserActionType.RequestSuccess,
  payload: { responses, favorites, district, isRegisteredToVote, user },
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

/*
 * @param isRegisteredToVote: bool - the user's voter registration status
 */
export const saveUserRegistered = isRegisteredToVote => ({
  type: UserActionType.SaveUserRegistered,
  payload: isRegisteredToVote,
});

export const initialState = {
  district: null,
  isRegisteredToVote: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UserActionType.RequestSuccess:
      return {
        ...state,
        district: action.payload.district,
        isRegisteredToVote: action.payload.isRegisteredToVote || false,
      };
    case UserActionType.SaveDistrict:
      return {
        ...state,
        district: action.payload,
      };
    case UserActionType.SaveUserRegistered:
      return {
        ...state,
        isRegisteredToVote: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
