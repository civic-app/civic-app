import React from 'react';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, ScrollView, Text, FlatList } from 'react-native';
import { Avatar,Icon } from 'react-native-elements';

const newsData = [
  {
    id:1,
    body:'Does Calvin Newsom represent a shift in California Democratic Party?'
  },{
    id:2,
    body:'California Governor’s Race Forces Candidates to Face the Past?'
  },
];

const NewsInfo = (props) => {
  return (
    <View style={styles.newsInfo}>
      {newsData.map(data =>
        <View key={data.id} style={styles.newsBody}>
          <Text style={styles.newsBodyText}>
            <Text> {data.body}</Text>
          </Text>
          <View style={styles.dateTag}>
            <Icon
              size={14}
              name="clock"
              type="material-community"
              iconStyle={{marginRight: 5}}
            />
            <Text>3 hr ago</Text>
          </View>
        </View>
      ) }
    </View>);
};

NewsInfo.propTypes = {
  newsData: PropTypes.array,
  body: PropTypes.string,
};

const FavoritesScreen = props => {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> (
          <View style={styles.candidateContainer} >
            <Text style={styles.nameText} >{item.name}</Text>
            <Text style={styles.positionsText}>
            Running for {item.electionIds}
            </Text>
            <ScrollView horizontal={true}>
              <View style={styles.container} >
                <View style={styles.newsCard}>
                  <TouchableOpacity onPress={props.goToCandidateDetail(item.id)}>
                    <Avatar xlarge round={false} source={{ uri: item.image}}/>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      />
    </View>
  )};

FavoritesScreen.propTypes = {
  data: PropTypes.array,
  favorites: PropTypes.bool,
  name: PropTypes.string,
  electionIds: PropTypes.string,
  imageURI: PropTypes.string,
  goToCandidateDetail: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent:'space-between',
    alignItems: 'stretch',
    paddingBottom: 15
  },
  candidateContainer: {
    alignItems: 'center',
    marginTop:15,
    flex: 1,
    backgroundColor:Colors.white,
  },
  nameText: {
    fontSize: 21,
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  positionsText: {
    color: Colors.lightGray,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10
  },
  newsInfo : {
    flexDirection: 'row',
    borderRadius: 2,
    ...Mixins.shadow
  },
  newsCard: {
    flexDirection: 'row',
    borderRadius: 2,
    margin:10,
    ...Mixins.shadow
  },
  newsBody:{
    marginLeft:10,
    flex:1,
    padding: 10,
    height: 150,
    width: 200,
    backgroundColor: Colors.white
  },
  newsBodyText:{
    fontSize: 16,
    lineHeight: 22,
  },
  dateTag:{
    flexDirection: 'row',
    marginTop: 5
  }
})

export default FavoritesScreen;
