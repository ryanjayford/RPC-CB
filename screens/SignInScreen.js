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
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
//import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Feather as Icon } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import Settings from '../settings.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';

const {width,height} = Dimensions.get('window')
const logoUri = './assets/save.png'
const baseURL = Settings.site;
const baseURL2 = Settings.domain
const ver = Settings.version;

const slideUp = {
  from: {
    width: width,
    height: height*1.85,
  },
  to: {
    width: width,
    height: height/1.80,
  },
};

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isChecked: false,
        isLoading: false
    });

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
        //const foundUser = Users.filter( item => {
        //    return userName == item.username && password == item.password;
        //});

        //let foundUser = await signInAsync(userName, password, 'ABC123');

        //console.log(foundUser);

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
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
                getDefaultPlanDetails(responseJson.details)
            } else{
                setData({...data, isLoading: false});
                Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                    {text: 'Okay'}
                ]);
                return;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            Alert.alert("Connection Error", error.message);
            return false;
        });
    }

    const getDefaultPlanDetails = async (userDetails) => {
        let url = baseURL2 + '/Plans/PlanInit';
        let method = 'GET';
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer {'userId':'" + userDetails.email + "','userType':'A','userStatus':'A','userSponsorId':1}");
       
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.isSuccess && responseJson.obj){
                getDefaultDropdown(userDetails, responseJson.obj);
            } else {
                setData({...data, isLoading: false});
                Alert.alert("Data Error", responseJson.message);
                return null;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            Alert.alert("Connection Error", error.message);
            return null;
        });
    }

    const getDefaultDropdown = async (userDetails, planDetails) => {
        let url = baseURL2 + '/CBLookUp/GetCBLookupTables';
        let method = 'GET';
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer {'userId':'" + userDetails.email + "','userType':'A','userStatus':'A','userSponsorId':1}");
       
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
                Alert.alert("Data Error", responseJson.message);
                return null;
            }
        })
        .catch((error) => {
            setData({...data, isLoading: false});
            Alert.alert("Connection Error", error.message);
            return null;
        });
    }





    const checkBoxTest = () =>
    {       
        setData({
            ...data,
            isChecked: !data.isChecked
        });
        alert("value is " + data.isChecked);
    }

    return (
        <View style={[styles.container,{backgroundColor: colors.accent}]}>
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
                    direction="reverse"
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
                        <CheckBox 
                        style={styles.checkStyle}
                        checkedCheckBoxColor ={'#72be03'}
                        uncheckedCheckBoxColor	= {colors.Logintext}
                        isChecked={data.isChecked} onClick = {()=> checkBoxTest}/>

                        <Text style = {[styles.checkInput,{color: colors.Logintext}]}>Keep me signed in</Text>
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
                        <TouchableOpacity>
                            <Text style = {[styles.lastText,{color: colors.Logintext}]}>Cannot login?</Text>
                        </TouchableOpacity>

                        <Text style = {[styles.lastText,{color: colors.Logintext}]}>|</Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                        >
                            <Text style = {[styles.lastText,{color: colors.Logintext}]}>Register Today</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                    <Text style = {[{textAlign: 'center', marginTop:40, color: colors.Logintext, fontSize:11}]}>{ver}</Text>
                    </View>
                </Animatable.View>

        </View>
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
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        //position: 'absolute'
        
    },
    height: {
        zIndex: 3,
        elevation: 10
    },
    logo: {
        //marginTop: Platform.OS === 'ios' ? 10 : 0,
        width: width/2,
        height: height/6.5,
        alignItems: 'center',

    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        //zIndex: 3,
        //elevation: 9
    },        
    header: {
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
        borderRadius: 190,
        //borderBottomLeftRadius: 200,
        //borderBottomRightRadius: 200,
        
        //overflow: 'hidden'
       
    },
    
    formContainer: {
        flex: 2,
        padding: 30,
        height: height/2,
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
        marginTop: 10,
        //color: "#989c9d",
        //borderColor: "#989c9d",
    },
    checkStyle: {
        marginLeft: 2.5,
    },
    checkInput: {
        fontSize: 13,
        //color: "#989c9d",  
        fontWeight: 'bold',
        marginTop: 2.5,
        marginLeft: 2.5,
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
        flex: 1,
        paddingVertical: 25,
        justifyContent: 'center',
        borderRadius: 5,
        //overflow: 'hidden'   
        
    },
    buttonText: {
        height: 25,
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
