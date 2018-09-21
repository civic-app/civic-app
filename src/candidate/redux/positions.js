// Selectors
import { CandidateActionType } from './candidates';

export const getPositionsForCandidate = (state, candidateId) =>
  state[POSITIONS_NAMESPACE][candidateId];

export const POSITIONS_NAMESPACE = 'candidatePositions';

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CandidateActionType.RequestSuccess:
      return {
        ...state,
        ...action.payload.positions,
      };
    default:
      return state;
  }
};

const initialState = {};

export default reducer;
