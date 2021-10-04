import React from 'react';
import { Alert} from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
import PDGeneralScreen from './PlanDetailsGeneralTab';
import PDCashbalanceScreen from './PlanDetailsCashBalanceTab';
import PD401kScreen from './PlanDetails401(k)Tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const TopTabs = ({navigation, route,error,set_Error}) => {
    //let [check1, setcheck] = React.useState(false); 
    //console.log(route,'nested details ------------------->')
    const [{},dataState] = React.useContext(AuthContext);
  
   //console.log('dataState.Details.PlanName', dataState.Details.planName)
    const { colors } = useTheme();
    return (
        
      <TopTab.Navigator swipeEnabled={false}  /*initialRouteName="General"*/
        tabBarOptions={{
          activeTintColor: '#fff',
          indicatorStyle: { backgroundColor: '#f3ad2b'},
          //labelStyle: { fontSize: 12 },
          
          style: { backgroundColor: colors.secondary },
      }}>

        <TopTab.Screen name="General" //component={PDGeneralScreen} 
          listeners={({ navigation }) => ({
          tabPress: event => {
           //console.log('Gen Tab Click');
            //dataState.Details.tabClicked = "General";
            //navigation.popToTop()
          }
          })
        }
        >
               {props => <PDGeneralScreen {...props} Error={error} SetError={set_Error} />}
        </TopTab.Screen>
        <TopTab.Screen name="Cash Balance" component={PDCashbalanceScreen} 
           listeners={({ }) => ({
            tabPress: event => {
              //dataState.Details.tabClicked = "Cash Balance";  
              if(dataState.Details.planName === undefined || dataState.Details.planName === "")
              {
                event.preventDefault();
                Alert.alert('Error','Please enter Plan Name'); //dataState.Details.PlanName
              }
            }
            })
          }
        />
        <TopTab.Screen name="401(k)" component={PD401kScreen} 
           listeners={({ }) => ({
            tabPress: event => {
              //dataState.Details.tabClicked = "401(k)";
              if(dataState.Details.planName === undefined || dataState.Details.planName === "")
              {
                event.preventDefault();
                Alert.alert('Error','Please enter Plan Name'); //dataState.Details.PlanName
              }
              else if(dataState.Is401kChecked === false)
              {
                event.preventDefault();
                //Alert.alert('Not Editable','Please check 401(k) first');
              }
            }
            })
          }
        />
      </TopTab.Navigator>
    )
  };

  export default TopTabs;