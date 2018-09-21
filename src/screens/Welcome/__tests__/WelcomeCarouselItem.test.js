import React from 'react';
import { Image } from 'react-native';
import { createSnapshot } from '../../../util/tests';
import WelcomeCarouselItem from '../WelcomeCarouselItem';

describe('WelcomeCarouselItem', () => {
  it('renders correctly', () => {
    const props = {
      image: <Image />,
      title: 'Welcome Carousel',
      subtitle: 'Some more text',
      isSmallScreen: false,
    };

    const snapshot = createSnapshot(WelcomeCarouselItem, props);
    expect(snapshot).toMatchSnapshot();
  });
  it('does not render subtitle on small screen', () => {
    const props = {
      image: <Image />,
      title: 'Welcome Carousel',
      subtitle: 'Some more text',
      isSmallScreen: true,
    };

    const snapshot = createSnapshot(WelcomeCarouselItem, props);
    expect(snapshot).toMatchSnapshot();
  });
});
