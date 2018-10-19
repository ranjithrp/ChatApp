import React from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import Backend from '../Backend';

import {
    Actions, 
} from 'react-native-router-flux';

export class AddGroup extends React.Component{
    static navigationOptions = ({ navigation }) => ({
            title: 'Add Group'
        })
    state={
        groupName : ''
    }
    render(){
        return(
            <View>
                 <Text style={styles.title}>
                    Enter Group Name:
                </Text>
                <TextInput style={styles.nameInput}
                    placeholder='Group 1'
                    onChangeText={(text) => {
                        this.setState({
                            groupName:text
                        });                   
                    }}
                    value={this.state.groupName}
                    />
                <TouchableOpacity
                    onPress={()=>{
                        Backend.addGroup(this.state.groupName);
                        //Actions.group();
                        this.props.navigation.navigate('Group');
                    }}
                >
                    <Text style={styles.buttonText}>Submit</Text>
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