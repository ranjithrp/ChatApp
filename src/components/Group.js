import React from 'react';

import {
View,
TouchableOpacity,
Text,
ScrollView,
StyleSheet
} from 'react-native';

import {
    List,
    ListItem,
    Header
} from 'react-native-elements';

import {
    Actions, 
} from 'react-native-router-flux';

import Backend from '../Backend';

export class Group extends React.Component{
     static navigationOptions = ({ navigation }) => ({
            title: 'Group'
        })
    state ={
        groups:[]
    };

    renderGroup1(){
         return this.state.groups.map((data) => {
            return (
                <View><Text>{data.title}</Text></View>
            )
        });
    }

    moveToGroupChat(eachGroup) {
        this.props.navigation.navigate('Chat', eachGroup);
    }

    renderGroup(){
         return (
             <ScrollView>
                <Header />
                <List>
                    {this.state.groups.map((eachGroup) => (
                        <ListItem
                            title={`${eachGroup.title}`}
                            onPress={() => this.moveToGroupChat(eachGroup)}
                        />
                    ))}
                </List>
             </ScrollView>
         )
    }
    
    render() {
        return(
            <View>
                {this.renderGroup()}
                <TouchableOpacity
                    onPress={()=>{
                        //Actions.addGroup();
                        this.props.navigation.navigate('AddGroup')
                    }}
                >
                    <Text style={styles.buttonText}>Add Group</Text>
                </TouchableOpacity>
            </View>
        )
    }

     componentDidMount() {
        Backend.loadGroups((group) => {
            this.setState((previousState) => {
                 if (!Array.isArray(group)) {
                        group = [group];
                    }
                return {
                    groups: group.concat(previousState.groups)
                };
            });
        });
    }

    componentWillUnmount() {
        Backend.closeGroup();
    }
}

const styles=StyleSheet.create({
    buttonText:{
        marginLeft:20,
        fontSize:20
    }
})