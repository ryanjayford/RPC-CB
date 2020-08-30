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
      <TouchableOpacity  style={styles.DownloadAction} onPress={() => ReportDownload(item,index)}>
          <Icon style={styles.actionText} name="download" size={25} color="white" />
      </TouchableOpacity>
    </View>
  )
};
const ReportListScreen = ({ navigation, CalculateLoading }) => {
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);
    
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
      //const [calculateData, setCalculateData] = React.useState(null);
  

      ReportDownload = async (item,index) => {
        let result = await WebBrowser.openBrowserAsync('http://africau.edu/images/default/sample.pdf');
        console.log(result);
        //console.log(item,index)
        //http://africau.edu/images/default/sample.pdf - test
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
        {!CalculateDATA ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          :
          <View style = {styles.container}>
            {CalculateDATA.length === 0 ?   
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={[{fontSize:16, color: color.secondary}]}>No Records Found</Text>
            </View>
            :
            <SafeAreaView style={{marginTop: 5}}>
            <FlatList
              data={CalculateDATA}
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
        //let requestDate = moment(item.requestDate).format('MM/DD/YYYY HH:MM:ss');
        //let requestCompleted = 'Running';
        //if (item.requestStatus === "C") requestCompleted = moment(item.requestCompleted).format('MM/DD/YYYY HH:MM:ss');
        return (
          
          <View style={styles.listContainer}>
            <Swipeable 
              renderRightActions={() => <ReportRightAction item={item} index={index + 1}/>}
              overshootRight={false}
            >

            <TouchableHighlight underlayColor={'transparent'} key={index} onPress={() => Reporttoggle(item)}>  
              <View style={[styles.item,{borderTopColor: colors.icon, borderBottomColor: colors.icon}]}>
              
                <View style={[styles.TextContainer, {backgroundColor: colors.iconDes}]}>
                    <View style={{justifyContent: 'space-around',  flexDirection: 'row',}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>No</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{index + 1}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>Status</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{item.Status}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>Run Date</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{item.Date}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.title,{color: colors.textLight}]}>Complete Date</Text>
                            <Text style={[styles.subtitle,{color: colors.textLight}]}>{item.Date}</Text>
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
  actionText: {
    padding: 15,
    //color: 'white'
  }
});