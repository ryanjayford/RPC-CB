import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,Dimensions,FlatList } from 'react-native';
import{ AuthContext } from '../components/context';
//import PlanTopTab from './PlandetailsTopTab'
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');

const InterestModal = ({ navigation,Open,setOpen }) => {

    //console.log('Open', Open)
  //let [Hide, setHide] = React.useState(true);
  const { colors } = useTheme();
    //const [{},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)

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
       
       
        
      ];
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

            <WebView source={{ uri: 'https://expo.io' }} /*style={{ marginTop: 20 }}*/ />
            {/*
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.columnSpace,{/*borderRightWidth: 1, borderRightColor: 'grey' backgroundColor: 'grey'}]}>
                        <Text style={styles.columnNames}>Rate Month</Text>
                    </View>
                    <View style={[styles.columnSpace,{ backgroundColor: 'lightgreen'}]}>
                        <Text style={styles.columnNames}>Transitional</Text>
                    </View>
                    <View style={[styles.columnSpace,{ backgroundColor: 'grey'}]}>
                        <Text style={styles.columnNames}>Rate1 (Years 0-5)</Text>
                    </View>
                    <View style={[styles.columnSpace,{ backgroundColor: 'lightgreen'}]}>
                        <Text style={[styles.columnNames,{ fontSize: 11.7}]}>Rate2 (Years 6-20)</Text>
                    </View>
                    <View style={[styles.columnSpace,{ backgroundColor: 'grey'}]}>
                        <Text style={styles.columnNames}>Rate3 (Years > 20)</Text>
                    </View>

           
                </View>
                */}
              {/*

            <FlatList
                //horizontal={true}
                data={interest}
                //extraData={indexChecked}
                renderItem={({ item,index }) => <Item RateMonth={item.RateMonth} Transitional={item.Transitional} Rate1={item.Rate1}
                Rate2={item.Rate2} Rate3={item.Rate3} item={item} /> }
                keyExtractor={item => item.id}
                //onEndReached={() => {console.log('list ended');}}
            />
            */}
            </View>
        </View>
    
        </Modal>
       
    )
    /*
    function Item({ RateMonth,Transitional,Rate1,Rate2,Rate3,item }) {


        return (
            {/*
            <View style={{flexDirection: 'row'}}>
             <Text style={styles.columnNames}>Rate Month</Text>
             <Text style={styles.columnNames}>Transitional</Text>
             <Text style={styles.columnNames}>Rate1(Years 0-5)</Text>
             <Text style={styles.columnNames}>Rate2 (Years 6-20)</Text>
             <Text style={styles.columnNames}>Rate3 (Years > 20)</Text>
            </View>
        
            
            <View style={{flexDirection: 'row'}}>
                 <View style={[styles.ItemSpace,{borderRightWidth: 1, borderRightColor: 'grey'}]}>

                    <Text style={styles.ItemNames}>{RateMonth}</Text>

                </View>
                <View style={[styles.ItemSpace,{borderRightWidth: 1, borderRightColor: 'grey'}]}>

                    <Text style={styles.ItemNames}>{Transitional}</Text>

                </View>
                <View style={[styles.ItemSpace,{borderRightWidth: 1, borderRightColor: 'grey'}]}>

                    <Text style={styles.ItemNames}>{Rate1}</Text>

                </View>
                <View style={[styles.ItemSpace,{borderRightWidth: 1, borderRightColor: 'grey'}]}>

                    <Text style={styles.ItemNames}>{Rate2}</Text>

                </View>
                <View style={[styles.ItemSpace,{borderRightWidth: 1, borderRightColor: 'grey'}]}>

                    <Text style={styles.ItemNames}>{Rate3}</Text>

                </View>
            </View>
           
        );
    } */
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
        height: height/2,
        //borderRadius: 5,
        margin: 20,
        top: '20%',
        //padding: 20,
        //backgroundColor: 'rgba(51,51,51,1)',
        backgroundColor: 'white',
       //justifyContent: 'center'
    },

    header: {
        //color: 'white',
        //flexDirection: 'row',
        fontWeight: 'bold',
        alignContent: 'center',
        //marginBottom: 5,
    },
    columnSpace: {
        flex: 1,
        //padding: 1.5,
        paddingRight: 1,
        paddingLeft: 1,
        //flexGrow: 1.5
        justifyContent: 'center'
    },
    
    columnNames: {
        fontSize: 12,  
        textAlign: 'center',
        fontWeight: '500'
    },
    ItemSpace: {
        flex: 1,
        padding: 3.5,
        justifyContent: 'center'
    },
    ItemNames: {
        fontSize: 12,  
        textAlign: 'center',
        //fontWeight: 'bold'
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
        
    }
  });