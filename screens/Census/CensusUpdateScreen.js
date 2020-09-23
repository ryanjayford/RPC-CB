import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,ScrollView,TextInput,Alert } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';
//import RadioButton from 'react-native-customizable-radio-button';
import RadioButtonRN from 'radio-buttons-react-native';
const {width,height} = Dimensions.get('window');

const AddModal = ({ navigation,route }) => {
    console.log(route.params?.State, 'State for census')
    //console.log('Info in the Censusupdatescreen',route.params?.CensusInfo)
  const { colors } = useTheme();
    const [{CensusAddorEdit},dataState] = React.useContext(AuthContext);
   // console.log('censusEdited',dataState.censusEdited)
   // console.log('censusAdded',dataState.censusAdded)
    let Censustoken = dataState.userToken;
    let CensusUserId = dataState.selectedPlan;
    let parameter = route.params?.State;
    let selectedUser = route.params?.CensusInfo; //'CensusAddUser'
    //alert(selectedUser.tags['pastService'])

    let [fname, setfname] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.Firstname); 
    let [lname, setlname] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.Lastname); 
    let [sex, setsex] = React.useState(parameter === 'CensusAddUser' ? 'M' : selectedUser.Sex); 
    let [pricipal, setpricipal] = React.useState(parameter === 'CensusAddUser' ? 1 : selectedUser.Principal); 
    let [owner, setowner] = React.useState(parameter === 'CensusAddUser' ? 1 : selectedUser.IsOwner); 
    let [familycode, setfamilycode] = React.useState(parameter === 'CensusAddUser' ? " " : selectedUser.FamilyCode); 
    let [datebirth, setdatebirth] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.dateOfBirth);
    let [datehire, setdatehire] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.dateOfHire);
    let [hourswork, sethourswork] = React.useState(parameter === 'CensusAddUser' ? '1000' : selectedUser.workHours.toString());
    let [pastservice, setpastservice] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.PastService.toString()); 
    let [LYcompensation, setLYcompensation] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.lastYearComp.toString()); 
    let [w2earnings, setw2earnings] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.W2Earnings.toString()); 
    let [catchup, setcatchup] = React.useState(parameter === 'CensusAddUser' ? 0 : selectedUser.HasCatchUp); //checking
    let [classtype, setclasstype] = React.useState('A - Owner HCEs'); 
    let [deferral, setdeferral] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.DeferralPercent); 
    let [deferralchoice, setdeferralchoice] = React.useState(parameter === 'CensusAddUser' ? '%' : selectedUser.DeferCode); 
    let [CashbalanceInput, setCashbalanceInput] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.CbPercent); 
    let [Cashbalancechoice, setCashbalancechoice] = React.useState(parameter === 'CensusAddUser' ? '%' : selectedUser.CbCode); 
    let [Profitsharinginput, setProfitsharinginput] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.PsPercent); 
    let [Profitsharingchoice, setProfitsharingchoice] = React.useState(parameter === 'CensusAddUser' ? '%' : selectedUser.PsCode); 
    let [HCEchoice, setHCEchoice] = React.useState(1); 
    let [Overridecheck, setOverridecheck] = React.useState(parameter === 'CensusAddUser' ? false : selectedUser.OverrideParticipationDate); 

    const CensusUpdateScroll = React.useRef();
    let [FamilyCodeMargin, setFamilyCodeMargin] = React.useState(0); 
    let [ClassTypeMargin, setClassTypeMargin] = React.useState(0); 
  
    let [FamilyCodehideDrop, setFamilyCodehideDrop] = React.useState(false); 
    let [ClassTypehideDrop, setClassTypehideDrop] = React.useState(false); 
  
    let CensusDropSelected = null;
    const DropdownCensusController = (CensusDropSelected) => {
      if(CensusDropSelected === 1)//family
      {
        setFamilyCodeMargin(FamilyCodeMargin = 150)
        setFamilyCodehideDrop(FamilyCodehideDrop = true)
  
        setClassTypeMargin(ClassTypeMargin = 0)
        setClassTypehideDrop(ClassTypehideDrop = false)
      }
      else if(CensusDropSelected === 2)//class
      {
        setFamilyCodeMargin(FamilyCodeMargin = 0)
        setFamilyCodehideDrop(FamilyCodehideDrop = false)
  
        setClassTypeMargin(ClassTypeMargin = 125)
        setClassTypehideDrop(ClassTypehideDrop = true)
      }
    };

    //let required = fname === null | fname === "" | lname === null | lname === "" | datebirth === null | datebirth === "" | datehire === null | datehire === "" | w2earnings === null | w2earnings === "";
    //alert(catchup)

    const SaveUserArray = (navigation,Censustoken) => {
        let CensushasError = false;
        
        //check if First Name is blank
        if (fname === null | fname === "") {
            //setClassload(Classload = false);
            CensushasError = true;
            Alert.alert("Error:", "First Name cannot be blank.");
        }

        //check if Last Name is blank
        if (lname === null | lname === "") {
            //setClassload(Classload = false);
            CensushasError = true;
            Alert.alert("Error:", "Last Name cannot be blank.");
        }

        //check if Date of Birth is blank
        if (datebirth === null | datebirth === "") {
            //setClassload(Classload = false);
            CensushasError = true;
            Alert.alert("Error:", "Date of Birth cannot be blank.");
        }

        //check if Date of Hire is blank
        if (datehire === null | datehire === "") {
            //setClassload(Classload = false);
            CensushasError = true;
            Alert.alert("Error:", "Date of Hire cannot be blank.");
        }

        //check if W-2 Earnings is blank
        if (w2earnings === null | w2earnings === "") {
            //setClassload(Classload = false);
            CensushasError = true;
            Alert.alert("Error:", "W-2 Earnings cannot be blank.");
        }
    
        
        if (!CensushasError) {
            let CensusState = 'ClassEdit';
            if (route.params?.State === 'CensusAddUser') CensusState = 'CensusAdduser';
            let userArray = { 
                PlanId: CensusUserId, 
                FirstName: fname,
                LastName: lname,
                Principal: pricipal,
                Sex: sex,
                IsOwner: owner, 
                FamilyCode: familycode,
                DateOfBirth: datebirth,
                DateOfHire: datehire,
                WorkHours: hourswork,
                //Age?
                PastService: pastservice,//??
                LastYearComp: LYcompensation,
                W2Earnings: w2earnings,
                CatchUp: catchup,
                //HighlyComp?
                //ClassId?
                //RetAge
                Classtype: classtype,//??
                DeferralOverrideValue: deferral,
                DeferralOverrideType: deferralchoice,
                CBOverrideValue: CashbalanceInput,
                CBOverrideType: Cashbalancechoice,
                PSOverrideValue: Profitsharinginput,
                PSOverrideType: Profitsharingchoice,
                //ParticipationDate?
                ParticipationDateOverride: Overridecheck,
                HCEOverride: HCEchoice, //false?
            }
            CensusAddorEdit(navigation,userArray,CensusState,Censustoken);
        }
        
    }  
    /*
    if(route.params?.State === 'CensusAddUser') // for add
    {
        //alert(route.params?.State);
        SaveUserArray = (navigation) => {
           
            if(required) 
            {
                alert('Please, Fill Up All Required Inputs')
            }
            else
            {
                let CensusState = 'CensusAdduser';
                let userArray = { 
                    Firstname: fname,
                    Lastname: lname,
                    Sex: sex,
                    Pricipal: pricipal,
                    Owner: owner,
                    Familycode: familycode,
                    DateOfBirth: datebirth,
                    DateOfHire: datehire,
                    Hourswork: hourswork,
                    Pastservice: pastservice,
                    LY_Compensation: LYcompensation,
                    W2_Earnings: w2earnings,
                    Catchup: catchup,
                    Classtype: classtype,
                    DeferralText: deferral,
                    Deferralchoice: deferralchoice,
                    Cashbalanceinput: CashbalanceInput,
                    CashBalanceChoice: Cashbalancechoice,
                    ProfitsharingInput: Profitsharinginput,
                    ProfitSharingChoice: Profitsharingchoice,
                    HCE_choice: HCEchoice,
                    OverrideParticipationDate: Overridecheck
                }
                CensusAddorEdit(navigation,userArray,CensusState);
               
            }
           
        }
    }
    else// for edit
    {
        //alert('edit now'); 
        SaveUserArray = (navigation) => {

            if(required) 
            {
                alert('Please, Fill Up All Required Inputs')
            }
            else
            {
                let CensusState = 'CensusEdituser';
                let userArray = { 
                    Firstname: fname,
                    Lastname: lname,
                    Sex: sex, 
                    Pricipal: pricipal,
                    Owner: owner,
                    Familycode: familycode,
                    DateOfBirth: datebirth,
                    DateOfHire: datehire,
                    Hourswork: hourswork,
                    Pastservice: pastservice,
                    LY_Compensation: LYcompensation,
                    W2_Earnings: w2earnings,
                    Catchup: catchup,
                    Classtype: classtype,
                    DeferralText: deferral,
                    Deferralchoice: deferralchoice,
                    Cashbalanceinput: CashbalanceInput,
                    CashBalanceChoice: Cashbalancechoice,
                    ProfitsharingInput: Profitsharinginput,
                    ProfitSharingChoice: Profitsharingchoice,
                    HCE_choice: HCEchoice,
                    OverrideParticipationDate: Overridecheck
                }
                CensusAddorEdit(navigation,userArray,CensusState);
            }
        }
    }
    */
    var Sex = [ //not tested
        {
            id: 'M', // required
            //text: 'Male', //required
            label: 'Male'
        },
        {
            id: 'F',
            //text: 'Female',
            label: 'Female'
        },
    ];
    var choice = [ //not tested
        {
            id: 1, // required
            label: 'Yes'
        },
        {
            id: 2,
            text: 'No',
            label: 'No'
        },
    ];
    var choiceCatchup = [ //not tested
        {
            id: 0, // required
            label: 'Yes'
        },
        {
            id: 1,
            label: 'No'
        },
    ];
    var HCE = [
        {
            id: 1, // required
            label: 'N/A'
        },
        {
            id: 2,
            label: 'Yes'
        },
        {
            id: 3,
            label: 'No'
        },
    ];
    var Money = [ //not tested
        {
            id: '%', // required
            label: '%'
        },
        {
            id: '$',
            label: '$'
        },
    ];
       
    return(
    
        <View style ={styles.container}>
            <ScrollView ref={CensusUpdateScroll} style ={styles.scroll}>
               
                <Text style={styles.header}>General Info</Text>
               

                <View style={styles.ItemsSpace}>
                    <Text style={styles.columnNames}>First Name {fname === null | fname === "" ?  <Text style={{color:'red'}}>*Required</Text> : null}</Text>

                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="first name"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={fname}
                            keyboardType='default'
                            onChangeText={(val) => {setfname(fname = val)}}
                        />

                    <Text style={styles.columnNames}>Last Name  {lname === null | lname === "" ?  <Text style={{color:'red'}}>*Required</Text> : null}</Text>

                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="last name"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={lname}
                            keyboardType='default'
                            onChangeText={(val) => {setlname(lname = val)}}
                        />

                    <Text style={styles.columnNames}>Sex</Text>
                        <RadioButtonRN
                            data={Sex}
                            activeOpacity={2}
                            initial={sex === 'M' ? 1 : 2}
                            animationTypes={['pulse']}
                            style={{paddingLeft: 10,flexDirection: 'row'}}
                            textStyle={{paddingLeft: 10}}
                            boxStyle={{width: 80}}
                            box={false}
                            selectedBtn={(e) => setsex(sex = e.id)}
                            circleSize={13}
                            activeColor={'#333333'}
                            deactiveColor={'grey'}
                            textColor={'#333333'}
                        />
                        {/*
                        <RadioButton
                            data={Sex} //required
                            defaultOption={sex}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                            onValueChange={(value) => {setsex(sex = value.id)}} //required
                        />*/}

                    <Text style={styles.columnNames}>Principal?</Text>

                        <RadioButtonRN
                            data={choice}
                            activeOpacity={2}
                            initial={pricipal}
                            animationTypes={['pulse']}
                            style={{paddingLeft: 10,flexDirection: 'row'}}
                            textStyle={{paddingLeft: 10}}
                            boxStyle={{width: 70}}
                            box={false}
                            selectedBtn={(e) => setpricipal(pricipal = e.id)}
                            circleSize={13}
                            activeColor={'#333333'}
                            deactiveColor={'grey'}
                            textColor={'#333333'}
                        />
                        {/*
                        <RadioButton
                            data={choice} //required
                            defaultOption={pricipal}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                            onValueChange={(value) => {setpricipal(pricipal = value.id)}} //required
                        />*/}
                    <Text style={styles.columnNames}>Owner?</Text>

                        <RadioButtonRN
                            data={choice}
                            activeOpacity={2}
                            initial={owner}
                            animationTypes={['pulse']}
                            style={{paddingLeft: 10,flexDirection: 'row'}}
                            textStyle={{paddingLeft: 10}}
                            boxStyle={{width: 70}}
                            box={false}
                            selectedBtn={(e) => setowner(owner = e.id)}
                            circleSize={13}
                            activeColor={'#333333'}
                            deactiveColor={'grey'}
                            textColor={'#333333'}
                        />
                        {/*
                        <RadioButton
                            data={choice} //required
                            defaultOption={owner}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                            onValueChange={(value) => {setowner(owner = value.id)}} //required
                        />*/}
                    <Text style={styles.columnNames}>Family Code</Text>
                        <DropDownPicker
                            items={[
                                {label: 'N/A', value: " "},
                                {label: 'A', value: 'A'},
                                {label: 'B', value: 'B'},
                                {label: 'C', value: 'C'},
                                {label: 'D', value: 'D'},
                                {label: 'E', value: 'E'},
                                {label: 'F', value: 'F'},
                                {label: 'G', value: 'G'},
                                {label: 'H', value: 'H'},
                                {label: 'I', value: 'I'},
                                {label: 'K', value: 'K'},
                            ]}
                            isVisible={FamilyCodehideDrop}
                            defaultIndex={0}
                            defaultValue={familycode}
                            zIndex={2}
                            //placeholder="Select number of years"
                            placeholderStyle={{color: colors.Logintext}}
                            activeLabelStyle={{color: 'green'}}
                            labelStyle={{color: colors.Logintext}}
                            style={{borderWidth: 1}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                            containerStyle={{ height: 40, flex: 1, marginTop: 5, marginBottom: FamilyCodeMargin}}
                            arrowColor='rgba(51,51,51,0.5)'
                            onOpen={() => [CensusDropSelected = 1,DropdownCensusController(CensusDropSelected),CensusUpdateScroll.current.scrollTo({ x: 0, y: 200, animated: true })]}
                            onClose={() => {[setFamilyCodehideDrop(FamilyCodehideDrop = false),setFamilyCodeMargin(FamilyCodeMargin = 0)]}}
                            onChangeItem={item => {setfamilycode(familycode = item.value)}} //item.value
                        />
                    <Text style={styles.columnNames}>Date of Birth {datebirth === null | datebirth === "" ?  <Text style={{color:'red'}}>*Required</Text> : null}</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="date of birth"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={datebirth}
                            keyboardType='default'
                            onChangeText={(val) => {setdatebirth(datebirth = val)}}
                        />
                    <Text style={styles.columnNames}>Date of Hire {datehire === null | datehire === "" ?  <Text style={{color:'red'}}>*Required</Text> : null}</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="date of hire"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={datehire}
                            keyboardType='default'
                            onChangeText={(val) => {setdatehire(datehire = val)}}
                        />
                    <Text style={styles.columnNames}>Hours Worked</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            //placeholder="date of hire"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={hourswork}
                            keyboardType='default'
                            onChangeText={(val) => {sethourswork(hourswork = val)}}
                        />
                    <Text style={styles.columnNames}>Past Service</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="service"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={pastservice}
                            keyboardType='default'
                            onChangeText={(val) => {setpastservice(pastservice = val)}}
                        />
                    <Text style={styles.columnNames}>LY Compensation</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="compensation"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={LYcompensation}
                            keyboardType='default'
                            onChangeText={(val) => {setLYcompensation(LYcompensation = val)}}
                        />
                    <Text style={styles.columnNames}>W-2 Earnings {w2earnings === null | w2earnings === "" ?  <Text style={{color:'red'}}>*Required</Text> : null}</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="Earnings"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={w2earnings}
                            keyboardType='default'
                            onChangeText={(val) => {setw2earnings(w2earnings = val)}}
                        />
                    <Text style={styles.columnNames}>Catch Up</Text>

                        <RadioButtonRN
                            data={choiceCatchup}
                            activeOpacity={2}
                            initial={catchup === 0 ? 1 : 2}//error changing to 2
                            animationTypes={['pulse']}
                            style={{paddingLeft: 10,flexDirection: 'row'}}
                            textStyle={{paddingLeft: 10}}
                            boxStyle={{width: 70}}
                            box={false}
                            selectedBtn={(e) => setcatchup(catchup = e.id)}
                            circleSize={13}
                            activeColor={'#333333'}
                            deactiveColor={'grey'}
                            textColor={'#333333'}
                        />
                        {/* 
                        <RadioButton
                            data={choice} //required
                            defaultOption={catchup}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                            onValueChange={(value) => {setcatchup(catchup = value.id)}} //required
                        />*/}
                    <Text style={styles.columnNames}>Class Type</Text>
                        <DropDownPicker
                            items={[
                                {label: 'A - Owner HCEs', value: 'A - Owner HCEs'},
                                {label: 'B - Non HCEs', value: 'B - Non HCEs'},
                                {label: 'C - Non-Owner HCEs', value: 'C - Non-Owner HCEs'},
                            ]}
                            isVisible={ClassTypehideDrop}
                            defaultIndex={0}
                            defaultValue={classtype}
                            zIndex={3}
                            itemStyle={{justifyContent: 'flex-start'}}
                            //placeholder="Select number of years"
                            placeholderStyle={{color: colors.Logintext}}
                            activeLabelStyle={{color: 'green'}}
                            labelStyle={{color: colors.Logintext}}
                            style={{borderWidth: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                            containerStyle={{ height: 40, flex: 1, marginTop: 5, marginBottom: ClassTypeMargin}}
                            arrowColor='rgba(51,51,51,0.5)'
                            onOpen={() => [CensusDropSelected = 2,DropdownCensusController(CensusDropSelected),CensusUpdateScroll.current.scrollTo({ x: 0, y: 500, animated: true })]}
                            onClose={() => {[setClassTypehideDrop(ClassTypehideDrop = false),setClassTypeMargin(ClassTypeMargin = 0)]}}
                            onChangeItem={item => {setclasstype(classtype = item.value)}} //item.value
                        />
                </View>

                <Text style={styles.header}>Overrides</Text>
                
                <View style={styles.ItemsSpace}>
                    <Text style={styles.columnNames}>Deferral</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                placeholderTextColor = 'rgba(51,51,51,0.7)'
                                placeholder="deferral"
                                style={[styles.textInput,{color: colors.Logintext}]}
                                //autoCapitalize="none"
                                value={deferral}
                                keyboardType='default'
                                onChangeText={(val) => {setdeferral(deferral = val)}}
                            />
                             <RadioButtonRN
                                data={Money}
                                activeOpacity={2}
                                initial={deferralchoice === '%' ? 1 : 2}
                                animationTypes={['pulse']}
                                style={{paddingLeft: 10,flexDirection: 'row'}}
                                textStyle={{paddingLeft: 10}}
                                boxStyle={{width: 70}}
                                box={false}
                                selectedBtn={(e) => setdeferralchoice(deferralchoice = e.id)}
                                circleSize={13}
                                activeColor={'#333333'}
                                deactiveColor={'grey'}
                                textColor={'#333333'}
                            />
                            {/*
                            <RadioButton
                                data={Money} //required
                                defaultOption={deferralchoice}
                                formStyle = {{flexDirection: 'row'}} 
                                containerStyle={{marginBottom: 0, marginLeft: 10}}
                                labelStyle={{paddingRight: 10}}
                                circleContainerStyle={{ }} // add your styles to each outer circle
                                innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                                onValueChange={(value) => {setdeferralchoice(deferralchoice = value.id)}} //required
                            />*/}
                        </View>
                    <Text style={styles.columnNames}>Cash Balance</Text>
                         <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                placeholderTextColor = 'rgba(51,51,51,0.7)'
                                placeholder="balance"
                                style={[styles.textInput,{color: colors.Logintext}]}
                                //autoCapitalize="none"
                                value={CashbalanceInput}
                                keyboardType='default'
                                onChangeText={(val) => {setCashbalanceInput(CashbalanceInput = val)}}
                            />
                             <RadioButtonRN
                                data={Money}
                                activeOpacity={2}
                                initial={Cashbalancechoice === '%' ? 1 : 2}
                                animationTypes={['pulse']}
                                style={{paddingLeft: 10,flexDirection: 'row'}}
                                textStyle={{paddingLeft: 10}}
                                boxStyle={{width: 70}}
                                box={false}
                                selectedBtn={(e) => setCashbalancechoice(Cashbalancechoice = e.id)}
                                circleSize={13}
                                activeColor={'#333333'}
                                deactiveColor={'grey'}
                                textColor={'#333333'}
                            />
                            {/*
                            <RadioButton
                                data={Money} //required
                                defaultOption={Cashbalancechoice}
                                formStyle = {{flexDirection: 'row'}} 
                                containerStyle={{marginBottom: 0, marginLeft: 10}}
                                labelStyle={{paddingRight: 10}}
                                circleContainerStyle={{ }} // add your styles to each outer circle
                                innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                            onValueChange={(value) => {setCashbalancechoice(Cashbalancechoice = value.id)}} //required
                            /> */}
                        </View>
                    <Text style={styles.columnNames}>Profit Sharing</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                placeholderTextColor = 'rgba(51,51,51,0.7)'
                                placeholder="profit"
                                style={[styles.textInput,{color: colors.Logintext}]}
                                //autoCapitalize="none"
                                value={Profitsharinginput}
                                keyboardType='default'
                                onChangeText={(val) => {setProfitsharinginput(Profitsharinginput = val)}}
                            />
                            <RadioButtonRN
                                data={Money}
                                activeOpacity={2}
                                initial={Profitsharingchoice === '%' ? 1 : 2}
                                animationTypes={['pulse']}
                                style={{paddingLeft: 10,flexDirection: 'row'}}
                                textStyle={{paddingLeft: 10}}
                                boxStyle={{width: 70}}
                                box={false}
                                selectedBtn={(e) => setProfitsharingchoice(Profitsharingchoice = e.id)}
                                circleSize={13}
                                activeColor={'#333333'}
                                deactiveColor={'grey'}
                                textColor={'#333333'}
                            />
                            {/* 
                            <RadioButton
                                data={Money} //required
                                defaultOption={Profitsharingchoice}
                                formStyle = {{flexDirection: 'row'}} 
                                containerStyle={{marginBottom: 0, marginLeft: 10}}
                                labelStyle={{paddingRight: 10}}
                                circleContainerStyle={{ }} // add your styles to each outer circle
                                innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                                onValueChange={(value) => {setProfitsharingchoice(Profitsharingchoice = value.id)}} //required
                            />*/}
                        </View>
                    <Text style={styles.columnNames}>HCE Override?</Text>
                        <RadioButtonRN
                            data={HCE}
                            activeOpacity={2}
                            initial={HCEchoice}
                            animationTypes={['pulse']}
                            style={{paddingLeft: 10,flexDirection: 'row'}}
                            textStyle={{paddingLeft: 10}}
                            boxStyle={{width: 70}}
                            box={false}
                            selectedBtn={(e) => setHCEchoice(HCEchoice = e.id)}
                            circleSize={13}
                            activeColor={'#333333'}
                            deactiveColor={'grey'}
                            textColor={'#333333'}
                        />
                        {/*
                        <RadioButton
                            data={HCE} //required
                            defaultOption={HCEchoice}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
                            onValueChange={(value) => {setHCEchoice(HCEchoice = value.id)}} //required
                        />*/}
                    <Text style={styles.columnNames}>Date of Participation</Text>
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                        <CheckBox 
                        style={{paddingRight: 5}}
                        checkedCheckBoxColor = {'#333333'}
                        uncheckedCheckBoxColor	= {colors.Logintext}
                        isChecked={Overridecheck} onClick = {()=> setOverridecheck(Overridecheck = !Overridecheck)}/>
                        <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Override Participation Date</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => {SaveUserArray(navigation,Censustoken)}}>
                        <LinearGradient
                            colors={['#72be03','#397e05']} //'#72be03','#397e05'
                            style={styles.signIn}
                            start={[0, 1]} end={[1, 0]}
                        >
                            <Text style={[styles.textSign, {color:'#fff'}]}>{parameter === 'CensusAddUser' ? 'Save New' : 'Update'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {borderColor: '#333333', borderWidth: 1.5,marginTop: 15,marginBottom: 20}]}>
                        <Text style={[styles.textSign, {color: '#333333'}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
            
    )
}



export default AddModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'rgba(51,51,51, 0.8)'
      backgroundColor: 'white',
      //alignItems: 'center',
      //justifyContent: 'center',
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
    },
    textInput: {
        flex: 1,  
        borderBottomWidth: 1.5,
        borderBottomColor: '#989c9d',
    },
   
    ItemsSpace: {
        marginLeft: 10,    
    },
    button: {
        alignItems: 'center',
        marginTop: 25
        
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