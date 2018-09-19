export const calculateMatch = (userPositions, candidatePositions) => {
  const [gap, maxGap] = calculatePositionsGap(userPositions, candidatePositions);
  return (
    maxGap > 0 // 0 max gap means candidate and user have no questions on which they both expressed an opinion
      ? +(Math.round(((1 - gap/maxGap) * 100) + 'e+2')  + 'e-2')
      : 0 // TODO: maybe add a real placeholder when candidate data is all in place
  );
};

const calculatePositionsGap = (userPositions, candidatePositions) => (
  Object.keys(userPositions).reduce(
    ([totalSoFar, maxSoFar], id) => {
      const userScore = getPositionResponse(id, userPositions);
      const candidateScore = getPositionResponse(id, candidatePositions);
      const [gap, max] = hasUserAndCandidateScores(userScore, candidateScore)
        ? calculateGapForSingle(userScore, candidateScore)
        : [0, 0];
      return [gap + totalSoFar, max + maxSoFar];
    },
    [0, 0])
);

export const calculateGapForSingle = (user, candidate) => {
  if (isUserNeutral(user)) {
    return [0, 0];
  } else if (isAgreement(user, candidate)) {
    return [0, 4];
  } else if (candidate === 0) {
    return [Math.abs(user), 4];
  } else { // not in agreement
    return [1 + Math.abs(candidate - user), 4];
  }
};

export const isAgreement = (user, candidate) => (
  (candidate > 0 && user > 0)
  || (candidate < 0 && user < 0)
);

export const isUserNeutral = user => user === 0;

export const getPositionResponse = (id, positions) => (
  positions && positions[id] && positions[id].response
);

const hasUserAndCandidateScores = (userScore, candidateScore) =>
  (typeof userScore === 'number') && (typeof candidateScore === 'number');
