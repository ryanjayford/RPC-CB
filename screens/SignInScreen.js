import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
//import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Feather as Icon } from '@expo/vector-icons';
import Settings from '../settings.json';
import base64 from 'base-64'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';
import Checkbox from 'expo-checkbox';

import Users from '../model/users';
import moment from 'moment';

const {width,height} = Dimensions.get('window')
const logoUri = './assets/save.png'
const baseURL = Settings.site;
const baseURL1 = Settings.auth;
const baseURL2 = Settings.domain;
const ver = Settings.version;

const slideUp = {
  from: {
    transform: [{ scaleY: 1.5 }],
    width: width,
    height: height/1.80,
  },
  to: {
     transform: [{ scaleY: 1 }],
    width: width,
    height: height*1.85,
  },
};

const SignInScreen = ({navigation}) => {
    //alert('width ' + width + " " + 'height'  + height)
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isLoading: false
    });

    let [isChecked, setIsChecked] = React.useState(false);

    const { colors } = useTheme();

    const [{ signIn }] = React.useContext(AuthContext);

    let passwordInput = React.createRef();
    

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async (userName, password) => {
       //console.log('============>>>>',userName, password);
       
        if ( data.username.length == 0 || data.password.length == 0 ) {
            if(Platform.OS === 'web'){
                alert("Wrong Input!,\nUsername or password field cannot be empty.")
            }
            else {
                Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                    {text: 'Okay'}
                ]);
            }
            return;
        }

        setData({...data, isLoading: true});

        let url = baseURL1 + "/Token/Bearer?grant_type=authentication_code";
        let method = 'POST';
        let headers = new Headers();
        let auth = 'Basic ' + base64.encode(userName + ":" + password)
        
        headers.append('Content-Type', 'application/json');
        headers.append('src', 'CB');
        headers.append('udid', Math.random().toString());
        headers.append('Authorization', auth);
        
        
       //console.log('==============> Login', url, method, headers, auth);
        let req = new Request(url, {
            method,
            headers
        });
       //console.log('==============> ');
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
           //console.log(responseJson);
            if(responseJson && responseJson.identityToken){
                let expireAt = moment().add(1, 'days'); //moment.unix(responseJson.accessToken_expires_in).format('MM/DD/YYYY HH:MM:ss');
                let info = JSON.parse(base64.decode(responseJson.identityToken));
                let hasNewUpdate = false;
                if (isChecked) expireAt = moment().add(5, 'days');
                //console.log('EXPIREAT ========', expireAt.format('MM/DD/YYYY HH:MM:ss'));
                if (info.hasNewUpdate) hasNewUpdate = info.hasNewUpdate;
                //console.log('this is info', info);
                
                let details = {
                    "_id": info._id,
                    "email": info.email,
                    "firstName": info.firstName,
                    "lastName": info.lastName,
                    "userNumber": info.userNumber,
                    "userSponsorId": info.userSponsorId,
                    "apiToken": "bearer " + responseJson.accessToken, //"bearer eyd1c2VyTnVtYmVyJzoxNzE0LCd1c2VySWQnOidycmF5bXVuZG9AZWJnc3lzdGVtcy5jb20nLCd1c2VyVHlwZSc6J1AnLCd1c2VyU3RhdHVzJzonQScsJ3VzZXJTcG9uc29ySWQnOjEwMDB9", //
                    "changePassword": info.changePassword ? info.changePassword: false,
                    "passwordExpiry": info.passwordExpiry ? info.passwordExpiry: moment().add(4, 'days'),
                    "isGenerated": info.isGenerated ? info.isGenerated: false,
                    "expireAt": expireAt,
                    hasNewUpdate
                }
               //console.log("info ===>", expireAt, moment().add(1, 'days').format('MM/DD/YYYY HH:MM:ss'), info, details);
                getProfile(details);
            } else {
                setData({...data, isLoading: false});
                if(Platform.OS === 'web'){
                    alert("Invalid User!,\nUsername or password is incorrect.")
                }
                else {
                    Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                        {text: 'Okay'}
                    ]);
                }
                
                return;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            if(Platform.OS === 'web'){
                alert("Connection Error,\n" + error.message)
            }
            else {
                Alert.alert("Connection Error", error.message);
            }
            return false;
        });
    }

    const loginHandle1 = async (userName, password) => {
        //const foundUser = Users.filter( item => {
        //    return userName == item.username && password == item.password;
        //});

        //let foundUser = await signInAsync(userName, password, 'ABC123');

        //console.log(foundUser);
        
        if ( data.username.length == 0 || data.password.length == 0 ) {
            if(Platform.OS === 'web'){
                alert("Wrong Input!,\nUsername or password field cannot be empty.")
            }
            else {
                Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                    {text: 'Okay'}
                ]);
            }
            return;
        }

        setData({...data, isLoading: true});

        let url = baseURL + '/login';
        let method = 'POST';
        let headers = new Headers();
      
        let body = JSON.stringify({
            "username": userName,
            "password": password
        });
       
        headers.append('Content-Type', 'application/json');
       
        let req = new Request(url, {
            method,
            headers,
            body
        });

        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson && responseJson.success){
                //console.log("LOGIN==>", responseJson.details.apiToken);
                getDefaultPlanDetails(responseJson.details)
            } else{
                setData({...data, isLoading: false});
                if(Platform.OS === 'web'){
                    alert("Invalid User!,\nUsername or password is incorrect.")
                }
                else {
                    Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                        {text: 'Okay'}
                    ]);
                }
                return;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            if(Platform.OS === 'web'){
                alert("Connection Error,\n" + error.message);
            }
            else {
                Alert.alert("Connection Error", error.message);
            }
            return false;
        });
    }

    const getProfile = async (userDetails) => {
        let url = baseURL1 + '/Profile?info=profilepic';
        let method = 'GET';
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', userDetails.apiToken);
        headers.append('src', 'CB');
        headers.append('udid', Math.random().toString());
        //console.log('getProfile >>>>>>>>>>> ',url,method,headers);
        let req = new Request(url, {
            method,
            headers
        });
        
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson){
               //console.log('Profile Found');
            } else {
               //console.log('Profile Not Found.');
            }
            
            userDetails.profilePic = responseJson.profilePic
            getDefaultPlanDetails(userDetails);
        })
        .catch((error) => {
            userDetails.profilePic = "";
           //console.log("Connection Error", error.message);
            getDefaultPlanDetails(userDetails);
        });
    }

    const getDefaultPlanDetails = async (userDetails) => {
        let url = baseURL2 + '/Plans/PlanInit';
        let method = 'GET';
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', userDetails.apiToken);
        //headers.append('Host', 'rpc-api-test.azurewebsites.net');
        //console.log('EndPoint: ', url);
        //console.log('Method:', method);
        //console.log('Headers: ', headers);//,userDetails
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log('Response: ',responseJson);
            if (responseJson.isSuccess && responseJson.obj){
                getDefaultDropdown(userDetails, responseJson.obj);
            } else {
                setData({...data, isLoading: false});
                //console.log(responseJson.message);
                if(Platform.OS === 'web'){
                    alert("Auth Error,\n" + responseJson.message);
                }
                else {
                    Alert.alert("Auth Error", responseJson.message);
                }
                return null;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            if(Platform.OS === 'web'){
                alert("Connection Error,\n" + error.message);
            }
            else {
                Alert.alert("Connection Error", error.message);
            }
            return null;
        });
    }

    const getDefaultDropdown = async (userDetails, planDetails) => {
        let url = baseURL2 + '/CBLookUp/GetCBLookupTables';
        let method = 'GET';
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', userDetails.apiToken);
       
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.isSuccess && responseJson.obj){
                signIn(userDetails, planDetails, responseJson.obj);
            } else {
                setData({...data, isLoading: false});
                if(Platform.OS === 'web'){
                    alert("Data Error,\n" + responseJson.message);
                }
                else {
                    Alert.alert("Data Error", responseJson.message);
                }
                return null;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            if(Platform.OS === 'web'){
                alert("Connection Error,\n" + error.message);
            }
            else {
                Alert.alert("Connection Error", error.message);
            }
            return null;
        });
    }


    const register = async () => {
        let reportLink = 'https://ebgreg.azurewebsites.net/';
        let result = await WebBrowser.openBrowserAsync(reportLink);
    };    

    const forgotPassword = async () => {
        let reportLink = 'http://cb.ebgsystems.net/CashBalance/login/forgotpassword.aspx';
        let result = await WebBrowser.openBrowserAsync(reportLink);
    }


    const chkKeepMeSignedIn = () =>
    {       
        setIsChecked(isChecked = !isChecked);
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container,{backgroundColor: colors.accent}]}>
            <StatusBar barStyle="light-content"/>
            <View style = {styles.logocontainer}>
                {/* RPC LOGO and bounce animation*/}
                <View style = {styles.height}>
                    <Animatable.Image 
                        animation='bounceIn'
                        duration= {2000}
                        style = {styles.logo} source = {require('../assets/logo.png')} />
                

                    {/* text and bounce animation*/}
                    <Animatable.Text 
                        animation='bounceIn'
                        duration= {2000}
                        style = {styles.title}>Client Login</Animatable.Text>
                </View>
                {/*
                <View style = {styles.Header}>
                    <Animatable.Image 
                    animation='fadeInDownBig'
                    duration= {1000}
                    style={styles.img}  source = {require(logoUri)} />  
                </View>
                */}

                {/* header green circle and slide animation*/}
      
                <Animatable.View
                    animation= {slideUp}
                    duration= {1000}
                    //direction="reverse"
                    delay= {500}
                    style = {{ position: 'absolute' }}                   
                >            
                    <LinearGradient 
                    colors={['#397e05','#72be03']}
                    style = {styles.header}         
                    >
                    </LinearGradient>
                </Animatable.View>
             
            </View>
            
            {/* login design and function */}
            <Animatable.View 
                animation="fadeInUpBig"
                delay= {1000}
                style={styles.formContainer}>

                    <View style={[styles.InputStyle,{borderBottomColor: colors.Logintext}]}>
                        <Icon name= "mail" size={30} color={colors.Logintext} />
                        <TextInput
                            style={[styles.input,{color: colors.Logintext}]}
                            placeholder = "Email"
                            placeholderTextColor = {colors.placeholder}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                            onSubmitEditing={() => passwordInput.current.focus()}
                            keyboardType="email-address"
                            />
                    </View>
                    { data.isValidUser ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={[styles.errorMsg,{color: colors.Logintext}]}>Email must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                    <View style={[styles.InputStyle,{borderBottomColor: colors.Logintext}]}>
                        <Icon name= "lock" size={30} color={colors.Logintext} />
                        <TextInput 
                            style={[styles.input,{color: colors.Logintext}]}
                            placeholder = "Password"
                            placeholderTextColor = {colors.placeholder}
                            returnKeyType="go"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            ref={passwordInput} 
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                            onSubmitEditing={() => {loginHandle( data.username, data.password )}}
                        />     
                        <TouchableOpacity onPress = {updateSecureTextEntry}>
                            {data.secureTextEntry ? 
                                <Icon name="eye-off" size={30} color={colors.Logintext}/>
                                :
                                <Icon name="eye" size={30} color={colors.Logintext}/>
                            }
                        </TouchableOpacity>
                    </View>
                    { data.isValidPassword ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={[styles.errorMsg,{color: colors.Logintext}]}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.checkBox}>
                        <Checkbox
                            style={styles.checkStyle}
                            value={isChecked}
                            onValueChange={()=> chkKeepMeSignedIn()}
                            color={isChecked ? "#72be03" : colors.Logintext}
                        />
                        <Text style = {[styles.checkInput,{color: colors.Logintext}]}> Keep me signed in</Text>
                    </View>
                    
                    
                    <TouchableOpacity style = {styles.buttoncontainer} disabled = {data.isLoading}
                        onPress={() => {loginHandle( data.username, data.password )}}
                    >
                        <LinearGradient 
                        colors={['#72be03','#397e05']}
                        style = {styles.gradient}
                        start={[0, 1]} end={[1, 0]}
                        >
                        { data.isLoading ?
                            <ActivityIndicator size="large" color={colors.icontitle}/>
                            :
                            <Text style = {styles.buttonText}>LOGIN</Text>
                        }    
                        </LinearGradient>
                    </TouchableOpacity>

                    
                    <View style ={styles.lastoptions}>
                        <TouchableOpacity
                            onPress={() => forgotPassword()}
                        >
                            <Text style = {[styles.lastText,{color: colors.Logintext}]}>Cannot login?</Text>
                        </TouchableOpacity>

                        <Text style = {[styles.lastText,{color: colors.Logintext}]}>|</Text>

                        <TouchableOpacity
                            onPress={() => register()/*navigation.navigate('SignUpScreen')*/}
                        >
                            <Text style = {[styles.lastText,{color: colors.Logintext}]}>Register Today</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style = {[{textAlign: 'center', marginTop:40, color: colors.Logintext, fontSize:11}]}>{ver}</Text>
                    </View>
            </Animatable.View>

        </KeyboardAvoidingView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#465558',
        //overflow: 'hidden'
    },
    logocontainer: {
        position: 'relative',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        //position: 'absolute'
        
    },
    height: {
        zIndex: 3,
        elevation: 10,
        height: height/6.5,
    },
    logo: {
        //marginTop: Platform.OS === 'ios' ? 10 : 0,
        resizeMode: 'contain',
        height: height > 800 ? height/7.5 : height/6.5,
        //height: height/.5,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: height > 800 ? 35 : 25,
        fontWeight: 'bold',
        textAlign: 'center',
        //zIndex: 3,
        //elevation: 9
    },        
    header: {
        resizeMode: 'contain',
        width: width,
        height: height+100,
        transform: [{ scaleX: 1.6 }],
        //transform: [{ scaleY: 1 }],
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.5,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 2,
        //padding: '30%',
        borderRadius: width/2,
        //borderRadius: height > 800 ? 300 : 190,
        //borderBottomLeftRadius: 200,
        //borderBottomRightRadius: 200,
        
        //overflow: 'hidden'
       
    },
    
    formContainer: {
        flex: 2,
        padding: 30,
        marginTop: 35,
        //zIndex: 1,
        //overflow: 'visible',
        //backgroundColor: '#465558',
        
    },
    InputStyle: {
        paddingTop: 15,
        borderBottomColor: '#989c9d',
        borderBottomWidth: 1.5,
        flexDirection: "row",
        //zIndex: 0
    },
    input: {
        flex: 1,
        alignSelf: 'stretch',
        height: 30,
        marginBottom: 5,
        marginLeft: 5,
        fontSize: 15,
        //color: "#989c9d",  
        //fontWeight: 'bold',
    },
    checkBox: {
        flexDirection:'row',
        marginBottom: 10,
        marginTop: 5,
        //color: "#989c9d",
        //borderColor: "#989c9d",
    },
    checkStyle: {
        margin: 8,
    },
    checkInput: {
        fontSize: 13,
        //color: "#989c9d",  
        fontWeight: 'bold',
        marginTop: 8.5,
    },
    buttoncontainer: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.5,
        shadowRadius: 5,
        elevation: 5,
        //overflow: 'hidden'
    },
    gradient: {
        height: 60,
        //paddingVertical: 25,
        justifyContent: 'center',
        borderRadius: 5,
        //overflow: 'hidden'   
        
    },
    buttonText: {
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
        overflow: 'hidden'
    },
   
    lastoptions: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly',   
    },
    lastText: {
        //color: "#989c9d",
        fontSize: 15,
        fontWeight: 'bold',
    },
    errorMsg: {
        //color: '#FFFFFF',
        fontSize: 14,
    },
});
