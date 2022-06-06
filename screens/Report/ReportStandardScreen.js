import React, { useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,ScrollView, Alert, ActivityIndicator, Modal,TextInput,Dimensions,TouchableHighlight,Platform,TouchableWithoutFeedback } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
import { color } from 'react-native-reanimated';
import Settings from '../../settings.json';
import Checkbox from 'expo-checkbox';

const baseURL1 = Settings.calc;
const baseURL = Settings.domain;
const {width,height} = Dimensions.get('window');

const ReportStandardScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);

    let [dynamic, setDynamic] = React.useState([]); 
    let [ReportData, setReportData] = React.useState([]);
    let [Reportloading, setReportloading] = React.useState(false);
    let [ReportsName, setReportsName] = React.useState("");
    let [ReportModal, setReportModal] = React.useState(false);
    
    let [isLoading, setIsLoading] = React.useState(false); 
    let [selectAll, setselectAll] = React.useState(false); 
   
    useEffect(() => {
      //console.log('selected plan is: ',dataState.selectedPlan, dataState.userNumber)
      getReportslist()
    }, [dataState.selectedPlan]);

    const getReportslist = async () => {
      //let url = baseURL1 + '/ShowHideReportItemList?PlanId=' + dataState.selectedPlan;
      let url = baseURL + '/CBLookUp/GetAvailableReports?userNumber=' + dataState.userNumber + '&planId=' + dataState.selectedPlan; 
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
            console.log('RESPONS',responseJson.obj);
            setReportData(ReportData = responseJson.obj)
            setDynamic(dynamic = responseJson.obj.map(v => ({ name: v.reportDisplayName, check: false, rdlc: v.report_FileName, isVisble: v.showReport })))
            setReportloading(Reportloading = !Reportloading)
        } 
        else {
            if(Platform.OS === 'web'){
              alert("Data Error,\n" + responseJson.message);
            }
            else {
              Alert.alert("Data Error", responseJson.message);
            }
            setReportloading(Reportloading = !Reportloading)
        }
      })
      .catch((error) => {
          if(Platform.OS === 'web'){
            alert("Connection Error,\n" + error.message);
          }
          else {
            Alert.alert("Connection Error", error.message);
          }
          setReportloading(Reportloading = !Reportloading)
          return false;
      });
    }

    const select = () => {
      setselectAll(selectAll = !selectAll)
      if(dynamic.length !== 0){
        setDynamic(dynamic = dynamic.map(v => ({ name: v.name, check: v.isVisble ? selectAll : false, rdlc: v.rdlc, isVisble: v.isVisble }))) 
      }
    }

    const setParams = () => {
      let params = "";     
      if(dynamic.length !== 0){
        dynamic.forEach((item) => {
          if(item.check === true){
            params += `'${item.rdlc.trim()}',`;
          }
        })
      }
      params += "'NonDiscriminationTest.rdlc'";
      return params;
    }

    const YesClicked = () => {
      setReportModal(!ReportModal);
      setReport();
    }

    const setReport = async() => {
      let name = ReportsName === null ? 'MultipleReports' : ReportsName;
      let params = "planId=" + dataState.selectedPlan + "&fundingYears=0&participantId=0";
      params += "&reportNameList=" + setParams();
      params += "&reportAlias=" + name;
      setIsLoading(true);
      //console.log(params);
      let url = baseURL1 + '/MultipleReports?' + params;
      let method = 'GET';
      let headers = new Headers();

      //console.log(url);
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', dataState.userToken);
      //console.log('Report =====>', url, method, headers);
      let req = new Request(url, {
          method,
          headers
      });
  
      await fetch(req)
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson.isSuccess){
           //console.log("FROM Report =====Api Called Generate report========> ", responseJson);
            setReportsName(ReportsName = "");
            navigation.navigate("Report list")
          } else {
            if(Platform.OS === 'web'){
              alert("Data Error,\n"+ responseJson.message);
            }
            else {
              Alert.alert("Data Error", responseJson.message);       
            }       
          }
          setIsLoading(false);
      })
      .catch((error) => {
          if(Platform.OS === 'web'){
            alert("Connection Error,\n"+ error.message);
          }
          else {
            Alert.alert("Connection Error", error.message);
          }
          setIsLoading(false);
          return false;
      });
    }

    const dynamicValues = (index) => {
        const updatedAreas = [...dynamic];
        updatedAreas[index].check = !dynamic[index].check;
        setDynamic(dynamic = updatedAreas)
    }

    return(
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ReportModal}
            onRequestClose={() => {
             //console.log("Modal has been closed.");
            }}
          >
            <TouchableHighlight underlayColor={'rgba(51,51,51,0.7)'} style={styles.centeredView} onPress={() => {setReportModal(!ReportModal)}}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{...styles.modalText, fontWeight: 'bold', fontSize: 18}}>Reports</Text>
                    <Text style={{...styles.modalText}}>Report Name</Text>
                    <TextInput 
                      placeholderTextColor = 'rgba(51,51,51,0.7)'
                      placeholder="Name..."
                      style={[styles.SubtextInput,{color: colors.Logintext}]}
                      //autoCapitalize="none"
                      value={ReportsName}
                      //keyboardType='numeric'
                      onChangeText={(val) => setReportsName(ReportsName = val)}
                    />
                    <Text style={{...styles.modalText}}>Are you sure you want to create a new Report?</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end' , justifyContent: 'flex-end'}}>
                    <TouchableHighlight underlayColor={"#72be03"}
                      style={{ ...styles.openButton, backgroundColor: "#72be03", marginRight: 5 }}onPress={() => {YesClicked();}}
                    >
                      <Text style={styles.textStyle}>Yes</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"#72be03"}
                      style={{ ...styles.openButton, backgroundColor: "#72be03" }}onPress={() => {[setReportModal(!ReportModal),setReportsName(ReportsName = "")]}}
                    >
                      <Text style={styles.textStyle}>No</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableHighlight>
          </Modal>


          <LinearGradient 
            colors={[colors.linearlight,colors.linearDark]}
            style = {styles.listcontainer}
          >  
            {!Reportloading ?
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color={colors.primary}/>
              </View>
              : 
              <View style={{ flexDirection: 'column', marginTop: 5,flex: 1}}>
              <Text style={{fontSize:17, color: color.secondary, paddingBottom: 5, textAlign: 'center', fontWeight: 'bold'}}>{dataState.plan.planName}</Text>
                <View style={{backgroundColor: colors.plan, padding: 10, borderTopWidth: 5, borderColor: 'green'}}>
                  <Text style={styles.header}>Standard Reports</Text>
                </View>
                <View style={{backgroundColor: 'white',flex: 1}}>
                  <ScrollView style={{paddingLeft: 10,paddingRight: 10}}>
                    <View style={{flexDirection: 'row',flexWrap: 'wrap',flexShrink: 1,justifyContent: 'space-between',marginBottom: 10, marginTop: 10}}>
                      <TouchableOpacity disabled = {isLoading} style={[styles.buttoncontainer,{backgroundColor: colors.icon}] } onPress={() => setReportModal(!ReportModal)/*setReport()*/}>
                      { isLoading ?
                        <ActivityIndicator size="large" color="white"/>
                        :
                        <Text style={styles.buttons}>Generate Reports</Text>
                      } 
                        
                      </TouchableOpacity>
                      {/*<TouchableOpacity style={[styles.buttoncontainer,{backgroundColor: colors.icon}]} >
                        <Text style={styles.buttons}>Generate PDF Reports</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.buttoncontainer,{backgroundColor: colors.icon}]} >
                        <Text style={styles.buttons}>Generate Excel Reports</Text>
                      </TouchableOpacity>*/}
                    </View>
                    <View style={{flexDirection: 'row',borderColor: 'grey',borderBottomWidth: 1.5,marginTop: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <Checkbox
                            style={styles.CheckBox}
                            value={selectAll}
                            onValueChange={()=> select()}
                            color={selectAll ? "#333333" : colors.Logintext}
                        />
                        <View style={styles.titlecontainer}>
                          <Text style = {{color: colors.Logintext,paddingTop: 6}}>Select All</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{marginTop: 5}}>                      
                      {ReportData.length !== 0 && ReportData.map((item, i) => {
                          return (
                            <View key={i}>
                              {item.showReport === true ?
                                <View style={{flexDirection: 'row'}}>
                                  <Checkbox
                                      style={styles.CheckBox}
                                      value={dynamic[i].check}
                                      onValueChange={()=> {dynamicValues(i)}}
                                      color={dynamic[i].check ? "#333333" : colors.Logintext}
                                  />
                                  <View style={styles.titlecontainer}>
                                    <Text style = {{color: colors.Logintext,paddingTop: 6}}>{item.reportDisplayName.trim()}</Text>
                                  </View>
                                </View>
                                :
                                null
                              }
                            </View>
                          )
                        })}
                  
                      <View style={{marginBottom: 10}} />
                    </View>
                  </ScrollView>
                </View>
              </View>
            }
          </LinearGradient>
          </>
    )
}
export default ReportStandardScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      fontSize: height > 800 ? 18 : 15,
      color: 'white',
      fontWeight: 'bold'
    },
    listcontainer: {
      flex: 1
    },
    titlecontainer: {
      width: '80%',
      justifyContent: 'center',
      paddingBottom: 5,
      //backgroundColor: 'red'
    },
    CheckBox: {
      margin: 7,
      padding: height > 800 ? 2.5 : 0,
      justifyContent: 'center',
      //backgroundColor: 'grey'
    },
    buttons: {
      fontSize: height > 800 ? 16 : 13,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    buttoncontainer: {
      width: '30%',
      padding: height > 800 ? 7 :5,
      borderRadius: 10
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
    width: '80%',
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
    textAlign: "center",
    padding: 5
  },
  modalText: {
    marginBottom: 10,
    textAlign: "left"
  },
  SubtextInput: {
    //flex: 1,  
    padding: 5,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#989c9d',
  },
  });