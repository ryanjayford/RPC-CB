import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,ScrollView,TextInput } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from 'react-native-customizable-radio-button';

const {width,height} = Dimensions.get('window');

const AddModal = ({ navigation,route }) => {
    console.log(route.params?.State, 'State for census')
    //console.log('Info in the Censusupdatescreen',route.params?.CensusInfo)
  const { colors } = useTheme();
    const [{CensusAddorEdit},dataState] = React.useContext(AuthContext);
   // console.log('censusEdited',dataState.censusEdited)
   // console.log('censusAdded',dataState.censusAdded)

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
    let [catchup, setcatchup] = React.useState(parameter === 'CensusAddUser' ? 0 : selectedUser.HasCatchUp); 
    let [classtype, setclasstype] = React.useState('A - Owner HCEs'); 
    let [deferral, setdeferral] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.DeferralPercent); 
    let [deferralchoice, setdeferralchoice] = React.useState(parameter === 'CensusAddUser' ? '%' : selectedUser.DeferCode); 
    let [CashbalanceInput, setCashbalanceInput] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.CbPercent); 
    let [Cashbalancechoice, setCashbalancechoice] = React.useState(parameter === 'CensusAddUser' ? '%' : selectedUser.CbCode); 
    let [Profitsharinginput, setProfitsharinginput] = React.useState(parameter === 'CensusAddUser' ? null : selectedUser.PsPercent); 
    let [Profitsharingchoice, setProfitsharingchoice] = React.useState(parameter === 'CensusAddUser' ? '%' : selectedUser.PsCode); 
    let [HCEchoice, setHCEchoice] = React.useState(0); 
    let [Overridecheck, setOverridecheck] = React.useState(parameter === 'CensusAddUser' ? false : selectedUser.OverrideParticipationDate); 

    if(route.params?.State === 'CensusAddUser') // for add
    {
        //alert(route.params?.State);
    
        SaveUserArray = (navigation) => {
            //setClassload(Classload = true);
            let CensusState = 'CensusAdduser';
            let userArray = { //incomplete
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
    else// for edit
    {
        //alert('edit now'); 
        SaveUserArray = (navigation) => {
            //setClassload(Classload = true);
            let CensusState = 'CensusEdituser';
            let userArray = { //incomplete
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

    var Sex = [
        {
            id: 'M', // required
            text: 'Male', //required
        },
        {
            id: 'F',
            text: 'Female',
        },
    ];
    var choice = [
        {
            id: 0, // required
            text: 'Yes', //required
        },
        {
            id: 1,
            text: 'No',
        },
    ];
    var HCE = [
        {
            id: 0, // required
            text: 'N/A', //required
        },
        {
            id: 1,
            text: 'Yes',
        },
        {
            id: 2,
            text: 'No',
        },
    ];
    var Money = [
        {
            id: '%', // required
            text: '%', //required
        },
        {
            id: '$',
            text: '$',
        },
    ];
       
    return(
    
        <View style ={styles.container}>
            <ScrollView style ={styles.scroll}>
               
                <Text style={styles.header}>General Info</Text>
               

                <View style={styles.ItemsSpace}>
                    <Text style={styles.columnNames}>First Name</Text>

                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="first name"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={fname}
                            keyboardType='default'
                            onChangeText={(val) => {setfname(fname = val)}}
                        />

                    <Text style={styles.columnNames}>Last Name</Text>

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

                        <RadioButton
                            data={Sex} //required
                            defaultOption={sex}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                            onValueChange={(value) => {setsex(sex = value.id)}} //required
                        />

                    <Text style={styles.columnNames}>Principal?</Text>
                        <RadioButton
                            data={choice} //required
                            defaultOption={pricipal}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                            onValueChange={(value) => {setpricipal(pricipal = value.id)}} //required
                        />
                    <Text style={styles.columnNames}>Owner?</Text>
                        <RadioButton
                            data={choice} //required
                            defaultOption={owner}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                            onValueChange={(value) => {setowner(owner = value.id)}} //required
                        />
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
                            defaultIndex={0}
                            defaultValue={familycode}
                            zIndex={2}
                            //placeholder="Select number of years"
                            placeholderStyle={{color: colors.Logintext}}
                            activeLabelStyle={{color: 'green'}}
                            labelStyle={{color: colors.Logintext}}
                            style={{borderWidth: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                            containerStyle={{ height: 40, flex: 1, marginTop: 5}}
                            arrowColor='rgba(51,51,51,0.5)'
                            onChangeItem={item => {setfamilycode(familycode = item.value)}} //item.value
                        />
                    <Text style={styles.columnNames}>Date of Birth</Text>
                        <TextInput 
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="date of birth"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={datebirth}
                            keyboardType='default'
                            onChangeText={(val) => {setdatebirth(datebirth = val)}}
                        />
                    <Text style={styles.columnNames}>Date of Hire</Text>
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
                    <Text style={styles.columnNames}>W-2 Earnings</Text>
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
                        <RadioButton
                            data={choice} //required
                            defaultOption={catchup}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                            onValueChange={(value) => {setcatchup(catchup = value.id)}} //required
                        />
                    <Text style={styles.columnNames}>Class Type</Text>
                        <DropDownPicker
                            items={[
                                {label: 'A - Owner HCEs', value: 'A - Owner HCEs'},
                                {label: 'B - Non HCEs', value: 'B - Non HCEs'},
                                {label: 'C - Non-Owner HCEs', value: 'C - Non-Owner HCEs'},
                            ]}
                            defaultIndex={0}
                            defaultValue={classtype}
                            zIndex={3}
                            //placeholder="Select number of years"
                            placeholderStyle={{color: colors.Logintext}}
                            activeLabelStyle={{color: 'green'}}
                            labelStyle={{color: colors.Logintext}}
                            style={{borderWidth: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                            containerStyle={{ height: 40, flex: 1, marginTop: 5}}
                            arrowColor='rgba(51,51,51,0.5)'
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
                            <RadioButton
                                data={Money} //required
                                defaultOption={deferralchoice}
                                formStyle = {{flexDirection: 'row'}} 
                                containerStyle={{marginBottom: 0, marginLeft: 10}}
                                labelStyle={{paddingRight: 10}}
                                circleContainerStyle={{ }} // add your styles to each outer circle
                                innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                                onValueChange={(value) => {setdeferralchoice(deferralchoice = value.id)}} //required
                            />
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
                            <RadioButton
                                data={Money} //required
                                defaultOption={Cashbalancechoice}
                                formStyle = {{flexDirection: 'row'}} 
                                containerStyle={{marginBottom: 0, marginLeft: 10}}
                                labelStyle={{paddingRight: 10}}
                                circleContainerStyle={{ }} // add your styles to each outer circle
                                innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                                onValueChange={(value) => {setCashbalancechoice(Cashbalancechoice = value.id)}} //required
                            />
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
                            <RadioButton
                                data={Money} //required
                                defaultOption={Profitsharingchoice}
                                formStyle = {{flexDirection: 'row'}} 
                                containerStyle={{marginBottom: 0, marginLeft: 10}}
                                labelStyle={{paddingRight: 10}}
                                circleContainerStyle={{ }} // add your styles to each outer circle
                                innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                                onValueChange={(value) => {setProfitsharingchoice(Profitsharingchoice = value.id)}} //required
                            />
                        </View>
                    <Text style={styles.columnNames}>HCE Override?</Text>
                        <RadioButton
                            data={HCE} //required
                            defaultOption={HCEchoice}
                            formStyle = {{flexDirection: 'row'}} 
                            containerStyle={{marginBottom: 0}}
                            labelStyle={{paddingRight: 10}}
                            circleContainerStyle={{ }} // add your styles to each outer circle
                            innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                            onValueChange={(value) => {setHCEchoice(HCEchoice = value.id)}} //required
                        />
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
                    <TouchableOpacity style={styles.signIn} onPress={() => {SaveUserArray(navigation)}}>
                        <LinearGradient
                            colors={['#72be03','#397e05']} //'#72be03','#397e05'
                            style={styles.signIn}
                            start={[0, 1]} end={[1, 0]}
                        >
                            <Text style={[styles.textSign, {color:'#fff'}]}>{parameter === 'CensusAddUser' ? 'Save New' : 'Save Edit'}</Text>
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