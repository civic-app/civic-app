import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// Views
import {ZipCode, Address, Success, Failure} from './screens';
// API Method & Controller
import fetchDistrict from './fetchDistrict';
// styles
import Mixins from '../../styles/mixins';
import colors from '../../styles/colors';


class DistrictMatch extends Component {
  constructor(props){
    super(props);
    // Bind external fetchDistrict async function
    // acts as controller for component views, fetching districts, and handling errors
    this.fetchDistrict = fetchDistrict.bind(this);
  }

  state = {
    // params
    zipcode: '',
    address: '',
    city: '',
    // loading state
    isLoading: false,
    // view to load via switch statement in renderScreen method
    // options are ENTER_ZIPCODE, ADDRESS_NEEDED, DISTRICT_FOUND, and DISTRICT_NOT_FOUND
    view:'ENTER_ZIPCODE',
    // district response parsed from Google Civic API to be sent to elections screen
    district: '',
    // Error message in case of badly parsed request to API
    error: ''
  };

  submit = () => {
    // sets loading state and resets error state
    this.setState({isLoading: true, error: ''}, () => {
      // calls fetchDistrict in callback function so loading state can be set first
      this.fetchDistrict();
    })
  }

  handleChange = (input) => {
    // accepts an argument of an object with the state property and it's value
    // e.g. {city: 'Baltimore'}
    this.setState({...input});
  }

  renderScreen = () => {
    // pass main component render methods down to screen views
    const methods = {
      handleChange: this.handleChange,
      submit: this.submit,
      navigate: this.props.navigate
    };
    // control views based on view state
    switch(this.state.view){
      case 'ENTER_ZIPCODE':
        return <ZipCode styles={styles} {...this.state} {...methods} />;
      case 'ADDRESS_NEEDED':
        return <Address styles={styles} {...this.state} {...methods} />;
      case 'DISTRICT_FOUND':
        return <Success district={this.state.district} {...methods} />;
      case 'DISTRICT_NOT_FOUND':
        return <Failure {...methods}/>;
      // this.state.view should not be null
      default:
        return null;
    }
  }

  render(){
    const { zipcode, address, city, isLoading, view, district, error } = this.state;
    if(isLoading){
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderScreen()}
      </View>
    )
  }
}

// navigate function passed from index.js
DistrictMatch.propTypes = {
  navigate: PropTypes.func
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 25,
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    ...Mixins.shadow
  },
  header: {
    fontSize: 28,
    paddingTop: 20
  },
  bodyText: {
    fontSize: 18,
    width: 230,
    paddingTop: 20,
    textAlign: 'center'
  },
  image: {
    marginTop: 25,
    marginBottom:20
  },
  textInput: {
    color: colors.black,
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    padding: 20,
  },
  errorText: {
    color: colors.orange
  }
})

export default DistrictMatch;
