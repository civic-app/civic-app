import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import WelcomeCarouselItem from './WelcomeCarouselItem';
import { CandidatesImage, GetInvolvedImage, StayInformedImage } from './WelcomeImages';
import colors from '../../styles/colors';

class WelcomeCarousel extends React.Component {
  images = [
    {
      image: <CandidatesImage />,
      title: 'Learn where candidates stand on the issues',
    },
    {
      image: <StayInformedImage />,
      title: 'Stay informed about news that matters to you',
    },
    {
      image: <GetInvolvedImage />,
      title: 'Make an impact for causes you care about',
    },
  ];

  static propTypes = {
    isSmallScreen: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };
  }

  renderItem = ({ item, index }) => (
    <WelcomeCarouselItem key={index} image={item.image} isSmallScreen={this.props.isSmallScreen} title={item.title} />
  );

  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <Carousel
          data={this.images}
          renderItem={this.renderItem}
          itemWidth={screenWidth}
          sliderWidth={screenWidth}
          useScrollView={true}
          onSnapToItem={index => this.setState({ currentIndex: index })}
          loop={true}
          autoplay={true}
          autoplayDelay={300}
          autoplayInterval={5000}
          lockScrollWhileSnapping={true}
        />
        {!this.props.isSmallScreen && (
        <Pagination
          activeDotIndex={this.state.currentIndex}
          dotsLength={this.images.length}
          dotColor={colors.white}
          inactiveDotColor={colors.lightBlue}
          inactiveDotScale={1}
          dotStyle={styles.dot}
        />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 500,
  },
  dot: {
    borderWidth: 1,
    borderColor: colors.white,
  },
});

export default WelcomeCarousel;
