import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import MainScreen from './Screens/MainScreen'

const AppStackNavigator = createStackNavigator({
    Main : {
      screen: MainScreen
    }
})

export default createAppContainer(AppStackNavigator)