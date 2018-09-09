import { getCandidate } from '../../candidate/redux/candidates';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';
import { getMatchPercent } from '../../match/selectors';

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
  const issueMatchData = [
    {
      id: '1',
      type: 'healthcare',
      body: 'Obama supports single-payer universal healthcare for all Californians.',
      agreesWithUser: true,
    },
    {
      id: '2',
      type: 'environmental',
      body: 'Obama does not support solar power.',
      agreesWithUser: false,
    },
  ];

  return {
    matchPercent: getMatchPercent(state, candidateId),
    issueMatchData,
  };
};

const getAboutTabProps = (state, candidateId) => ({
  platformList: [
    { id: 'key1', content: 'Colonize Space' },
    { id: 'key2', content: 'Healthcare for All' },
    { id: 'key3', content: 'Kick Names and Take Ass' },
  ],
  bioContent:
    'Lorem ipsum dolor amet woke artisan ennui umami. Street art fixie salvia cray +1 pug chartreuse typewriter art party asymmetrical. Craft beer ramps tousled chillwave. Marfa ennui chicharrones etsy keytar sustainable tote bag synth salvia la croix listicle raclette locavore next level humblebrag. Hoodie kitsch selvage, DIY salvia single-origin coffee thundercats irony hammock meh shaman.',
  socials: {
    facebook: '',
    phone: '',
    email: '',
    twitter: '',
  },
});

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
