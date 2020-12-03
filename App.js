import React, { useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage,Alert } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Settings from './settings.json';
import { DrawerContent } from './screens/DrawerContent';
import HomeStackScreen from './screens/MainTabScreen';
import SupportScreen from './screens/Menu/SupportScreen';
import SettingsScreen from './screens/Menu/SettingsScreen';
import BookmarkScreen from './screens/Menu/BookmarkScreen';
import ProfileScreen from './screens/Menu/ProfileScreen';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import { colors } from 'react-native-elements';
import DefaultPlan from './model/defaultPlan';
import DefaultDropdown from './model/dropDown';

const baseURL = Settings.domain;
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  let [isDarkTheme, setIsDarkTheme] = React.useState(true);

  //for search
  //let [open, setopen] = React.useState(false);
  //let [Planopen, setPlanopen] = React.useState(false);

  const samplePlanData = [
    {planId:10, planName:"Gregory Folse DDS LLC d/b/a Mission Dental", noOfEE:'125', retAge: 65, userNameOnly: "Lorraine Dorsa", email: "ldorsa@aegispension.com", preparedBy: "Lorraine Dorsa, FCA, MAAA, MSPA, EA, CEBS", planEffDate: "1/1/2021", dateCreated:"6/23/2020", dateModified: "6/23/2020", planType:"Cash Balance"},
    {planId:2, planName:"Valued Client of Alan Hughes", noOfEE:2, retAge: 65, userNameOnly: "Dina Hamad", email: "dhamad@rpsi.org", preparedBy: "Dina Hamad", planEffDate: "1/1/2021", dateCreated:"6/23/2020", dateModified: "6/23/2020", planType:"Cash Balance"},
    {planId:3, planName:"Dr. Cotugno", noOfEE:1, retAge: 62, userNameOnly: "Christopher Paterna", email: "cpaterna@compass-cg.com", preparedBy: "Christopher Paterna", planEffDate: "1/1/2021", dateCreated:"6/23/2020", dateModified: "6/23/2020", planType:"Cash Balance"},
    {planId:4, planName:"Colony Pharmacy - Combo CB", noOfEE:3, retAge: 65, userNameOnly: "Jerry Filipski", email: "Jerry.Filipski@Ascensus.com", preparedBy: "Robin Weingast", planEffDate: "1/1/2019", dateCreated:"6/22/2020", dateModified: "6/22/2020", planType:"Cash Balance"},
    {planId:5, planName:"D’Ambrosio Medical Group", noOfEE:11, retAge: 65, userNameOnly: "Mark Swedelson", email: "mds@gsapension.com", preparedBy: "Mark D. Swedelson, CPA", planEffDate: "1/1/2021", dateCreated:"6/23/2020", dateModified: "6/23/2020", planType:"Cash Balance"},
    {planId:6, planName:"Cardiac Consultants of Central Georgia", noOfEE:16, retAge: 65, userNameOnly: "Ellen Quinlan", email: "ellen@thepensionstudio.com", preparedBy: "", planEffDate: "1/1/2021", dateCreated:"6/23/2020", dateModified: "6/23/2020", planType:"Cash Balance"},
    {planId:7, planName:"Bay Ridge Surgical", noOfEE:6, retAge: 65, userNameOnly: "Jerry Filipski", email: "Jerry.Filipski@Ascensus.com", preparedBy: "Robin Weingast", planEffDate: "1/1/2021", dateCreated:"6/23/2020", dateModified: "6/23/2020", planType:"Cash Balance"},
    {planId:8, planName:"Colony Pharmacy - CB Stand Alone", noOfEE:3, retAge: 65, userNameOnly: "Jerry Filipski", email: "Jerry.Filipski@Ascensus.com", preparedBy: "Robin Weingast", planEffDate: "1/1/2019", dateCreated:"6/22/2020", dateModified: "6/22/2020", planType:"Cash Balance"},
    
  ];

  const censusData = [
    {id:1, color:"#FF4500", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", dateOfBirth: "08/01/1968", dateOfHire: "08/01/2001", workHours: 1000, age: 46, sex:"F", name: "Alice Brown", tags:['Past Serv: 12', 'W-2 Earnings: 31,265.00', 'Catch Up? Yes', 'Class Code: B']},
    {id:2, color:"#87CEEB", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", dateOfBirth: "12/01/1943", dateOfHire: "08/01/2001", workHours: 1000, age: 71, sex:"F", name: "Barbara Bush", tags:['Past Serv: 12', 'W-2 Earnings: 62,247.00', 'Catch Up? Yes', 'Class Code: B']}, 
    {id:3, color:"#4682B4", icon:"https://bootdey.com/img/Content/avatar/avatar3.png", dateOfBirth: "12/01/1967", dateOfHire: "01/01/1996", workHours: 1000, age: 47, sex:"F", name: "Dorothy Deloitte", tags:['Is PR? Yes', 'Past Serv: 18', 'W-2 Earnings: 73,829.00', 'Catch Up? Yes', 'High Comp: Yes', 'Class Code: C', 'Deferral Override: 10%']}, 
    {id:4, color:"#6A5ACD", icon:"https://bootdey.com/img/Content/avatar/avatar4.png", dateOfBirth: "07/01/1952", dateOfHire: "01/01/1996", workHours: 1000, age: 62, sex:"M", own: 100, name: "Frank B. Deloitte", tags:['Is PR? Yes', '100% Own', 'Past Serv: 18', 'W-2 Earnings: 255,000.00', 'Catch Up? Yes', 'High Comp: Yes', 'Class Code: A', 'Deferral Override: $17,500']}, 
    {id:5, color:"#FF69B4", icon:"https://bootdey.com/img/Content/avatar/avatar5.png", dateOfBirth: "03/29/1966", dateOfHire: "12/03/2003", workHours: 1000, age: 49, name: "Gertrude Cody", tags:['Past Serv: 10', 'W-2 Earnings: 64,347.00', 'Catch Up? Yes', 'Class Code: B']},
    {id:6, color:"#00BFFF", icon:"https://bootdey.com/img/Content/avatar/avatar6.png", dateOfBirth: "07/01/1967", dateOfHire: "07/01/1999", workHours: 1000, age: 47, sex:"M", name: "Jackie Smith", tags:['Past Serv: 15', 'W-2 Earnings: 30,517.00', 'Catch Up? Yes', 'Class Code: B']},
    {id:7, color:"#00FFFF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", dateOfBirth: "03/01/1981", dateOfHire: "10/01/2006", workHours: 1000, age: 34, sex:"F", name: "Marge Johnson", tags:['Past Serv: 7', 'W-2 Earnings: 34,510.00', 'Catch Up? Yes', 'Class Code: B']},
    {id:8, color:"#20B2AA", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", dateOfBirth: "10/01/1976", dateOfHire: "04/01/2004", workHours: 1000, age: 38, sex:"F", name: "Nanette Dougherty", tags:['Past Serv: 10', 'W-2 Earnings: 75,299.00', 'Catch Up? Yes','High Comp: Yes', 'Class Code: B']},
    {id:9, color:"#191970", icon:"https://bootdey.com/img/Content/avatar/avatar3.png", dateOfBirth: "07/01/1968", dateOfHire: "11/01/1998", workHours: 1000, age: 46, sex:"F", name: "Vivian Greene", tags:['Past Serv: 15', 'W-2 Earnings: 47,260.00', 'Catch Up? Yes', 'Class Code: B']},
  ];

  let [planData, setPlanData] = React.useState(samplePlanData);

  const initialDataState = {
    isLoading: true,
    userName: null,
    firstName: null,
    lastName: null,
    userNumber: null,
    userSponsorId: null,
    userToken: null,
    isDarkTheme: true,
    screen: null,
    "Plan List": null,
    "Plan Details": {Name: 'Plan Details', Method: 'New Plan'},
    Classes: {Name: 'Classes', Method: 'Load'},
    Census: {Name: 'Census', Method: 'Load'},
    Report: null,
    Calculate: {Name: 'Calculate', Method: 'Load'},
    planData,
    plan: {},
    Details: {},
    DetailsFetchedData: {}, // for 401K and Cashbalance
    DefaultPlan,
    DefaultDropdown,
    //Array: array,
    SavePlanId: null,
    Is401kChecked: true,
    //search: false,
    //plansearch: false,
    //Balance: {},
    //General: {},
    selectedPlan: null,
    censusUpload: false,
    Selected: 0,
    MenuCurrent: null,
    MenuResponse: false,
    classEdited: null,
    classAdded: null,
    classData: null,
    censusEdited: null,
    censusAdded: null,
    censusData,
    portrait: null 
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      primary: '#0e6b0e',//'#145E04',//'#2b5329',//'#0e6b0e',//'#089000',//'#0a5d00',//'#5A8D2E',//'#31533a', //'#225216', //shade of green for header '#009432', 
      secondary: '#063b00',//'#106424','#303808',//
      tertiary: '#4C8619',
      accent: '#f1f2f6', //white for login/signup
      //surface: '',
      icon: '#72be03',//'#72be03',//'#8ece16', //for home '#6ab04c',
      //icondark: '#218c74', //for home
      iconDes: '#ffffff',  //for home
      icontitle: '#0c5100', //for home '#55c595'
      plan: '#6ab04c', //for plan
      planDes: '#5e7074',  //for plan
      plantitle: '#ffffff', //for plan
      plansub: '#55c595', //for plan 
      plandate: '#ffffff', //for plan
      linearlight: '#e5e9ec', // gradient '#465558',
      linearDark: '#B6C5CD',//'#796f83', //'#459d08',  // gradient '#333333',
      background: '#ffffff', //white
      text: '#333333', //dark grey
      textGreen: '#488a6a',
      textLight: 'grey',
      textDark: '#72be03',
      iconLight: '#ffffff',
      email: '#219bda',
      Logintext: 'rgba(51,51,51,0.8)',
      placeholder: 'rgba(51,51,51,0.7)', //'#e5e9ec', //
      imgBackground: '#959595',
      imgBorder: '#e2e2e2'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      primary: '#333333', //dark for header
      secondary: '#575f54',
      tertiary: '#333333',
      accent: '#465558', //shade of grey for login/signup
      icon: '#72be03', //'#82b53f', //'#09a798',//'#d2f131' ,//'#97cc3b', //'#72be03', //for home
      //icondark: '#465558', //for home
      iconDes: '#333333', //'#262626', //'#333333',  //for home
      icontitle: '#72be03', //'#82b53f', //'#72be03', //for home
      
      plan: '#72bf04', //for plan 900c3f '#72bf04'
      planDes: '#ffffff',  //for plan
      plantitle: '#333333', //for plan
      plansub: '#989c9d', //for plan
      plandate: '#333333', //for plan
      linearlight: '#e5e9ec',//'#796f83', // gradient
      linearDark: '#796f83',//'#668ecf', // gradient
      background: '#333333', //dark grey
      text: '#ffffff', //white
      textGreen: '#72be03',
      textLight: '#e5e9ec',
      textDark: '#72be03',
      iconLight: '#e5e9ec',
      Logintext: '#989c9d',
      email: '#219bda',
      placeholder: 'rgba(255,255,255,0.5)',
      imgBackground: '#959595',
      imgBorder: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const dataReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userName: action.id,
          firstName: action.firstName,
          lastName: action.lastName,
          userToken: action.token,
          userNumber: action.userNumber,
          userSponsorId: action.userSponsorId,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          firstName: action.firstName,
          lastName: action.lastName,
          userToken: action.token,
          userNumber: action.userNumber,
          userSponsorId: action.userSponsorId,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          firstName: null,
          lastName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          firstName: action.firstName,
          lastName: action.lastName,
          userToken: action.token,
          isLoading: false,
        };
      case 'APPDEFAULTS': 
      return {
        ...prevState,
        DefaultPlan : action.defaultPlanDetails,
        DefaultDropdown: action.defaultDropdown,
        //SavePlanId: action.newId
      };  
      case 'SCREEN': 
        return {
          ...prevState,
          screen: action.Data,
        };
      case 'SCREENINIT': 
        return {
          ...prevState,
          "Plan Details": action.planDetails,
          Classes: action.classes,
          Census: action.census,
          Calculate: action.calculate
        };
      case 'SCREENPlanList': 
        return {
          ...prevState,
          "Plan List": action.Data,
        };
      case 'SCREENPlanDetails': 
        return {
          ...prevState,
          "Plan Details": action.Data,
        };
      case 'SCREENClass': 
        return {
          ...prevState,
          Classes: action.Data,
        };
      case 'SCREENCensus': 
        return {
          ...prevState,
          Census: action.Data,
        };
      case 'SCREENReports': 
        return {
          ...prevState,
          Report: action.Data,
        };  
      case 'SCREENCalculate': 
        return {
          ...prevState,
          Calculate: action.Data,
        };  
      case 'SAVE': 
        return {
          ...prevState,
          planData: action.planData,
          SavePlanId: action.newId
        };
      case 'DELETE': 
        return {
          ...prevState,
          planData: action.newArr,
          //SavePlanId: action.newId
        };
      case 'PLAN': 
        return {
          ...prevState,
          planData: action.Data,
          //SavePlanId: action.newId
        };  
      case 'CENSUS': 
        return {
          ...prevState,
          censusData: action.Data,
          //SavePlanId: action.newId
        }; 
      case 'PLANID': 
        return {
          ...prevState,
          selectedPlan: action.PlanId,
          //SavePlanId: action.newId
        };  
      case 'Menu': 
        return {
          ...prevState,
          Selected: action.index,
          MenuCurrent: action.MenuName,
          MenuResponse: action.Response
          //SavePlanId: action.newId
        };  
      case 'ClassADD': 
        return {
          ...prevState,
          classAdded: action.NewInfo
        };  
      case 'ClassEdit': 
        return {
          ...prevState,
          classEdited: action.EditInfo
        };  
      case 'CensusADD': 
        return {
          ...prevState,
          censusAdded: action.NewUserInfo
        };  
      case 'CensusEdit': 
        return {
          ...prevState,
          censusEdited: action.EditUserInfo
        };
      case 'SetDetails': 
        return {
          ...prevState,
          DetailsFetchedData: action.Data
        };  
        /*
      case 'OPEN': 
        return {
          ...prevState,
          search: action.open
        };
      case 'PLANOPEN': 
        return {
          ...prevState,
          plansearch: action.Planopen
        };
        */
    }
  };

  const [dataState, dispatch] = React.useReducer(dataReducer, initialDataState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser, defaultPlanDetails, defaultDropdown) => {
      const token = foundUser.apiToken;
      const id = foundUser.email; 
      const firstName = foundUser.firstName;
      const lastName = foundUser.lastName;
      const userNumber = foundUser.userNumber;
      const userSponsorId = foundUser.userSponsorId;
      let appDefaults = { defaultPlanDetails, defaultDropdown }
      console.log('API TOKEN ===============================>', userNumber, userSponsorId, token);
      //foundUser.token = token;
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(foundUser));
        await AsyncStorage.setItem('appDefaults', JSON.stringify(appDefaults));
      } catch(e) {
        console.log(e);
      }
      //console.log(foundUser);
      dispatch({ type: 'LOGIN', id, token, firstName, lastName, userNumber, userSponsorId });
      if (defaultPlanDetails && defaultDropdown){
        dispatch({ type: 'APPDEFAULTS', defaultPlanDetails, defaultDropdown });
      }
      
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userProfile');
        await AsyncStorage.removeItem('appDefaults');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      
    },
    toggleTheme: () => {
      saveTheme();
    },
    Delete: (index) => {
      let newArr = planData
      newArr.splice(index,1);
      //console.log('new',newArr.length)
      dispatch({ type: 'DELETE', newArr});
    },
    initScreen: (planId)=>{
      let planDetails = {Name: "Plan Details", Method: 'Load', PlanId: planId};
      let classes = {Name: "Classes", Method: 'Load', PlanId: planId};
      let census = {Name: "Census", Method: 'Load', PlanId: planId};
      let calculate = {Name: "Calculate", Method: 'Load', PlanId: planId};
      dispatch({ type: 'SCREENINIT', planDetails, classes, census, calculate});
    },
    setScreen: (Data) => {
      //console.log('SET SCREEN CALLED =============================>', Data);
      if (Data){
        Data.PlanId = dataState.plan.planId;
        switch (Data.Name) {
          case 'Plan List':
            dispatch({ type: 'SCREENPlanList', Data});
            break;
          case 'Plan Details':
            dispatch({ type: 'SCREENPlanDetails', Data});
            break;
          case 'Classes':
            dispatch({ type: 'SCREENClass', Data});
            break;
          case 'Census':
            dispatch({ type: 'SCREENCensus', Data});
            break;
          case 'Report':
            dispatch({ type: 'SCREENReports', Data});
            break;
          case 'Calculate':
            //alert(JSON.stringify(Data));
            dispatch({ type: 'SCREENCalculate', Data});
            break;     
        }
      }
      dispatch({ type: 'SCREEN', Data});
      //console.log('MY SCREEN CALCULATE====>', dataState.screenCalculate);
      //console.log('SET SCREEN DATA =============================>', dataState.Screen);
    },
    save: (navigation, type, planId, userToken, userNumber, userSponsorId) => {
      console.log('==========DATA STATE============>',userSponsorId, userNumber);

      if (!dataState.Details.minSvcType) dataState.Details.minSvcType = DefaultPlan.minSvcType;
      //if (!dataState.Details.sponsorId) dataState.Details.sponsorId = userSponsorId;
      //if (!dataState.Details.userNo) dataState.Details.userNo = userNumber;

      if (planId && type != 'Add New'){
          dataState.Details.planId = planId; 
       }
      //console.log('=====CHECK DETAILS==>',userToken, dataState.Details);
      addEditPlan(navigation, planId, userToken, type);
      
      /*
      //planData.length = total of current number of objects in the array
      let newId = planData.length + 1
      Alert.alert("Update","Total index: " + newId)
      //const obj = [{ id: newId,noOfEE: newId, name: "Blank"}]
      const obj = { planId: newId,noOfEE: newId, planName: "Blank"}
      
      setPlanData(planData = [obj, ...planData]) //planData.concat(obj)
      //console.log(JSON.stringify(planData, null, 2))
      navigation.navigate('Plan Directory', {screen: 'Plan List'})
      
      dispatch({ type: 'SAVE', planData,newId});
      */
    },
    updatePlanData: (Data) => {
      dispatch({ type: 'PLAN', Data});
    },
    setCensusData: (Data) => {
      dispatch({ type: 'CENSUS', Data});
    },
    setPlanID: (PlanId) => {
      dispatch({ type: 'PLANID', PlanId});
    },
    IsSelected: (item,index,navigation) => {
      //console.log('from memo',item.Time);
      let MenuName = item.Time;
      let Response = true;
      navigation.goBack();
      dispatch({ type: 'Menu', index,MenuName,Response});
    },
    ClassAddorEdit: (navigation,StateArray,ClassesState, userToken) => {
      
      //alert(ClassesState);
      addEditClass(navigation, StateArray, ClassesState, userToken);
      /*
      if(ClassesState === 'ClassAdd')
      {
        let NewInfo = StateArray;
        console.log('state for: ', ClassesState)
        console.log('AddArray:', StateArray)
        
        navigation.goBack();
        dispatch({ type: 'ClassADD', NewInfo});
      }
      else//ClassesState === ClassEdit
      {
        let EditInfo = StateArray;
        console.log('state for: ', ClassesState)
        console.log('EditArray:', StateArray)
        navigation.goBack();
        dispatch({ type: 'ClassEdit', EditInfo});
      }
      */
    },
    CensusAddorEdit: (navigation,userArray,CensusState,Censustoken) => {
      addEditCensus(navigation, userArray, CensusState, Censustoken);
      /*
      if(CensusState === 'CensusAdduser')
      {
        let NewUserInfo = userArray;
        console.log('Newuser--------------->', NewUserInfo)
        console.log('state for: ', CensusState)
        console.log('AddUserArray: ==================>', userArray)
        navigation.goBack();
        //dispatch({ type: 'CensusADD', NewUserInfo});
      }
      else//CensusState === CensusEdituser
      {
        let EditUserInfo = userArray;
        console.log('state for: ', CensusState)
        console.log('EditUserArray:', userArray)
        navigation.goBack();
        //dispatch({ type: 'CensusEdit', EditUserInfo});
      }
      */
    },
    setDetails: (Data) => {
      console.log("App=== Set Details", Data.planName);
      dispatch({ type: 'SetDetails', Data});
    }
    /*
    search: () => {
      setopen(open = !open)
      dispatch({ type: 'OPEN', open});
    },
    Plansearch: () => {
      setPlanopen(Planopen = !Planopen)
      dispatch({ type: 'PLANOPEN', Planopen});
    }
    */
  }), []);

  const saveTheme = async() => {
    try {
      //save theme to Storage
      setIsDarkTheme( isDarkTheme = !isDarkTheme );
      await AsyncStorage.setItem('isDarkTheme', isDarkTheme ? '1' : '0');      
    } catch(e) {
        console.log(e);
    }
  };

//
//CENSUS 
//https://rpcapi-dev.azurewebsites.net/api/CB/Participants/Participant
//{"PlanId":43773,"FirstName":"Ramir A","LastName":"Cortezano","Principal":false,"PercentOwnership":0,"FamilyCode":" ","DateOfBirth":"02/01/1980","DateOfHire":"01/01/2016","WorkHours":"1000","Age":0,"PastService":4,"LastYearComp":10000,"W2Earnings":25000,"CatchUp":1,"HighlyComp":0,"ClassId":65,"Sex":"M","DeferralOverrideType":"%","DeferralOverrideValue":" ","CBOverrideValue":" ","CBOverrideType":"%","PSOverrideValue":" ","PSOverrideType":"%","IsOwner":false,"RetAge":0,"ParticipationDate":"01/01/2020","ParticipationDateOverride":false,"HCEOverride":false}

  const addEditCensus = async (navigation, data, type, userToken) => {
    console.log('census type ====', type);
    let url = baseURL + '/Participants/Participant';
    let method = 'POST';
    let headers = new Headers();
    let body = JSON.stringify(data);
    if (type === 'CensusEdituser' ) method = 'PUT'
    
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', userToken);

    console.log("<==ADD EDIT Census==>",  url, method, headers, body); //,
  
    let req = new Request(url, {
        method,
        headers,
        body
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
        
        if (responseJson.isSuccess && responseJson.obj){
          //alert(JSON.stringify(responseJson));
          dispatch({ type: 'SCREENCensus', Data: {Name: 'Census', Method: 'Reload'}});
          navigation.goBack();
        } else {
          Alert.alert("Data Error", responseJson.message);
        }
        
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        return false;
    });
  }


  //https://rpcapi-dev.azurewebsites.net/api/CB/Classes/Class
  // {"PlanId":43773, "ClassCode":"G","Description":"Class G","ContributionType":1,"CBValue":1,"CBValueType":"%","PSValue":1,"PSValueType":"%","IsDefault":0}
  //{"Code":"T","Description":null,"Contritype":"1","CashBalance":null,"CashAmt":"%","ProfitSharing":null,"ProfitAmt":"%"}

  //DELETE : https://rpcapi-dev.azurewebsites.net/api/CB/Classes/Class?id=174107
  const addEditClass = async (navigation, data, type, userToken) => {
    let url = baseURL + '/Classes/Class';
    let method = 'POST';
    let headers = new Headers();
    let body = JSON.stringify(data);
    if (type === 'ClassEdit' ) method = 'PUT'
    
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', userToken);

    console.log("<==ADD EDIT CLASS==>",  url, method, headers, body); //,
   
    let req = new Request(url, {
        method,
        headers,
        body
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
        
        if (responseJson.isSuccess && responseJson.obj){
          //alert(JSON.stringify(responseJson));
          dispatch({ type: 'SCREENClass', Data: {Name: 'Classes', Method: 'Reload'}});
          navigation.goBack();
        } else {
          Alert.alert("Data Error", responseJson.message);
        }
        
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        return false;
    });
  }

  

  const addEditPlan = async (navigation, planId, userToken, type) => {
    let url = baseURL + '/Plans/Plan';
    let method = 'POST';
    let headers = new Headers();
    let body = JSON.stringify(dataState.Details);
    
    if (planId) method = 'PUT'
    
    
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', userToken);

    console.log("==================SAVE UPDATE PLAN====TOKEN===>",  url, method, headers, body); //,
   
    let req = new Request(url, {
        method,
        headers,
        body
    });

    await fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.isSuccess && responseJson.obj){
          if (type === 'Add New'){
            let PlanId = responseJson.obj;
            dispatch({ type: 'PLANID', PlanId});
            let Data = {Name: 'Plan List', Method : PlanId};
            dispatch({ type: 'SCREENPlanList', Data});
          } else {
            let Data = {Name: 'Plan List', Method : "reload"};
            dispatch({ type: 'SCREENPlanList', Data});
          }

          navigation.navigate('Plan Directory', {screen: 'Plan List'})
          console.log("==================SAVE RESPONSE ===>", responseJson);
        } else {
          Alert.alert("Data Error", responseJson.message);
        }
    })
    .catch((error) => {
        Alert.alert("Connection Error", error.message);
        return false;
    });
  }

  const getAsyncStorage = async() => {
    let userProfile = null;
        let userProfileObj = null;
        let appDefaults = null;
        let appDefaultsObj = null;
        let defaultPlanDetails = null;
        let defaultDropdown = null
        let token = null;
        let userName = null;
        let firstName = null;
        let lastName = null;
        let userNumber = null;
        let userSponsorId = null;
      console.log("START++>");
      try {
          //getting theme from Storage
          var isDarkThemeStorage = await AsyncStorage.getItem('isDarkTheme');
          if (isDarkThemeStorage && isDarkThemeStorage != null) setIsDarkTheme( isDarkTheme = (isDarkThemeStorage == '1' ? true : false) );
          userProfile = await AsyncStorage.getItem('userProfile');
          userProfileObj = JSON.parse(userProfile);
          console.log('User Profile=>', userProfile);
        if (userProfileObj && userProfileObj.apiToken){
            token = userProfileObj.apiToken;
            userName = userProfileObj.email;
            firstName =userProfileObj.firstName;
            lastName = userProfileObj.lastName;
            userNumber = userProfileObj.userNumber;
            userSponsorId = userProfileObj.userSponsorId;
        }
        appDefaults = await AsyncStorage.getItem('appDefaults');
        appDefaultsObj = JSON.parse(appDefaults);
        if (appDefaultsObj && appDefaultsObj.defaultPlanDetails && appDefaultsObj.defaultDropdown){
          defaultPlanDetails = appDefaultsObj.defaultPlanDetails;
          defaultDropdown = appDefaultsObj.defaultDropdown;
        }

      } catch(e) {
          console.log(e);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token, id: userName, firstName, lastName, userNumber, userSponsorId });
      console.log('RETRIEVE_TOKEN=========================>', userNumber, userSponsorId, token);
      if (defaultPlanDetails && defaultDropdown) {
        dispatch({ type: 'APPDEFAULTS', defaultPlanDetails, defaultDropdown });
      }
      
  };

  useEffect(() => {
    //setTimeout(async() => {
      getAsyncStorage();      
    //}, 10);
  }, []);

  if( dataState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color={colors.primary}/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={[authContext, dataState]}>
      <NavigationContainer theme={theme}>
        { dataState.userToken !== null ? (
          <Drawer.Navigator drawerContentOptions={{ activeBackgroundColor: 'rgba(59, 128, 5, 0.2)', activeTintColor: '#72bf04',
          itemStyle: { marginTop: 2.25, marginHorizontal: 10 } }} drawerStyle ={{ backgroundColor: isDarkTheme ? '#333333' : 'white'}} drawerContent={props => <DrawerContent {...props} />}>
            
            <Drawer.Screen name="Home"  component={HomeStackScreen} options={{
                drawerIcon: ({ color, size }) => <Icon
                    size={size}
                    name="home"
                    color={color} />
            }} />
            <Drawer.Screen name="My Profile" component={ProfileScreen} options={{
                drawerIcon: ({ color, size }) => <Icon2
                    size={size}
                    name="ios-person"
                    color={color}
                    style={{ marginRight: 2.5, marginLeft: 2.5}} />
            }} />
            <Drawer.Screen name="My Contact" component={BookmarkScreen} options={{
                drawerIcon: ({ color, size }) => <Icon
                    size={size}
                    name="contacts"
                    color={color} />
            }} />
            <Drawer.Screen name="Setup" component={SettingsScreen} options={{
                drawerIcon: ({ color, size }) => <Icon
                    size={size}
                    name="settings"
                    color={color} />
            }} />
            <Drawer.Screen name="Help" component={SupportScreen} options={{
                drawerIcon: ({ color, size }) => <Icon
                    size={size}
                    name="help"
                    color={color} />
            }} />
            
            {/* 
            <Drawer.Screen name="HomeScreen"  component={MainTabScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen } />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />    
            */}
          </Drawer.Navigator>
        )
      :
        <RootStackScreen/>
      }
      </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;