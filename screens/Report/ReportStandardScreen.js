import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,ScrollView, Alert, ActivityIndicator, Modal,TextInput,Dimensions,TouchableHighlight,Platform } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
import { color } from 'react-native-reanimated';
import Settings from '../../settings.json';
import Checkbox from 'expo-checkbox';

const baseURL1 = Settings.calc;
const {width,height} = Dimensions.get('window');

const ReportStandardScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);
    let [ReportsName, setReportsName] = React.useState(null);
    let [ReportModal, setReportModal] = React.useState(false);

    let [isLoading, setIsLoading] = React.useState(false); 
    let [selectAll, setselectAll] = React.useState(false); 
    let [cover, setcover] = React.useState(false); 
    let [standing, setstanding] = React.useState(false); 
    let [provision, setprovision] = React.useState(false); 
    let [employee, setemployee] = React.useState(false);
    let [contriReport, setcontriReport] = React.useState(false);
    let [chartReport, setchartReport] = React.useState(false);
    let [taxReport, settaxReport] = React.useState(false);
    let [costReport, setcostReport] = React.useState(false);
    let [testReport, settestReport] = React.useState(false);
    let [percentReport, setpercentReport] = React.useState(false);
    let [gateway, setgateway] = React.useState(false); 
    let [grouptestReport, setgrouptestReport] = React.useState(false);
    let [mostValue, setmostValue] = React.useState(false);
    let [detailReport, setdetailReport] = React.useState(false); 
    let [maxCash, setmaxCash] = React.useState(false); 
    let [testRes, settestRes] = React.useState(false); 

    const select = () => {
      setselectAll(selectAll = !selectAll)
      setcover(cover = selectAll)
      setstanding(standing = selectAll)
      setprovision(provision = selectAll)
      setemployee(employee = selectAll)
      setcontriReport(contriReport = selectAll)
      setchartReport(chartReport = selectAll)
      settaxReport(taxReport = selectAll)
      setcostReport(costReport = selectAll)
      settestReport(testReport = selectAll)
      setpercentReport(percentReport = selectAll)
      setgateway(gateway = selectAll)
      setgrouptestReport(grouptestReport = selectAll)
      setmostValue(mostValue = selectAll)
      setdetailReport(detailReport = selectAll)
      setmaxCash(maxCash = selectAll)
      settestRes(testRes = selectAll)
    }

    const setParams = () => {
      let params = "";
      if (cover) params += "'CoverPage.rdlc',";
      if (standing) params += "'UnderstandingCB.rdlc',";
      if (provision) params += "'PlanProvision.rdlc',";
      if (employee) params += "'EmployeeCensusListingReport.rdlc',";
      if (contriReport) params += "'ContributionListingReport.rdlc',";
      if (chartReport) params += "'ContributionChartReport.rdlc',";
      if (taxReport) params += "'CBTaxSummaryReport.rdlc',";
      if (costReport) params += "'TargetNormalCost.rdlc',";
      if (testReport) params += "'MinimumParticipationTest.rdlc',";
      if (percentReport) params += "'AverageBenefitTest.rdlc',";
      if (gateway) params += "'MinimumAllocationGateway.rdlc',";
      if (grouptestReport) params += "'NormalAccrualRateForRateGroup.rdlc',";
      if (mostValue) params += "'MostValuableEBAR.rdlc',";
      if (detailReport) params += "'RateGroupTestingDetailReport.rdlc',";
      if (maxCash) params += "'MaximumCashBalanceContributionReport.rdlc',";

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
            <TouchableHighlight underlayColor={'rgba(51,51,51,0.7)'} style={styles.centeredView} onPress={() => {setReportModal(!ReportModal);}}>
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
            </TouchableHighlight>
          </Modal>


          <LinearGradient 
            colors={[colors.linearlight,colors.linearDark]}
            style = {styles.listcontainer}
          >  
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
                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={cover}
                        onValueChange={()=> setcover(cover = !cover)}
                        color={cover ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Cover Sheet</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={standing}
                        onValueChange={()=> setstanding(standing = !standing)}
                        color={standing ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Understanding Cash Balance Plans</Text>
                    </View>
                  </View>
                  
                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={provision}
                        onValueChange={()=> setprovision(provision = !provision)}
                        color={provision ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Plan Provision</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={employee}
                        onValueChange={()=> setemployee(employee = !employee)}
                        color={employee ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Employee Census Listing Report</Text>
                    </View>
                  </View>
                  
                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={contriReport}
                        onValueChange={()=> setcontriReport(contriReport = !contriReport)}
                        color={contriReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Contribution Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={chartReport}
                        onValueChange={()=> setchartReport(chartReport = !chartReport)}
                        color={chartReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Contribution Chart Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={taxReport}
                        onValueChange={()=> settaxReport(taxReport = !taxReport)}
                        color={taxReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Tax Summary Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={costReport}
                        onValueChange={()=> setcostReport(costReport = !costReport)}
                        color={costReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Target Normal Cost Report</Text>
                    </View>
                  </View>
                  
                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={testReport}
                        onValueChange={()=> settestReport(testReport = !testReport)}
                        color={testReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Minimum Participation Test Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={percentReport}
                        onValueChange={()=> setpercentReport(percentReport = !percentReport)}
                        color={percentReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Average Benefit Percentage Test Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={gateway}
                        onValueChange={()=> setgateway(gateway = !gateway)}
                        color={gateway ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Minimum Allocation Gateway Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={grouptestReport}
                        onValueChange={()=> setgrouptestReport(grouptestReport = !grouptestReport)}
                        color={grouptestReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Normal Accrual Rate For Rate Group Testing Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={mostValue}
                        onValueChange={()=> setmostValue(mostValue = !mostValue)}
                        color={mostValue ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Most Valuable Accrual Rate for Rate Group Testing</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={detailReport}
                        onValueChange={()=> setdetailReport(detailReport = !detailReport)}
                        color={detailReport ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Rate Group Test Detail Report</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={maxCash}
                        onValueChange={()=> setmaxCash(maxCash = !maxCash)}
                        color={maxCash ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Maximum Cash Balance Contribution</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Checkbox
                        style={styles.CheckBox}
                        value={testRes}
                        onValueChange={()=> settestRes(testRes = !testRes)}
                        color={testRes ? "#333333" : colors.Logintext}
                    />
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 6}}>Test Result</Text>
                    </View>
                  </View>
                  </View>
                </ScrollView>
              </View>
            </View>
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
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#989c9d',
  },
  });