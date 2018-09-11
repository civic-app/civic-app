import React, { Fragment } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import ButtonSubmit from '../../components/ButtonSubmit';
import PropTypes from 'prop-types';

const addressImage = require('../../../assets/images/district-match-address.png');

const Address = ({styles, address, city, error, handleChange, submit}) => {
  return(
    <Fragment>
      <Text style={styles.bodyText}>Oops! Your zip code spans several districts. To help us identify your district, please enter your home address.</Text>
      <Image style={styles.image} source={addressImage}/>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          clearButtonMode="while-editing"
          keyboardType="default"
          style={styles.textInput}
          placeholder="Street Address"
          onChangeText={(value)=>handleChange({address:value})}
          value={address}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          clearButtonMode="while-editing"
          keyboardType="default"
          style={styles.textInput}
          placeholder="City"
          onChangeText={(value)=>handleChange({city:value})}
          value={city}
        />
        {
          <View>
            <Text style={styles.errorText}>{error && error}</Text>
          </View>
        }
        <ButtonSubmit onPress={submit}/>
      </View>
    </Fragment>
  )
};

Address.propTypes = {
  styles: PropTypes.object,
  address: PropTypes.string,
  city: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  submit: PropTypes.func
}

export default Address;
