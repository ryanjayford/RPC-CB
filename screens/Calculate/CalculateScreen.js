import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList,Dimensions,TouchableHighlight,SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import Settings from '../../settings.json';
import { color } from 'react-native-reanimated';
import * as WebBrowser from 'expo-web-browser';
const {width,height} = Dimensions.get('window');
const baseURL = Settings.domain;
const baseURL1 = Settings.calc;
//CalculateDownloadActionClickEventListener(item,index)
let CalculateRightAction = ({item,index}) =>
{
  return(
    <View style={{flexDirection: 'row'}}>
      {(item.requestStatus === 'C')?
      <TouchableOpacity  style={styles.DownloadAction} onPress={() => handleDownload(item)}>
          <Icon style={styles.actionText} name="download" size={25} color="white" />
      </TouchableOpacity>
      : null
      }
    </View>
  )
};

const handleDownload = async (item) => {
  let reportLink = item.reportOutputName.replace('DownloadReport','ViewReport'); 
  console.log(item.reportOutputName, reportLink);
  let result = await WebBrowser.openBrowserAsync(reportLink);
  //setresult(thisresult = result)
};
const CalculateScreen = ({ navigation, CalculateLoading }) => {
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);

    let [CalculateIndex, setCalculateIndex] = React.useState(null);//default 1
    const CalculateDATA = [
        {
            id: '1',
            Status: 'Complete',
            Date: '7/20/2020', 
        },
        {
            id: '2',
            Status: 'Pending',
            Date: '7/22/2020',    
        },
        {
            id: '3',
            Status: 'Pending',
            Date: '7/24/2020',
        },
      ];
      const [calculateData, setCalculateData] = React.useState(null);
  
      
      
      
      React.useEffect(() => {
        if (dataState.Calculate === null || (dataState.Calculate && dataState.Calculate.Name === 'Calculate')){
          setCalculateData(calculateData => null);
          console.log("useEffect =====CALCULATE SCREEN========> ", dataState.plan.planId);
          if (dataState.Calculate && dataState.Calculate.Method === 'Calculate') {
            calculatePlan(dataState.plan.planId);
          } else {
            getCalculatedPlan(dataState.plan.planId);
          }
        }
      }, [dataState.Calculate]);
      

      const ConfirmCalcualte = (planId) => {
        Alert.alert("Calculate", "Are you sure you want to Calculate current Plan?", 
        [{ text: "Yes", onPress: () => calculatePlan(planId) },
        { text: "No", onPress: () => getCalculatedPlan(planId), style: "cancel" }],
        { cancelable: false }); 
      }


      const calculatePlan = async (planId) => {
        let url = baseURL1 + '/GetCalculationResult?planId=' + planId;
        let method = 'GET';
        let headers = new Headers();
        //console.log(url);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
        console.log('CALC PLAN =====>', url, method, headers);
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.isSuccess){
              console.log("FROM UseEffect =====Api Called CALCULATE========> ", responseJson);
              
            } else {
              Alert.alert("Data Error", responseJson.message);              
            }
            setTimeout(() => {
              getCalculatedPlan(planId);
            }, 1000)
        })
        .catch((error) => {
            Alert.alert("Connection Error", error.message);
            getCalculatedPlan(planId);
            return false;
        });
      }

      const getCalculatedPlan = async (planId) => {
        let url = baseURL + '/Calculation/CalculationRequestList?planId=' +  planId;
        let method = 'GET';
        let headers = new Headers();
        //console.log(url);
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
        console.log('GET CALC PLAN =====>', url, method, headers);
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.isSuccess && responseJson.obj){
            console.log("FROM UseEffect =====Api Called GET CALCULATE========> ", responseJson.obj);
            setCalculateData(calculateData => responseJson.obj);            
          } else {
            //Alert.alert("Data Error", responseJson.message);
            //getCalculatedPlan(planId);
            console.log(responseJson)
            setCalculateData(calculateData => []);
          }
        })
        .catch((error) => {
            Alert.alert("Connection Error", error.message);
            return false;
        });
      }

      const toggleCalculate = (item,index) => {
        //Alert.alert('info:',item.id + " " + item.Class);
        console.log('info:',item.id + " " + item.Status + " " + item.Date);
        setCalculateIndex(CalculateIndex = index)

        //console.log('All info----------------->:',item)
      }

      const data = (datas) => {
        //console.log('datas----------------->', datas)
        const keys = Object.entries(datas); // data info
        /*
        return keys.forEach(([key, value]) => {
          console.log('key----------------->', key)
          console.log('value----------------->', value)
          return (
            <Text key={key} style={[styles.infotext,{color: colors.textLight}]}>{[key, value]}</Text>
          )
        })*/

        //console.log('keys----------------->', keys)
        //console.log(datas[keys[0]]);
        /*keys.forEach(element => {
          console.log(element, datas[element])
        });*/
        return keys.map(([key, value]) => {
          if(value === true)
          {
            value = <Icon name="check" size={20} color="green"/>
          }
          else if(value === false)
          {
            value = <Icon name="window-close" size={20} color="red"/>
          }
          return (
            [<View key={1} style={{flex:1,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text key={key} style={[styles.infotext,{color: colors.textLight}]}>{key}</Text>
                <Text key={value} style={[styles.infotext,{color: colors.textLight}]}>{value}</Text>
            </View>]
          )
        })
      }

    return (
        <LinearGradient 
        colors={[colors.linearlight,colors.linearDark]}
        style = {styles.container}
        >  
        {!calculateData ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          :
          <View style = {styles.container}>
            {calculateData.length === 0 ?   
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={[{fontSize:16, color: color.secondary}]}>No Records Found</Text>
            </View>
            :
            <SafeAreaView style={{marginTop: 5}}>
            <FlatList
              data={calculateData}
              //extraData={}
              renderItem={({ item,index }) => <Item index={index} item={item} /> }
              keyExtractor={item => item.id.toString()}
              //onEndReached={() => {}}
            />
        </SafeAreaView>
            }
          </View> 
        }
        </LinearGradient>
    );

    function Item({ index,item }) {
        let requestDate = moment(item.requestDate).format('MM/DD/YYYY HH:MM:ss');
        let requestCompleted = 'Running';
        if (item.requestStatus === "C") requestCompleted = moment(item.requestCompleted).format('MM/DD/YYYY HH:MM:ss');
        return (
          
          <View style={styles.listContainer}>
            <Swipeable 
              renderRightActions={() => <CalculateRightAction item={item} index={index + 1}/>}
              overshootRight={false}
            >

            <TouchableHighlight underlayColor={'transparent'} key={index} onPress={() => toggleCalculate(item,index)}>  
              <View style={[styles.item,{borderTopColor: colors.icon, borderBottomColor: colors.icon}]}>
              
                <View style={[styles.TextContainer, {backgroundColor: colors.iconDes}]}>
                    <View style={{justifyContent: 'space-around',  flexDirection: 'row',}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>No</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{index + 1}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>Status</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{item.requestStatusDesc}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>Run Date</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{requestDate}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>Complete Date</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{requestCompleted}</Text>
                        </View>
                    </View>
                  
                    {item.ndtResult !== null && CalculateIndex === index && 
                      <View style={{ paddingLeft: 10, marginTop: 10}}>
                        {data(item.ndtResult)}
                      </View>
                    }

                </View>
              </View>
            </TouchableHighlight>
            </Swipeable>
          </View>
        );
      }

     
};

export default CalculateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  listContainer: {
    marginHorizontal: 10,
  },
  item: {
    marginBottom: 5,
    //marginTop: 5,
    //height: height/6,
    borderTopWidth: 4,
    borderBottomWidth: 4,
  },
  TextContainer: {
    width: '100%',
    padding: 10,
    //borderBottomRightRadius: 10,
    //justifyContent: 'center',
    //alignContent: 'center',
  },
  infotext: {
    textAlign: 'left',
    //fontWeight: 'bold',   
    fontSize: 11,
    padding: 2,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',   
    fontSize: 13,
    //color: 'white'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 11,
    //color: 'white'
  },
  DownloadAction: {
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    //alignItems: 'flex-end',
    //flex: 1,
    marginBottom: 5,
    //marginTop: 5
  },
  EditAction: {
    backgroundColor: '#72be03',
    justifyContent: 'center',
    //alignItems: 'flex-end',
    //flex: 1,
    marginBottom: 5,
    //marginTop: 5
  },
  actionText: {
    padding: 15,
    //color: 'white'
  },
 
});