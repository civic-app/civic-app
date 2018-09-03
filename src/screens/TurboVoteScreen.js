import React from 'react';
import { StyleSheet, WebView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

class TurboVoteScreen extends React.Component {
    static propTypes = propTypes;
    goToSuccessScreen = () => this.props.navigation.navigate('VoterRegSuc');

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: "https://inline.turbovote.org/?r=civic"
                    }}
                    style={{ flex: 1 }}
                />
                <Button {...this.sharedButtonProps}
                    buttonStyle={{
                        marginTop: 40,
                    }}
                    backgroundColor={colors.red}
                    title="Done with Registration" onPress={this.goToSuccessScreen} />
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
});

sharedButtonProps = {
    borderRadius: 5,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
};

export default TurboVoteScreen;
