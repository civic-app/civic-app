import React from 'react';
import { StyleSheet, FlatList, View, Text, Image } from 'react-native';
import DateTime from '../components/DateTime';
import Mixins from '../../styles/mixins';
import Colors from '../../styles/colors';
const img = require('../../assets/images/womens-march.png');

const UpcomingActivism = ({data}) =>
  <FlatList
    horizontal={true}
    data={data}
    keyExtractor={item => item.id}
    renderItem={ ({item}) => (
      <View style={styles.eventItem}>
        <View style={styles.dateTitleContainer}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <DateTime time={item.eventDate}/>
        </View>
        <Image
          source={img}
          style={styles.eventImage}
        />
      </View>
    )}
  />;

const styles = StyleSheet.create({
  eventItem: {
    backgroundColor: Colors.white,
    width: 300,
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 20,
    ...Mixins.shadow
  },
  eventImage: {
    height: 112,
    width: 112
  },
  dateTitleContainer: {
    flex:1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  eventTitle: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default UpcomingActivism;
