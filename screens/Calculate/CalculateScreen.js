import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList,Dimensions,TouchableHighlight,SafeAreaView, Alert, ActivityIndicator, Button, Modal,TextInput } from 'react-native';
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



const CalculateScreen = ({ navigation, CalculateLoading, CalculateModal,SetCalculateModal }) => {
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
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);
    console.log(CalculateModal);
    let [CalculateIndex, setCalculateIndex] = React.useState(null);//default 1
    let [CalReportName, setCalReportName] = React.useState(null);
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
  
      
      const handleDownload = async (item) => {
        let reportLink = item.reportOutputName.replace('DownloadReport','ViewReport');
        reportLink = reportLink.replace('?id', '?repid') + '.pdf&Authorization=' + dataState.userToken.replace('bearer', '').trim();
        console.log(item.reportOutputName, reportLink);
        let result = await WebBrowser.openBrowserAsync(reportLink);
        //setresult(thisresult = result)
      };      
      
      React.useEffect(() => {
        if (dataState.Calculate === null || (dataState.Calculate && dataState.Calculate.Name === 'Calculate')){
          setCalculateData(calculateData => null);
          console.log("useEffect =====CALCULATE SCREEN========> ", dataState.plan);
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

      const YesClicked = () => {
        SetCalculateModal(!CalculateModal);
        calculatePlan(dataState.plan.planId);
      }


      const calculatePlan = async (planId) => {
        let name = CalReportName === null ? 'ReportFromCalculation' : CalReportName;
        let url = baseURL1 + '/GetCalculationResult?planId=' + planId + '&reportAlias=' + name;
        let method = 'GET';
        let headers = new Headers();
        console.log(url);
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
              setCalReportName(CalReportName = "");
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
        //const keys = Object.entries(datas); // data info
      
        return datas.map((item) => {
          //console.log('===================================>', element.ndtFieldVal);
          let id = item.ndtFieldId;
          let text = item.ndtFieldName.replace("\\n", "\n");
          let value = item.ndtFieldVal;
          if (value === "True"){
            value = <Icon name="check" size={20} color="green"/>
          } else if (value === "False"){
            value = <Icon name="window-close" size={20} color="red"/>
          }
        return (
          [<View key={1} style={{flex:1,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text allowFontScaling={false} key={id} style={[styles.infotext,{color: colors.textLight}]}>{text}</Text>
                {value !== "*" &&
                  <Text allowFontScaling={false} style={[styles.infotext,{color: colors.textLight}]}>{value}</Text>
                }
          </View>]
          )
        })
      }

    return (
        <LinearGradient 
        colors={[colors.linearlight,colors.linearDark]}
        style = {styles.container}
        >  
        <Modal
          animationType="slide"
          transparent={true}
          visible={CalculateModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <TouchableHighlight underlayColor={'rgba(51,51,51,0.7)'} style={styles.centeredView} onPress={() => {SetCalculateModal(!CalculateModal);}}>
            <View style={styles.modalView}>
              <View style={{flexDirection: 'column'}}>
                <Text allowFontScaling={false} style={{...styles.modalText, fontWeight: 'bold', fontSize: 18}}>Calculate</Text>
                <Text allowFontScaling={false} style={{...styles.modalText}}>Report Name</Text>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="Name..."
                  style={[styles.SubtextInput,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={CalReportName}
                  //keyboardType='numeric'
                  onChangeText={(val) => setCalReportName(CalReportName = val)}
                />
                <Text allowFontScaling={false} style={{...styles.modalText}}>Are you sure you want to Calculate Plan?</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end' , justifyContent: 'flex-end'}}>
                <TouchableHighlight underlayColor={"#72be03"}
                  style={{ ...styles.openButton, backgroundColor: "#72be03", marginRight: 5 }}onPress={() => {YesClicked()}}
                >
                  <Text allowFontScaling={false} style={styles.textStyle}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={"#72be03"}
                  style={{ ...styles.openButton, backgroundColor: "#72be03" }}onPress={() => {[SetCalculateModal(!CalculateModal),setCalReportName(CalReportName = "")]}}
                >
                  <Text allowFontScaling={false} style={styles.textStyle}>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </TouchableHighlight>
        </Modal>

        {!calculateData ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          :
          <View style = {styles.container}>
            {calculateData.length === 0 ?   
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text allowFontScaling={false} style={[{fontSize:16, color: color.secondary}]}>No Records Found</Text>
            </View>
            :
            <SafeAreaView style={{marginTop: 5, marginBottom: 25}}>
            <Text allowFontScaling={false} style={[styles.title,{fontSize:17, color: color.secondary, paddingBottom: 3}]}>{dataState.plan.planName}</Text>
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
        let reportName = item.reportName;
        console.log(item);
        if (item.requestStatus === "C") requestCompleted = moment(item.requestCompleted).format('MM/DD/YYYY HH:MM:ss');
        return (
          <View style={styles.listContainer}>
            <Swipeable 
              renderRightActions={() => <CalculateRightAction item={item} index={index + 1}/>}
              overshootRight={false}
            >

            <TouchableHighlight underlayColor={'transparent'} disabled = {item.requestStatus != "C"} key={index} onPress={() => toggleCalculate(item,index)}>  
              <View style={[styles.item,{borderTopColor: colors.icon, borderBottomColor: colors.icon}]}>
                <View style={[styles.TextContainer, {backgroundColor: colors.iconDes}]}>
                    {reportName !== null &&                
                    <View style={{justifyContent: 'flex-start',  flexDirection: 'row', paddingLeft: 3, paddingBottom: 3}}> 
                      <Text allowFontScaling={false} style={[styles.title,{fontSize: height > 800 ? 18 : 14, color: colors.textLight, fontStyle: 'italic'}]}>{item.reportName}</Text>
                    </View>
                    }
                    {reportName === null && item.requestStatus !== "F" && 
                    <View>
                      <ActivityIndicator size="small" color={colors.icon}/>
                    </View>
                    }
                    <View style={{justifyContent: 'space-around',  flexDirection: 'row',}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>No</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{index + 1}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>Status</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{item.requestStatusDesc}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>Run Date</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{requestDate}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>Reports</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>16</Text>
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
    fontSize: height > 800 ? 16 : 13,
    //color: 'white'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: height > 800 ? 13 : 10,
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

  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22
  },
  modalView: {
    //margin: 20,
    width: width - 80,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "left"
  },
  SubtextInput: {
    //flex: 1,  
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#989c9d',
  },
 
});