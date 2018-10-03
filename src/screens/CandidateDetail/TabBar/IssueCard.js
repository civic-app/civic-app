import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from '../../../styles/colors';
import PropTypes from 'prop-types';
import Mixins from '../../../styles/mixins';

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
      <View styles={styles.container}>
        <TouchableHighlight
          onPress={ toggleExpand }
          underlayColor={'rgba(0,0,0,0.1)'}
        >
          <View style={styles.issueCard}>
            <View style={styles.issueCardTop}>
              <Icon
                name={agreesWithUser ? 'check' : 'close'}
                type="material-community"
                size={30}
                color={agreesWithUser ? Colors.green : Colors.red }
                containerStyle={styles.issueMatchIcon}
              />
              <Text style={styles.issueText}>
                {agreesWithUser ? 'Agree' : 'Disagree'} on {type} issues</Text>
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
            <View
              style={{backgroundColor:Colors.white}}
            >
            {isExpanded &&
              <Text style={styles.issueBody}>
                {body}
              </Text>            
            }
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: Colors.white
  },
  issueCard: {
    margin:5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.white,
    ...Mixins.shadow
  },
  issueCardTop: {
    flexDirection:'row',
    alignItems: 'center'
  },
  issueText: {
    fontSize: 16,
    backgroundColor: Colors.white
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
    paddingRight: 20,
    color: 'rgba(0, 0, 0, 0.5438)',
    paddingBottom: 20
  }
});

IssueCard.propTypes = {
  type: PropTypes.string,
  body: PropTypes.string,
  agreesWithUser: PropTypes.bool,
};

export default IssueCard;
