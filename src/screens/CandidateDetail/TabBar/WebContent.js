import React, { Component } from 'react';
import { View, StyleSheet, WebView, ActivityIndicator } from 'react-native';
import Colors from '../../../styles/colors';
import PropTypes from 'prop-types';

class Content extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.otherParam : 'Content',
    }
  };
  static propTypes = propTypes;
  loadActivityIndicator = () => {
    return (
      <ActivityIndicator
        color='#ff5722'
        size='large'
        style={styles.indicatorStyle}
      />
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const uri = params ? params.uri : null;

    return (
      <View style={styles.container}>
        <WebView
          style={{flex: 1}}
          source={{uri: uri}}
          renderLoading={this.loadActivityIndicator}
          startInLoadingState={true}
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: Colors.white
  },
  indicatorStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default Content;