import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUserRegistered, userRegistered } from '../auth/redux';
import colors from '../styles/colors';

class VoterRegistrationSuccessScreen extends React.Component {
    static propTypes = propTypes;
    goToElections = () => this.props.navigation.navigate('Elections');

    render() {
        return (
            <View style={styles.container}>                
                <Text style={styles.textHeader}>Congrats! You're registered to vote.</Text>
                <Text style={styles.textSubheader}>We'll remind you when it's time to cast your ballot.</Text>
                <Image style={styles.checkLogo} source={require('../assets/images/Check.png')} />
                <Button {...this.sharedButtonProps}
                    buttonStyle={{
                        marginTop: 45,
                    }}
                    backgroundColor={colors.red}
                    title="Back to My Elections" onPress={this.goToElections} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    checkLogo: {
        height: 116,
        width: 116,
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

VoterRegistrationSuccessScreen.propTypes = {
    isRegistered: PropTypes.bool,
    isUserRegistered: PropTypes.func,
};

export default connect(
    (state) => ({ isRegistered: getUserRegistered(state) }),
    { isUserRegistered: userRegistered },
)(VoterRegistrationSuccessScreen);
