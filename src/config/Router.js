import React from 'react';
import {StackNavigator} from 'react-navigation';

import {Home} from '../components/Home';
import {Chat} from '../components/Chat';
import {Group} from '../components/Group';
import {AddGroup} from '../components/AddGroup';
import {Registration} from '../components/Registration';

export const MainNav = StackNavigator({
    Home :{
        screen:Home
    },
    Group:{
        screen:Group
    },
    AddGroup:{
        screen:AddGroup
    },
    Chat:{
        screen:Chat
    },
    Registration:{
        screen:Registration
    }
});