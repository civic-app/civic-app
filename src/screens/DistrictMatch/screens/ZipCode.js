import React, { Fragment } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import ButtonSubmit from '../../components/ButtonSubmit';
import PropTypes from 'prop-types';

const zipCodeImage = require('../../../assets/images/district-match-zip.png');

const ZipCode = ({styles, zipcode, error, handleChange, submit}) => {
  return(
    <Fragment>
      <Text style={styles.header}>Just one more thing</Text>
      <Image style={styles.image} source={zipCodeImage}/>
      <Text style={styles.bodyText}>We need your zip code to find your district.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          clearButtonMode="while-editing"
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="ZIP code"
          onChangeText={(value)=>handleChange({zipcode:value})}
          value={zipcode}
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
}

ZipCode.propTypes = {
  styles: PropTypes.object,
  zipcode: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  submit: PropTypes.func
}

export default ZipCode;
