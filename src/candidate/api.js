import { getDataFromGoogleSpreadsheet } from '../googleDriveApi/getData';

const candidateDriveUrl = (
  'https://spreadsheets.google.com/feeds/list/1Enwx8oPTcGyhv_re0kk_F2QiK5V80Lg4OftBbmrotkQ/od6/public/values?alt=json'
);

export const fetchCandidates = () => (
  getDataFromGoogleSpreadsheet(candidateDriveUrl)
    .then(toCandidatesWithDefaultValues)
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
