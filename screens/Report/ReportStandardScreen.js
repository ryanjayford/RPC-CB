import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,ScrollView, Alert, ActivityIndicator, } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import{ AuthContext } from '../../components/context';
import Settings from '../../settings.json';
const baseURL1 = Settings.calc;

const ReportStandardScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [{ },dataState] = React.useContext(AuthContext);

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

    select = () => {
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

    const setReport = async() => {
      
      let params = "planId=" + dataState.selectedPlan + "&fundingYears=0&participantId=0";
      params += "&reportNameList=" + setParams();
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
            console.log("FROM Report =====Api Called Generate report========> ", responseJson);
            navigation.navigate("Report list")
          } else {
            Alert.alert("Data Error", responseJson.message);              
          }
          setIsLoading(false);
      })
      .catch((error) => {
          Alert.alert("Connection Error", error.message);
          setIsLoading(false);
          return false;
      });
    }

  
    return(
        <ScrollView>
          <View style={styles.listcontainer}>
            <View style={{ flexDirection: 'column'}}>
              <View style={{backgroundColor: colors.plan, padding: 10, borderTopWidth: 5, borderColor: 'green'}}>
                <Text style={styles.header}>Standard Reports</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10}}>

                <View style={{flexDirection: 'row',flexWrap: 'wrap',flexShrink: 1,justifyContent: 'space-between',marginBottom: 10}}>
                  <TouchableOpacity disabled = {isLoading} style={[styles.buttoncontainer,{backgroundColor: colors.icon}] } onPress={() => setReport()}>
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
                    <CheckBox 
                    style={styles.CheckBox}
                    checkedCheckBoxColor = {'#333333'}
                    uncheckedCheckBoxColor	= {colors.Logintext}
                    isChecked={selectAll} onClick = {()=> select()}/>
                    <View style={styles.titlecontainer}>
                      <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Select All</Text>
                    </View>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={cover} onClick = {()=> {setcover(cover = !cover)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Cover Sheet</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={standing} onClick = {()=> {setstanding(standing = !standing)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Understanding Cash Balance Plans</Text>
                  </View>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={provision} onClick = {()=> {setprovision(provision = !provision)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Plan Provision</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={employee} onClick = {()=> {setemployee(employee = !employee)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Employee Census Listing Report</Text>
                  </View>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={contriReport} onClick = {()=> {setcontriReport(contriReport = !contriReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Contribution Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={chartReport} onClick = {()=> {setchartReport(chartReport = !chartReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Contribution Chart Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={taxReport} onClick = {()=> {settaxReport(taxReport = !taxReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Tax Summary Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={costReport} onClick = {()=> {setcostReport(costReport = !costReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Target Normal Cost Report</Text>
                  </View>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={testReport} onClick = {()=> {settestReport(testReport = !testReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Minimum Participation Test Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={percentReport} onClick = {()=> {setpercentReport(percentReport = !percentReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Average Benefit Percentage Test Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={gateway} onClick = {()=> {setgateway(gateway = !gateway)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Minimum Allocation Gateway Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={grouptestReport} onClick = {()=> {setgrouptestReport(grouptestReport = !grouptestReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Normal Accrual Rate For Rate Group Testing Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={mostValue} onClick = {()=> {setmostValue(mostValue = !mostValue)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Most Valuable Accrual Rate for Rate Group Testing</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={detailReport} onClick = {()=> {setdetailReport(detailReport = !detailReport)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Rate Group Test Detail Report</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={maxCash} onClick = {()=> {setmaxCash(maxCash = !maxCash)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Maximum Cash Balance Contribution</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox 
                  style={styles.CheckBox}
                  checkedCheckBoxColor = {'#333333'}
                  uncheckedCheckBoxColor	= {colors.Logintext}
                  isChecked={testRes} onClick = {()=> {settestRes(testRes = !testRes)}}/>
                  <View style={styles.titlecontainer}>
                    <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Test Result</Text>
                  </View>
                </View>
                </View>
              </View>
            </View>
          </View>
          </ScrollView>
    )
}
export default ReportStandardScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      fontSize: 15,
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
      //padding: 2.5,
      justifyContent: 'center',
      //backgroundColor: 'grey'
    },
    buttons: {
      fontSize: 13,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    buttoncontainer: {
      width: '30%',
      padding: 5,
      borderRadius: 10
    },
  });