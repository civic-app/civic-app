import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Banner, { mapAlertLevelToColor } from './Banner';
import Colors from '../../styles/colors';
import DailyTasks from './DailyTasks';
import UpcomingActivism from './UpcomingActivism';
import NewsCard from '../components/NewsCard';
// Mock Data
import { newsItems, alerts, dailyTasks, upcomingActivism } from './mockData';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        {alerts.map((alert, index) => (
          <Banner
            key={index}
            color={mapAlertLevelToColor(alert.level)}
            icon="megaphone"
            style={styles.banner}
            title={alert.title}
            subtitle={alert.subtitle}
          />
        ))}

        {/* Daily Tasks */}
        <Text style={styles.sectionHeader}>DAILY TASKS</Text>
        <DailyTasks data={dailyTasks}/>

        {/* Upcoming Activism */}
        <Text style={styles.sectionHeader}>UPCOMING ACTIVISM</Text>
        <UpcomingActivism data={upcomingActivism}/>

        {/* In The News */}
        <Text style={styles.sectionHeader}>IN THE NEWS</Text>
        {newsItems.map(({id, ...rest})=>(
          <NewsCard key={id} {...rest}/>
        ))}

        {/* All Caught Up Feed Footer */}
        <View style={styles.footerView}>
          <Text style={styles.footerText}>You're all caught up for today.</Text>
          <Icon
            name="megaphone"
            type="entypo"
            size={50}
            color="#DADADA"
            containerStyle={styles.footerIcon}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  banner: {
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 14,
    margin: 18,
    color: Colors.gray
  },
  footerView:{
    alignItems: 'center',
    margin: 50,
  },
  footerText: {
    color: "#555",
    fontSize: 16
  },
  footerIcon: {
    margin:20
  }
});

export default HomeScreen;
