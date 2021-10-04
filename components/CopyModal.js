import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,Dimensions,ScrollView,TextInput,Alert,ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import{ AuthContext } from '../components/context';
import RadioButtonRN from 'radio-buttons-react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Settings from '../settings.json';
const baseURL = Settings.domain;
//import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');

const CopyModal = ({ navigation,route }) => {
    const [{},dataState] = React.useContext(AuthContext);
    let copy = route.params?.CopyInfo;
   //console.log('OpenModal', copy)
    let [isLoading, setIsLoading] = React.useState(false);
    //let [Hide, setHide] = React.useState(true);
    const { colors } = useTheme();
    //console.log('dataState',dataState.plan)
    let [planID, setPlanId] = React.useState(copy.planId);     
    let [planName, setPlanName] = React.useState(""); 
    let [planDesc, setPlanDesc] = React.useState(copy.planDescription);
    let [userName, setUserName] = React.useState(dataState.userName);
    let [includeDetail, setIncludeDetail] = React.useState(false);
    let [userNumber, setuserNumber] = React.useState(copy.userNumber);
    let [sponsorId, setsponsorId] = React.useState(dataState.userSponsorId);


    const data = [
        {
          id: 1,
          label: 'Yes'
         },
         {
          id: 2,
          label: 'No'
         }
        ];

    
    
        
    const CopyNow = async() => {
        if ( planName == 0) {
            setIsLoading(isLoading = false)
            Alert.alert('Invalid Plan Name', 'Plan Name field cannot be empty.', [
                {text: 'OK'}
            ]);
            return;
        }

        let url = baseURL + '/Plans/PlanCopy';
        let method = 'POST';
        let headers = new Headers();
        let body = {"planId":planID,
        "planName":planName,
        "planDesc":planDesc,
        "userName":userName,
        "includeDetail":includeDetail == 2? true: false,
        "userNumber":userNumber,
        "sponsorId":sponsorId
        } 
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
        
       //console.log(method,headers,body,url);

        body = JSON.stringify(body);
        let req = new Request(url, {
            method,
            headers,
            body
        });
        
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            
            if (responseJson.isSuccess){
               //console.log("copy plan", responseJson);
                Alert.alert('Plan Copy', 'Copy plan complete.', [
                    {text: 'OK' , onPress: () =>{[
                        navigation.navigate('Plan Directory', {screen: 'Plan List', params: {CopyPlan: true}})
                    ]}}
                ]);
            } else{
                Alert.alert("Save Error", responseJson.message);
            }
        })
        .catch((error) => {
            Alert.alert("Connection Error", error.message);
            return false;
        });
    } 


    return(
       
        <Modal
            animated={true}
            //ref={ref => (this._modal = ref)}
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {}}  
        >
       
        <View style ={styles.ModalBackground}>
            <View style ={styles.Modalcontainer}>

                <View style={[styles.Colorcontainer, {backgroundColor: colors.icon}]}>
                    <View style={styles.headercontainer}>
                        <Text style={[styles.header,{padding: 5}]}>Plan Duplication</Text>
                        <TouchableOpacity style={{ padding: 5, borderRadius: 10}} onPress={() => {navigation.goBack()}}>
                            <Text style={styles.header}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" keyboardVerticalOffset={100}>
                    <ScrollView style={styles.scroll}>
                        <Text style={styles.TitleName}>Original Plan</Text>
                        <View style={styles.columnNamesContainer}>
                            <Text style={styles.columnNames}>Plan Name: {copy.planName}</Text>
                            
                            <Text style={styles.columnNames}>PLan Description: {copy.planDescription}</Text>
                            <Text style={styles.columnNames}>User ID: {copy.email}</Text>
                            
                            <Text style={styles.columnNames}>Copy Plan Detail Only</Text>
                                <RadioButtonRN
                                    data={data}
                                    activeOpacity={1}
                                    initial={2}
                                    animationTypes={['pulse']}
                                    style={{paddingLeft: 10,flexDirection: 'row'}}
                                    textStyle={{paddingLeft: 10}}
                                    boxStyle={{width: 70}}
                                    box={false}
                                    selectedBtn={(e) => {setIncludeDetail(includeDetail = e.id)}}
                                    circleSize={12}
                                    activeColor={'#333333'}
                                    deactiveColor={'grey'}
                                    textColor={'#333333'}
                                />
                        </View>
                        <Text style={styles.TitleName}>New Plan</Text>
                        <View style={styles.columnNamesContainer}>
                            <Text style={styles.columnNames}>Plan Name</Text>
                            <TextInput 
                                    placeholderTextColor = 'rgba(51,51,51,0.7)'
                                    placeholder="Name"
                                    style={[styles.textInput,{color: colors.Logintext}]}
                                    //autoCapitalize="none"
                                    value={null}
                                    keyboardType='default'
                                    onChangeText={(val) => {setPlanName(planName = val)}}
                                />
                            <Text style={styles.columnNames}>PLan Description</Text>
                            <TextInput 
                                    placeholderTextColor = 'rgba(51,51,51,0.7)'
                                    placeholder="Description"
                                    style={[styles.textInput,{color: colors.Logintext}]}
                                    //autoCapitalize="none"
                                    value={planDesc}
                                    keyboardType='default'
                                    onChangeText={(val) => {setPlanDesc(planDesc = val)}}
                                />
                            <Text style={styles.columnNames}>User ID: {copy.email}</Text>
                            
                        </View>

                        <View style={styles.button}>
                        
                            <TouchableOpacity style={[styles.signIn,{marginRight: 2.5}]} disabled={isLoading} onPress={() => {[setIsLoading(isLoading = true), CopyNow()]}}>
                                <LinearGradient
                                    colors={['#72be03','#397e05']} //'#72be03','#397e05'
                                    style={styles.signIn}
                                    start={[0, 1]} end={[1, 0]}
                                >
                                    {isLoading ?
                                        <ActivityIndicator size="large" color={colors.icontitle}/>
                                        :
                                        <Text style={[styles.textSign, {color:'#fff'}]}>Copy</Text>
                                    } 
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {borderColor: '#333333', borderWidth: 1.5,marginLeft: 2.5}]}>
                                <Text style={[styles.textSign, {color: '#333333'}]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    
        </Modal>
       
    )
}

export default CopyModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(51,51,51, 0.9)'
    },
    Modalcontainer: {
        //flex: 1,
        height: height/1.3,
        //borderRadius: 5,
        //marginBottom: 150,
        //marginTop: 150,
        marginRight: 30,
        marginLeft: 30,
        top: '10%',
        //padding: 20,
        //backgroundColor: 'rgba(51,51,51,1)',
        backgroundColor: 'white',
       //justifyContent: 'center'
    },
    Colorcontainer: {
        padding: 5,
        /*backgroundColor: '#00BFFF',*/
        //justifyContent: 'center'
        textAlign: 'center'
        
    },
    headercontainer: {
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',      
        justifyContent: 'space-between',
        
    },
    header: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
        alignContent: 'center',
    },
    scroll: {
        //marginTop: 5,
        marginBottom: 5,
        //paddingHorizontal: 15,
    },
    textInput: {
        flex: 1,  
        height: 40,
        borderBottomWidth: 1.5,
        borderBottomColor: '#989c9d',
    },
    TitleName: {
        padding: 2.5,
        paddingHorizontal: 15,
        color: 'grey',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: 'lightgrey'
    },
    columnNamesContainer: {
        paddingHorizontal: 25,
    },

    columnNames: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    Copyinfo: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5,
        //fontWeight: 'bold'
    },
    button: {
        //backgroundColor: 'grey',
        //marginTop: 10,
        margin: 10,
        flexDirection: 'row'

    },
    signIn: {
        flex: 1,

        height: 40,
        justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 5
        
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
  
  });