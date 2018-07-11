import React from 'react';
import { Image } from 'react-native';
import { createSnapshot } from '../../util/tests';
import WelcomeCarouselItem from '../WelcomeCarouselItem';

describe('WelcomeCarouselItem', () => {
  it('renders correctly', () => {
    const props = {
      image: <Image />,
      title: 'Welcome Carousel',
      subtitle: 'Some more text',
    };

    const snapshot = createSnapshot(WelcomeCarouselItem, props);
    expect(snapshot).toMatchSnapshot();
  });
});
