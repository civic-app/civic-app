import { getDataFromGoogleSpreadsheet } from '../googleDriveApi/getData';

const candidateDriveId = process.env.REACT_NATIVE_CANDIDATE_DRIVE_ID;
const candidatePositionsDriveId = process.env.REACT_NATIVE_CANDIDATE_POSITIONS_DRIVE_ID;

export const fetchCandidates = () => getDataFromGoogleSpreadsheet(candidateDriveId).then(toCandidatesWithDefaultValues);

export const fetchCandidatePositions = () =>
  getDataFromGoogleSpreadsheet(candidatePositionsDriveId, toCandidatePositions);

const toCandidatesWithDefaultValues = candidates => {
  const placeholderValues = candidates.placeholder;
  return Object.keys(candidates).reduce(
    (transformed, candidateId) => ({
      ...transformed,
      ...(candidateId !== 'placeholder'
        ? {
          [candidateId]: {
            ...addDefaults(placeholderValues, candidates[candidateId]),
            name: candidates[candidateId].firstName + ' ' + candidates[candidateId].lastName,
            electionIds: candidates[candidateId].electionIds.split(','),
          },
        }
        : {}),
    }),
    {},
  );
};

const addDefaults = (defaults, candidate) =>
  Object.keys(candidate).reduce(
    (transformed, prop) => ({
      ...transformed,
      [prop]: !candidate[prop] ? defaults[prop] : candidate[prop],
    }),
    {},
  );

const toCandidatePositions = (apiPositions, transformKeysFromGoogle) =>
  apiPositions.reduce((transformed, apiPosition) => {
    const posWithString = transformKeysFromGoogle(apiPosition);
    const position = {
      ...posWithString,
      response: parseInt(posWithString.response, 10),
    };
    return {
      ...transformed,
      [position.candidateId]: {
        ...(transformed[position.candidateId] || {}),
        [position.questionId]: position,
      },
    };
  }, {});
