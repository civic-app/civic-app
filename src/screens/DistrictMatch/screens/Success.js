import React, { Fragment } from 'react';
import { Text, Button } from 'react-native';
import PropTypes from 'prop-types';

const Success = ({district, navigate}) => (
  <Fragment>
    <Text>Your District Is: {district}</Text>
    <Button title="Go to Elections" onPress={()=>navigate('Elections')} />
  </Fragment>
);

Success.propTypes = {
  district: PropTypes.string,
  navigate: PropTypes.func
};

export default Success;
