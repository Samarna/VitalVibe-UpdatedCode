import React,{Component} from "react";
import {View,Text} from "react-native";

export default class DonateBloodScreen extends Component{
    constructor(){
        super();
        this.state={
            requestedBooksList : [],
        };
        this.requestRef = null;
    }
    render(){
        return(
            <View></View>
        )
    }
}