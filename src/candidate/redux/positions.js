// Selectors
export const getPositionsForCandidate = (state, candidateId) =>
  state[POSITIONS_NAMESPACE][candidateId];

// Action Creators
export const positionsRequestSuccess = positions => ({
  type: PositionsActionType.RequestSuccess,
  payload: positions,
});

export const PositionsActionType = {
  RequestSuccess: 'civicApp/positions/requestSuccess',
};

export const POSITIONS_NAMESPACE = 'positions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PositionsActionType.RequestSuccess:
      return {
        ...state,
        [action.payload.candidateId]: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {};

export default reducer;
