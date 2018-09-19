import { getDataFromGoogleSpreadsheet } from '../googleDriveApi/getData';

const candidateDriveId = '1Enwx8oPTcGyhv_re0kk_F2QiK5V80Lg4OftBbmrotkQ';
const candidatePositionsDriveId = '1f_k2Jz_3eCy4p95fwZAd81hd3q8DbPXpIpiJApu5st4';

export const fetchCandidates = () => (
  getDataFromGoogleSpreadsheet(candidateDriveId)
    .then(toCandidatesWithDefaultValues)
);

export const fetchCandidatePositions = () => (
  getDataFromGoogleSpreadsheet(candidatePositionsDriveId, toCandidatePositions)
);

const toCandidatesWithDefaultValues = (candidates) => {
  const placeholderValues = candidates.placeholder;
  return Object.keys(candidates).reduce(
    (transformed, candidateId) => ({
      ...transformed,
      ...candidateId !== 'placeholder'
        ? {
          [candidateId] : {
            ...addDefaults(placeholderValues, candidates[candidateId]),
            name: candidates[candidateId].firstName + ' ' + candidates[candidateId].lastName,
            electionIds: candidates[candidateId].electionIds.split(','),
          }
        }
        : {}
    }),
    {},
  )
};

const addDefaults = (defaults, candidate) => (
  Object.keys(candidate).reduce(
    (transformed, prop) => ({
      ...transformed,
      [prop]: !candidate[prop] ? defaults[prop] : candidate[prop]
    }),
    {},
  )
);

const toCandidatePositions = (apiPositions, transformKeysFromGoogle) => (
  apiPositions.reduce(
    (transformed, apiPosition) => {
      const posWithString = transformKeysFromGoogle(apiPosition);
      const position = {
        ...posWithString,
        response: parseInt(posWithString.response, 10)
      };
      return {
        ...transformed,
        [position.candidateId]: {
          ...(transformed[position.candidateId] || {}),
          [position.questionId] : position,
        },
      };
    },
    {})
);
