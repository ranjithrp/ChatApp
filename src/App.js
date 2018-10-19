import React from 'react';

import {Home} from './components/Home';
import {Chat} from './components/Chat';
import {Group} from './components/Group';
import {AddGroup} from './components/AddGroup';

import {MainNav} from './config/Router'

/*import {
    Router,
    Scene
} from 'react-native-router-flux';*/

import {
    Platform
} from 'react-native'

export class App extends React.Component{
    render(){
        return(
            <MainNav />
            /*<Router>
                <Scene key='root' style={{paddingTop : Platform.OS ==='ios'? 64 : 54}}>
                    <Scene key='home' component={Home} title='Home' />
                    <Scene key='group' component={Group} title='Group' />
                    <Scene key='addGroup' component={AddGroup} title='Add Group' />
                    <Scene key='chat' component={Chat} title='Chat' />
                </Scene>
            </Router>*/
        )
    }
}