import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList,Dimensions,TouchableHighlight,Alert, ActivityIndicator,Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Settings from '../../settings.json';
const {width,height} = Dimensions.get('window');
const baseURL = Settings.domain;

const ClassesScreen = ({ navigation }) => {

  let RightAction = ({item}) =>
  {
    return(
      <View style={{flexDirection: 'row'}}>
      {(item.classCode === 'A' || item.classCode === 'B' || item.classCode === 'C')? null:
      <TouchableOpacity  style={styles.DeleteAction} onPress={() =>  ClassesdeleteClickEventListener(item)}>
          <Icon style={styles.actionText} name="delete" size={25} color="white" />
      </TouchableOpacity>
      }
      <TouchableOpacity style={styles.EditAction} onPress={() => ClassesEditEventListener(item)}>
          <Icon style={styles.actionText} name="pencil-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
    )
  };


    const { colors } = useTheme();
    const [{setDropdownData},dataState] = React.useContext(AuthContext);
    dataState.Classes;
    
    const ClassDATA = [
        {
            classId: '1',
            classCode: 'A',
            description: 'Owner HCEs',
            contributionTypeDesc: 'Entire class gets the same percent as the 415 max for youngest',
            cbValue: "",
            cbValueType: "%",
            psValue: '2.00',
            psValueType: "%"
         
        },
        {
            classId: '2',
            classCode: 'B',
            description: 'Non HCEs',
            contributionTypeDesc: 'Fixed Contribution per Individual',
            cbValue: '2.50',
            cbValueType: "%",
            psValue: '4.00',
            psValueType: "%"
        },
        {
            classId: '3',
            classCode: 'C',
            description: 'Non-Owner HCEs',
            contributionTypeDesc: 'Fixed Contribution per Individual',
            cbValue: '5.00',
            cbValueType: "%",
            psValue: '5.00',
            psValueType: "%"
        },
        {
          classId: '4',
          classCode: 'D',
          description: 'Non-Owner HCEs',
          contributionTypeDesc: 'Fixed Contribution per Individual',
          cbValue: '5.00',
          cbValueType: "%",
          psValue: '5.00',
          psValueType: "%"
      },
        {
          classId: '5',
          classCode: 'E',
          description: 'Non-Owner HCEs',
          contributionTypeDesc: 'Fixed Contribution per Individual',
          cbValue: '5.00%',
          cbValueType: "%",
          psValue: '5.00%',
          psValueType: "%"
        },
      ];
      const [classData, setClassData] = React.useState(null);
      
      dataState.classData = classData;

      React.useEffect(() => {
        //Api Data
        //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',dataState.Classes, dataState.Classes.Name);
        
        if (dataState.Classes === null || (dataState.Classes && dataState.Classes.Name === 'Classes')){
          setClassData(classData => null);
         //console.log("useEffect =====CLASS SCREEN========> ", dataState.plan.planId);
          getClass(dataState.plan.planId);
          //alert('called');
        }
        
      }, [dataState.Classes]);

      const getClass = async (planId) => {
        let url = baseURL + '/Classes/ClassList?planId=' +  planId;
        let method = 'GET';
        let headers = new Headers();
        //console.log(url);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
       
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.isSuccess && responseJson.obj){
             //console.log("FROM UseEffect =====Api Called CLASS========> ");
              setClassData(classData => responseJson.obj);
              let responseArray = responseJson.obj
              let NewArray = responseArray.map(function(object) {
                  for (let key in object) {
                    return { label: object.classCode + ' - ' + object.description, value: object.classCode };
                  }
              });
             //console.log('NewArray from class page',NewArray)
              setDropdownData(NewArray)
              
            } else {
              if(Platform.OS === 'web'){
                alert("Data Error:\n" + responseJson.message);
              }
              else {
                Alert.alert("Data Error", responseJson.message);
              }
              setPlanData(planData => []);
            }
        })
        .catch((error) => {
            if(Platform.OS === 'web'){
              alert("Connection Error:\n" + error.message);
            }
            else {
              Alert.alert("Connection Error", error.message);
            }
            return false;
        });
      }

      const ClassesdeleteClickEventListener = (item) => {
        //console.log(dataState.userToken );
        //deleteClass(item)
        //Alert.alert('delete ' + item.classCode);
        if(Platform.OS === 'web'){
          let choice = confirm("Are you sure you want to delete this Plan Class?"); // Code " + item.classCode
          if(choice === true){
            deleteClass(item)
          }
        }
        else{
          Alert.alert("Delete Class", "Are you sure you want to delete this Plan Class?", 
          [{ text: "Yes", onPress: () => deleteClass(item) }, 
          { text: "No", onPress: () => {}, style: "cancel" }],
          { cancelable: false });  // + item.classCode
        }
      }
    
      const ClassesEditEventListener = (item) => {
        navigation.navigate('Class Detail Entry',{Info: item});
        //Alert.alert('Edit ' + item.classCode);
      }
    

      const toggleClass = (item) => {
        //Alert.alert('info:',item.classId + " " + item.classCode);
        navigation.navigate('Class Detail Entry',{Info: item});
      }

      const deleteClass = async (item) => {
        let url = baseURL + '/Classes/Class?id=' + item.classId;
        let method = 'DELETE';
        let headers = new Headers();
                    
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', dataState.userToken);
    
        //console.log("==================SAVE UPDATE PLAN====TOKEN===>",  url, method, headers, body); //,
       
        let req = new Request(url, {
            method,
            headers
        });
    
        await fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
         //console.log(responseJson);
            
            if (responseJson.isSuccess && responseJson.obj){
              //alert(JSON.stringify(responseJson));
              setClassData(classData => null);
              getClass(dataState.plan.planId);
            } else {
              if(Platform.OS === 'web'){
                alert("Data Error:\n" + responseJson.message);
              }
              else {
                Alert.alert("Data Error", responseJson.message);
              }
            }
        })
        .catch((error) => {
            if(Platform.OS === 'web'){
              alert("Connection Error:\n" + error.message);
            }
            else {
              Alert.alert("Connection Error", error.message);
            }
            return false;
        });
      }



    return(
        <LinearGradient 
        colors={[colors.linearlight,colors.linearDark]}
        style = {styles.container}
        >     
          {!classData?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={colors.primary}/>
          </View>
          : 
          <SafeAreaView style={{marginTop: 5, flex: 1}}>
            
            <Text style={[styles.title,{fontSize: 17, color: color.secondary, paddingBottom: 3, textAlign: 'center'}]}>{dataState.plan.planName}</Text>
            <FlatList
              data={classData}
              //extraData={}
              renderItem={({ item,index }) => <Item index={index} item={item} /> }
              keyExtractor={item => item.classId.toString()}
              //onEndReached={() => {}}
            />
          </SafeAreaView>
          }
        </LinearGradient>
    )

    function Item({ index, item }) {
          
        return (
          
          <View style={styles.listContainer}>
          <Swipeable 
          renderRightActions={() => <RightAction item={item} />}
          overshootRight={false}
          > 

            <TouchableHighlight underlayColor={'transparent'} key={index} onPress={() => toggleClass(item)}>  
              <View style={[styles.item,{borderTopColor: colors.icon}]}>
              
                <View style={[styles.ClassContainer, {backgroundColor: colors.icon}]}>
                    <Text style={[styles.Class,{color: colors.plantitle}]}>{item.classCode}</Text>
                </View> 
                <View style={[styles.TextContainer, {backgroundColor: colors.iconDes}]}>
                  <Text style={[styles.title,{color: colors.textGreen}]}>{item.description}</Text>
                  <View style={{borderBottomWidth: 1,borderBottomColor: colors.text,marginBottom: 2,marginTop: 2 }}></View>
                  <Text style={[styles.Description,{ color: colors.text}]}>{item.contributionTypeDesc}</Text>
                  <View style={{ borderBottomWidth: 1,borderBottomColor: colors.text,marginBottom: 2,marginTop: 2 }}></View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{flexDirection: 'column',marginTop: 5}}>
                        <Text style={[styles.Description,{ color: colors.icontitle}]}>Cash Balance</Text>
                        <Text style={[styles.Description,{ color: colors.text}]}>{item.cbValue}{item.cbValueType}</Text>
                    </View>
                    <View style={{flexDirection: 'column',marginTop: 5}}>
                        <Text style={[styles.Description,{ color: colors.icontitle}]}>Profit Shares</Text>
                        <Text style={[styles.Description,{ color: colors.text}]}>{item.psValue}{item.psValueType}</Text>
                    </View>
                    </View>
                </View>
              
              </View>
            </TouchableHighlight>
          </Swipeable>
          </View>
        );
      }
}
export default ClassesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    listContainer: {
      marginHorizontal: 10,
    },
    
    item: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
        
        //height: height/6,
        borderTopWidth: 4,
      },
    ClassContainer: {
        width: '30%',
        //padding: 30,
        //borderTopLeftRadius: 5,
        borderBottomLeftRadius: 20,
        //backgroundColor: 'white',    
        justifyContent: 'center',
        alignContent: 'center',
      },
    
    TextContainer: {
        width: '70%',
        padding: 10,
        //borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
      
    title: {
        //textAlign: 'center',
        textAlign: 'left',
        fontWeight: 'bold',   
        fontSize: height > 800 ? 25 :20,
    },

    Class: {
        textAlign: 'center',
        fontWeight: 'bold',   
        fontSize: 50,
    },

    Description: {
        textAlign: 'left',
        fontSize: height > 800 ? 17 :12
    },
    DeleteAction: {
      backgroundColor: '#dd2c00',
      justifyContent: 'center',
      //alignItems: 'flex-end',
      //flex: 1,
      marginBottom: 5,
      marginTop: 5
    },
    EditAction: {
      backgroundColor: '#72be03', //72be03 388e3c
      justifyContent: 'center',
      //alignItems: 'flex-end',
      //flex: 1,
      marginBottom: 5,
      marginTop: 5
    },
    actionText: {
      padding: 15,
      //color: 'white'
    }
  });