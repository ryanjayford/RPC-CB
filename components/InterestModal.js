import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,Dimensions,FlatList, SafeAreaView, Button } from 'react-native';
import{ AuthContext } from '../components/context';
//import PlanTopTab from './PlandetailsTopTab'
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');

const InterestModal = ({ navigation,Open,setOpen }) => {

    //console.log('Open', Open)
  //const [layoutheight, setlayoutheight] = React.useState(0);
  let [Interest_index, setInterest_index] = React.useState(0);//default 1
  const { colors } = useTheme();
    //const [{},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)
    const dummy = [
        {id: '1',RateMonth: '2020 HATFA',Transitional: 'No',Rate1: '3.64',Rate2: '5.21',Rate3: '5.94'},
    ]
    const interest = [
        {id: '1',RateMonth: '2020 HATFA',Transitional: 'No',Rate1: '3.64',Rate2: '5.21',Rate3: '5.94'},
        {id: '2',RateMonth: '2019 HATFA',Transitional: 'No',Rate1: '3.74',Rate2: '5.35',Rate3: '6.11'},
        {id: '3',RateMonth: '2018 HATFA',Transitional: 'No',Rate1: '3.92',Rate2: '5.52',Rate3: '6.29'},
        {id: '4',RateMonth: '2017 HATFA',Transitional: 'No',Rate1: '4.16',Rate2: '5.72',Rate3: '6.48'},
        {id: '5',RateMonth: '2016 HATFA',Transitional: 'No',Rate1: '4.43',Rate2: '5.91',Rate3: '6.65'},
        {id: '6',RateMonth: '2015 HATFA',Transitional: 'No',Rate1: '4.72',Rate2: '6.11',Rate3: '6.81'},
        {id: '7',RateMonth: '2014 HATFA',Transitional: 'No',Rate1: '4.43',Rate2: '5.62',Rate3: '6.22'},
        {id: '8',RateMonth: '2013 MAP',Transitional: 'No',Rate1: '4.94',Rate2: '6.15',Rate3: '6.76'},
        {id: '9',RateMonth: '2012 MAP',Transitional: 'No',Rate1: '5.54',Rate2: '6.85',Rate3: '7.52'},
        {id: '10',RateMonth: 'Nov 11',Transitional: 'No',Rate1: '2.01',Rate2: '5.16',Rate3: '6.28'},
        {id: '11',RateMonth: 'Oct 11',Transitional: 'No',Rate1: '2.03',Rate2: '5.20',Rate3: '6.30'},
        {id: '12',RateMonth: 'Sep 11',Transitional: 'No',Rate1: '2.06',Rate2: '5.25',Rate3: '6.32'},
        {id: '13',RateMonth: 'Aug 11',Transitional: 'No',Rate1: '2.11',Rate2: '5.31',Rate3: '6.32'},
        {id: '14',RateMonth: 'Jul 11',Transitional: 'No',Rate1: '2.18',Rate2: '5.36',Rate3: '6.33'},
        {id: '15',RateMonth: 'Jun 11',Transitional: 'No',Rate1: '2.27',Rate2: '5.43',Rate3: '6.34'},
        {id: '16',RateMonth: 'May 11',Transitional: 'No',Rate1: '2.38',Rate2: '5.51',Rate3: '6.36'},
        {id: '17',RateMonth: 'Apr 11',Transitional: 'No',Rate1: '2.51',Rate2: '5.59',Rate3: '6.38'},
        {id: '18',RateMonth: 'Mar 11',Transitional: 'No',Rate1: '2.67',Rate2: '5.69',Rate3: '6.44'},
        {id: '19',RateMonth: 'Feb 11',Transitional: 'No',Rate1: '2.81',Rate2: '5.76',Rate3: '6.46'},
        {id: '20',RateMonth: 'Jan 11',Transitional: 'No',Rate1: '2.94',Rate2: '5.82',Rate3: '6.46'},
        {id: '21',RateMonth: 'Dec 10',Transitional: 'No',Rate1: '3.14',Rate2: '5.90',Rate3: '6.45'},
        {id: '22',RateMonth: 'Nov 10',Transitional: 'No',Rate1: '3.37',Rate2: '6.04',Rate3: '6.49'},
        {id: '23',RateMonth: 'Oct 10',Transitional: 'No',Rate1: '3.61',Rate2: '6.20',Rate3: '6.53'},
        {id: '24',RateMonth: 'Sep 10',Transitional: 'No',Rate1: '3.78',Rate2: '6.31',Rate3: '6.57'},
        {id: '25',RateMonth: 'Aug 10',Transitional: 'No',Rate1: '3.92',Rate2: '6.40',Rate3: '6.61'},
        {id: '26',RateMonth: 'jul 10',Transitional: 'No',Rate1: '4.05',Rate2: '6.47',Rate3: '6.65'},
        {id: '27',RateMonth: 'Jun 10',Transitional: 'No',Rate1: '4.16',Rate2: '6.52',Rate3: '6.68'},
        {id: '28',RateMonth: 'May 10',Transitional: 'No',Rate1: '4.26',Rate2: '6.56',Rate3: '6.70'},
        {id: '29',RateMonth: 'Apr 10',Transitional: 'No',Rate1: '4.35',Rate2: '6.59',Rate3: '6.72'},
        {id: '30',RateMonth: 'Mar 10',Transitional: 'No',Rate1: '4.44',Rate2: '6.62',Rate3: '6.74'},
        {id: '31',RateMonth: 'Feb 10',Transitional: 'No',Rate1: '4.51',Rate2: '6.64',Rate3: '6.75'},
        {id: '32',RateMonth: 'Jan 10',Transitional: 'No',Rate1: '4.60',Rate2: '6.65',Rate3: '6.76'},
        {id: '33',RateMonth: 'Dec 09',Transitional: 'No',Rate1: '4.71',Rate2: '6.67',Rate3: '6.77'},
        {id: '34',RateMonth: 'Nov 09',Transitional: 'No',Rate1: '4.81',Rate2: '6.69',Rate3: '6.78'},
        {id: '35',RateMonth: 'Oct 09',Transitional: 'No',Rate1: '4.92',Rate2: '6.71',Rate3: '6.80'},
        {id: '36',RateMonth: 'Sep 09',Transitional: 'No',Rate1: '5.03',Rate2: '6.73',Rate3: '6.82'},
        {id: '37',RateMonth: 'Aug 09',Transitional: 'No',Rate1: '5.12',Rate2: '6.74',Rate3: '6.83'},
        {id: '38',RateMonth: 'Jul 09',Transitional: 'No',Rate1: '5.21',Rate2: '6.74',Rate3: '6.84'},
        {id: '39',RateMonth: 'Jun 09',Transitional: 'No',Rate1: '5.28',Rate2: '6.72',Rate3: '6.84'},
        {id: '40',RateMonth: 'May 09',Transitional: 'No',Rate1: '5.33',Rate2: '6.68',Rate3: '6.82'},
        {id: '41',RateMonth: 'Apr 09',Transitional: 'No',Rate1: '5.33',Rate2: '6.62',Rate3: '6.80'},
        {id: '42',RateMonth: 'Mar 09',Transitional: 'No',Rate1: '5.31',Rate2: '6.54',Rate3: '6.73'},
        {id: '43',RateMonth: 'Feb 09',Transitional: 'No',Rate1: '5.31',Rate2: '6.49',Rate3: '6.69'},
        {id: '44',RateMonth: 'Jan 09',Transitional: 'No',Rate1: '5.32',Rate2: '6.45',Rate3: '6.69'},
        {id: '45',RateMonth: 'Dec 08',Transitional: 'No',Rate1: '5.25',Rate2: '6.38',Rate3: '6.68'},
        {id: '46',RateMonth: 'Nov 08',Transitional: 'No',Rate1: '5.17',Rate2: '6.28',Rate3: '6.62'},
        {id: '47',RateMonth: 'Oct 08',Transitional: 'No',Rate1: '5.09',Rate2: '6.16',Rate3: '6.58'},
        {id: '48',RateMonth: 'Sep 08',Transitional: 'No',Rate1: '5.07',Rate2: '6.09',Rate3: '6.56'},
        {id: '49',RateMonth: 'Aug 08',Transitional: 'No',Rate1: '5.08',Rate2: '6.06',Rate3: '6.55'},
        {id: '50',RateMonth: 'Jul 08',Transitional: 'No',Rate1: '5.10',Rate2: '6.03',Rate3: '6.54'},
        {id: '51',RateMonth: 'Jun 08',Transitional: 'No',Rate1: '5.13',Rate2: '6.01',Rate3: '6.53'},
        {id: '52',RateMonth: 'May 08',Transitional: 'No',Rate1: '5.16',Rate2: '6.00',Rate3: '6.53'},
        {id: '53',RateMonth: 'Apr 08',Transitional: 'No',Rate1: '5.20',Rate2: '5.99',Rate3: '6.52'},
        {id: '54',RateMonth: 'Mar 08',Transitional: 'No',Rate1: '5.24',Rate2: '5.97',Rate3: '6.49'},
        {id: '55',RateMonth: 'Feb 08',Transitional: 'No',Rate1: '5.28',Rate2: '5.95',Rate3: '6.45'},
        {id: '56',RateMonth: 'Jan 08',Transitional: 'No',Rate1: '5.31',Rate2: '5.92',Rate3: '6.43'},
        {id: '57',RateMonth: 'Dec 07',Transitional: 'No',Rate1: '5.31',Rate2: '5.90',Rate3: '6.41'},
        {id: '58',RateMonth: 'Nov 07',Transitional: 'No',Rate1: '5.31',Rate2: '5.88',Rate3: '6.40'},

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
            <View style ={styles.Modalcontainer}>

            <View style={styles.greencontainer}>
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
                renderItem={({ item,index }) => <Item RateMonth={item.RateMonth} Transitional={item.Transitional} Rate1={item.Rate1}
                Rate2={item.Rate2} Rate3={item.Rate3} item={item} /> }
                keyExtractor={item => item.id}
                //onEndReached={() => {console.log('list ended');}}
            />
            
            </View>
        </View>
    
        </Modal>
       
    )
    
    function Item({ RateMonth,Transitional,Rate1,Rate2,Rate3,item }) {
        return (
        <View style={styles.Info_container}>
            <TouchableOpacity style={styles.item} onPress={() => {InterestShow(item)}}>
                <View style={styles.Spacer}>
                    <Text style={styles.itemText}>{'Rate Month'}</Text>
                    <View style={styles.align}>
                        <Text style={[styles.itemText,{marginRight: 5,}]}>{RateMonth}</Text>
                        {Interest_index === item.id && 
                        <Button
                            onPress={() => alert(item.RateMonth)}
                            title="Apply"
                            color="#72bf04"
                        />}
                    </View>
                </View>
                {Interest_index === item.id && 
                <View>
                    <View style={styles.Spacer}>
                        <Text style={styles.itemText}>{'Transitional'}</Text>
                        <Text style={styles.itemText}>{Transitional}</Text>
                    </View>

                    <View style={styles.Spacer}>
                        <Text style={styles.itemText}>{'Rate1(Years 0-5)'}</Text>
                        <Text style={styles.itemText}>{Rate1}</Text>
                    </View>

                    <View style={styles.Spacer}>
                        <Text style={styles.itemText}>{'Rate2 (Years 6-20)'}</Text>
                        <Text style={styles.itemText}>{Rate2}</Text>
                    </View>

                    <View style={styles.Spacer}>
                        <Text style={styles.itemText}>{'Rate3 (Years > 20)'}</Text>
                        <Text style={styles.itemText}>{Rate3}</Text>
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
        backgroundColor: 'white',
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
        backgroundColor: '#00BFFF',
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
        backgroundColor: 'rgba(51,51,51, 0.8)',
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