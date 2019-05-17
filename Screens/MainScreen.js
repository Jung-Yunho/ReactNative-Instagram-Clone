import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Icon } from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'

import HomeTab from './Tabs/HomeTab'
import SearchTab from './Tabs/SearchTab'
import AddMediaTab from './Tabs/AddMediaTab'
import LikesTab from './Tabs/LikesTab'
import ProfileTab from './Tabs/ProfileTab'

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: {screen: HomeTab},
    SearchTab: {screen: SearchTab},
    AddMediaTab: {screen: AddMediaTab},
    LikesTab: {screen: LikesTab},
    ProfileTab: {screen: ProfileTab}
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
        style: {
            ...Platform.select({
                ios:{
                    backgroundColor: 'white',
                }
            })
        },
        iconStyle: {height: 100},
        activeTintColor: '#000',
        inactiveTintColor: '#d1cece',
        upperCaseLabel: false,
        showLabel: false,
        showIcon: true,
    }
})

const AppTabContainer = createAppContainer(AppTabNavigator)

export default class MainScreen extends Component{
    static navigationOptions = {
        headerLeft: <Icon name='ios-camera' style={{paddingLeft:10}}/>,
        title: 'Instagram',
        headerRight: <Icon name='ios-send' style={{paddingRight:10}}/>
    }

    render() {
        return(
            <AppTabContainer/>
        )
    }
}
