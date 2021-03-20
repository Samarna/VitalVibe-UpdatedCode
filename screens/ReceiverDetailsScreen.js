import React,{Component} from "react";
import {View,Text} from "react-native";

export default class ReceiverDetailsScreen extends Component{
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            RequesterName : '',
            Status : '',
            BloodType : '',
            Quantity : '',
            requestId : '',
            Id : '',
        }
    }
    render(){
        return(
            <View>
            </View>
        )
    }
}