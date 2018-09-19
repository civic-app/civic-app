import { getCandidate } from '../../candidate/redux/candidates';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';
import { getMatchPercent } from '../../match/selectors';
import { getSurveyQuestions, getUserPositions } from '../../match/redux';
import { getPositionsForCandidate } from '../../candidate/redux/positions';
import { getPositionResponse, isAgreement, isUserNeutral } from '../../match/calculate';

export const getCandidateSummary = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  const matchPercent = getMatchPercent(state, candidateId);
  return (
    candidate && {
      id: candidate.id,
      name: candidate.name,
      imageURI: candidate.image,
      positions: candidate.electionIds,
      partyPreference: candidate.partyPreference,
      isFavorite,
      matchPercent,
    }
  );
};

export const getTabBarProps = (state, candidateId) => ({
  matchTab: getMatchTabProps(state, candidateId),
  aboutTab: getAboutTabProps(state, candidateId),
  newsTab: getNewsTabProps(state, candidateId),
});

const getMatchTabProps = (state, candidateId) => {
  const userPositions = getUserPositions(state);
  const candidatePositions = getPositionsForCandidate(state, candidateId);
  const surveyQuestions = getSurveyQuestions(state);

  const issueMatchData = (candidatePositions && userPositions && surveyQuestions) ?
    Object.keys(userPositions).map(
      questionId => {
        const userResponse = getPositionResponse(questionId, userPositions);
        const candidateResponse = getPositionResponse(questionId, candidatePositions);
        // TODO: how to handle neutral user
        const agreesWithUser = isAgreement(userResponse, candidateResponse) || isUserNeutral(userResponse);
        return {
          id: questionId,
          type: surveyQuestions[questionId] && surveyQuestions[questionId].type || 'other',
          body: candidatePositions[questionId].explanation,
          agreesWithUser: agreesWithUser
        }
      }
    ) : [];

  return {
    matchPercent: getMatchPercent(state, candidateId),
    issueMatchData,
  };
};

const getAboutTabProps = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  return candidate && {
    platformList: toPlatformList(candidate.platform),
    bioContent: candidate.bio,
    socials: {
      facebook: candidate.facebook,
      phone: candidate.phone,
      email: candidate.email,
      twitter: candidate.twitter,
    }
  };
};

// platform is stored in text, with bullets separated by newlines
const toPlatformList = platformText =>
  platformText.split(/[\r\n]+/).map((bullet, idx) => ({ id: idx, content: bullet }));

const testImage = require('../../assets/images/gavin.png');

const getNewsTabProps = (state, candidateId) => ({
  newsItems: [
    {
      id: 1,
      title: 'Does Gavin Newsom represent a shift in California Democratic Party?',
      img: testImage,
      createdAt: new Date(2018, 7, 18, 12),
    },
  ],
});
