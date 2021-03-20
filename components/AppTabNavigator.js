import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import RequestBloodScreen from '../screens/RequestBloodScreen';
import {AppStackNavigator} from './AppStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    donateBlood: {screen:AppStackNavigator, navigationOptions: {
        tabBarIcon:<Image source = {require("../assets/request-list.png")} style = {{
            width:20, height:20
        }}></Image>,
        tabBarLabel:"Donate Blood"
    }},
    requestBlood: {screen:RequestBloodScreen, navigationOptions: {
        tabBarIcon:<Image source = {require("../assets/request-book.png")} style = {{
            width:20, height:20
        }}></Image>,
        tabBarLabel:"Request Blood"
    }},
})