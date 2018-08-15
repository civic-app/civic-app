import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import colors from '../styles/colors';

const VoterRegistrationScreen = props => {
    return (
        <View style={styles.container}>
            <Image style={styles.civicLogo} source={require('../assets/images/civic-logo-white.png')} />
            <Text>Have you registered to vote?</Text>
            <Button {...this.sharedButtonProps}
                title="Yes" onPress={this.goToApp} />
            <Button {...this.sharedButtonProps}
                title="No" onPress={() => undefined} />
        </View>
    );
};

VoterRegistrationScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        push: PropTypes.func,
    }),
};

goToApp = () => {
    this.props.navigate('App');
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    civicLogo: {
        height: 65,
        width: 178,
        marginTop: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 3,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});

sharedButtonProps = {
    borderRadius: 3,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
};

export default VoterRegistrationScreen;
