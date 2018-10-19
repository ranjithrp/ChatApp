import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Backend from '../Backend';

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      header: null,
  })

  state = {
    email: '',
    password:''
  };
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <TouchableOpacity
            onPress= {() => (
              Backend.signOut()
            )}
            >
          <Image source={require('../images/connect-plus-logo.png')} 
                style={styles.logo}/>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder='Enter your email :'
            style={styles.textInput}
            autoCapitalize = 'none'
             underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
            value={this.state.email}
          />
          <TextInput
            placeholder='Password'
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize = 'none'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            value={this.state.password}
          />
          <TouchableOpacity style={styles.signin}
            onPress={() => {
                Backend.signInWithEmail(this.state.email, this.state.password, () => (
                  this.props.navigation.navigate('Group')
                ));
                
            }}
            >
            <Text style={styles.label}>
                Sign In
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>

            <TouchableOpacity
              onPress={() => {
                  this.props.navigation.navigate('Registration');
                  //Actions.register();
                  //Backend.signUpWithEmail(this.state.email, this.state.password);
              }}
              >
              <Text style={styles.label}>
                  Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#bdc3c7'
  },
  logo :{
    width:200,
    height:40,
  },
  logoContainer : {
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center',
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
  },
  textInput: {
    height: 40,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    marginBottom :20,
    color:'#FFF',
    paddingHorizontal:10,
  },
});