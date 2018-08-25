import React from 'react';
import {View } from 'react-native';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';

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
