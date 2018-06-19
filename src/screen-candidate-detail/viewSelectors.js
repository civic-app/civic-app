import { getCandidate } from '../candidate/redux/candidates';

export const getCandidateSummary = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId)
  return {
    name: 'Barach Obama',
    imageURI: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    isFavorite: true,
    partyPreference: 'Democrat',
  }
}
