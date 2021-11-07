import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Dimensions,StatusBar,SafeAreaView,FlatList,ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import Settings from '../settings.json';
import * as WebBrowser from 'expo-web-browser';
const {width,height} = Dimensions.get('window');
const baseURL = Settings.domain;
const DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    menuTitle: 'Create a New Plan',
    menuImage: '../assets/Icon2.png',
    menuDescription: 'Using the Plan Specification screens, this method gives the most flexibility in plan design and assumptions but requires more skill and retirement plan expertise.',
    Screen: "Census"
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    menuTitle: 'View a Directory of Existing',
    menuImage: '../assets/Icon1.png',
    menuDescription: 'This function allows you to view, edit and copy existing plans. You can sort your existing plans by company name, date created/modified or plan type.',
    Screen: "Plan Directory"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    menuTitle: 'Owner Only Plan Analysis',
    menuImage: '../assets/Icon3.png',
    menuDescription: 'A retirement plan analysis for highly compensated small business owners.',
    Screen: "Plan3"
  },
];

const HomeScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [homeData, setHomeData] = useState(null);
  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the homeData using the API
    getHomeData();
    //setHomeData(homeData => DATA);
    //console.log(DATA, homeData);
    //console.log("====>", homeData);
  }, []);

  const feedback = async (ifFeedback) => {
      let reportLink = 'https://www.ebgsystems.com/feedback';
      let result = await WebBrowser.openBrowserAsync(reportLink);
      ifFeedback = false;
      //setresult(thisresult = result)
  }; 

  const getHomeData = async () => {
    let url = baseURL + '/CB_API/GetCBMenuAsync/1247';
    let method = 'GET';
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
   
    let req = new Request(url, {
        method,
        headers
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
        //console.log('Response:', responseJson);
        //console.log('Response: API Called');
        setHomeData(homeData => responseJson);
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        return false;
    });
  }

  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
      <LinearGradient 
            colors={[colors.linearlight,colors.linearDark]} //colors.text,'#668ecf'
            style = {styles.listContaner}
          >
          {!homeData?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          :       
          <SafeAreaView style={{marginTop: 2.5}}>
            <FlatList
              data={homeData}
              renderItem={({ item }) => <Item title={item.menuTitle} Description={item.menuDescription} Icon={item.menuImage} Screen = {item.menuTitle} /> }
              keyExtractor={item => item.id.toString()}
            />
          </SafeAreaView>  
          }
      </LinearGradient>
  </View>
  );

    function Item({ title,Description,Icon,Screen }) {
      Icon = `data:image/jpeg;base64, ${Icon}`; 
      let gotoTab = null;
      let paramsVal = null;
      let ifFeedback = false;
      let myScreen = Screen.trim();
      switch(myScreen) {
        case 'Owner Only Plan Analysis':
          myScreen = "Owner Only";
          break;  
        case 'PPA Calculator':
            myScreen = "PPA Calculator";
            break;
        case 'Feedback':
            ifFeedback = true;
            break;        
        case 'Create a new Plan':
          gotoTab = 'Plan Details';
          paramsVal = {screen: 'General', params: {homeClick: 'Add'}};
          myScreen = "Plan Directory";
          break;
        default:
          myScreen = "Plan Directory";
      }
      //require('../assets/Icon1.png');
      //console.log(Icon.match(/(gif|png|jpg|jpeg)$/));
      return (
        <TouchableOpacity onPress={()=> {
            if(ifFeedback === true){
              feedback(ifFeedback);
            }else{
              navigation.navigate(myScreen, {screen: gotoTab, params: paramsVal /*,plansearch: false,censusSearch: false*/})
            }
          }}>
          <View style={styles.item}>
            {/*
            <LinearGradient  
            colors={[colors.icon,colors.icondark]}
            style={[styles.IconContainer, {borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}]}>
              <Image style = {styles.Icon} source = {Icon} />  
            </LinearGradient > */}
            <View style={[styles.IconContainer, {backgroundColor: colors.icon}]}>
              <Image style = {styles.Icon} source = {{uri : Icon}} />
            </View> 
            <View style={[styles.TextContainer, {backgroundColor: colors.iconDes}]}>
              <Text style={[styles.title,{color: colors.icontitle}]}>{title}</Text>
              <View style={{ borderBottomWidth: 1.5,borderBottomColor: colors.text,marginBottom: 2,marginTop: 2 }}></View>
              <Text style={[styles.Description,{ color: colors.text}]}>{Description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },

  listContaner:{
    flex: 1,
  },
  
  item: {
    flexDirection: 'row',
    margin: 10,
    height: height/4
  },

  IconContainer: {
    width: '30%',
    padding: 30,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'white',    
    justifyContent: 'center',
    alignContent: 'center',
  },

  TextContainer: {
    width: '70%',
    padding: 30,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
    
  },
  
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: height > 800 ? 28 : 20,
  },

  Description: {
    textAlign: 'left',
    fontSize: height > 800 ? 18 : 12
  },

  Icon: {
    width: height > 800 ? 120 : 80,
    height: height > 800 ? 120 : 80,
    borderRadius: height > 800 ? 60 : 40,
    borderWidth: 3,
    borderColor: 'white',
    alignSelf: 'center'
  },
});
