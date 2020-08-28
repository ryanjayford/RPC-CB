import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import{ AuthContext } from '../../components/context';
import PlanTopTab from './PlanDetailsTopTab'
import { useTheme } from '@react-navigation/native';
const PlanDetails = ({ navigation }) => {

  const { colors } = useTheme();
    const [{search},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)
    return(
    
      <View style ={[styles.container,{backgroundColor: colors.tertiary}]}>
        {/* 
        <View style={styles.items}>
        
          <TouchableOpacity style={[styles.buttoncontainer,{backgroundColor: colors.icon}]}>
            <Text style={styles.buttons}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttoncontainer,{backgroundColor: colors.icon}]}>
            <Text style={styles.buttons}>Exit</Text>
          </TouchableOpacity>

        </View>
          */}
        <PlanTopTab />
      </View>
 
  )
}

/*
<Text>Company: {dataState.plan.Company}</Text>
<Text>Email: {dataState.plan.Email}</Text>
<Text>N0s: {dataState.plan.N0s}</Text>
<Text>Corp: {dataState.plan.Corp}</Text>
<Text>Num: {dataState.plan.Num}</Text>
<Text>date: {dataState.plan.date}</Text>
<Text>number: {dataState.plan.number}</Text>
<Text>id: {dataState.plan.id}</Text>
*/

export default PlanDetails;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    items: {
      flexDirection: 'row',
      //justifyContent: 'center',
      justifyContent: 'space-evenly',
      padding: 5,
      marginTop: 1.5
    },
    buttons: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      //width: '25%',
      //backgroundColor: 'lightgreen',
      //padding: 10,
      //borderRadius: 15
    },
    buttoncontainer: {
      width: '25%',
      //backgroundColor: 'lightgreen',
      padding: 10,
      borderRadius: 10
    },
  });