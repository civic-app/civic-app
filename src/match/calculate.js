export const calculateMatch = (userPositions, candidatePositions) => {
  const { totalGap, maxGap, numUnknown } = calculatePositionsGap(userPositions, candidatePositions);
  return {
    match: toPercentIfNot0(totalGap, maxGap),
    certainty: toPercentIfNot0(numUnknown, maxGap),
    known: maxGap - numUnknown,
    totalWithUserOpinions: maxGap
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

export const isStrongDisagreement = (user, candidate) => calculateGapForSingle(user, candidate) === 1;

export const getPositionResponse = (id, positions) => (
  positions && positions[id] && positions[id].response
);

const hasUserAndCandidateScores = (userScore, candidateScore) =>
  (typeof userScore === 'number') && (typeof candidateScore === 'number');

const toPercentIfNot0 = (num, denom) => denom > 0 ? toRoundedPercent(1 - num/denom) : 0
const toRoundedPercent = num => Math.round(num * 100);
