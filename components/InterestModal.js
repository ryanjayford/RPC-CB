import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,Dimensions,FlatList, SafeAreaView, Button } from 'react-native';
import{ AuthContext } from '../components/context';
//import PlanTopTab from './PlandetailsTopTab'
import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';

const InterestModal = ({ navigation,Open,setOpen }) => {

    //console.log('Open', Open)
  //const [layoutheight, setlayoutheight] = React.useState(0);
  let [Interest_index, setInterest_index] = React.useState(0);//default 1
  const { colors } = useTheme();
    //const [{},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)
    const dummy = [
        {id: '1',rateYear: '2020 HATFA',transitionalFlag: 'No',segment1Rate: '3.64',segment2Rate: '5.21',segment3Rate: '5.94'},
    ]
    const interest = [
        {id: '1',rateYear: '2020 HATFA',transitionalFlag: 'No',segment1Rate: '3.64',segment2Rate: '5.21',segment3Rate: '5.94'},
        {id: '2',rateYear: '2019 HATFA',transitionalFlag: 'No',segment1Rate: '3.74',segment2Rate: '5.35',segment3Rate: '6.11'},
        {id: '3',rateYear: '2018 HATFA',transitionalFlag: 'No',segment1Rate: '3.92',segment2Rate: '5.52',segment3Rate: '6.29'},
        {id: '4',rateYear: '2017 HATFA',transitionalFlag: 'No',segment1Rate: '4.16',segment2Rate: '5.72',segment3Rate: '6.48'},
        {id: '5',rateYear: '2016 HATFA',transitionalFlag: 'No',segment1Rate: '4.43',segment2Rate: '5.91',segment3Rate: '6.65'},
        {id: '6',rateYear: '2015 HATFA',transitionalFlag: 'No',segment1Rate: '4.72',segment2Rate: '6.11',segment3Rate: '6.81'},
        {id: '7',rateYear: '2014 HATFA',transitionalFlag: 'No',segment1Rate: '4.43',segment2Rate: '5.62',segment3Rate: '6.22'},
        {id: '8',rateYear: '2013 MAP',transitionalFlag: 'No',segment1Rate: '4.94',segment2Rate: '6.15',segment3Rate: '6.76'},
        {id: '9',rateYear: '2012 MAP',transitionalFlag: 'No',segment1Rate: '5.54',segment2Rate: '6.85',segment3Rate: '7.52'},
        {id: '10',rateYear: 'Nov 11',transitionalFlag: 'No',segment1Rate: '2.01',segment2Rate: '5.16',segment3Rate: '6.28'},
        {id: '11',rateYear: 'Oct 11',transitionalFlag: 'No',segment1Rate: '2.03',segment2Rate: '5.20',segment3Rate: '6.30'},
        {id: '12',rateYear: 'Sep 11',transitionalFlag: 'No',segment1Rate: '2.06',segment2Rate: '5.25',segment3Rate: '6.32'},
        {id: '13',rateYear: 'Aug 11',transitionalFlag: 'No',segment1Rate: '2.11',segment2Rate: '5.31',segment3Rate: '6.32'},
        {id: '14',rateYear: 'Jul 11',transitionalFlag: 'No',segment1Rate: '2.18',segment2Rate: '5.36',segment3Rate: '6.33'},
        {id: '15',rateYear: 'Jun 11',transitionalFlag: 'No',segment1Rate: '2.27',segment2Rate: '5.43',segment3Rate: '6.34'},
        {id: '16',rateYear: 'May 11',transitionalFlag: 'No',segment1Rate: '2.38',segment2Rate: '5.51',segment3Rate: '6.36'},
        {id: '17',rateYear: 'Apr 11',transitionalFlag: 'No',segment1Rate: '2.51',segment2Rate: '5.59',segment3Rate: '6.38'},
        {id: '18',rateYear: 'Mar 11',transitionalFlag: 'No',segment1Rate: '2.67',segment2Rate: '5.69',segment3Rate: '6.44'},
        {id: '19',rateYear: 'Feb 11',transitionalFlag: 'No',segment1Rate: '2.81',segment2Rate: '5.76',segment3Rate: '6.46'},
        {id: '20',rateYear: 'Jan 11',transitionalFlag: 'No',segment1Rate: '2.94',segment2Rate: '5.82',segment3Rate: '6.46'},
        {id: '21',rateYear: 'Dec 10',transitionalFlag: 'No',segment1Rate: '3.14',segment2Rate: '5.90',segment3Rate: '6.45'},
        {id: '22',rateYear: 'Nov 10',transitionalFlag: 'No',segment1Rate: '3.37',segment2Rate: '6.04',segment3Rate: '6.49'},
        {id: '23',rateYear: 'Oct 10',transitionalFlag: 'No',segment1Rate: '3.61',segment2Rate: '6.20',segment3Rate: '6.53'},
        {id: '24',rateYear: 'Sep 10',transitionalFlag: 'No',segment1Rate: '3.78',segment2Rate: '6.31',segment3Rate: '6.57'},
        {id: '25',rateYear: 'Aug 10',transitionalFlag: 'No',segment1Rate: '3.92',segment2Rate: '6.40',segment3Rate: '6.61'},
        {id: '26',rateYear: 'jul 10',transitionalFlag: 'No',segment1Rate: '4.05',segment2Rate: '6.47',segment3Rate: '6.65'},
        {id: '27',rateYear: 'Jun 10',transitionalFlag: 'No',segment1Rate: '4.16',segment2Rate: '6.52',segment3Rate: '6.68'},
        {id: '28',rateYear: 'May 10',transitionalFlag: 'No',segment1Rate: '4.26',segment2Rate: '6.56',segment3Rate: '6.70'},
        {id: '29',rateYear: 'Apr 10',transitionalFlag: 'No',segment1Rate: '4.35',segment2Rate: '6.59',segment3Rate: '6.72'},
        {id: '30',rateYear: 'Mar 10',transitionalFlag: 'No',segment1Rate: '4.44',segment2Rate: '6.62',segment3Rate: '6.74'},
        {id: '31',rateYear: 'Feb 10',transitionalFlag: 'No',segment1Rate: '4.51',segment2Rate: '6.64',segment3Rate: '6.75'},
        {id: '32',rateYear: 'Jan 10',transitionalFlag: 'No',segment1Rate: '4.60',segment2Rate: '6.65',segment3Rate: '6.76'},
        {id: '33',rateYear: 'Dec 09',transitionalFlag: 'No',segment1Rate: '4.71',segment2Rate: '6.67',segment3Rate: '6.77'},
        {id: '34',rateYear: 'Nov 09',transitionalFlag: 'No',segment1Rate: '4.81',segment2Rate: '6.69',segment3Rate: '6.78'},
        {id: '35',rateYear: 'Oct 09',transitionalFlag: 'No',segment1Rate: '4.92',segment2Rate: '6.71',segment3Rate: '6.80'},
        {id: '36',rateYear: 'Sep 09',transitionalFlag: 'No',segment1Rate: '5.03',segment2Rate: '6.73',segment3Rate: '6.82'},
        {id: '37',rateYear: 'Aug 09',transitionalFlag: 'No',segment1Rate: '5.12',segment2Rate: '6.74',segment3Rate: '6.83'},
        {id: '38',rateYear: 'Jul 09',transitionalFlag: 'No',segment1Rate: '5.21',segment2Rate: '6.74',segment3Rate: '6.84'},
        {id: '39',rateYear: 'Jun 09',transitionalFlag: 'No',segment1Rate: '5.28',segment2Rate: '6.72',segment3Rate: '6.84'},
        {id: '40',rateYear: 'May 09',transitionalFlag: 'No',segment1Rate: '5.33',segment2Rate: '6.68',segment3Rate: '6.82'},
        {id: '41',rateYear: 'Apr 09',transitionalFlag: 'No',segment1Rate: '5.33',segment2Rate: '6.62',segment3Rate: '6.80'},
        {id: '42',rateYear: 'Mar 09',transitionalFlag: 'No',segment1Rate: '5.31',segment2Rate: '6.54',segment3Rate: '6.73'},
        {id: '43',rateYear: 'Feb 09',transitionalFlag: 'No',segment1Rate: '5.31',segment2Rate: '6.49',segment3Rate: '6.69'},
        {id: '44',rateYear: 'Jan 09',transitionalFlag: 'No',segment1Rate: '5.32',segment2Rate: '6.45',segment3Rate: '6.69'},
        {id: '45',rateYear: 'Dec 08',transitionalFlag: 'No',segment1Rate: '5.25',segment2Rate: '6.38',segment3Rate: '6.68'},
        {id: '46',rateYear: 'Nov 08',transitionalFlag: 'No',segment1Rate: '5.17',segment2Rate: '6.28',segment3Rate: '6.62'},
        {id: '47',rateYear: 'Oct 08',transitionalFlag: 'No',segment1Rate: '5.09',segment2Rate: '6.16',segment3Rate: '6.58'},
        {id: '48',rateYear: 'Sep 08',transitionalFlag: 'No',segment1Rate: '5.07',segment2Rate: '6.09',segment3Rate: '6.56'},
        {id: '49',rateYear: 'Aug 08',transitionalFlag: 'No',segment1Rate: '5.08',segment2Rate: '6.06',segment3Rate: '6.55'},
        {id: '50',rateYear: 'Jul 08',transitionalFlag: 'No',segment1Rate: '5.10',segment2Rate: '6.03',segment3Rate: '6.54'},
        {id: '51',rateYear: 'Jun 08',transitionalFlag: 'No',segment1Rate: '5.13',segment2Rate: '6.01',segment3Rate: '6.53'},
        {id: '52',rateYear: 'May 08',transitionalFlag: 'No',segment1Rate: '5.16',segment2Rate: '6.00',segment3Rate: '6.53'},
        {id: '53',rateYear: 'Apr 08',transitionalFlag: 'No',segment1Rate: '5.20',segment2Rate: '5.99',segment3Rate: '6.52'},
        {id: '54',rateYear: 'Mar 08',transitionalFlag: 'No',segment1Rate: '5.24',segment2Rate: '5.97',segment3Rate: '6.49'},
        {id: '55',rateYear: 'Feb 08',transitionalFlag: 'No',segment1Rate: '5.28',segment2Rate: '5.95',segment3Rate: '6.45'},
        {id: '56',rateYear: 'Jan 08',transitionalFlag: 'No',segment1Rate: '5.31',segment2Rate: '5.92',segment3Rate: '6.43'},
        {id: '57',rateYear: 'Dec 07',transitionalFlag: 'No',segment1Rate: '5.31',segment2Rate: '5.90',segment3Rate: '6.41'},
        {id: '58',rateYear: 'Nov 07',transitionalFlag: 'No',segment1Rate: '5.31',segment2Rate: '5.88',segment3Rate: '6.40'},

      ];
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
                data={interest}
                //extraData={indexChecked}
                renderItem={({ item,index }) => <Item rateYear={item.rateYear} transitionalFlag={item.transitionalFlag} segment1Rate={item.segment1Rate}
                segment2Rate={item.segment2Rate} segment3Rate={item.segment3Rate} item={item} /> }
                keyExtractor={item => item.id}
                //onEndReached={() => {console.log('list ended');}}
            />
            
            </LinearGradient>
        </View>
    
        </Modal>
       
    )
    
    function Item({ rateYear,transitionalFlag,segment1Rate,segment2Rate,segment3Rate,item }) {
        return (
        <View style={[styles.Info_container, {backgroundColor: colors.iconDes}]}>
            <TouchableOpacity style={styles.item} onPress={() => {InterestShow(item)}}>
                <View style={styles.Spacer}>
                    <Text style={{color: colors.text}}>{'Rate Month'}</Text>
                    <View style={styles.align}>
                        <Text style={{marginRight: 5, color: colors.text}}>{rateYear}  </Text>
                        {Interest_index === item.id && 
                        <Button
                            onPress={() => alert(item.rateYear)}
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