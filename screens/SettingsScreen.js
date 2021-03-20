import React,{Component} from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert} from "react-native";
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends Component{
    constructor(){
        super();
        this.state = {
            firstName : '',
            lastName : '',
            emailId : '',
            city : '',
            contact : '',
            docId : '',
            age : '',
            bloodGroup : '',
        }
    }
    componentDidMount(){
        console.log("App Started");
        this.getUserDetails();
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        console.log(email);
        db.collection('Users').where('EmailId','==',email).get().
        then(snapshot=>{snapshot.forEach(doc=>{
            var data = doc.data();
            this.setState({
                firstName : data.FirstName,
                lastName : data.LastName,
                city : data.City,
                contact : data.Contact,
                emailId : data.EmailId,
                docId : doc.id,
                age : data.Age,
            })
        })})
    }
    updateUserDetails=()=>{
        console.log(this.state.docId);
        db.collection('Users').doc(this.state.docId).update({
            FirstName : this.state.firstName,
            LastName : this.state.lastName,
            City : this.state.city,
            Contact : this.state.contact,
            Age : this.state.age,
        })
        Alert.alert("Profile Updated Successfully!");
    }   
    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings"
                navigation = {this.props.navigate}></MyHeader>
                <View style = {styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "first name"
                    maxLength = {10}
                    onChangeText = {(text)=>{
                        this.setState({
                            firstName : text,
                        })
                    }}
                    value = {this.state.firstName}></TextInput>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "last name"
                    maxLength = {10}
                    onChangeText = {(text)=>{
                        this.setState({
                            lastName : text,
                        })
                    }}
                    value = {this.state.lastName}></TextInput>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "contact"
                    maxLength = {10}
                    keyboardType = {'numeric'}
                    onChangeText = {(text)=>{
                        this.setState({
                            contact : text,
                        })
                    }}
                    value = {this.state.contact}></TextInput>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "city"
                    onChangeText = {(text)=>{
                        this.setState({
                            city : text,
                        })
                    }}
                    value = {this.state.city}></TextInput>
                    <TextInput style = {styles.formTextInput}
                    maxLength = {2}
                    keyboardType = {'numeric'}
                    placeholder = "age"
                    onChangeText = {(text)=>{
                        this.setState({
                            age : text,
                        })
                    }}
                    value = {this.state.age}></TextInput>
                    <TouchableOpacity style= {styles.button}
                    onPress = {()=>{
                        this.updateUserDetails()
                    }}>
                        <Text style = {styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({ 
    container : { 
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }, 
    formContainer:{ 
        flex:1, 
        width:'100%', 
        alignItems: 'center' 
    }, 
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10, 
    }, 
    button:{ 
        width:"75%", 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:10, 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8, },
        shadowOpacity: 0.44, 
        shadowRadius: 10.32, 
        elevation: 16, 
        marginTop:20 
    }, 
    buttonText:{ 
        fontSize:25, 
        fontWeight:"bold", 
        color:"#fff" 
    } 
})