import React from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    CameraRoll,
    Button,
    Modal,
} from 'react-native';


import Backend from '../Backend';

export class Registration extends React.Component {
    state = {
        userName :'',
        email : '',
        password : '',
    }
    
    registerUser(uid, state, props) {
        console.log(state)
        Backend.addUser(uid, {
            userName:state.userName,
            email:state.email,
            groups :[]
        });
        props.navigation.navigate('Group');
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder='Name :'
                        style={styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText={(text) => {
                        this.setState({
                            userName: text,
                        });
                        }}
                        value={this.state.userName}
                    />
                    <TextInput
                        placeholder='Enter your email :'
                        style={styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText={(text) => {
                        this.setState({
                            email: text,
                        });
                        }}
                        value={this.state.email}
                    />
                    <TextInput
                        placeholder='passwords'
                        style={styles.textInput}
                        secureTextEntry={true}
                        autoCapitalize = 'none'
                        onChangeText={(text) => {
                        this.setState({
                            password: text,
                        });
                        }}
                        value={this.state.password}
                    />
                    <TouchableOpacity style={styles.signin}
                        onPress = {() => (
                            Backend.signUpWithEmail(this.state, this.props, this.registerUser)
                        )}
                        >
                        <Text style={styles.label}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#bdc3c7'
  },
  formContainer :{
    padding:20,
  },
  buttonView:{
        paddingVertical:10,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',  
        justifyContent:'space-around'
    },
  label: {
    textAlign:'center',
    color:'#FFF'
  },
  signin: {
    backgroundColor:'#2c3e50',
    paddingVertical : 15,
    marginBottom:20, 
  },
  textInput: {
    height: 40,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    marginBottom :20,
    color:'#FFF',
    paddingHorizontal:10,
  },
});