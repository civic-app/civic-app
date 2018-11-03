import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from '../../../styles/colors';
import PropTypes from 'prop-types';
import Mixins from '../../../styles/mixins';
import { Opinion } from '../viewSelectors';

class IssueCard extends Component {
  state = {
    isExpanded: false,
  }

  static propTypes = propTypes;
  toggleExpand = () => {
    this.setState({isExpanded:!this.state.isExpanded})
  }

  renderSeparator = () => {
    return(<View style = {{width: 10,}}/>)};

  toTitleCase = (str) =>{
    return str.toLowerCase().split(' ').map((s) => {
      return s.charAt(0).toUpperCase() + s.substring(1)
    }).join(' ')
  }

  render(){
    const { toggleExpand } = this;
    const { isExpanded } = this.state;
    const { type, body, source, agreesWithUser } = this.props;
    const cardConfig = toCardConfig(agreesWithUser);
    return(
      <View styles={styles.container}>
        <View style={styles.issueCard}>
          <View style={styles.issueCardTop}>
            <Icon
              name={cardConfig.icon}
              type="material-community"
              size={30}
              color={cardConfig.color }
              containerStyle={toIconContainerStyles(agreesWithUser)}
            />
            <Text style={styles.issueText}>
              {cardConfig.message} on {type} issues</Text>
            <View
              style={styles.issueExpandButton}
            >
              <TouchableHighlight
                onPressIn={ toggleExpand }
                underlayColor={'rgba(0,0,0,0.1)'}
              >
                <Icon
                  name="chevron-down"
                  type="material-community"
                  size={30}
                  color="#CDCDCD"
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ backgroundColor:Colors.white,}}>
            {isExpanded &&
            <View style={styles.issueBody}>
              <Text style={styles.issueBodyText}>
                {body}
              </Text>
              <FlatList
                data={source}
                horizontal={true}
                keyExtractor={(item) =>  item}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({item, index}) => (
                  <Text
                    onPress={() => this.props.navigation.navigate('Content', {
                      otherParam: this.toTitleCase(type), uri: item})}
                    style={styles.sourceText}>
                          [{(++index).toString()}]
                  </Text>

                )}
              />
            </View>
            }
          </View>
        </View>
      </View>
    )
  }
}

const toCardConfig = opinion => {
  switch (opinion) {
    case Opinion.Agree:
      return { icon: 'check', message: 'Agree', color: Colors.green } ;
    case Opinion.Disagree:
      return { icon: 'close', message: 'Disagree', color: Colors.red } ;
    case Opinion.Neutral:
      return { icon: 'minus', message: 'You\'re neutral', color: Colors.gray } ;
    case Opinion.Unknown:
    default:
      return { icon: 'question', message: 'Unknown', color: Colors.gray } ;
  }
};

const toIconContainerStyles = opinion =>
  opinion === Opinion.Unknown ? styles.unknownIcon : styles.issueMatchIcon;

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
    padding: 10,
  },
  unknownIcon: {
    padding: 10,
    paddingRight: 17,
    paddingLeft: 17,
  },
  issueExpandButton: {
    position: 'absolute',
    right:10
  },
  sourceText:{
    fontSize: 16,
    paddingTop: 10,
    color: Colors.lightBlue,
    fontWeight: 'bold'

  },
  issueBodyText: {
    color: 'rgba(0, 0, 0, 0.5438)',
    fontSize: 16,
  },
  issueBody: {
    paddingLeft: 50,
    paddingRight: 20,
    paddingBottom: 20
  },
});

IssueCard.propTypes = {
  type: PropTypes.string,
  body: PropTypes.string,
  source:PropTypes.array,
  agreesWithUser: PropTypes.oneOf(Object.values(Opinion)),
};

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default IssueCard;
