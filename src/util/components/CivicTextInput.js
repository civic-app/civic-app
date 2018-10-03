import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

class CivicTextInput extends React.Component {
  static propTypes = {
    // TODO: list all other TextInput props
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    onBlur: undefined,
    onFocus: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { borderBottomColor: colors.lightGray2 };
  }

  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({ borderBottomColor: colors.lightGray2 });
  };

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({ borderBottomColor: colors.darkBlue });
  };

  render() {
    return (
      <TextInput
        style={[styles.textInput, { borderBottomColor: this.state.borderBottomColor }]}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    color: colors.black,
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default CivicTextInput;
