import React from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import DateTime from './DateTime';

const NewsCard = ({img, title, createdAt}) => {
  return(
    <View style={styles.newsCard}>
      <Image
        source={img}
        style={styles.newsImage}
      />
      <View style={styles.newsBody}>
        <Text style={styles.newsBodyText}>{title}</Text>
        <DateTime time={createdAt}/>
      </View>
    </View>
  )
}

NewsCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  img: PropTypes.number, // change to url eventually
};

const styles = StyleSheet.create({
  newsCard: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    borderRadius: 2,
    ...Mixins.shadow
  },
  newsImage: {
    width:175,
    height: 140
  },
  newsBody: {
    flex:1,
    padding: 10,
    backgroundColor: Colors.white
  },
  newsBodyText: {
    fontSize: 16,
    lineHeight: 22
  }
})

export default NewsCard;
