import React, { useEffect, useRef } from 'react';
import { Text,View,Alert, BackHandler, Platform} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import { useTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import{ AuthContext } from '../components/context';
//import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/AntDesign';
import { Entypo } from '@expo/vector-icons'; 
import HomeScreen from './HomeScreen';
import DetailsScreen from './Menu/BookmarkScreen';
import ExploreScreen from './Menu/SettingsScreen';
import HelpScreen from './Menu/SupportScreen';
import ProfileScreen from './Menu/ProfileScreen';
//import PlanDetails from './PlanDetails';
import PlanDetailsTopTab from './Plan/PlanDetailsTopTab'
import CensusScreen from './Census/CensusScreen';  //'./CensusScreen';
import reportTab from './Report/ReportTopTabScreen';
import reportList from './Report/ReportListScreen';
import Standard from './Report/ReportStandardScreen'; //'./BlankReportsScreen;
import CalculateScreen from './Calculate/CalculateScreen';
import Classes from './Classes/ClassesScreen';
import ClassesUpdate from './Classes/ClassesUpdateScreen';

import PlanListScreen from './Plan/PlanListScreen';
import PPACalculator from './PPACalculator/BlankPPACalculatorScreen';
import OwnerOnlyScreen from './OwnerOnly/BlankOwnerOnlyScreen';
import AddModal from './Census/CensusUpdateScreen';
import PlanCopy from './Plan/PlanCopyList';
import CopyModal from '../components/CopyModal';
import AlertModal from '../components/AlertModalExcel';
import moment from 'moment';
import MenuModal from '../components/MenuModal';
import Settings from '../settings.json';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import * as WebBrowser from 'expo-web-browser';

const baseURL = Settings.domain;
//import PlanTopTab from './PlandetailsTopTab'

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const PlanTab = createMaterialBottomTabNavigator();


const ConfirmSave = (save, navigation, type, planId, planName, userToken, userNumber, userSponsorId, error) => {
  //console.log('checkiinnnnn' , planNRA_Error);
  if(error === true)
  {
    alert('Valid values are from 62-65. NRA less than 62 generally not allowed per Notice 2007-69.');
    console.log('Valid values are from 62-65. NRA less than 62 generally not allowed per Notice 2007-69.');
  }
  else
  {
    //console.log('CONFIRM ====>', planName, userToken);
    if(Platform.OS === 'web'){
      let msg = "Are you sure you want to Add New Plan?"
      if (planId) msg = "Are you sure you want to save changes to " + planName + " Plan?"
      if (planName){
        let choice = confirm("Save Plan,\n"+msg);
        if(choice === true){
          save(navigation, type, planId, userToken, userNumber, userSponsorId)
        }
      } else {
        alert('Plan Name field is required.');
      }

    }
    else{
        let msg = "Are you sure you want to Add New Plan?"
        if (planId) msg = "Are you sure you want to save changes to " + planName + " Plan?"
        if (planName){
          Alert.alert("Save Plan", msg, 
          [{ text: "Yes", onPress: () => save(navigation, type, planId, userToken, userNumber, userSponsorId) }, //CalculatePlan(dataState, setScreen)
          { text: "No", onPress: () => {}, style: "cancel" }],
          { cancelable: false }); 
        } else {
          alert('Plan Name field is required.');
        }
    }
  }
  
}

const ConfirmCalculate = (dataState, setScreen) => {
  Alert.alert("Calculate", "Are you sure you want to Calculate Plan?", 
  [{ text: "Yes", onPress: () => setScreen({Name: 'Calculate', Method: 'Calculate'}) }, //CalculatePlan(dataState, setScreen)
  { text: "No", onPress: () => {}, style: "cancel" }],
  { cancelable: false }); 
}


const ConfirmUpload = (setScreen) => { //dataState,setCensusData,CensusIsloading, setCensusIsloading
  Alert.alert("Census Upload", "Are you sure you want to upload New Census?", 
  [{ text: "Yes", onPress: () => setScreen({Name: 'Census', Method: 'PickAndUpload'}) } , //PickAndUpload(dataState,setCensusData,CensusIsloading, setCensusIsloading)
  { text: "No", onPress: () => {}, style: "cancel" }],
  { cancelable: false }); 
}

const EbgLink = async () => {
  let webLink = 'https://www.ebgsystems.com/';
  let result = await WebBrowser.openBrowserAsync(webLink);
  //setresult(thisresult = result) 
}; 



function getHeaderTitle(route) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
      //console.log(routeName)

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Profile':
      return 'My Profile';
    case 'Contact':
      return 'My Contacts';
    case 'Setup':
      return 'Setup';
    case 'Help':
      return 'Help';
    case 'Plan Directory':
      return 'Plan List';
  }
}


function getPlanHeaderTitle(route, setScreen, dataState) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Plan List';

    let Method = 'Load';
    if (routeName === 'Plan Details' && route.params?.screen === 'Plan Details'){
      Method = 'New Plan';
    } 
    //console.log('Check=====>', routeName, route.params?.screen);
    if (!dataState[routeName]){
      setScreen({Name: routeName, Method});
    } else if (dataState[routeName] && dataState[routeName].PlanId != dataState.plan.planId) {
      if (dataState[routeName].Name != 'Plan List' && dataState[routeName].Name != 'Report')setScreen({Name: routeName, Method});
    }
  switch (routeName) {
    case 'Plan List':
      return 'Plan List';
    case 'Plan Details':
      if(route.params?.screen === 'Plan Details') return 'New Plan';
      return 'Plan Details';
    case 'Classes':
      return 'Classes';
    case 'Census':
      return 'Census';
    case 'Report':
      return 'Reports';
    case 'Calculate':     
      return 'Calculate';
  }
}

function getPlanIconsTitle(route,navigation,colors/*,search,Plansearch*/,save,dataState,Census, setCensus,Plan, setPlan, setScreen,menu,documentType, setdocumentType,CalculateToggle, setCalculateToggle,error) {

  const hideMenuXls = () =>
  {
    menu.current.hide(() => {
      navigation.navigate('Alert modal')
    });
    setdocumentType(documentType = 'application/vnd.ms-excel');
    //ConfirmUpload(setScreen);
   
    
    //alert(documentType);
  } 
  const hideMenuXlsx = () =>
  { 
    menu.current.hide(() => {
      
        navigation.navigate('Alert modal')
     
    });
    setdocumentType(documentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    //alert(documentType);
  } 
  /*
  const hideMenuXlsx = () =>
  { 
    setdocumentType(documentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    menu.current.hide(() => {
      setTimeout(() => {
        ConfirmUpload(setScreen);
      }, 500);
    });
    
    //alert(documentType);
  } 
  */

  //setScreen({Name: "Plan Details", Method: "ADD""})
  const showMenu = () => menu.current.show();

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Plan List';
      //console.log('checker',routeName,route.params?.screen );
  switch (routeName) {
    case 'Plan List': 
      return [<Icon.Button key={0} name="ios-search" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => [setPlan(Plan = !Plan)]}></Icon.Button>,//, Alert.alert('Function ' + Plan)
              <Icon.Button key={1} name="ios-add" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => [dataState.selectedPlan=null,navigation.navigate("Plan Directory", {screen: 'Plan Details', params: {screen: 'General', params: {homeClick: 'Add'}}}), setScreen({Name: "Plan Details", Method: "ADD"})]}></Icon.Button>,
              <Icon5.Button key={2} name="filter" size={21} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => navigation.navigate('menu')}></Icon5.Button>];//Plansearch() //navigation.setParams({plansearch: !route.params.plansearch})
    case 'Plan Details':
        if (route.params?.screen === 'Plan Details') return [<Icon.Button key={0} name="ios-save" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => ConfirmSave(save, navigation,'Add New', null, dataState.Details.planName, dataState.userToken, dataState.userNumber, dataState.userSponsorId,error)}></Icon.Button>, // Alert.alert('Save')
        <Icon.Button key={1} name="ios-close-circle" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => navigation.navigate('Plan Directory', {screen: 'Plan List', params: {AddCancel: 'cancel'}})}></Icon.Button>]
        return <Icon.Button key={0} name="ios-save" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() =>  ConfirmSave(save, navigation,'Edit', dataState.selectedPlan, dataState.Details.planName, dataState.userToken, dataState.userNumber, dataState.userSponsorId, error)}></Icon.Button>;  //Alert.alert('No function yet')
    case 'Classes':
      return <Icon.Button key={0} name="ios-add" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => navigation.navigate('Class Detail Entry',{State: 'addnew'})}></Icon.Button>; 
      case 'Census':
        return [//<Icon.Button key={0} name="ios-search" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => setCensus(Census = !Census)}></Icon.Button>,//search() //navigation.setParams({censusSearch: !route.params.censusSearch})
        //<Icon.Button key={1} name="md-cloud-upload" size={25} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => ConfirmUpload(setScreen)}></Icon.Button>, //dataState, setCensusData, CensusIsloading, setCensusIsloading// Alert.alert('Upload Census')
        <View key={1} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Menu 
            ref={menu}
            button={<Icon.Button name="md-cloud-upload" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => showMenu()}></Icon.Button>}
          >
           
            <MenuItem onPress={hideMenuXls} ><Icon name="ios-document" size={20}>  xls</Icon> </MenuItem>
            <MenuDivider />
            <MenuItem onPress={hideMenuXlsx}><Icon name="md-document" size={20}>  xlsx</Icon></MenuItem>
          </Menu>
        </View>,
        <Icon.Button key={2} name="ios-add" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => navigation.navigate('Add',{State: 'CensusAddUser'})}></Icon.Button>]; //Alert.alert('Add')
      case 'Report':
        return <Icon2.Button key={0} name="format-list-bulleted" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => navigation.navigate("Report list")}></Icon2.Button>;
      case 'Calculate':
  return [<Icon4.Button key={0} name="refresh" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => setScreen({Name: 'Calculate', Method: 'Refresh'})}></Icon4.Button>,
          <Icon.Button key={1} name="ios-calculator" size={20} iconStyle={{left: 5}} backgroundColor= {colors.primary} underlayColor= 'grey' onPress={() => setCalculateToggle(CalculateToggle = true)/*ConfirmCalculate(dataState,setScreen)*/}></Icon.Button>]; 
  }
}




const MainTabScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: colors.primary, // #009387
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={DetailsScreen}
        options={{
          tabBarLabel: 'contacts',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon2 name="contacts" color={color} size={24} />
          ),
        }}
      />
      {/*
      <Tab.Screen
        name="Setup"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Setup',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon2 name="settings" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon2 name="help" color={color} size={26} />
          ),
        }}
        listeners={({ }) => ({
          tabPress: event => {
              event.preventDefault();
              EbgLink();
          }
          })
        }
      />*/}
      
    </Tab.Navigator>
  )
};


const PlanTabScreen = ({navigation, route}) => {
  const { colors } = useTheme();
  const [{save, setCensusData, setScreen},dataState] = React.useContext(AuthContext);
  //console.log('Allroute', route.params)
  let [Plan, setPlan] = React.useState(false);
  let [Census, setCensus] = React.useState(false);
  let [CalculateToggle, setCalculateToggle] = React.useState(false);
  let [error, set_Error] = React.useState(false);
  //console.log('from main tab: ' + CalculateToggle)
  let [documentType, setdocumentType] = React.useState('*/*');
  const menu = useRef();
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getPlanHeaderTitle(route, setScreen, dataState),  
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
          {getPlanIconsTitle(route,navigation,colors/*,search,Plansearch*/,save,dataState,Census, setCensus,Plan, setPlan, setScreen,menu,documentType, setdocumentType,CalculateToggle, setCalculateToggle,error)}
        </View>
      ),

      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => { 
            if(route.params?.screen === 'Plan Details')
            {
              Alert.alert("Unsaved", "Are you sure you want to go back?", 
              [{ text: "Cancel", onPress: () => {}, style: "cancel" }, 
              { text: "Go Back", onPress: () => navigation.goBack() }], //navigation.navigate('Home')
              { cancelable: false }); 
            }
            else{
              navigation.goBack()
            }
          }}
        />
      ),

    });
  }, [navigation, route, error]);

  useEffect(() => {

    if(route.params?.screen === 'Plan Details')
    {
      const handleBackPress = () => {
        Alert.alert(
            "Unsaved",
            "Are you sure you want to go back?",
            [
                {
                    text: "Cancel",
                    onPress: () => {console.log("Cancel Pressed"); }, style: "cancel"
                },
                { text: "Go Back", onPress: () => navigation.goBack() }],
            { cancelable: false }
        );
        return true;
      }

      BackHandler.addEventListener("hardwareBackPress",handleBackPress);

      return () => {
        //?console.log('code unmounted')
        BackHandler.removeEventListener("hardwareBackPress",handleBackPress);
        //thisbackHandler.remove();
      }  
    }
   
  }, [])
  
  
  
  return (
    <PlanTab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <PlanTab.Screen
        name="Plan List"
        //component={PlanListScreen}
        options={{
          tabBarLabel: 'Plan List',
          tabBarColor: colors.primary, // #009387
          tabBarIcon: ({ color }) => (
            <Icon name="list-circle-sharp" color={color} size={25} />
          ),
        }}
        listeners={({ }) => ({
          tabPress: event => {
            if(route.params?.screen === 'Plan Details' || !dataState.selectedPlan)
            {
              event.preventDefault();
            }
          }
          })
        }
      >
         {props => <PlanListScreen {...props} PlanToggle={Plan} />}
      </PlanTab.Screen>

      <PlanTab.Screen
        name="Plan Details"
        //component={PlanDetailsTopTab}
        options={{
          tabBarLabel: <Text style={{ fontSize: 10.5 }}>Plan Details</Text>,
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon3 name="file-submodule" color={color} size={24} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            if(route.params?.screen === 'Plan Details' || !dataState.selectedPlan)
            {
              event.preventDefault();
            } else{
              navigation.navigate("Plan Details", {screen: 'General'});
            }
            
          }
          })
        }
        >
            {props => <PlanDetailsTopTab {...props} error={error} set_Error={set_Error} />}
      </PlanTab.Screen>

      <PlanTab.Screen
        name="Classes"
        component={Classes}
        options={{
          tabBarLabel: 'Classes',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon2 name="card-account-details" color={color} size={24} />
          ),
        }}
        listeners={({ }) => ({
          tabPress: event => {
            if(route.params?.screen === 'Plan Details' || !dataState.selectedPlan)
            {
              event.preventDefault();
            }
          }
          })
        }
      />
      
      <PlanTab.Screen
        name="Census"
        //component={CensusScreen}
        options={{
          tabBarLabel: 'Census',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-people" color={color} size={24} />
          ),
        }}
        listeners={({ }) => ({
          tabPress: event => {
            if(route.params?.screen === 'Plan Details' || !dataState.selectedPlan)
            {
              event.preventDefault();
            }
          }
          })
        }
      >
         {props => <CensusScreen {...props} DocumentType={documentType} />}
      </PlanTab.Screen>

      <PlanTab.Screen
        name="Calculate"
        //component={CalculateScreen}
        options={{
          tabBarLabel: 'Calculate',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon2 name="calculator-variant" color={color} size={24} />
          ),
        }}
        listeners={({ }) => ({
          tabPress: event => {
            if(route.params?.screen === 'Plan Details' || !dataState.selectedPlan)
            {
              event.preventDefault();
            }
          }
          })
        }
      >
        {props => <CalculateScreen {...props} CalculateModal={CalculateToggle} SetCalculateModal={setCalculateToggle} />}
      </PlanTab.Screen>

      <PlanTab.Screen
        name="Report"
        component={Standard}
        options={{
          tabBarLabel: 'Report',
          tabBarColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon2 name="file-chart" color={color} size={24} />
          ),
        }}
        listeners={({ }) => ({
          tabPress: event => {
            if(route.params?.screen === 'Plan Details' || !dataState.selectedPlan)
            {
              event.preventDefault();
            }
          }
          })
        }
      />
        
    </PlanTab.Navigator>
  )
};



const HomeStackScreen = ({navigation}) => {
  const [{setScreen}] = React.useContext(AuthContext);
  const { colors } = useTheme();
  return (
  <HomeStack.Navigator headerMode='screen' screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            //shadowColor: 'transparent',
            //elevation: 0,
            //shadowOffset: { height: 0, width: 0 }
          },
          headerPressColorAndroid: 'transparent',
          headerBackImage: ({ tintColor })=> <Entypo name="chevron-left" size={25} color={tintColor} />,
          headerTitleAlign: 'center',
          headerBackTitleVisible: true,
          //headerBackTitleStyle: { fontWeight: 'bold', },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="Home" component={MainTabScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor= {colors.primary} onPress={() => navigation.openDrawer()}></Icon.Button>
            )
          }} />
          <HomeStack.Screen name="Plan Directory" component={PlanTabScreen} options={{
            headerStyle: {
              backgroundColor: colors.primary,
              //shadowColor: 'transparent',
              //elevation: 0,
            },
          }}/>
          <HomeStack.Screen name="menu" component={MenuModal}  options={{ 
              headerShown: false,
              animationEnabled: false,
              cardStyle: {
                backgroundColor: 'transparent'
              }
          }}/>

          <HomeStack.Screen name="PPA Calculator" component={PPACalculator} />
          <HomeStack.Screen name="Owner Only" component={OwnerOnlyScreen} />
          <HomeStack.Screen name="Add" component={AddModal} options={{
              title: 'Employee Information',
              headerBackTitleVisible: false,
              headerPressColorAndroid: 'white',
          }}/>
             <HomeStack.Screen name="Copy modal" component={CopyModal}  options={{ 
              headerShown: false,
              animationEnabled: false,
              cardStyle: {
                backgroundColor: 'transparent'
              }
          }}/>
          <HomeStack.Screen name="Alert modal" component={AlertModal}  options={{ 
              headerShown: false,
              animationEnabled: false,
              
              cardStyle: {
                backgroundColor: 'transparent'
              }
              
          }}/>
          <HomeStack.Screen name="Class Detail Entry" component={ClassesUpdate} options={{
              headerBackTitleVisible: false,
              headerPressColorAndroid: 'white',
          }}/>
          <HomeStack.Screen name="Plan Duplication" component={PlanCopy} options={{
              headerBackTitleVisible: false,
              headerPressColorAndroid: 'white',
          }}/>

        <HomeStack.Screen name="Report list" component={reportList} options={{
              headerBackTitleVisible: false,
              headerPressColorAndroid: 'white',
              headerRight: () => (
                <Icon4.Button name="refresh" size={25} iconStyle={{left: 5}} backgroundColor= {colors.primary} onPress={() => setScreen({Name: 'Report', Method: 'Refresh'})}></Icon4.Button> //alert('refresh')
              )
          }}/>

  </HomeStack.Navigator>
  )
};

export default HomeStackScreen;
