import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import DonateBloodScreen from '../screens/DonateBloodScreen';
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen';

export const AppStackNavigator = createStackNavigator ({
    bookDonateList : {screen:DonateBloodScreen,
    navigationOptions : {headerShown : false}},
    receiverDetails : {screen:ReceiverDetailsScreen,
    navigationOptions : {headerShown:false}}
},{
    initialRouteName : 'bookDonateList'
}) 