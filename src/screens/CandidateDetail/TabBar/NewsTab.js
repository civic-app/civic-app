import React from 'react';
import {View } from 'react-native';
import NewsCard from './NewsCard';

const testImage = require('../../../assets/images/gavin.png');

const newsItems = [
  {
    id: 1,
    title: 'Does Gavin Newsom represent a shift in California Democratic Party?',
    img: testImage,
    createdAt: '3 hrs ago', // change to datetime
  }
]

const NewsTab = (props) => {
  return (
    <View>
      {newsItems.map(({id, ...rest})=><NewsCard key={id} {...rest}/>)}
    </View>);
}

export default NewsTab;
