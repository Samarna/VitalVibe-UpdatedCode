import React,{Component} from 'react';
import {TouchableOpacity, TextInput, View, Text, StyleSheet, Alert,Image,Modal,ScrollView} from 'react-native';
import firebase from 'firebase';
import db from '../config.js';
import {RFValue} from 'react-native-responsive-fontsize';

export default class WelcomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            emailId : '',
            password : '',
            confirmPassword : '',
            isModalVisible : false,
            firstName : '',
            lastName : '',
            city : '',
            contact : '',
            bloodGroup : '',
            age : '',
        }
    }
    userSignup=(emailId,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("Passwords don't match!");
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then(()=>{
                db.collection('Users').add({
                    FirstName : this.state.firstName,
                    LastName : this.state.lastName,
                    EmailId : this.state.emailId.toLowerCase(),
                    Contact : this.state.contact,
                    City : this.state.city,
                    Age : this.state.age,
                    BloodGroup : this.state.bloodGroup,
                })
                return Alert.alert("User successfully created!",' ',[{text:'OK', onPress:()=>{
                    this.setState({
                        isModalVisible : false
                    })
                }}]);
            }).catch((error)=>{
                var errorMessage = error.message;
                console.log(errorMessage);
                return Alert.alert(errorMessage);
            })
        }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            //return Alert.alert("User successfully logged in!");
            console.log("User has logged in!")
            this.props.navigation.navigate('donateBlood');
        }).catch((error)=>{
            var errorMessage = error.message;
            console.log(errorMessage);
            return Alert.alert(errorMessage);
        })
    }
    showModal=()=>{
        return(
            <Modal 
            animationType ="slide"
            transparent = {true}
            visible = {this.state.isModalVisible}>
                    <ScrollView style = {styles.scrollview}>
                        <View style = {styles.signupView}>
                            <Text style={styles.signupText}>SIGN UP</Text>
                        </View>
                        <View style={{flex:0.95}}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "First Name"
                            maxLength = {12}
                            onChangeText = {
                                text =>{this.setState({
                                    firstName : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Last Name"
                            maxLength = {12}
                            onChangeText = {
                                text =>{this.setState({
                                    lastName : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Contact</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Contact Number"
                            maxLength = {10}
                            keyboardType = {'numeric'}
                            onChangeText = {
                                text =>{this.setState({
                                    contact : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>City</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "City"
                            onChangeText = {
                                text =>{this.setState({
                                    city : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Email</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Email"
                            keyboardType = {'email-address'}
                            onChangeText = {
                                text =>{this.setState({
                                    emailId : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Blood Group</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Blood Group"
                            onChangeText = {
                                text =>{this.setState({
                                    bloodGroup : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Age</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Age"
                            keyboardType = {'numeric'}
                            maxLength = {2}
                            onChangeText = {
                                text =>{this.setState({
                                    age : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Password</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Password"
                            secureTextEntry = {true}
                            onChangeText = {
                                text =>{this.setState({
                                    password : text,
                                })}
                            }></TextInput>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput style = {styles.formInput}
                            placeholder = "Confirm Password"
                            secureTextEntry = {true}
                            onChangeText = {
                                text =>{this.setState({
                                    confirmPassword : text,
                                })}
                            }></TextInput>
                            </View>
                            <View style = {{flex:0.2,alignItems:"center"}}>
                            <TouchableOpacity 
                            style = {styles.registerButton}
                            onPress = {()=>{
                                this.userSignup(this.state.emailId,this.state.password, this.state.confirmPassword)}
                            }>
                                <Text style = {styles.registerButtonText}>Register</Text>
                            </TouchableOpacity>
                            <Text style={styles.cancelButtonText}
                            onPress={()=>{
                                this.setState({
                                    isModalVisible : false,
                                })
                            }}>Cancel</Text>
                        </View>
                    </ScrollView>
            </Modal>
        );

    }
    render(){
        return(
            <View style={styles.container}>
            {this.showModal()}
               <View style={styles.vibeView}>
                    <Image source={require("../assets/logo.png")}
                    style={styles.Image}></Image>
                    <Image source={require("../assets/Vibe.png")}
                    style={styles.vibeImage}></Image>
                </View>
                <View style = {styles.TextInput}>
                    <TextInput style = {styles.loginBox} 
                    placeholder = "abc@example.com"
                    placeholderTextColor = "gray"
                    keyboardType = "email-address"
                    onChangeText = {(text)=>{
                        this.setState({
                            emailId : text,
                        })
                    }}></TextInput>
                    <TextInput style = {[styles.loginBox,{marginTop:RFValue(15)}]}
                    placeholder = "enter passcode"
                    placeholderTextColor = "gray"
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            password : text,
                        })
                    }}></TextInput>
            </View>
                <View style={{flex:0.5,alignItems:"center"}}>
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{
                    this.userLogin(this.state.emailId,this.state.password)
                }}>
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{
                    this.setState({
                        isModalVisible : true,
                    })
                }}>
                    <Text style = {styles.buttonText}>Sign-up</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : { 
        flex: 1,
        backgroundColor:"#ffffff",
    }, 
    profileContainer :{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center',
    },
    Image :{
        marginBottom:RFValue(50),
        width: "70%",
        height : "55%",
        resizeMode:"stretch",
    },
    button: {
        width: "50%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#833b61",
        shadowColor: "#000",
        marginBottom:RFValue(30),
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
    },
    buttonText: {
        color: "white",
        fontWeight: "200",
        fontSize: RFValue(20),
    },
    title : { 
        fontSize : 60, 
        fontWeight : "400", 
        paddingBottom:20, 
        color : '#4F6367', 
        marginTop: 20 
    }, 
    loginBox :{ 
        width : 300, 
        height : 20, 
        borderBottomWidth: 1.5, 
        borderColor : '#ff8a65', 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 , 
        alignItems : 'center' 
    }, 
    buttonContainer : { 
        flex:1, 
        alignItems:'center' 
    },
    TextInput : {
        flex:0.5,
        alignItems:"center",
        justifyContent:"center"
      },
    vibeView : {
        flex:0.75,
        justifyContent:"center",
        alignItems:"center",
        padding:RFValue(5)
    },
    vibeImage : {
        marginTop : RFValue(-100),
        width:"80%",
        height:"20%",
        resizeMode:"stretch"
    },
    scrollview:{
        flex: 1,
        backgroundColor: "#fff"
      },
      signupView:{
        flex:0.05,
        justifyContent:'center',
        alignItems:'center'
    },
    signupText:{
      fontSize:RFValue(20),
      fontWeight:"bold",
      color: "#833b61"
    },
    label:{
        fontSize:RFValue(13),
        color: "#833b61",
        fontWeight:'bold',
        paddingLeft:RFValue(10),
        marginLeft:RFValue(20)
    },
    formInput: {
         width: "90%",
        height: RFValue(45),
        padding: RFValue(10),
        borderWidth:1,
        borderRadius:2,
        borderColor:"grey",
        paddingBottom:RFValue(10),
        marginLeft:RFValue(20),
        marginBottom:RFValue(14)
    },
    registerButton: {
        width: "75%",
        height: RFValue(50),
        marginTop:RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(3),
        backgroundColor: "#833b61",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(10),
    },
    registerButtonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
    },
    cancelButtonText:{
        fontSize : RFValue(20),
        fontWeight:'bold',
        color: "#833b61",
        marginTop:RFValue(10)
    },
});