import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,Dimensions,FlatList, Alert, SafeAreaView, Button } from 'react-native';
import{ AuthContext } from '../components/context';
//import PlanTopTab from './PlandetailsTopTab'
import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Settings from '../settings.json';
const baseURL = Settings.domain;
const InterestModal = ({ navigation,Open,setOpen }) => {

    //console.log('Open', Open)
  //const [layoutheight, setlayoutheight] = React.useState(0);
  let [Interest_index, setInterest_index] = React.useState(0);//default 1
  const { colors } = useTheme();
  const [{},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)
    const dummy = [
        {id: '1',rateMonthName: '2021 HATFA',transitionalFlag: 'No',segment1Rate: '3.32',segment2Rate: '4.79',segment3Rate: '5.47'},
    ]
    
    let [InterestData, setInterestData] = React.useState(dummy);//default 1
    const InterestShow = (item) => {
        if(Interest_index === item.id)
        {
            setInterest_index(Interest_index = 0);
        }
        else
        {
            setInterest_index(Interest_index = item.id);
        }
    }

    const GetFlag = (bool) => {
        if(bool === true)
        {
            return "Yes";
        }
        else
        {
            return "No";
        }
    }
    

    

    React.useEffect(() => {
        GetInterestRate();
        
    }, []);


    const GetInterestRate = async () => {
        let Host = 'rpcapi-dev.azurewebsites.net';
        let url = baseURL + '/CBLookUp/GetInterestRates?calcType=3&isProposal=true';
        let method = 'GET';
        let headers = new Headers();
        console.log(url);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
        headers.append('Host', Host);
        console.log('GetInterest Rate =====>', url, method, headers);
        
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.isSuccess){
              console.log("FROM UseEffect =====Api Get Interest rate========> ", responseJson.obj);
              setInterestData(responseJson.obj);
            } else {
              Alert.alert("Data Error", responseJson.message);              
            }
            
        })
        .catch((error) => {
            Alert.alert("Connection Error", error.message);
            
            return false;
        });
      }

    return(
       
        <Modal
            animated={true}
            //ref={ref => (this._modal = ref)}
            animationType="fade"
            transparent={true}
            visible={Open}
            onRequestClose={() => {}}  
        >
       
        <View style ={styles.ModalBackground}>
            <LinearGradient colors={[colors.linearlight,colors.linearDark]} 
            style ={styles.Modalcontainer}>

            <View style={[styles.greencontainer, {backgroundColor: colors.icon }]}>
                <View style={styles.headercontainer}>
                    <Text style={[styles.header,{padding: 5}]}>Interest Rates</Text>
                    <TouchableOpacity style={{ padding: 5, borderRadius: 10}} onPress={() => setOpen(Open = !Open)}>
                    <Text style={styles.header}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*
            <WebView source={{ uri: 'https://expo.io' }} /*style={{ marginTop: 20 }} />
                */}


            <FlatList
                //horizontal={true}
                data={InterestData}
                //extraData={indexChecked}
                renderItem={({ item,index }) => <Item rateMonthName={item.rateMonthName} transitionalFlag={GetFlag(item.transitionalFlag)} segment1Rate={item.segment1Rate}
                segment2Rate={item.segment2Rate} segment3Rate={item.segment3Rate} item={item} /> }
                keyExtractor={item => item.id.toString()}
                //onEndReached={() => {console.log('list ended');}}
            />
            
            </LinearGradient>
        </View>
    
        </Modal>
       
    )
    
    function Item({ rateMonthName,transitionalFlag,segment1Rate,segment2Rate,segment3Rate,item }) {
        return (
        <View style={[styles.Info_container, {backgroundColor: colors.iconDes}]}>
            <TouchableOpacity style={styles.item} onPress={() => {InterestShow(item)}}>
                <View style={styles.Spacer}>
                    <Text style={{color: colors.text}}>{'Rate Month'}</Text>
                    <View style={styles.align}>
                        <Text style={{marginRight: 5, color: colors.text}}>{rateMonthName}  </Text>
                        {Interest_index === item.id && 
                        <Button
                            onPress={() => alert(item.rateMonthName)}
                            title="Apply"
                            color="#72bf04"
                        />}
                    </View>
                </View>
                {Interest_index === item.id && 
                <View>
                    <View style={styles.Spacer}>
                        <Text style={{color: colors.text}}>{'transitionalFlag'}</Text>
                        <Text style={{color: colors.text}}>{transitionalFlag}</Text>
                    </View>

                    <View style={styles.Spacer}>
                        <Text style={{color: colors.text}}>{'segment1Rate(Years 0-5)'}</Text>
                        <Text style={{color: colors.text}}>{segment1Rate}</Text>
                    </View>

                    <View style={styles.Spacer}>
                        <Text style={{color: colors.text}}>{'segment2Rate (Years 6-20)'}</Text>
                        <Text style={{color: colors.text}}>{segment2Rate}</Text>
                    </View>

                    <View style={styles.Spacer}>
                        <Text style={{color: colors.text}}>{'segment3Rate (Years > 20)'}</Text>
                        <Text style={{color: colors.text}}>{segment3Rate}</Text>
                    </View>
                </View>}
            </TouchableOpacity>
        </View>
        );
    } 
}



export default InterestModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'rgba(51,51,51, 0.8)'
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(51,51,51, 0.8)'
    },

    Modalcontainer: {
        height: height/1.4,
        //borderRadius: 5,
        margin: 20,
        top: '12.5%',
        //padding: 20,
        //backgroundColor: 'rgba(51,51,51,1)',
        //backgroundColor: 'white',
       //justifyContent: 'center'
    },

    header: {
        color: 'white',
        fontSize: 18,
        //flexDirection: 'row',
        fontWeight: 'bold',
        alignContent: 'center',
        //marginBottom: 5,
    },
   
    greencontainer: {
        padding: 10,
        //backgroundColor: '#00BFFF',
        //justifyContent: 'center'
        textAlign: 'center'
        
    },
    headercontainer: {
        marginLeft: 5,
        marginRight: 5,
        //backgroundColor: 'green',
        flexDirection: 'row',
        //flexWrap: 'wrap',
        justifyContent: 'space-between',
        
    },
    Info_container: {
        //backgroundColor: 'rgba(51,51,51, 0.8)',
        borderRadius: 5,
        margin: 5,
        padding: 10,
    },
    Spacer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    itemText: {
        color: 'white',
    },
    
    align: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
  });