import React, { Component, StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native'; 

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class WelcomePanel extends Component {
    constructor(props) {
        super(props);

        this.icons = {     
            'up': require('./images/Arrowhead-01-128.png'),
            'down': require('./images/Arrowhead-Down-01-128.png')
        };

        this.state = {       
            title: props.title,
            expanded: true
        };
    }

    toggle() {

    }


    render() {
        let icon = this.icons['down'];

        if (this.state.expanded) {
            icon = this.icons['up'];   
        }

        
        return (
            <View style={styles.container} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>

                <View style={styles.body}>
                    {this.props.children}
                </View>

            </View>
        );
    }
}
export default WelcomePanel;
