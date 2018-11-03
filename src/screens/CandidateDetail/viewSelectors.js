import { getCandidate } from '../../candidate/redux/candidates';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';
import { getMatchData, shouldShowMatch } from '../../match/selectors';
import { getSurveyQuestions, getUserPositions } from '../../match/redux';
import { getPositionsForCandidate } from '../../candidate/redux/positions';
import { getPositionResponse, isAgreement, isNeutral, isStrongDisagreement } from '../../match/calculate';

export const getCandidateSummary = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  const matchData = getMatchData(state, candidateId);
  return (
    candidate && {
      id: candidate.id,
      name: candidate.name,
      imageURI: candidate.image,
      positions: candidate.electionIds,
      partyPreference: candidate.partyPreference,
      isFavorite,
      matchPercent: matchData.match,
      shouldShowMatchPercent: shouldShowMatch(matchData),
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
  const candidate = getCandidate(state, candidateId);
  const matchData = getMatchData(state. candidateId);

  const issueMatchData = (candidatePositions && userPositions && surveyQuestions) ?
    Object.keys(userPositions).map(
      questionId => {
        const userResponse = getPositionResponse(questionId, userPositions);
        const candidateResponse = getPositionResponse(questionId, candidatePositions);
        const agreesWithUser = toOpinion(userResponse, candidateResponse);

        return {
          id: questionId,
          type: surveyQuestions[questionId] && surveyQuestions[questionId].type || 'other',
          body: candidatePositions[questionId].explanation,
          source: toSourceList(candidatePositions[questionId].source),
          agreesWithUser,
        }
      }
    ) : [];

  return {

    issueMatchData,
    candidateName: candidate && candidate.name,
    shouldShowMatch: shouldShowMatch(matchData),
    matchPercent: matchData.match,
    known: matchData.known,
    total: matchData.totalWithUserOpinions,
  };
};

export const Opinion = {
  Agree: 'agree',
  Disagree: 'disagree',
  StronglyDisagree: 'stronglyDisagree',
  Unknown: 'unknown',
};

const toOpinion = (userResponse, candidateResponse) =>
  isAgreement(userResponse, candidateResponse) ? Opinion.Agree
    : (isNeutral(userResponse) || isNeutral(candidateResponse)) ? Opinion.Unknown
      : isStrongDisagreement(userResponse, candidateResponse) ? Opinion.StronglyDisagree
        : Opinion.Disagree;

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

//source links is stored in an array of text
const toSourceList = sourceLinks =>
  sourceLinks.split(/[\r\n]+/)
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
