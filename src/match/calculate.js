export const calculateMatch = (userPositions, candidatePositions) => {
  const { totalGap, maxGap, numUnknown } = calculatePositionsGap(userPositions, candidatePositions);
  console.log('cert', totalGap/maxGap, totalGap, maxGap)
  return {
    match: (
      maxGap > 0 // 0 max gap means candidate and user have no questions on which they both expressed an opinion
        ? toRoundedPercent(1 - totalGap/maxGap)
        : 0 // TODO: maybe add a real placeholder when candidate data is all in place
    ),
    certainty: toRoundedPercent(maxGap / (maxGap + numUnknown)),
  };
};

const calculatePositionsGap = (userPositions, candidatePositions) => (
  Object.keys(userPositions).reduce(
    ({ totalGap, maxGap, numUnknown }, id) => {
      const userScore = getPositionResponse(id, userPositions);
      const candidateScore = getPositionResponse(id, candidatePositions);
      const { gap, max, unknown } = hasUserAndCandidateScores(userScore, candidateScore)
        ? calculateGapForSingle(userScore, candidateScore)
        : { gap: 0, maxGap2: 0, unknown: 1 };
      return {totalGap: totalGap + gap, maxGap: maxGap + max, numUnknown: numUnknown + unknown };
    },
    { totalGap: 0, maxGap: 0, numUnknown: 0 })
);

export const calculateGapForSingle = (user, candidate) => {
  if (isNeutral(user)) {
    return { gap: 0, max: 0, unknown: 0 };
  } else if (isAgreement(user, candidate)) {
    return { gap: 0, max: 1, unknown: 0 };
  } else if (isNeutral(candidate)) {
    return { gap: Math.abs(user)/4, max: 1, unknown: 1 };
  } else { // not in agreement
    return { gap: (1 + Math.abs(candidate - user))/4, max: 1, unknown: 0 };
  }
};

export const isAgreement = (user, candidate) => (
  (candidate > 0 && user > 0)
  || (candidate < 0 && user < 0)
);

export const isNeutral = answer => answer === 0;

export const getPositionResponse = (id, positions) => (
  positions && positions[id] && positions[id].response
);

const hasUserAndCandidateScores = (userScore, candidateScore) =>
  (typeof userScore === 'number') && (typeof candidateScore === 'number');

const toRoundedPercent = num => Math.round(num * 100);
