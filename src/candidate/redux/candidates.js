// Selectors
export const getCandidate = (state, id) => (
  state[CANDIDATE_NAMESPACE][id]
)

// Action Creators
export const fetchCandidateSuccess = (candidate) => ({
  type: CandidateActionType.RequestSuccess,
  payload: candidate,
})

export const toggleFavorite = (candidateId, isFavorite) => ({
  type: CandidateActionType.ToggleFavorite,
  payload: { isFavorite }
})

export const toggleFavoriteSuccess = (candidateId, isFavorite) => ({
  type: CandidateActionType.ToggleFavoriteSuccess,
  payload: { isFavorite }
})


export const CandidateActionType = {
  RequestSuccess: 'civicApp/candidate/requestSuccess',
  ToggleFavorite: 'civicApp/candidate/toggleFavorite',
  ToggleFavoriteSuccess: 'civicApp/candidate/toggleFavoriteSuccess',
}

export const CANDIDATE_NAMESPACE = 'candidates'

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case CandidateActionType.RequestSuccess:
    return {
      ...state,
      [action.payload.id]: action.payload,
    }
  default:
    return state
  }
}

const initialState = {}

export default reducer
