import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Banner from './Banner';
import colors from '../../styles/colors';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Banner
          color={colors.red}
          icon="megaphone"
          style={styles.banner}
          title="Not Registered to Vote?"
          subtitle="Click here to get started"
        />
        <Banner
          color={colors.darkBlue}
          icon="megaphone"
          style={styles.banner}
          title="Something is going on in your city!"
          subtitle="Click here to find out more"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  banner: {
    marginTop: 8,
  },
});

export default HomeScreen;
