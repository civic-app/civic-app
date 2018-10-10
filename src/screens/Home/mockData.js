import parse from 'date-fns/parse';

const testImage = require('../../assets/images/gavin.png');
// eventually this will be in state
export const alerts = [
  {
    title: 'Not Registered to Vote?',
    subtitle: 'Click here to get started',
    type: 'alert',
  },
  {
    title: 'Something is going on in your city!',
    subtitle: 'Click here to find out more',
    type: 'info',
  },
];

export const dailyTasks = [
  {
    id: 'task1',
    heading: 'Narrow your matches',
    content: 'Do you think the U.S. should be more lenient on immigration?',
    userResponse: '',
    region: 'California',
  },
  {
    id: 'task2',
    heading: 'Narrow your matches',
    content: 'Should there be limits on donations to political campaigns?',
    userResponse: '',
    region: 'California',
  },
];

export const upcomingActivism = [
  {
    id: 'activism1',
    title: 'Women\'s March 2018',
    imgUrl: '',
    eventDate: parse('2018-12-18T12:00:00.000Z'),
  },
  {
    id: 'activism2',
    title: 'Some Other March 2018',
    imgUrl: '',
    eventDate: parse('2018-12-19T12:00:00.000Z'),
  },
];

export const newsItems = [
  {
    id: 1,
    title: 'Does Gavin Newsom represent a shift in California Democratic Party?',
    img: testImage,
    createdAt: parse('2018-08-18T12:00:00.000Z'),
  },
];
