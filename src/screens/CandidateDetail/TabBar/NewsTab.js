import React from 'react';
import {View } from 'react-native';
import NewsCard from '../../components/NewsCard';
import PropTypes from 'prop-types';

// Date Helper for mocking date data
import subHours from 'date-fns/sub_hours';

const testImage = require('../../../assets/images/gavin.png');

const newsItems = [
  {
    id: 1,
    title: 'Does Gavin Newsom represent a shift in California Democratic Party?',
    img: testImage,
    createdAt: new Date(2018, 9, 18, 12)
  }
]

const NewsTab = (props) => {
  return (
    <View>
      {props.newsItems.map(({id, ...rest})=><NewsCard key={id} {...rest}/>)}
    </View>);
};

NewsTab.propTypes = {
  newsItems: PropTypes.array,
};

export default NewsTab;
