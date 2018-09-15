import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
const CIVIC_API_KEY = 'AIzaSyDJeJLI-mFC5zx1zXCptCNnvk4e3iPbQF8';

export const distanceInWordsFromNow = date => {
  return distanceInWordsStrict(date, Date.now());
};

// params = array of strings
export const buildCivicQuery = params => {
  const nonNullParams = params.filter(p => p !== '');
  const paramsString = nonNullParams.length > 1 ? nonNullParams.join(', ') : nonNullParams[0] || '';
  return `https://www.googleapis.com/civicinfo/v2/representatives?key=${CIVIC_API_KEY}&address=${paramsString}&includeOffices=true&roles=legislatorLowerBody`;
};
