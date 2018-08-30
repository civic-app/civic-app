import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../styles/colors';
import { connect } from 'react-redux'
import { userRegistered } from '../auth/redux'
import { getUserRegistered } from '../auth/selectors'

class VoterRegistrationScreen extends React.Component {
    static propTypes = propTypes;
    goToTurboVote = () => this.props.navigation.navigate('TurboVote');

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Let's get you registered to vote!</Text>
                <Text style={styles.textSubheader}>Registering takes 3 minutes.</Text>
                <Image style={styles.voterLogo} source={require('../assets/images/VoterBox.png')} />
                <Button {...this.sharedButtonProps}
                    buttonStyle={{
                        marginTop: 45,
                    }}
                    backgroundColor={colors.red}
                    title="Register To Vote" onPress={this.goToTurboVote} />
            </View>
        );
    }
}

const propTypes = {
    navigation: PropTypes.objectOf({
        navigate: PropTypes.func,
        push: PropTypes.func,
    }),
};

VoterRegistrationScreen.propTypes = {
    isRegistered: PropTypes.bool,
    isUserRegistered: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    voterLogo: {
        height: 158,
        width: 145,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 28,
        marginTop: 70,
    },
    textSubheader: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30,
    },
});

sharedButtonProps = {
    borderRadius: 5,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
};

export default connect(
    (state) => ({ isRegistered: getUserRegistered(state) }),
    { isUserRegistered: userRegistered },
)(VoterRegistrationScreen);
