import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../styles/colors';
import { GoogleIcon } from '../welcome/WelcomeImages.js';

class CredentialInputScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit() {
        this.props.onSubmit(this.state.email, this.state.password);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 18 }}>Sign Up for Civic</Text>
                    <TextInput style={styles.textStyle}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="E-mail address"
                    />
                    <TextInput style={styles.textStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                    <TextInput style={styles.textStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder="Re-type password"
                    />
                    <Text onPress={this.handleSubmit} style={{ textAlign: 'right' }}>SUBMIT</Text>
                    <Text style={{ textAlign: 'center' }}>or</Text>
                    <Button 
                        icon={<GoogleIcon />}
                        title='Sign up with Google'
                        buttonStyle={{
                            marginTop: 5,
                            borderRadius: 3
                        }}
                    />
                    <Button 
                        icon={<GoogleIcon />}
                        title='Continue with Facebook'
                        buttonStyle={{
                            backgroundColor: '#3B5998',
                            marginTop: 5,
                            borderRadius: 3
                        }}
                    />
                    <Text onPress={this.handleSubmit} style={{ textAlign: 'center' }}>Have an account? Sign In</Text>
                </View>                
            </View>
        );
    }
}

CredentialInputScreen.propTypes = {
    onSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        paddingTop: 10,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 140,
        marginBottom: 130,
        paddingLeft: 10,
        paddingRight: 10,
        width: 310,
        alignItems: 'stretch',
    },
    textStyle: {
        color: colors.black,
        fontSize: 16,
        paddingTop: 10,
    },
});

export default CredentialInputScreen;
