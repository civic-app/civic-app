export const calculateMatch = (userPositions, candidatePositions) => {
  const [gap, maxGap] = calculatePositionsGap(userPositions, candidatePositions);
  return +(Math.round(((1 - gap/maxGap) * 100) + 'e+2')  + 'e-2');
};

const calculatePositionsGap = (userPositions, candidatePositions) => (
  Object.keys(userPositions).reduce(
    ([totalSoFar, maxSoFar], id) => {
      const userScore = getPositionResponse(id, userPositions);
      const candidateScore = getPositionResponse(id, candidatePositions);
      const [gap, max] = calculateGapForSingle(userScore, candidateScore);
      return [gap + totalSoFar, max + maxSoFar];
    },
    [0, 0])
);

export const calculateGapForSingle = (user, candidate) => {
  if (user === 0) {
    return [0, 0];
  } else if (isAgreement(user, candidate)) {
    return [0, 4];
  } else if (candidate === 0) {
    return [Math.abs(user), 4];
  } else { // not in agreement
    return [1 + Math.abs(candidate - user), 4];
  }
};

const isAgreement = (user, candidate) => (
  (candidate > 0 && user > 0)
  || (candidate < 0 && user < 0)
);

const getPositionResponse = (id, positions) => (
  positions[id].response
);
