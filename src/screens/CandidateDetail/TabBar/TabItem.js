import React from 'react'
import { Animated, View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Color from '../../../styles/colors';
import posed from 'react-native-pose';

const tween = ({ value, toValue, useNativeDriver }) =>
  Animated.timing(value, {
    toValue,
    useNativeDriver,
    duration: 300
  });

const config = {
  visible: { scaleX: 1, transition: tween },
  hidden: { scaleX: 0, transition: () => false }
};

const Line = posed.View(config);

const TabItem = ({handlePress, name, selectedTab}) =>
  <View style={styles.container}>
    <TouchableHighlight
      underlayColor={Color.white}
      onPress={()=>handlePress(name)}
      style={[
        styles.tabItem
      ]}
    >
      <Text
        style={[
          styles.tabText,
          selectedTab===name && styles.activeText
        ]}
      >
        {name}
      </Text>
    </TouchableHighlight>
    <Line
      style={selectedTab===name ? styles.line : {}}
      pose={selectedTab===name ? 'visible': 'hidden'}
    />
  </View>


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tabItem: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white
  },
  tabText:{
    color: Color.lightGray,
    fontSize: 18,
    position: 'absolute'
  },
  activeText:{
    color: Color.lightBlue
  },
  line:{
    backgroundColor:Color.lightBlue,
    width: '100%',
    height: 2,
    position: 'absolute',
    bottom: 0
  }
});

export default TabItem
