import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {
    Actions, 
} from 'react-native-router-flux';

export class Home extends React.Component{
    static navigationOptions = ({ navigation }) => ({
            title: 'Home'
        })
    state={
        name:''
    };
    render(){
        return(
            <View>
                <Text style={styles.title}>
                    Enter your name :
                </Text>
                <TextInput style={styles.nameInput}
                    placeholder='Jon Snow'
                    onChangeText={(text) => {
                        this.setState({
                            name:text
                        });                   
                    }}
                    value={this.state.name}
                    />
                <TouchableOpacity
                    onPress={()=>{
                        //Actions.group();
                        this.props.navigation.navigate('Group')
                    }}
                >
                    <Text style={styles.buttonText}>Next </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    title:{
        marginTop:20,
        marginLeft:20,
        fontSize:20
    },
    nameInput:{
        padding:5,
        height:40,
        borderWidth:2, 
        borderColor:'black',
        margin:20
    },
    buttonText:{
        marginLeft:20,
        fontSize:20
    }
})