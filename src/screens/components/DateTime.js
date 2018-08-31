import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { distanceInWordsFromNow } from '../../util/functions';
import isPast from 'date-fns/is_past';
import Colors from '../../styles/colors';

const DateTime = ({time}) => {
  return(
    <View style={styles.dateTag}>
      <Icon
        size={14}
        name="clock"
        type="material-community"
        iconStyle={styles.icon}
      />
      <Text style={styles.dateText}>
        {!isPast(time) && 'in '}
        {distanceInWordsFromNow(time)}
        {isPast(time) && ' ago'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateTag: {
    flexDirection: 'row'
  },
  dateText: {
    fontSize: 14,
    color: Colors.darkGray
  },
  icon: {
    marginRight: 5,
  },
});

export default DateTime;
