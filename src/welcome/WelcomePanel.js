import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { GoogleIcon } from './WelcomeImages';
import colors from '../styles/colors';
import PropTypes from 'prop-types';

var styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 25,
        flex: 1,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 7,
    },
});

class WelcomePanel extends React.Component {
    constructor(props) {
        super(props);

        this.icons = {
            'google': <GoogleIcon />
        };

        this.state = {
            image: <GoogleIcon />,
            title: 'Sign In With Google',
            expanded: true
        };
    }

    toggle() {

    }

    render() {        
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button color="white" backgroundColor="#eb5757" title="Register" onPress={() => undefined} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color="black" backgroundColor="#f2f2f2" title="Sign In" onPress={() => undefined} />
                </View>
            </View>
        );
    }
}
export default WelcomePanel;
