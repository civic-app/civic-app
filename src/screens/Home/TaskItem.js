import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import SurveyQuestion from './SurveyQuestion';

// Assumes that there will be some way to compare user's response to a
// survey question to the total number of respondants

const question1Result = {
  yes: 63,
  no: 37,
  totalRespondants: 100,
};

const question2Result = {
  yes: 12,
  no: 88,
  totalRespondants: 100,
};

const results = {
  task1: question1Result,
  task2: question2Result
};

class TaskItem extends Component {
  renderPercentage = () => {
    const { yes, no, totalRespondants } = results[this.props.id];
    switch(this.props.userResponse){
      case 'YES':
        return `${parseInt(((yes/totalRespondants)*100),10)}%`;
      case 'NO':
        return `${parseInt(((no/totalRespondants)*100),10)}%`;
      default:
      return null;
    }
  }

  render(){
    const { heading, content, updateResponse, userResponse, region } = this.props;
    const { renderPercentage } = this;
    return(
      <View style={styles.taskItem}>
        {
          !userResponse ?
          <SurveyQuestion {...this.props}/>
          :
          <View style={styles.responseView}>
            <Text style={styles.responseHeader}>
              {renderPercentage()}
            </Text>
            <Text style={styles.responseText}>{renderPercentage()} of {region} also said {userResponse.toLowerCase()}.</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: Colors.white,
    width: 300,
    height: 180,
    margin: 8,
    marginRight: 10,
    ...Mixins.shadow
  },
  responseView: {
    padding: 20,
    backgroundColor: Colors.darkBlue,
    flex: 1,
  },
  responseHeader: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white
  },
  responseText: {
    fontSize: 18,
    color: Colors.white
  }
});

export default TaskItem;
