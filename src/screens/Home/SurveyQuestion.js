import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ResponseButton from './ResponseButton';

const SurveyQuestion = ({id, heading, content, updateResponse}) => (
  <View>
    <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.content}>{content}</Text>
    <View style={styles.buttonBox}>
      <ResponseButton onPress={()=>updateResponse(id, 'YES')} title="Yes"/>
      <ResponseButton onPress={()=>updateResponse(id, 'NO')} title="No"/>
    </View>
  </View>
)

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10
  },
  content: {
    padding: 20,
    paddingTop: 0,
    fontSize: 16,
  },
  buttonBox:{
    flexDirection:'row',
    justifyContent: 'space-between',
  }
});

export default SurveyQuestion;
