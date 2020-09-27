import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,ScrollView,TextInput,ActivityIndicator, Alert,Platform } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
//import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';
//import RadioButton from 'react-native-customizable-radio-button';

const {width,height} = Dimensions.get('window');

const ClassUpdate = ({ navigation,route }) => {
    const [{ClassAddorEdit },dataState] = React.useContext(AuthContext);
    let [Classload, setClassload] = React.useState(false); 
    let currentClasses = dataState.classData;
    let token = dataState.userToken;

    let userId = dataState.selectedPlan;
    //console.log('classEdited',dataState.classEdited)
    //console.log('classAdded',dataState.classAdded)
    //console.log(route.params?.State, 'State for classes')
    //console.log('Info in the Classupdatescreen',route.params?.Info)
    const { colors } = useTheme();

    let Edited = route.params?.Info;
    let contriTypeDes = null;
    //let Edited = dataState.censusEdited;
    if(route.params?.State !== 'addnew')
    {
        contriTypeTrim = Edited.contributionTypeDesc.trim();
        if(contriTypeTrim === 'Fixed Contribution per Individual')
        {
            contriTypeDes = 1;
        }
        else if(contriTypeTrim === 'Entire class gets the same percent as the 415 max for youngest')
        {
            contriTypeDes = 2;
        }
        else if(contriTypeTrim === 'Maximize Class to 415 Limit')
        {
            contriTypeDes = 3;
        }
        
        
        //error
    }
    let [classcode, setclasscode] = React.useState(route.params?.State === 'addnew' ? null : Edited.classCode); 
    let [classDes, setclassDes] = React.useState(route.params?.State === 'addnew' ? null : Edited.description); 
    let [contritype, setcontritype] = React.useState(route.params?.State === 'addnew' ? 1 : contriTypeDes); 
    let [cashBalance, setcashBalance] = React.useState(route.params?.State === 'addnew' ? null : Edited.cbValue); 
    let [cashAmt, setcashAmt] = React.useState( route.params?.State === 'addnew' ? "%" : Edited.cbValueType); 
    let [profitSharing, setprofitSharing] = React.useState(route.params?.State === 'addnew' ? null : Edited.psValue); 
    let [profitAmt, setprofitAmt] = React.useState(route.params?.State === 'addnew' ? "%" : Edited.psValueType);

    const CUpdateScroll = React.useRef();
    let [ContriTypeMargin, setContriTypeMargin] = React.useState(0);
    let [ContriTypeMarginhideDrop, setContriTypeMarginhideDrop] = React.useState(false); 

    let ContriTypeSelected = null;
    const DropContriTypeController = (ContriTypeSelected) => {

    if(ContriTypeSelected === 1)//ContriType
        {
            setContriTypeMargin(ContriTypeMargin = 150);
            setContriTypeMarginhideDrop(ContriTypeMarginhideDrop = true);
        }
    };


    const SaveArray = (navigation,Classload, setClassload, currentClasses, token) => {
        let hasError = false;
        
        //check if Class Code is blank
        if (classcode === null | classcode === "") {
            setClassload(Classload = false);
            hasError = true;
            Alert.alert("Error:", "Class code cannot be blank.");
        }
        //check if Class Code already Exist
        /*
        if (route.params?.State === 'addnew') {
            currentClasses.forEach(cls => {
                if (classcode === cls.classCode){
                    setClassload(Classload = false);
                    hasError = true;
                    Alert.alert("Error:", "Class code " + classcode + " already exist.");    
                }
            });
        }
        */

        //invalid CB
        if (cashBalance && isNaN(cashBalance)) {
            setClassload(Classload = false);
            hasError = true;
            let err = "Invalid Cash balance value."; //"Cash balance percent (%) must be from 0 to 200.";
            //if (cashAmt === '$') err = "Invalid Cash balance amount.";
            Alert.alert("Error:", err );    
        } //else if (cashBalance && cashBalance)


        //invalid PS
        if (profitSharing && isNaN(profitSharing)) {
            setClassload(Classload = false);
            hasError = true;
            let err = "Invalid Profit sharing amount."; //"Profit sharing percent (%) must be from 0 to 100.";
            //if (profitAmt === 'S') err = "Invalid Profit sharing amount.";
            Alert.alert("Error:", err); 
        }
        
        if (!hasError) {
            let ClassesState = 'ClassEdit';
            if (route.params?.State === 'addnew') ClassesState = 'ClassAdd';
            let StateArray = {
                PlanId: userId,
                ClassCode: classcode,
                Description: classDes === null? "" : classDes,
                ContributionType: contritype,
                CBValue: cashBalance === null? "0" : cashBalance,
                CBValueType: cashAmt,
                PSValue: profitSharing === null? "0" : profitSharing,
                PSValueType: profitAmt
            }
            setTimeout(() => {
                setClassload(Classload = false);
                ClassAddorEdit(navigation,StateArray,ClassesState, token);
            }, 500);
        }
        
    }  

    var contribution = [
        {label: 'Fixed Contribution per Individual', value: 1},
        {label: 'Entire class gets the same percent as the 415 max for youngest', value: 2},
        {label: 'Maximize Class to 415 Limit', value: 3},
    ]
    var Amt = [
        {label: '$', value: '$'},
        {label: '%', value: '%'},
    ]
   
       
    return(
        
        <View style ={styles.container}>
        {Classload === true ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          :
            <ScrollView ref={CUpdateScroll} style ={styles.scroll}>
                {/*<Text style={styles.header}>CLASS DETAIL ENTRY</Text>*/}
                <Text style={styles.columnNames}>Class Code {classcode === null | classcode === "" ?  <Text style={{color:'red'}}>*Required</Text> : null}</Text>
                    <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="Code"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={classcode}
                            keyboardType='default'
                            onChangeText={(val) => {setclasscode(classcode = val)}}
                        />
                <Text style={styles.columnNames}>Class Description</Text>
                    <TextInput 
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor = 'rgba(51,51,51,0.7)'
                        placeholder="Description"
                        style={[styles.textArea,{color: colors.Logintext}]}
                        //autoCapitalize="none"
                        value={classDes}
                        keyboardType='default'
                        onChangeText={(val) => {setclassDes(classDes = val)}}
                    />
                <Text style={styles.columnNames}>Contribution Type</Text>
                
                    <DropDownPicker
                            items={contribution}
                            isVisible={ContriTypeMarginhideDrop}
                            defaultIndex={0}
                            defaultValue={contritype}
                            zIndex={3}
                            //placeholder="Select number of years"
                            itemStyle={{justifyContent: 'flex-start'}}
                            placeholderStyle={{color: colors.Logintext}}
                            activeLabelStyle={{color: 'green'}}
                            labelStyle={{color: colors.Logintext}}
                            style={{borderWidth: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                            containerStyle={{ height: 40, flex: 1, marginTop: 5, marginBottom: ContriTypeMargin}}
                            arrowColor='rgba(51,51,51,0.5)'
                            onOpen={() => [ContriTypeSelected = 1,DropContriTypeController(ContriTypeSelected)/*,CUpdateScroll.current.scrollTo({ x: 0, y: 100, animated: true })*/]}
                            onClose={() => {[setContriTypeMarginhideDrop(ContriTypeMarginhideDrop = false),setContriTypeMargin(ContriTypeMargin = 0)]}}
                            onChangeItem={item => {setcontritype(contritype = item.value)}} //item.value
                        />
                        
                <Text style={styles.columnNames}>Cash Balance Amt</Text>
               
                    <View  style={{...(Platform.OS !== 'android'? {zIndex: 10,flexDirection: 'row'} : {flexDirection: 'row'})}}>
                        <TextInput 
                                placeholderTextColor = 'rgba(51,51,51,0.7)'
                                placeholder="Cash Amt"
                                style={[styles.textInput,{color: colors.Logintext}]}
                                //autoCapitalize="none"
                                value={cashBalance !== null ? cashBalance.toString() : null}
                                keyboardType='default'
                                onChangeText={(val) => {setcashBalance(cashBalance = val)}}
                            />

                        <DropDownPicker
                                items={Amt}
                                defaultIndex={0}
                                defaultValue={cashAmt}
                                zIndex={2}
                                //placeholder="Select number of years"
                                placeholderStyle={{color: colors.Logintext}}
                                activeLabelStyle={{color: 'green'}}
                                labelStyle={{color: colors.Logintext}}
                                style={{borderWidth: 1}}
                                itemStyle={{justifyContent: 'flex-start'}}
                                dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                                containerStyle={{ height: 40,width: 60, marginTop: 5,marginLeft: 10}}
                                arrowColor='rgba(51,51,51,0.5)'
                                onChangeItem={item => {setcashAmt(cashAmt = item.value)}} //item.value
                            />
                    </View>
                <Text style={styles.columnNames}>Profit Sharing Amt</Text>

                    <View  style={{...(Platform.OS !== 'android'? {zIndex: 9,flexDirection: 'row'} : {flexDirection: 'row'})}}>
                        <TextInput 
                                placeholderTextColor = 'rgba(51,51,51,0.7)'
                                placeholder="Profit Amt"
                                style={[styles.textInput,{color: colors.Logintext}]}
                                //autoCapitalize="none"
                                value={profitSharing !== null ? profitSharing.toString() : null}
                                keyboardType='default'
                                onChangeText={(val) => {setprofitSharing(profitSharing = val)}}
                            />

                        <DropDownPicker
                                items={Amt}
                                defaultIndex={0}
                                defaultValue={profitAmt}
                                zIndex={2}
                                //placeholder="Select number of years"
                                placeholderStyle={{color: colors.Logintext}}
                                activeLabelStyle={{color: 'green'}}
                                labelStyle={{color: colors.Logintext}}
                                style={{borderWidth: 1}}
                                itemStyle={{justifyContent: 'flex-start'}}
                                dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                                containerStyle={{ height: 40,width: 60, marginTop: 5,marginLeft: 10}}
                                arrowColor='rgba(51,51,51,0.5)'
                                onChangeItem={item => {setprofitAmt(profitAmt = item.value)}} //item.value
                            />
                    </View>
                
                <View style={styles.button}>
                <Text style={{color: 'grey',fontSize: 12, marginBottom: 10}}>*Note: You can only maximize one class to the 415 Limit. The design will not calculate if you attempt to maximize multiple classes.</Text>
                    <TouchableOpacity style={styles.signIn} onPress={() => {[setClassload(Classload = true), SaveArray(navigation,Classload, setClassload, currentClasses, token)]}}>
                        <LinearGradient
                            colors={['#72be03','#397e05']} //'#72be03','#397e05'
                            style={styles.signIn}
                            start={[0, 1]} end={[1, 0]}
                        >
                            <Text style={[styles.textSign, {color:'#fff'}]}>{route.params?.State === 'addnew' ? 'Save New' : 'Update'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {borderColor: '#333333', borderWidth: 1.5,marginTop: 15,marginBottom: 20}]}>
                        <Text style={[styles.textSign, {color: '#333333'}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </View>
            
    )
}



export default ClassUpdate;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      
    },
    scroll: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    header: {
        color: '#333333',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10,
    },
    columnNames: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    textArea: {
        flex: 1,  
        textAlignVertical: 'top',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#989c9d',
    },
    textInput: {
        flex: 1,  
        height: 40,
        borderBottomWidth: 1.5,
        borderBottomColor: '#989c9d',
    },
   
    button: {
        alignItems: 'center',
        marginTop: 10
        
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
        
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
  });