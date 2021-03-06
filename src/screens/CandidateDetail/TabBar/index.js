import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AboutTab from './AboutTab';
import MatchTab from './MatchTab';
import NewsTab from './NewsTab';
import TabItem from './TabItem';

class TabBar extends Component {
  state = {
    selectedTab: 'Match',
  };

  // Replace with Redux Action
  renderSelectedView = () => {
    switch(this.state.selectedTab){
      case 'Match':
        return this.props.matchTab && <MatchTab {...this.props.matchTab} navigation={this.props.navigation}/>;
      case 'About':
        return this.props.aboutTab && <AboutTab {...this.props.aboutTab} />;
      case 'News':
        return this.props.newsTab && <NewsTab {...this.props.newsTab} />;
      default:
        return null;
    }
  }

  handlePress = (selectedTab) => {
    this.setState({selectedTab})
  }

  render(){
    const { handlePress, renderSelectedView } = this;
    const { selectedTab } = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TabItem
            name='Match'
            selectedTab={selectedTab}
            handlePress={handlePress}
          />
          <TabItem
            name='About'
            selectedTab={selectedTab}
            handlePress={handlePress}
          />
          {/* TODO: Implement news backend */}
          {/*<TabItem*/}
          {/*name='News'*/}
          {/*selectedTab={selectedTab}*/}
          {/*handlePress={handlePress}*/}
          {/*/>*/}
        </View>
        <View styles={styles.viewArea}>
          {renderSelectedView()}
        </View>
      </View>
    )
  }
}

TabBar.propTypes = {
  matchTab: PropTypes.shape(MatchTab.proptypes),
  aboutTab: PropTypes.shape(AboutTab.proptypes),
  newsTab: PropTypes.shape(NewsTab.proptypes),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tabContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default TabBar;
