import React, { Fragment } from 'react';
import { Text, Button } from 'react-native';
import PropTypes from 'prop-types';

const Failure = ({navigate}) => (
  <Fragment>
    <Text>We Couldn't Find Your District :( </Text>
    <Button title="Go to Elections" onPress={()=>navigate('Elections')} />
  </Fragment>
);

Failure.propTypes = {
  navigate: PropTypes.func
};

export default Failure;
