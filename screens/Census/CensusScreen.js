import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../../components/context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import moment from 'moment';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import Settings from '../../settings.json';
const baseURL = Settings.domain;
let RightAction = ({item}) =>
{
  return(
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity  style={styles.DeleteAction} onPress={() => CensusDeleteClickEventListener(item)}>
          <Icon style={styles.actionText} name="delete" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.EditAction} onPress={() => CensusEditClickEventListener(item)}>
          <Icon style={styles.actionText} name="account-edit" size={25} color="white" />
      </TouchableOpacity>
    </View>
  )
};

const CensusScreen = ({ navigation, CensusToggle, CensusLoading }) => {
  const { colors } = useTheme();
  const [{setScreen },dataState] = React.useContext(AuthContext);

  //let search = dataState.search;
  let [CensusIndexChecked, setCensusIndexChecked] = React.useState(0);
  let [CensusSearchVal, setCensusSearchVal] = React.useState(null);
  //console.log('dataState.censusUpload in census page: ',dataState.censusUpload)

  const data = null; //dataState.censusData;
  //for search and flatlist
  let [CensusInfo, setCensusInfo] = React.useState(data);
  //for search
  let [CensusInmemory, setCensusInmemory] = React.useState(data);
  /*
  if(dataState.censusUpload === true)
  {
    setCensusInfo(CensusInfo = dataState.censusData);
    dataState.censusUpload = false;
  }
  */
  //console.log('census Data from datastate',dataState.censusData.length)
  //console.log('census Data from state',data.length)
  //console.log('census Data from state',CensusInfo.length)
  //console.log('CensusLoading from census: ', CensusLoading);
  const [censusData, setCensusData] = React.useState(null);
  const [oldCensusData, setOldCensusData] = React.useState(null);

  const SaveCensus = async(body, planId) => {
    let url = baseURL + '/Participants/ParticipantUpload';
    let method = 'POST';
    let headers = new Headers();
   
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', dataState.userToken);
    
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
          setScreen({Name: "Census", Method: "Load"});
        } else{
          Alert.alert("Save Error", responseJson.message);
        }
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        return false;
    });
  }
  
  //uploading excel file
  const PickAndUpload = async (planId) => {
    
    
    let result = await DocumentPicker.getDocumentAsync({type: '*/*',copyToCacheDirectory: true}); //type: '*/*' for all files
    //alert(result.uri);
    
    if(result.uri != undefined)
    {
      const info =  await FileSystem.getInfoAsync(result.uri)
      //?console.log('read file res: ', info);
  
      await FileSystem.readAsStringAsync(result.uri, {encoding: FileSystem.EncodingType.Base64}).then(b64 => XLSX.read(b64, {type: 'base64',cellText:true,cellNF: false,cellDates: true})).then(wb => { 
        /* sheet name */
        const wsname = wb.SheetNames[1];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true,defval:null, dateNF:'mm/dd/yyyy'}); // or dateNF:'mm-dd-yyyy'
        let payload = {};
        let censusData = [];
        
        if (data && data.length){
          payload.planId = planId;
          //console.log (data);
          data.forEach(function(item, idx) {        
            let censusD = {};
            censusD.CashBalance = item["Cash Balance"];
            censusD.ClassCode = item["Class Code"];
            censusD.DateOfBirth = item["Date of Birth"];
            censusD.DateOfHire = item["Date of Hire"];
            censusD.Deferral = item.Deferral;
            censusD.W2Earnings = item.Earnings;
            censusD.FamCode = item["Family Code"];
            censusD.Firstname = item["First Name"];
            censusD.Sex = item.Gender;
            censusD.WorkHours = item.Hours;
            censusD.LastName = item["Last Name"];
            censusD.LastYearComp = item["Last Year Earnings"];
            censusD.PercentOwnership = item["Ownership Percentage"];
            censusD.Principal = item.Principal;
            censusD.ProfitSharing = item["Profit Sharing"];
            censusData.push(censusD);
          });
          payload.census = censusData;
          
        }
  
        if (payload.census && payload.census.length){
            SaveCensus(payload, planId);
          }else{
            alert('Invalid File');
            setCensusData(censusData => oldCensusData);
          }
        
  
      
      });
    }else{
          
          setCensusData(censusData => oldCensusData);
        }
  } 
  

  React.useEffect(() => {
    //Api Data
    if (dataState.Census === null || (dataState.Census && dataState.Census.Name === 'Census')){
    setCensusData(censusData => null);
    console.log("useEffect =====CENSUS SCREEN========> ");
      if (dataState.Census && dataState.Census.Method === 'PickAndUpload') {
        PickAndUpload(dataState.plan.planId);
      } else {
        console.log('=====================getCensus==========================');
        getCensus(dataState.plan.planId);
      }
    }
  },  [dataState.Census]);


  const getCensus = async (planId) => {
    let url = baseURL + '/Participants/ParticipantList?planid=' +  planId + '&sortBy=Lastname';
    let method = 'GET';
    let headers = new Headers();
    console.log(url);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', dataState.userToken);
    
    let req = new Request(url, {
        method,
        headers
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
     console.log('CHECKING ERROR================>');
      if (responseJson.isSuccess && responseJson.obj){
          console.log("FROM UseEffect =====Api Called CENSUS========> " );
          TransfromCensusData(responseJson.obj);
        } else {
          Alert.alert("Data Error", responseJson.message);
          //setCensusData(censusData => []);
        }
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        return false;
    });
  }

  const TransfromCensusData = (data) => {
    let censusTransformData = [];
    if (data && data.length){
      console.log (data);
      data.forEach(function(item, idx) {
        let tags = [];
        let censusD = {};
        censusD.id = item.id;
        censusD.dateOfBirth = moment(item["dateOfBirth"]).format('MM/DD/YYYY');
        censusD.dateOfHire = moment(item["dateOfHire"]).format('MM/DD/YYYY');
        censusD.workHours = item.workHours;
        censusD.age = item.age;
        censusD.sex = item.sex;
        censusD.name = item.fullName;
        censusD.Firstname = item.firstName;
        censusD.Lastname = item.lastName;
        censusD.Sex = item.sex;
        censusD.Principal = item.principal
        censusD.IsOwner = item.isOwner;
        censusD.FamilyCode = item.familyCode;
        censusD.W2Earnings = item.w2Earnings;
        censusD.PastService = item.pastService;
        censusD.HceOverride = item.hceOverride;
        censusD.DeferCode = item.deferCode;
        censusD.HasCatchUp = item.hasCatchUp;
        censusD.CbPercent = item.cbPercent;
        censusD.CbCode = item.cbCode;
        censusD.PsCode = item.psCode;
        censusD.PsPercent = item.psPercent;
        censusD.DeferralPercent = item.deferralPercent;
        censusD.OverrideParticipationDate = item.overrideParticipationDate;
        censusD.lastYearComp = item.lastYearComp;
        if (item["percentOwnership"]) censusD.own = parseInt(item["percentOwnership"]);
        
        if (item.principal && item.principal == "Y" || item.principal == "Yes") tags.push("Is PR? Yes");
        if (item["percentOwnership"]) tags.push(item["percentOwnership"].toString() + "% Own");
        if (item["pastService"]) tags.push("pastService: " + item["pastService"].toString());
        if (item.w2Earnings) tags.push("W-2 Earnings: " + item.w2Earnings.toString());
        if (item["lastYearComp"]) tags.push(item["lastYearComp"].toString());
        if (item["familyCode"]) tags.push("Class Code: " + item["familyCode"].toString());

        censusD.tags = tags;
        censusTransformData.push(censusD);
        
      });      
    }  
    //console.log(censusTransformData);
    setCensusData(censusData => censusTransformData);
    setOldCensusData(oldCensusData => censusTransformData);
  }
     
  cardClickEventListener = (item) => {
    console.log(item.name);
  }

  CensusEditClickEventListener = (item) => {
    navigation.navigate('Add',{CensusInfo: item})
  }

  CensusDeleteClickEventListener = (item) => {
    Alert.alert('delete ' + item.name);
  }

  tagClickEventListener = (tagName) => {
    Alert.alert(tagName);
  }
  
  CensusToggleshow = (item) => {
    if(CensusIndexChecked === item.id)
    {
      setCensusIndexChecked(CensusIndexChecked = 0);
      //console.log('option1')
    }
    else{
      setCensusIndexChecked(CensusIndexChecked = item.id);
      //console.log('option2',indexChecked)
    }
  }

  CensusOnSearch = (value) => {
    let filteredName = CensusInmemory.filter(
      Name => {
        let namelowercase = (Name.name).toLowerCase()

        let searchTermlowercase = value.toLowerCase()

        return namelowercase.indexOf(searchTermlowercase) > -1
      }
    )
    setCensusSearchVal(CensusSearchVal = value)
    setCensusInfo(CensusInfo = filteredName)
    //Alert.alert(value);
  }
  // {tagClickEventListener(tag)}
  renderTags = (item) =>{
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor} onPress={() => CensusToggleshow(item)}>
          <Text style={styles.tag}>{tag}</Text>
        </TouchableOpacity> 
      );
    })
  }

    return (
      <View key={dataState.censusUpload} style={styles.container}>
        {CensusToggle === true &&
          <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Icon style={styles.inputIcon} name="account-search" size={25} color="grey" />
            <TextInput style={styles.inputs}
              //ref={'txtSearch'}
              value={CensusSearchVal}
              placeholder="Search"
              underlineColorAndroid='transparent'
              onChangeText={(value) => CensusOnSearch(value)}/>
          </View>
        </View> }
        {!censusData || CensusLoading ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          : 
          <View style = {styles.container}>
          {censusData.length === 0 ?   
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={[{fontSize:16, color: color.secondary}]}>No Records Found</Text>
          </View>
          :     
        <FlatList 
          style={styles.notificationList}
          data={censusData} //CensusInfo
          //extraData={CensusInfo,data}
          keyExtractor= {(item) => {
            return item.id.toString();
          }}
          renderItem={({item}) => {
            let color = "#95a5a6"; //Purple: #6A5ACD Red: #FF4500 Pink: #FF69B4 //item.color
            let own = null;
            let avatar = require("../../assets/user.jpg");
            if (item.sex){
                if (item.sex.toUpperCase() == 'M'){
                    color = "#4682B4";
                    if (item.age && item.age >= 10 && item.age <= 39){
                        avatar = require("../../assets/men1.jpg");    
                    } else if (item.age && item.age >= 40 && item.age <= 51){
                        avatar = require("../../assets/men2.jpg");
                    } else{
                        avatar = require("../../assets/men3.jpg");
                    }
                }else{
                    color = "#FF69B4";
                    if (item.age && item.age >= 10 && item.age <= 39){
                        avatar = require("../../assets/women1.jpg");    
                    } else if (item.age && item.age >= 40 && item.age <= 51){
                        avatar = require("../../assets/women2.jpg");
                    } else{
                        avatar = require("../../assets/women3.jpg");
                        color = "#FF4500";
                    }
                    
                }
            }
            if (item.own)avatar = require("../../assets/Owner.jpg");
            if (item.own) own =item.own.toString() +'%';

            color=colors.icon;
            //{cardClickEventListener(item)}
            return (
            <Swipeable 
              renderRightActions={() => <RightAction item={item}/>}
              overshootRight={false}
            >
            <TouchableHighlight underlayColor={'transparent'} key={item.id} onPress={()=> CensusToggleshow(item)}>
              <View style={[styles.card,  {borderColor:color, backgroundColor: colors.iconDes}]}>
                <View style={styles.cardContent}>                
                  <Image style={[styles.image, styles.imageContent]} source={avatar}/>
                  <View style={styles.navbar}>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => CensusToggleshow(item)}>                 
                        <Text style={[styles.name, {color: '#ffffff'}]}>{item.name}</Text>
                    </TouchableOpacity>
                    {/*CensusIndexChecked === item.id &&
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {CensusEditClickEventListener(item)}}>
                            <Icon style={{paddingRight:15}} name="account-edit" size={25} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {CensusDeleteClickEventListener(item)}}>
                            <Icon style={{paddingRight:8}} name="account-remove" size={25} color="#ffffff" />
                        </TouchableOpacity>
                    </View>*/}  
                  </View>
                          
                </View>
                <TouchableOpacity onPress={() => CensusToggleshow(item)}>
                <View style={styles.dateHeader}>
                    <Text style={[styles.date, {color: colors.planDes}]}>Birth Date</Text>
                    <Text style={[styles.date, {color: colors.planDes}]}>Hire Date</Text> 
                    <Text style={[styles.date, {color: colors.planDes}]}>Hours Worked</Text> 
                </View> 
                <View style={styles.dateValue}>
                    <Text style={[styles.date, {color: colors.planDes}]}>{item.dateOfBirth}</Text>
                    <Text style={[styles.date, {marginLeft:-50, color: colors.planDes}]}>{item.dateOfHire}</Text> 
                    <Text style={[styles.date, {marginTop:0,color: colors.planDes}]}>{item.workHours}</Text> 
                </View>  
                <View style={{flexDirection: 'row'}}>
                    {own ?
                    <View>
                    <Icon style={[styles.crown, {}]} name="crown" size={35} color="#f1c40f" />
                    <Text style={[styles.own, {}]}>{own}</Text>  
                    </View>
                    : null}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.age, {}]}>Age: {item.age}</Text>    
                </View>
                {CensusIndexChecked === item.id &&
                <View style={[styles.cardContent, styles.tagsContent]}>
                  {renderTags(item)}
                </View>}
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
            </Swipeable>
            )
          }}/>}
          </View> 
        }
      </View>
      
    );
  
}
export default CensusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  navbar: {
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:-80
  },
  formContent:{
    flexDirection: 'row',
    marginTop: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    //margin:10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop: 12,
    //padding:10,
    //paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:5,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
  },
  name:{
    fontSize:17,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  crown:{
    marginLeft:22,
    alignSelf: 'center',
    marginTop:-85,
  },
  own:{
    fontSize:9,
    fontWeight:"bold",
    marginLeft:23,
    alignSelf: 'center',
    marginTop:-5,
    color: '#ffffff'
  },
  age:{
    fontSize:9,
    fontWeight:"bold",
    marginLeft:24,
    alignSelf: 'center',
    marginTop:-35,
    color: '#ffffff'
  },
  date:{
    fontSize:12,
    alignSelf: 'center'
  },
  tag:{
    fontSize:11,
    alignSelf: 'center'
  },
  btnColor: {
    padding:5,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
  dateHeader: {
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:80,
    paddingRight: 10,
    marginTop:-25
  },
  dateValue: {
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:75,
    paddingRight: 10,
    },
    DeleteAction: {
      backgroundColor: '#dd2c00',
      justifyContent: 'center',
      //alignItems: 'flex-end',
      //flex: 1,
      marginBottom: 5,
      marginTop: 5
    },
    EditAction: {
      backgroundColor: '#72be03',
      justifyContent: 'center',
      //alignItems: 'flex-end',
      //flex: 1,
      marginBottom: 5,
      marginTop: 5
    },
    actionText: {
      padding: 15,
      //color: 'white'
    }
});   