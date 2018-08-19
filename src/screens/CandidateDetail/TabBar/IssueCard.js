import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from '../../../styles/colors';
import posed from 'react-native-pose';
import PropTypes from 'prop-types';
import Mixins from '../../../styles/mixins';

const fast = ({ value, toValue, useNativeDriver }) =>
  Animated.timing(value, {
    toValue,
    useNativeDriver,
    duration: 100,
  });

const Wrapper = posed.View({
  closed: { height: 50, transition: () => false },
  open: { height: '110%', transition: fast }
});

class IssueCard extends Component {
  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState({isExpanded:!this.state.isExpanded})
  }

  render(){
    const { toggleExpand } = this;
    const { isExpanded } = this.state;
    const { type, body, agreesWithUser } = this.props;
    return(
      <Wrapper
        style={styles.container}
        pose={isExpanded ? 'open' : 'closed'}
      >
        <TouchableHighlight
          onPress={ toggleExpand }
          underlayColor={'rgba(0,0,0,0.1)'}
        >
          <View style={styles.issueCard}>
            <Icon
              name={agreesWithUser ? 'check' : 'close'}
              type="material-community"
              size={30}
              color={agreesWithUser ? Colors.green : Colors.red }
              containerStyle={styles.issueMatchIcon}
            />
            <Text style={styles.issueText}>
              {agreesWithUser ? 'Agree' : 'Disagree'} on {type} Issues</Text>
            <View
              style={styles.issueExpandButton}
            >
              <Icon
                name="chevron-down"
                type="material-community"
                size={30}
                color="#CDCDCD"
              />
            </View>
          </View>
        </TouchableHighlight>
        {isExpanded &&
          <Text style={styles.issueBody}>
            {body}
          </Text>
        }
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin:10,
    borderRadius: 2,
    backgroundColor: Colors.white,
    ...Mixins.shadow
  },
  issueCard: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  issueText: {
    fontSize: 16
  },
  issueMatchIcon: {
    padding: 10
  },
  issueExpandButton: {
    position: 'absolute',
    right:10
  },
  issueBody: {
    fontSize: 16,
    paddingLeft: 50,
    color: 'rgba(0, 0, 0, 0.5438)'
  }
});

IssueCard.propTypes = {
  type: PropTypes.string,
  body: PropTypes.string,
  agreesWithUser: PropTypes.bool,
};

export default IssueCard;
