import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TouchableHighlight,SafeAreaView,FlatList,Dimensions,Alert,TextInput,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import{ AuthContext } from '../../components/context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { color } from 'react-native-reanimated';
import { Avatar } from 'react-native-elements';
import Settings from '../../settings.json';
import moment from 'moment';
import SettingsScreen from '../Menu/SettingsScreen';
const {width,height} = Dimensions.get('window');
const baseURL = Settings.domain;


let RightAction = ({item,index}) =>
{
  return(
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity  style={styles.DeleteAction} onPress={() => deleteClickEventListener(item,index)}>
          <Icon style={styles.actionText} name="delete" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.EditAction} onPress={() => editClickEventListener(item)}>
        <Icon style={styles.actionText} name="pencil-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity  style={styles.CopyAction} onPress={() => CopyClickEventListener(item)}>
          <Icon style={styles.actionText} name="content-copy" size={25} color="white" />
      </TouchableOpacity>
    </View>
  )
};

const PlanScreen = ({ navigation,route,PlanToggle }) => {
  //console.log('toggle', PlanToggle)
  ///console.log(route,'from list');
  const [{updatePlanData, Delete,setPlanID, initScreen, setScreen},dataState] = React.useContext(AuthContext);

  let planStorage = dataState.plan;
  //let plansearch = dataState.plansearch;

  //val of search input
  let [SearchVal, setSearchVal] = React.useState(null);
  //console.log(indexChecked)
  const { colors } = useTheme();

  if(dataState.MenuResponse === true)
  {
    //alert(dataState.MenuCurrent);
    dataState.MenuResponse = false;
    //?console.log(dataState.MenuCurrent)
    //?console.log(dataState.MenuResponse)
  }
  //console.log('count',dataState.planData.length)
  
  //for search and flatlist
  const [planData, setPlanData] = React.useState(null); //dataState.planData //null
  //for search
  let [inMemory, setInMemory] = React.useState(planData);

  let num = dataState.SavePlanId === null ? 1 : dataState.SavePlanId;
  let [indexChecked, setindexChecked] = React.useState(num);//default 1
  let [isLoading, setIsLoading] = React.useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //for Sample data
    //if (dataState.planData[0] && dataState.planData[0].planId) setindexChecked(indexChecked = dataState.planData[0].planId)
    //Api Data
    setPlanData(planData => null);
    getPlanData(dataState.MenuCurrent);
  }, [dataState.MenuCurrent, dataState["Plan List"]]);

  
  const deletePlan = async (planId) => {
    let url = baseURL + '/Plans/Plan?id=' +  planId; // + '&planType=C'
    let method = 'DELETE';
    let headers = new Headers();
    setIsLoading(isLoading = true);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', dataState.userToken);
   //console.log('Delete Plan ======>', url, method, headers);
    let req = new Request(url, {
        method,
        headers
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.isSuccess && responseJson.obj){
          setScreen({Name: "Plan Details", Method: dataState.selectedPlan});
          getPlanData(dataState.MenuCurrent);
        } else {
          Alert.alert("Data Error", responseJson.message);
          setIsLoading(isLoading = false);
        }
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        setIsLoading(isLoading = false);
        return false;
    });
  }

  const getPlanData = async (selectedMenu) => {
    if (!selectedMenu) selectedMenu = 'In 24 hours';
    let filter = '0';
    switch (selectedMenu) {
      case 'In 24 hours':
        filter = '0';
        break;
      case 'In 48 hours':
        filter = '1';
        break;
      case 'This Week':
        filter = '2';
        break;
      case 'This Month':
        filter = '3';
        break;  
      default:  
        filter = '-1';
    }
    let url = baseURL + '/Plans/PlanListQuery?lastModified=' + filter + '&filteredUserId=' + dataState.userName + '&maxRows=50'; //+ '&filteredCompanyName=EBG&filteredUserId=01247@noemail.com&maxRows=10';
    
    let method = 'GET';
    let headers = new Headers();
   //console.log(dataState.userToken);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', dataState.userToken);
   //console.log('===PLAN LIST API CALL============>',url,headers);
    let req = new Request(url, {
        method,
        headers
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
        //console.log('Response:', responseJson);
        //console.log('Response: API Called FOR PLAN LIST =======>' , responseJson);
        if (responseJson.obj &&  responseJson.obj.length){
         //console.log(responseJson.obj[0].planId);
          //console.log('=======PLAN LIST====>', responseJson.obj);
          initScreen(responseJson.obj[0].planId);
          updatePlanData(responseJson.obj);
          setindexChecked(indexChecked = responseJson.obj[0].planId);
          
          setPlanData(planData => responseJson.obj);
          setInMemory(inMemory => responseJson.obj);
          
        } else if (responseJson.obj &&  responseJson.obj.length === 0){
          //Alert.alert(selectedMenu + " Filter", "No Record(s) Found.");
          dataState.selectedPlan = null;
          setPlanData(planData => []);
        } else {
          Alert.alert("Data Error", responseJson.message);
          setPlanData(planData => []);
        }
        if (isLoading) setIsLoading(isLoading = false);
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        if (isLoading) setIsLoading(isLoading = false);
        return false;
    });
  }

  if(route.params?.CopyPlan === true){
      setPlanData(planData => null);
      getPlanData(dataState.MenuCurrent);
      route.params.CopyPlan = null;
  }

  
  deleteClickEventListener = (item,index) => {
    Alert.alert("Plan Delete", "Are you sure you want to Delete this Plan?", 
    [{ text: "Yes", onPress: () => deletePlan(item.planId) }, //CalculatePlan(dataState, setScreen)
    { text: "No", onPress: () => {}, style: "cancel" }],
    { cancelable: false }); 
  }

  CopyClickEventListener = (item) => {
    navigation.navigate('Copy modal', {CopyInfo: item});
  }

  editClickEventListener = (item) => {
    planStorage.planId = item.planId
    planStorage.userNameOnly = item.userNameOnly
    setindexChecked(indexChecked = item.planId);
    navigation.navigate('Plan Details',{screen: 'General', params: {homeClick: null}});
    //?console.log('plan',planStorage)
    //Alert.alert('Edit' + " " + dataState.plan.planId + " " + dataState.plan.userNameOnly);
   //console.log('Edit' + " " + dataState.plan.planId + " " + dataState.plan.userNameOnly);
  }

  toggleshow = (item) => {
    if(route.params?.AddCancel === 'cancel' && indexChecked === item.planId)
    {
      //alert(1);
      dataState.selectedPlan = item.planId;
      route.params.AddCancel = null
      navigation.navigate('Plan Details',{ params: {homeClick: 'cancel'}});
    }
    else if(indexChecked === item.planId)
    {
      //let PlanId = item.planId;
      //setPlanID(PlanId);
      //alert(2)
      dataState.selectedPlan = item.planId;
      navigation.navigate('Plan Details',{screen: 'General', params: {homeClick: null}});
     //console.log('Info' + " " + dataState.plan.planId + " " + dataState.plan.userNameOnly);
    }
    else{
      let PlanId = item.planId;
      setPlanID(PlanId, item.planName);
      setindexChecked(indexChecked = item.planId);
      planStorage.planId = item.planId
      planStorage.userNameOnly = item.userNameOnly
      //?console.log('plan2',planStorage)
    }
  }

  OnSearch = (value) => {
    let filteredName = inMemory.filter(
      Name => {
        let namelowercase = (Name.planName + " " + Name.userNameOnly).toLowerCase() 

        let searchTermlowercase = value.toLowerCase()

        return namelowercase.indexOf(searchTermlowercase) > -1
      }
    )
    setSearchVal(SearchVal = value)
    setPlanData(planData => filteredName)

  }


  return(
    <View style={{flex: 1}}>
       {PlanToggle === true &&
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Icon style={styles.inputIcon} name="account-search" size={25} color="grey" />
              <TextInput style={styles.inputs}
                //ref={'txtSearch'}
                value={SearchVal}
                placeholder="Search"
                underlineColorAndroid='transparent'
                onChangeText={(value) => OnSearch(value)}/>
            </View>
          </View> }
    <LinearGradient 
      colors={[colors.linearlight,colors.linearDark]}
      style = {styles.container}
    >     
     
     {!planData || isLoading ?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color={colors.primary}/>
        </View>
        : 
        <View style = {styles.container}>
        {planData.length === 0 ?   
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={[{fontSize:16, color: color.secondary}]}>No Records Found {dataState.MenuCurrent ? dataState.MenuCurrent : 'In 24 hours'}</Text>
        </View>
        :
        <SafeAreaView>
          <FlatList
          //keyboardShouldPersistTaps={'never'}
            data={planData}
            extraData={planStorage}
            renderItem={({ item,index }) => <Item Email={item.email} Company={item.planName} number={item.retAge} effectiveDate={item.planEffDate} createDate={item.dateCreated}  
            N0s={item.noOfEE} Name={item.userNameOnly} Prepared={item.preparedBy} index={index} item={item} /> }
            keyExtractor={item => item.planId.toString()}
            //onEndReached={() => {}}
          />
        </SafeAreaView> 
         }
         </View> 
      }
    </LinearGradient>
    </View>
  );

  function Item({ Email,Company,number,effectiveDate, createDate,N0s,Name,Prepared,index,item, }) {
    let avatar = require("../../assets/user.jpg");
    let initials = Name.split(" ").map((n)=>n[0]).join("");
    createDate = moment(createDate).format('MM/DD/YYYY');
    effectiveDate = moment(effectiveDate).format('MM/DD/YYYY');
    if (Email.length >= 26) Email = Email.substring(0,26) + '...';

    let portrait = null;
    if (initials == 'LD') portrait = 'https://randomuser.me/api/portraits/med/women/40.jpg';
    
    //automatic getting the first value
    //console.log('=========================> indexChecked', indexChecked, item.planId);
    if(indexChecked === item.planId )//indexChecked === 1 && 
    {
      dataState.selectedPlan = item.planId;
      planStorage.planId = item.planId;
      planStorage.userNameOnly = item.userNameOnly;
      planStorage.planName = item.planName;
      
      //?console.log('plan',planStorage);
      //?console.log('PlanID',dataState.selectedPlan)
    }
    
    return (
      <View style={styles.listcontainer}>
      <Swipeable 
        renderRightActions={() => <RightAction item={item} index={index} />}
        overshootRight={false}
      >
      <TouchableHighlight underlayColor={'transparent'} key={index} onPress={()=> toggleshow(item)}>  
          
          <View style={[styles.card, {borderColor: colors.icon, backgroundColor: colors.background}]}>
            
            <View style={[styles.GreenContainer,{backgroundColor: indexChecked === item.planId ? colors.icon : colors.linearlight}]}>
              <View style={styles.subContainer}>
                <View style={{flexDirection:"row", paddingTop: 6, justifyContent: "flex-start"}}>
                <Icon name="account-badge" size={height > 800 ? 30 :25} color={indexChecked === item.planId ? colors.iconLight : colors.textGreen} />
                <View style={[styles.tagColor,{marginTop: -2, marginLeft:-2,borderColor:  indexChecked === item.planId ? colors.textGreen : colors.iconLight, backgroundColor: indexChecked === item.planId ? colors.iconLight: colors.textGreen}]}>
                <Text style={[styles.tag,{color:  indexChecked === item.planId ? colors.textGreen : colors.iconLight}]}>{N0s}</Text>
                </View>
                
                </View>
                <View style={{flexDirection:"row", paddingTop: 8}}>
                <Icon name="human-handsup" size={height > 800 ? 30 : 25} color={indexChecked === item.planId ? colors.iconLight : colors.textGreen} />
                <Text style={[styles.age,{marginLeft:-2, color: indexChecked === item.planId ? colors.iconLight : colors.textGreen}]}>{number}</Text>
                </View>
                
              </View>
            </View>
            <View style={styles.TextContainer}>
              <View style={{height:70}}>
                  <Text style={[styles.company, {paddingLeft: 12, color: colors.textGreen}]}>{Company}</Text>                                   
                  <Text style={[styles.prepared, {paddingLeft: 12, color: colors.textLight}]}>{Prepared}</Text>
              </View>

              {indexChecked === item.planId && 
              <View style={{flexDirection:"row"}}>
                {/*<Image style={[styles.image, styles.imageContent]} source={avatar}/>*/}
                
                {portrait? 
                <Avatar 
                  size={height > 800 ? 70 : 60}
                  overlayContainerStyle={{borderWidth:2, borderColor: colors.imgBorder, backgroundColor: colors.imgBackground}}
                  rounded
                  title={initials}                 
                  source={{ uri: portrait }}
                  //onPress={() =>//console.log("Works!")}
                  containerStyle={styles.imageContent}
                />
                :
                <Avatar 
                  size={height > 800 ? 70 : 60}
                  overlayContainerStyle={{borderWidth:2, borderColor: colors.imgBorder, backgroundColor: colors.imgBackground}}
                  rounded
                  title={initials}                 
                  containerStyle={styles.imageContent}
                />
                }
                
                <View >
                  <Text style={[styles.name, {color: colors.textLight}]}>{Name}</Text>                   
                  <Text style={[styles.email, {color: colors.email}]}>{Email}</Text>
              </View>
              </View> }
              {indexChecked === item.planId && 
              <View style={{flexDirection:"row",  justifyContent: 'space-between', paddingBottom:15}}>
                  <View>
                    <Text style={[styles.dateLabel, {paddingLeft: 12, color: colors.textGreen}]}>Effective Date</Text>  
                    <Text style={[styles.dateValue, {paddingLeft: 12, color: colors.textLight}]}>{effectiveDate}</Text>  
                  </View>
                                     
                  <View style={{marginRight:-10}}>
                    <Text style={[styles.dateLabel, {color: colors.textGreen}]}>Created Date</Text>  
                    <Text style={[styles.dateValue, {color: colors.textLight}]}>{createDate}</Text>  
                  </View>

              </View>}
            </View>          
          </View>  
      </TouchableHighlight>
      </Swipeable>
      </View>
    );
  }
}
export default PlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listcontainer: {
    marginVertical: 5,
    marginHorizontal:10,
  },

  formContent:{
    flexDirection: 'row',
    marginTop: 5,
  },
  inputContainer: {
    //borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    //borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10, 
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


  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    flexBasis: '46%',
    padding: 0,
    flexDirection:'row',
    flexWrap: 'wrap',
    borderLeftWidth:4,
  },

  GreenContainer: {
    width: '22%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0, 
    alignContent: 'flex-start',
  },

  TextContainer: {
    width: '70%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,

  },
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  company: {
    fontSize: height > 800 ? 18 : 15,
    fontWeight: 'bold',
    marginTop:4,
    color: "#225216"

  },
  prepared: {
    fontSize: height > 800 ? 14 : 11,
    fontWeight: 'bold',
    marginTop:2,
    color:"#636e72"
  },
  name: {
    fontSize: height > 800 ? 18 : 15,
    fontWeight: 'bold',
    paddingLeft:8,
    marginTop:15,
    color:"#636e72"
  },
  email: {
    fontSize: height > 800 ? 16 : 12,
    //fontWeight: 'bold',
    paddingLeft:8,
    marginTop:8,
    color: "#225216"
  },
  dateLabel: {
    fontSize: height > 800 ? 14 : 11,
    fontWeight: 'bold',
    paddingLeft:8,
    marginTop:12,
    color: "#225216"
  },
  dateValue: {
    fontSize: height > 800 ? 18 :15,
    fontWeight: 'bold',
    paddingLeft:8,
    color:"#636e72",
    marginTop: 0
  },
 
  employees:{
    fontSize:18,
    fontWeight:"bold",
    paddingLeft: 1,
    color: '#ffffff'
  },
  age:{
    fontSize: height > 800 ? 18 :16,
    fontWeight:"bold",
    paddingLeft: 1,
    color: '#ffffff'
  },
  imageContent:{
    marginTop:10,
    marginLeft:15,
    marginRight:5
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
    borderWidth:4
  },
  DeleteAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
  },
  CopyAction: {
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
  },
  EditAction: {
    backgroundColor: '#72be03',
    justifyContent: 'center',
  },
  actionText: {
    padding: 15,
  },
  tag:{
    fontSize: height > 800 ? 16 :14,
    fontWeight:'bold',
    alignSelf: 'center'
  },
  tagColor: {
    padding:5,
    borderRadius:40,
    marginHorizontal:3,
    marginTop: 0,
    borderWidth:2
  },
 tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  
});