import React from 'react';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, ScrollView,Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

const positions = ['President of the United States'];
const FavoritesScreen = props => (

  <View style={styles.container}>
    {props.candidates.map(candidate => (
      <View style={styles.container} key={candidate.id}>
        <TouchableOpacity onPress={props.goToCandidateDetail(candidate.id)}>
          <Avatar xlarge rounded source={{ uri: candidate.image}}/>
        </TouchableOpacity>
        <Text style={styles.nameText} >{candidate.name}</Text>
        <Text style={styles.positionsText}>Running for {positions[0]}</Text>
        <ScrollView horizontal={true}>
          <View style={styles.container} >
            <View style={styles.newsCard}>
              <TouchableOpacity onPress={props.goToCandidateDetail(candidate.id)}>
                <Avatar xlarge round={false} source={{ uri: candidate.image}}/>
              </TouchableOpacity>
              <View style={styles.newsBody}>
                <Text style={styles.newsBodyText}>
                  Does Gavin Newsom represent a shift in California Democratic Party?
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
              <View style={styles.newsBody}>
                <Text style={styles.newsBodyText}>
                  California Governor’s Race Forces Candidates to Face the Past?
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
            </View>
          </View>
        </ScrollView>
      </View>
    ))}

  </View>);

FavoritesScreen.propTypes = {
  candidates: PropTypes.array,
  favorites: PropTypes.bool,
  name: PropTypes.string,
  imageURI: PropTypes.string,
  goToCandidateDetail: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5 ,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 21,
    paddingTop: 5,
    fontWeight: 'bold'
  },
  newsCard: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 2,
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
