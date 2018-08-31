import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

export const distanceInWordsFromNow = (date) => {
  return distanceInWordsStrict(date, Date.now());
}
