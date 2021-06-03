import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList,Dimensions,TouchableHighlight,SafeAreaView, Alert, ActivityIndicator } from 'react-native';
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
let ReportRightAction = ({item,index}) =>
{
  return(
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity  style={styles.DownloadAction} disabled = {item.Status != "Completed"} onPress={() => ReportDownload(item,index)}>
          <Icon style={styles.actionText} name="download" size={25} color="white" />
      </TouchableOpacity>
    </View>
  )
};
const ReportListScreen = ({ navigation, CalculateLoading }) => {
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);
    const [reportData, setReportData] = React.useState(null);
    
    React.useEffect(() => { 
        setReportData(reportData => null)
        getReportData(dataState.plan.planId);           
    }, [dataState.Report]);
    
    const ReportDATA = [
        {
            id: '1',
            Status: 'Complete',
            Date: '7/20/2020', 
            Num: 2
        },
        {
            id: '2',
            Status: 'Pending',
            Date: '7/22/2020',    
            Num: 1
        },
        {
            id: '3',
            Status: 'Pending',
            Date: '7/24/2020',
            Num: 1
        },
      ];
      
      const getReportData = async (planId) => {
        let url = baseURL + '/Calculation/ReportRequestList?queStatus=&sortBy=RequestDate&sortOrder=D&maxRows=10&planId=' +  planId;
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
            console.log("FROM UseEffect =====Api Called GET Report========> ", responseJson.obj);
            let data = [];
            responseJson.obj.forEach(function(item, idx) {        
              let rptData = {};
              rptData.id = item["id"];
              rptData.Status = item["requestStatusDesc"];
              rptData.Date = moment(item.requestDate).format('MM/DD/YYYY HH:MM:ss');
              rptData.Num = item["reportName"].split(',').length;
              rptData.ReportName = item["reportAliasName"];
              data.push(rptData);
            });

            setReportData(reportData => data);            
          } else {
            //console.log(responseJson)
            setReportData(reportData => []);
          }
        })
        .catch((error) => {
            Alert.alert("Connection Error", error.message);
            return false;
        });
      }


      const viewReportById = async (item) => {
        let url = baseURL + '/Calculation/ViewReport?id=' + item.id;
        let method = 'GET';
        let headers = new Headers();
        //console.log(url);
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
        console.log('GET REPORT PLAN =====>', url, method, headers);
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("FROM UseEffect =====Api Called GET Report========> ", responseJson.obj);
          
        })
        .catch((error) => {
            Alert.alert("Connection Error", error.message);
            return false;
        });
      }

  

      ReportDownload = async (item,index) => {
        console.log('item ===REPORT DOWNLOAD=====>',item,index)
        //'http://africau.edu/images/default/sample.pdf'
        
        //let result = viewReportById(item);
        let url = baseURL + '/Calculation/ViewReport?repid=' + item.id + '.pdf&Authorization=' + dataState.userToken.replace('bearer', '').trim();
        console.log('URL==>', url);
        let result = await WebBrowser.openBrowserAsync(url);
        console.log(result);
      }

      Reporttoggle = (item) => {
        //Alert.alert('info:',item.id + " " + item.Class);
        console.log('info:',item.id + " " + item.Status + " " + item.Date);
      }

    return (
        <LinearGradient 
        colors={[colors.linearlight,colors.linearDark]}
        style = {styles.container}
        >  
        {!reportData ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          :
          <View style = {styles.container}>
            {reportData.length === 0 ?   
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text allowFontScaling={false} style={[{fontSize:16, color: color.secondary}]}>No Records Found</Text>
            </View>
            :
            <SafeAreaView style={{marginTop: 5, marginBottom: 25}}>
              <Text allowFontScaling={false} style={[styles.title,{fontSize:17, color: color.secondary, paddingBottom: 3}]}>{dataState.plan.planName}</Text>
            <FlatList
              data={reportData}
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
        let reportName = item.ReportName;
        console.log(">>>",reportName,">>>");
        return (
          
          <View style={styles.listContainer}>
            <Swipeable 
              disabled = {item.requestStatus != "C"}
              renderRightActions={() => <ReportRightAction item={item} index={index + 1}/>}
              overshootRight={false}
            >

            <TouchableHighlight underlayColor={'transparent'} key={index} disabled = {item.requestStatus != "C"} onPress={() => Reporttoggle(item)}>  
              <View style={[styles.item,{borderTopColor: colors.icon, borderBottomColor: colors.icon}]}>
              
                <View style={[styles.TextContainer, {backgroundColor: colors.iconDes}]}>
                    {reportName === ""  && item.Status !== "Failed" && 
                    <View>
                      <ActivityIndicator size="small" color={colors.icon}/>
                    </View>}

                    {reportName !== null &&  
                    <View style={{justifyContent: 'flex-start',  flexDirection: 'row', paddingLeft: 3, paddingBottom: 3}}>
                      <Text allowFontScaling={false} style={[styles.title,{fontSize: height > 800 ? 16 : 14, color: colors.textLight, fontStyle: 'italic'}]}>{item.Status !== "Failed"? item.ReportName: "Report Failed"}</Text>
                    </View>}

                    <View style={{justifyContent: 'space-around',  flexDirection: 'row',}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>No</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{index + 1}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>Status</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{item.Status}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>Run Date</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{item.Date}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text allowFontScaling={false} style={[styles.title,{color: colors.textLight}]}>Reports</Text>
                            <Text allowFontScaling={false} style={[styles.subtitle,{color: colors.textLight}]}>{item.Num}</Text>
                        </View>
                    </View>
                </View>
              
              </View>
            </TouchableHighlight>
            </Swipeable>
          </View>
        );
      }
};

export default ReportListScreen;

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
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',   
    fontSize: height > 800 ? 15 : 13,
    //color: 'white'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: height > 800 ? 13 : 11,
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
  actionText: {
    padding: 15,
    //color: 'white'
  }
});