import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,Modal,Dimensions,FlatList, Platform } from 'react-native';
import{ AuthContext } from '../components/context';
//import PlanTopTab from './PlandetailsTopTab'
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
const {width,height} = Dimensions.get('window');

const MenuModal = ({ navigation }) => {
  const { colors } = useTheme();
  const [{IsSelected},dataState] = React.useContext(AuthContext);
  let [MenuLoad, setMenuLoad] = React.useState(true);

    const Time = [
        {id: '0',Time: 'In 24 hours'},
        {id: '1',Time: 'In 48 hours'},
        {id: '2',Time: 'This Week'},
        {id: '3',Time: 'This Month'},
      ];
    /*
    doNow = (item,index,navigation) => {
     // setTimeout(() => 
      //{
      //  if(MenuLoad === false) {
       //   IsSelected(item,index,navigation,MenuLoad, setMenuLoad);
       // }
     // }
     // , 100);
        IsSelected(item,index,navigation);
     
    }*/

      
    return(
       
        <Modal 
          transparent={true} 
          visible={MenuLoad}
          animationType={'fade'}
        >
        <TouchableHighlight underlayColor={'transparent'} style={{flex:1}} onPress={() => navigation.goBack()}>
          <View style={styles.Modalcontainer}>
           
            <FlatList      
                data={Time}
                renderItem={({ item,index }) => <Item id={item.id} time={item.Time} item={item} index={index} /> }
                keyExtractor={item => item.id}
            />
          </View>
        </TouchableHighlight>
      </Modal>
       
    )

    function Item({ id,time,item,index }) {
      return (
        
        <View style={{flexDirection: "row"}}>
          <TouchableHighlight key={index} underlayColor={'transparent'} style={styles.item} onPress={() => [setMenuLoad(MenuLoad = false),IsSelected(item,index,navigation)]}>
            <Text style={{color:'black'}}>{time}</Text>
          </TouchableHighlight>
          {dataState.Selected === index &&
          <View style={styles.icon}>
            <Feather name="check" size={24} color="black" />
          </View>}
        </View>
      );
  } 
}



export default MenuModal;

const styles = StyleSheet.create({

    Modalcontainer: {
      backgroundColor:'white',
      borderRadius: 5,
      shadowOffset: { width: 5, height: 5 },
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 3,
      position:'absolute',
      top: Platform.OS === 'ios' ? 16 : 10,
      right:5,
      width: height > 800 ? 150 : 120,
    },
    icon: {
      //backgroundColor:'black',
      alignContent: 'center',
      justifyContent: 'center'
    },
    item: {
      //backgroundColor:'black',
      padding: 10
    },

   
  });