import React, { useEffect, useRef } from 'react';
import { View, Text,Keyboard, Button, StyleSheet,TouchableOpacity, Image, Alert, Dimensions, TextInput,ActivityIndicator } from 'react-native';
//import { useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import RNModal from "react-native-modal";
import Settings from '../../settings.json';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import user from '../../model/users.js';
import { Formik } from 'formik';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
import moment from 'moment';
const window = Dimensions.get('screen');
const { width, height }  = window;
const baseURL1 = Settings.auth;

const ProfileScreen = ({ navigation }) => {
  //const paperTheme = useTheme();
  const [{ toggleTheme,setProfilePic }, dataState] = React.useContext(AuthContext);
  const initialValues = {
    old: '',
    new: '',
    confirm: '',
    image: ''
  }
  
  let [ProfileImage, setProfileImage] = React.useState(dataState.profilePic ? dataState.profilePic.indexOf('file') === -1 ? `data:image/jpeg;base64, ` + dataState.profilePic: dataState.profilePic: null);
  let [hasImageUri, sethasImageUri] = React.useState(false);
  let [showHidePassword, setshowHidePassword] = React.useState(false);
  let [newPassword, setnewPassword] = React.useState('');
  let [isLoading, setIsLoading] = React.useState(false);
  let [isVisible, setIsVisible] = React.useState(false);
  const [data, setData] = React.useState({
      hasError: false,
      disabled: true,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      changePW: false, 
      uri: '../../../assets/images/profile.png',
  });
  const { colors } = useTheme();

  const newPasswordInput = useRef();
  const confirmPasswordInput = useRef();
  
  useEffect(() => {
    //alert('refresh')
    setProfileImage(ProfileImage = dataState.profilePic ? dataState.profilePic.indexOf('file') === -1 ? `data:image/jpeg;base64, ` + dataState.profilePic: dataState.profilePic: null)
      //_makeRemoteRequest();
  }, [dataState.profilePic]);

  _makeRemoteRequest = async () => {
    let headers = {
        'Content-Type': 'application/json',
        'userId': dataState._id,
        'token': dataState.apiToken,
        'clientId': Settings.clientId,
    };
    //console.log('joborder sent size-->', sizeOf(headers));
    await fetch(Settings.site + '/api/joborders/?linemanId=' + dataState._id + '&type=1', {
        method: 'GET',
        headers ,
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //console.log('joborder received size-->', sizeOf(responseJson),responseJson);
       //console.log(responseJson);
        //this.setState({
        //    data: responseJson,
        //    loading: false,
        //    BadgeCount: 0 //responseJson.length,
        //});
    })
    .catch((error) => {
        let isConnectionError = error.message.includes('Unrecognized token');
        if (isConnectionError){
            Alert.alert("DAS Connection Error", "Unable to connect to server. Please try again later.");
            return false;
        } else {
            Alert.alert("DAS Issue", error.message);
            return false;
        }
    }); 
};

  
  const _pickImage = async() => {
    let CameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(CameraRollStatus.status === 'granted')
    {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [3, 3.5]
      })
      
      if(!result.cancelled) {
        sethasImageUri(hasImageUri = true);
        setProfileImage(ProfileImage = result.uri);
      }
    }
  }

  const _captureImage = async() => {
    let CameraStatus = await ImagePicker.requestCameraPermissionsAsync()
    if(CameraStatus.status === 'granted')
    {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [3, 3.5]
      })
    
      if (!result.cancelled) {
        sethasImageUri(hasImageUri = true);
        setProfileImage(ProfileImage = result.uri);
      }
    }
  }


  const saveImage = async (values) => {
    let url = baseURL1 + '/Profile';
    let method = 'PUT';
    let headers = new Headers();
    let body = JSON.stringify({"profilePic":values});
    
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', dataState.userToken);
    headers.append('src', 'CB');
    headers.append('udid', Math.random().toString());
    //console.log('getProfile >>>>>>>>>>> ',url,method,headers, values);
    let req = new Request(url, {
      method,
      headers,
      body
    });
    
    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson && responseJson.status === "Success"){
           //console.log('Saved', responseJson);
            //dataState.profilePic = values;
            SaveToStorage(values);
            Alert.alert(
              'Profile',
              'New profile picture saved.',
              [
                  {text: 'OK', onPress: () => {[setIsLoading(isLoading = false),
                                                sethasImageUri(hasImageUri = false),
                                                setIsVisible(isVisible = false),
                                                setProfilePic(values), 
                                                navigation.navigate('Home')]}}
              ]
            );
        } else {
           //console.log('Error Save');
            Alert.alert("Save Error", "Unable to save image. Please try again later.");
            sethasImageUri(hasImageUri = false);
            setIsVisible(isVisible = false)
            setIsLoading(isLoading = false);
        }
    })
    .catch((error) => {
      Alert.alert("Error", error.message);       
    });
  }

  const SaveToStorage = async(values) => {
    let userProfile = await AsyncStorage.getItem('userProfile');
    let userProfileObj = JSON.parse(userProfile);

    userProfileObj.profilePic =  values;
    await AsyncStorage.setItem('userProfile', JSON.stringify(userProfileObj));
  }


  const onSubmit1 = (values) => {

    dataState.profilePic = values;
    navigation.navigate('Home')
    /*
    if (isVisible === true) {
      
        if (values.old.toString().trim().length == 0){
            //this.setState({hasError: true});
            Alert.alert('Change Password','The Old Password field is required.');
            
        } else if (values.new.toString().trim().length == 0) {
            //this.setState({hasError: true});
            Alert.alert('Change Password','The New Password field is required.');
            
        } else if (values.confirm.toString().trim() != values.new.toString().trim()) {
            //this.setState({hasError: true});
            Alert.alert('Change Password','The New Password and Confirm Password field do not match.');
        } else {
            saveChanges(values);
        }
        
    } else {
        if (hasImageUri === true){
            saveChanges(values);
        } else {
            //this.setState({hasError: true});
            Alert.alert('User Account','No Changes Made.');
        }
    }*/
  }

  const onSubmit = async (values) => {
    //this.setState({disabled: true});
    if (values.trim().length > 0) {
      let h = 250;
      let w = 250;
      let manipResult = await ImageManipulator.manipulateAsync(
        values.trim(),
        [{ resize: {width: w, height: h} }], 
        {compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      
      saveImage(manipResult.base64);
      
      
    } else {
        //updatePassword(values.old, values.new);
    } 
    Keyboard.dismiss();
  };


  updatePortrait = async (file) => {
    await fetch(Settings.site + '/api/userportrait/'+ dataState._id , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'userId': dataState._id,
            'token': dataState.apiToken,
            'clientId': Settings.clientId,
        },
        body: JSON.stringify({
            "file": file
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.success){
            let suffix = moment().format('MMDDYYYYhhmmss');
            portrait = Settings.site + '/api/userportrait/'+ dataState._id + ".jpg?" + suffix; 
            dataState.portrait = portrait;
            dataState.suffix = suffix;
            Alert.alert(
                'Profile',
                'New profile picture saved.',
                [
                    {text: 'OK', onPress: () => { navigation.goBack()}}
                ]
            );
        } else{
            Alert.alert('Profile','Error: Please try again.');
        }
    })
    .catch((error) => {
        let isConnectionError = error.message.includes('Unrecognized token');
        if (isConnectionError){
            Alert.alert("DAS Connection Error", "Unable to connect to server. Please try again later.");
            return false;
        } else {
            Alert.alert("Error", error.message);
            return false;
        }
    });
    
};

updatePassword = async (oldPassword, newPassword) => {
  //console.log('====> Password', oldPassword, newPassword);

  await fetch(Settings.site + '/api/login/'+ dataState._id , {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'userId': dataState._id,
          'token': dataState.apiToken,
          'clientId': Settings.clientId,
      },
      body: JSON.stringify({
          "oldPassword": oldPassword,
          "newPassword": newPassword
      })
  })
  .then((response) => response.json())
  .then((responseJson) => {     
      if (responseJson.success){
          setIsVisible(false);
          Alert.alert(
              'Password',
              'New Password saved.',
              [
                  {text: 'OK', onPress: () => { navigation.goBack()}}
              ]
          );
      } else{
          Alert.alert('Password', responseJson.details);
      }
  })
  .catch((error) => {
      
      let isConnectionError = error.message.includes('Unrecognized token');
      if (isConnectionError){
          Alert.alert("DAS Connection Error", "Unable to connect to server. Please try again later.");
          return false;
      } else {
          Alert.alert("Error", error.message);
          return false;
      }
  });

};


  const validatePassword = () => {
    if (data.oldPassword.toString().trim().length == 0){
        Alert.alert('Change Password','The Old Password field is required.');
        
    } else if (data.newPassword.toString().trim().length == 0) {
        setData({...data, hasError: true});
        Alert.alert('Change Password','The New Password field is required.');
        
    } else if (data.confirmPassword.toString().trim() != data.newPassword.toString().trim()) {
        setData({...data, hasError: true});
        Alert.alert('Change Password','The New Password and Confirm Password field do not match.');
    } else {
        //updatePassword(data.oldPassword, data.newPassword);
    }
  }
  const onChangeOldPassword = (password) => {
    //, score, { label, labelColor, activeBarColor }
    setData({...data, oldPassword : password });
  }

  const onChangeNewPassword = (password) => {
    setData({...data, newPassword : password });
  }

  const onChangeConfirmPassword = (password) => {
    setData({...data, confirmPassword : password });
  }


  let submitText = 'grey';
  let submitBackcolor = 'lightgrey';

  if (hasImageUri === true && isVisible === false) {
    submitText = 'white';
    submitBackcolor = '#72be03';
  }


    return (
      <KeyboardAwareScrollView style={styles.container}>
          <RNModal style={styles.modalContainer} isVisible={isVisible}>
                <View style={{backgroundColor: "white", borderRadius: 4, borderColor: "rgba(0, 0, 0, 0.1)", width: width - 50, height: 430,}}>
                    <View>
                        <View style={styles.modalNavBar}>
                           
                            <Text allowFontScaling={false} style={styles.headerPassStyle}> Password Change</Text>
                           
                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <Icon style={{color: "white", marginLeft: 15}} name="close" size={25} />
                            </TouchableOpacity>                                
                           
                        </View>
                        <View style={[styles.modalBody, {marginTop:10}]}>
                            <View>
                                {/*<Text allowFontScaling={false} style={styles.textStyle2}>Update your password to continue.</Text>*/}
                                <Text allowFontScaling={false} style={{fontSize: 13, color: '#95a5a6', paddingLeft: 25 }}>
                                    Minimum of 8 characters. Must contain 1-small letter, 1-uppercase letter, 1-number, and 1-symbol.
                                </Text>
                                
                                <View style={{paddingLeft:25, paddingRight: 25, paddingTop: 15}}>
                                    <Text allowFontScaling={false} style={{fontSize: 13, color: '#16a085', fontWeight: 'bold', marginBottom: -15, paddingLeft: 10}}>Old Password</Text>
                                    {/*<RNPasswordStrengthMeter
                                        onChangeText={onChangeOldPassword}
                                        meterType ="bar"
                                        inputProps = { {placeholder: "Enter Old Password", secureTextEntry: true } }
                                        passwordProps = {{minLength: 1, scoreLimit: 100, width: width - 120}}
                                    />   */}                                
                                </View>
                                
                                <View style={{paddingLeft:25, paddingRight: 25}}>
                                    <Text allowFontScaling={false} style={{fontSize: 13, color: '#16a085', fontWeight: 'bold', marginBottom: -15, paddingLeft: 10}}>New Password</Text>
                                    {/*<RNPasswordStrengthMeter
                                        onChangeText={onChangeNewPassword}
                                        meterType ="bar"
                                        inputProps = { {placeholder: "Enter New Password", secureTextEntry: true } }
                                        passwordProps = {{minLength: 1, scoreLimit: 100, width: width - 120}}                                        
                                    />  */}                                 
                                </View>

                                <View style={{paddingLeft:25, paddingRight: 25}}>
                                    <Text allowFontScaling={false} style={{fontSize: 13, color: '#16a085', fontWeight: 'bold', marginBottom: -15, paddingLeft: 10}}>Confirm Password</Text>
                                    {/*<RNPasswordStrengthMeter
                                        onChangeText={onChangeConfirmPassword}
                                        meterType ="bar"
                                        inputProps = { {placeholder: "Confirm Password", secureTextEntry: true } }
                                        passwordProps = {{minLength: 1, scoreLimit: 100, width: width - 120}}
                                    /> */}                              
                                </View>                             
                                
                                <View style={styles.modalFooter}>
                                    <TouchableOpacity 
                                        disabled= {data.changePW}
                                        onPress={() => validatePassword()}
                                        style={[styles.bubble, styles.buttonModal, {width:120}]}>
                                        <Text allowFontScaling={false} style={{color:'white'}}>CHANGE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>        
                        </View>
                    </View>
                </View>
            </RNModal>
         
            <View>
              <View style={styles.leftNav}>
                <Text allowFontScaling={false} style={styles.textStyle}>Manage Account</Text>
              </View>  
              <View style={styles.profileBtn}>
                <View style={{ padding: 20}}>
                  { ProfileImage !== null ?
                    <Image source={{ uri: ProfileImage }} style={{ width: height > 800 ? 500 : 250, height: height > 800 ? 500 : 250, borderRadius: height > 800 ? 250 : 125 }}/> :
                    <Image source={require("../../assets/user.jpg")} style={{ width: height > 800 ? 500 : 250, height: height > 800 ? 500 : 250, borderRadius: height > 800 ? 250 : 125 }} />
                  }
                </View>
                <TouchableOpacity onPress={() => _captureImage()} style={[styles.bubble, styles.button, {width: '100%'}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="camera-plus" size={20} color="white" style={{marginRight: 5}} />
                    <Text allowFontScaling={false} style={{color:'white',fontWeight: 'bold'}}>CAPTURE PHOTO</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {_pickImage()}} style={[styles.bubble, styles.button, {width: '100%'}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="folder" size={20} color="white" style={{marginRight: 5}}/>
                    <Text allowFontScaling={false} style={{color:'white',fontWeight: 'bold'}}>SELECT PHOTO</Text>
                  </View>
                </TouchableOpacity>

                {/*
                  <TouchableOpacity onPress={() => setIsVisible(true)} style={[styles.bubble, styles.button, {width: '100%'}]}>
                    <Text allowFontScaling={false} style={{color:'white', fontWeight: 'bold'}}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
                */}

                  {/*showHidePassword ?
                    <View style={{paddingTop:20}}>
                        <TextInput
                          //onChangeText={(val) => setPlanEffDate(PlanEffDate = val)}
                          onChangeText={handleChange('old')}
                          value={values.old}
                          label="Old Password"
                          placeholder="Enter Old Password"
                          underlineColorAndroid="grey"
                          selectionColor = "red"
                          secureTextEntry
                          onSubmitEditing={() => newPasswordInput.current.focus()}
                        />
                        <TextInput
                            onChangeText={handleChange('new')}
                            value={newPassword}
                            label="New Password"
                            placeholder="Enter New Password"
                            secureTextEntry
                            ref={newPasswordInput} 
                            onSubmitEditing={() => confirmPasswordInput.current.focus()}
                        />
                        
                        <TextInput
                            onChangeText={handleChange('confirm')}
                            value={values.confirm}
                            label="Confirm Password"
                            placeholder="Confirm New Password"
                            secureTextEntry
                            ref={confirmPasswordInput}
                            onSubmitEditing={() => onSubmit(values)} 
                        />
                    </View>
                  : null*/}

                <TouchableOpacity disabled={hasImageUri === false && isVisible === false || isLoading === true } onPress={() => {[setIsLoading(isLoading = true), onSubmit(ProfileImage)]}} style={[styles.bubble, styles.button, {backgroundColor: submitBackcolor, width: '100%'}]}>
                    {isLoading ?
                        <ActivityIndicator size="large" color={'white'}/>
                        :
                        <Text allowFontScaling={false} style={{color: submitText, fontWeight: 'bold'}}>SUBMIT</Text>
                    }   
                </TouchableOpacity>
                </View>
              </View>
         
      </KeyboardAwareScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //alignItems: 'center', 
    //justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    //padding: 10
    //backgroundColor: 'white'
  },
  leftNav: {
    //flexDirection: 'row',
  },
  profileBtn: {
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 10,
  },
  textStyle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey'
  },
  bubble: {
      backgroundColor: '#72be03',
      //paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 5,
      //width: '100%'
  },
  button: {
      marginTop: 10,
      height: 45,
      justifyContent: 'center',
      //paddingHorizontal: 12,
      alignItems: 'center',
      //marginHorizontal: 10,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalNavBar: {
      height: 40,
      backgroundColor: '#16a085',
      elevation: 3,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  buttonModal: {
    marginTop: 12,
    //paddingHorizontal: 12,
    alignItems: 'center',
    ///marginHorizontal: 10,
  },
  modalFooter: {
    paddingRight: 17,
    //paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }, 
  headerPassStyle: {
    marginLeft: 10,
    //marginBottom: 5,
    fontSize:18,
    fontWeight: 'bold',
    color: 'white'
  },
});
