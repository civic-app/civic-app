import React from 'react';
import { WebView, Text } from 'react-native';

class TurboVoteScreen extends React.Component {
    render() {
        return (
            <WebView
                source={{
                    uri: "https://inline.turbovote.org/?r=civic" }}
            />
        );
    }
}

export default TurboVoteScreen;
