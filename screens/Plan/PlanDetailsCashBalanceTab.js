import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,ScrollView,Dimensions,TextInput } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from 'react-native-customizable-radio-button';
import Interest from '../../components/InterestModal'
import RadioButtonRN from 'radio-buttons-react-native';
import * as WebBrowser from 'expo-web-browser';
import defaultPlan from '../../model/defaultPlan';

const {width,height} = Dimensions.get('window');
const CashBalance = ({ route }) => {
  const [{},dataState] = React.useContext(AuthContext);
  //Open modal
  let [Open, setOpen] = React.useState(false); 
  //
  //result for browser
  let [thisresult, setresult] = React.useState(null); 
  //
  //function for opening browser
  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.io');
    setresult(thisresult = result)
  };
  //?console.log('thisresult', thisresult)
  //


  const DefaultPlan = dataState.DefaultPlan;
  const DropdownData = dataState.DefaultDropdown;
  let Balance = dataState.Details;

  console.log('MORTALITY TABLE===========>',Balance.aePostRetMortalityTable, DefaultPlan.aePostRetMortalityTable, DropdownData.aePostRetMortalityTable);


  let [IsPBGCCovered, setIsPBGCCovered] = React.useState(DefaultPlan.isPBGCCovered === true ? 1:2); 
  let [CBInterestCredit, setCBInterestCredit] = React.useState(DefaultPlan.cbInterestCredit ? DefaultPlan.cbInterestCredit.toString() : null); 
  let [OverrideSegRate1, setOverrideSegRate1] = React.useState(DefaultPlan.overrideSegRate1 ? DefaultPlan.overrideSegRate1.toString() : null); 
  let [OverrideSegRate2, setOverrideSegRate2] = React.useState(DefaultPlan.overrideSegRate2 ? DefaultPlan.overrideSegRate2.toString() : null); 
  let [OverrideSegRate3, setOverrideSegRate3] = React.useState(DefaultPlan.overrideSegRate3 ? DefaultPlan.overrideSegRate3.toString() : null);
  let [PreRetMortality, setPreRetMortality] = React.useState(DefaultPlan.preRetMortality === true ? 1:2);
  let [MortalityTableCombined, setMortalityTableCombined] = React.useState(DefaultPlan.mortalityTableCombined === true ? 1:2);
  let [FundingForLumpSum, setFundingForLumpSum] = React.useState(DefaultPlan.fundingForLumpSum === true ? 1:2);
  let [ImputeDisparity, setImputeDisparity] = React.useState(DefaultPlan.imputeDisparity === true ? 1:2);
  let [AEPostRetMortalityTable, setAEPostRetMortalityTable] = React.useState(DefaultPlan.aePostRetMortalityTable);
  let [AEPreRetInt, setAEPreRetInt] = React.useState(DefaultPlan.aePreRetInt ? DefaultPlan.aePreRetInt.toString() : null);
  let [AEPostRetInt, setAEPostRetInt] = React.useState(DefaultPlan.aePostRetInt ? DefaultPlan.aePostRetInt.toString() : null); 
  let [TAPostRetMort, setTAPostRetMort] = React.useState(DefaultPlan.taPostRetMort);
  let [TAPreRetInt, setTAPreRetInt] = React.useState(DefaultPlan.taPreRetInt ? DefaultPlan.taPreRetInt.toString() : null);
  let [TAPostRetInt, setTAPostRetInt] = React.useState(DefaultPlan.taPostRetInt ? DefaultPlan.taPostRetInt.toString() : null); 

  Balance.isPBGCCovered = IsPBGCCovered === undefined ? null : IsPBGCCovered;
  Balance.cbInterestCredit = CBInterestCredit;
  Balance.overrideSegRate1 = OverrideSegRate1;
  Balance.overrideSegRate2 = OverrideSegRate2;
  Balance.overrideSegRate3 = OverrideSegRate3;
  Balance.preRetMortality = PreRetMortality === undefined ? null : PreRetMortality;
  Balance.mortalityTableCombined = MortalityTableCombined === undefined ? null : MortalityTableCombined;
  Balance.fundingForLumpSum = FundingForLumpSum === undefined ? null : FundingForLumpSum;
  Balance.imputeDisparity = ImputeDisparity === undefined ? null : ImputeDisparity;
  Balance.aePostRetMortalityTable = AEPostRetMortalityTable === undefined ? null : AEPostRetMortalityTable;
  Balance.aePreRetInt = AEPreRetInt;
  Balance.aePostRetInt = AEPostRetInt;
  Balance.taPostRetMort = TAPostRetMort === undefined ? null : TAPostRetMort;
  Balance.taPreRetInt = TAPreRetInt;
  Balance.taPostRetInt = TAPostRetInt;

  React.useEffect(() => {
    //Api Data
    console.log("useEffect ====PLAN DETAILS DATA STATE ======================ROUTE========> ", route, dataState["Plan Details"]);
    if (dataState["Plan Details"] === null || (dataState["Plan Details"] && dataState["Plan Details"].Name === 'Plan Details')){
      setPlanDetailsTab();     
    }
  }, [dataState["Plan Details"]]);


  const setPlanDetailsTab = () => {
    
    //setIsPBGCCovered(IsPBGCCovered = 1); 
    /*
    setCBInterestCredit(CBInterestCredit = '120')
    setOverrideSegRate1(OverrideSegRate1 = '154'); 
    setOverrideSegRate2(OverrideSegRate2 = '7474'); 
    setOverrideSegRate3(OverrideSegRate3 = '7');
    setPreRetMortality(PreRetMortality = 1);
    setMortalityTableCombined(MortalityTableCombined = 2);
    setFundingForLumpSum(FundingForLumpSum = 2);
    setImputeDisparity(ImputeDisparity = 1);
    setAEPostRetMortalityTable(AEPostRetMortalityTable = '1960 Group Annuity Male');
    setAEPreRetInt(AEPreRetInt = '435');
    setAEPostRetInt(AEPostRetInt = '343'); 
    setTAPostRetMort(TAPostRetMort = '1983 Individual Annuity Male');
    setTAPreRetInt(TAPreRetInt = '5435');
    setTAPostRetInt(TAPostRetInt = '7980'); 
    */
  }

  //console.log("Balance", Balance)
  const { colors } = useTheme();

  const RadioBtn = [
    {
      id: 1, // required
      text: 'Yes', //required
    },
    {
      id: 2,
      text: 'No',
    },
  ];

  const RbtnData = [
    {
      id: 1,
      label: 'Yes'
     },
     {
      id: 2,
      label: 'No'
     }
    ];

    const toBool = (int) =>{
      console.log('toBoool=============>',int);
      if (int){
        setIsPBGCCovered(IsPBGCCovered = true);
      } else {
        setIsPBGCCovered(IsPBGCCovered = false);
      }
    } 
    
    
    return(
    
      <View style= {[styles.container,{backgroundColor: colors.primary}]}>
      <View style= {styles.inputContainer}>
      <ScrollView style= {styles.ScrollContainer}>
        <View style={{marginBottom: 45}}> 
          <Text style={styles.title}>Will Plan be covered by PBGC?</Text>
          <RadioButtonRN
            data={RbtnData}
            activeOpacity={1}
            initial={IsPBGCCovered}
            animationTypes={['pulse']}
            style={{paddingLeft: 10,flexDirection: 'row'}}
            textStyle={{paddingLeft: 10}}
            boxStyle={{width: 70}}
					  box={false}
            selectedBtn={(e) => setIsPBGCCovered(IsPBGCCovered = e.id)}
            circleSize={13}
            activeColor={'#333333'}
            deactiveColor={'grey'}
            textColor={'#333333'}
          />
          <Text style={[styles.title,{marginTop: 10}]}>Cash Balance Interest Credit</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0.00"
              style={[styles.textInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={CBInterestCredit}
              keyboardType='numeric'
              onChangeText={(val) => setCBInterestCredit(CBInterestCredit = val)}
            />

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.title,{marginTop: 10}]}>FUNDING INTEREST RATE</Text>
            <TouchableOpacity style={styles.icon} onPress={() => setOpen(Open = !Open)}>
              <Material name="file-table" size={25} backgroundColor="#1f65ff"/>
            </TouchableOpacity>
            {/*
            <TouchableOpacity style={styles.icon} onPress={() => _handlePressButtonAsync()}>
              <Material name="globe-model" size={25} backgroundColor="#1f65ff"/>
            </TouchableOpacity>
            */}
            
          </View>

          {/*modal*/}
            <Interest Open={Open} setOpen={setOpen}/>
          {/*end*/}

          <View style={{paddingLeft: 10,}}>
              {/*
            <Text style={styles.subNames}>Interest Rates </Text>*/}
            <Text style={styles.subNames}>Yrs 0 - 5 Segment 1</Text>

              <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0.00"
              style={[styles.SubtextInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={OverrideSegRate1}
              keyboardType='numeric'
              onChangeText={(val) => setOverrideSegRate1(OverrideSegRate1 = val)}
              />

            <Text style={styles.subNames}>Yrs 6 - 20 Segment 2</Text>

              <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0.00"
              style={[styles.SubtextInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={OverrideSegRate2}
              keyboardType='numeric'
              onChangeText={(val) => setOverrideSegRate2(OverrideSegRate2 = val)}
              />

            <Text style={styles.subNames}>Yrs Over 20 Segment 3 </Text>

              <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0.00"
              style={[styles.SubtextInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value = {OverrideSegRate3}
              keyboardType='numeric'
              onChangeText={(val) => setOverrideSegRate3(OverrideSegRate3 = val)}
              />

            <Text style={styles.subNames}>Pre-Retirement Mortality </Text>

            <RadioButton
              data={RadioBtn} //required
              defaultOption={PreRetMortality}
              formStyle = {{flexDirection: 'row'}} 
              containerStyle={{marginBottom: 5,marginTop: 10}}
              labelStyle={{paddingRight: 10}}
              circleContainerStyle={{ }} // add your styles to each outer circle
              innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
              onValueChange={(value) => setPreRetMortality(PreRetMortality = value.id)} //required
            />
            <Text style={styles.subNames}>Combined Mortality Table</Text>

              <RadioButton
                data={RadioBtn} //required
                defaultOption={MortalityTableCombined}
                formStyle = {{flexDirection: 'row'}} 
                containerStyle={{marginBottom: 5,marginTop: 10}}
                labelStyle={{paddingRight: 10}}
                circleContainerStyle={{ }} // add your styles to each outer circle
                innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                onValueChange={(value) => setMortalityTableCombined(MortalityTableCombined = value.id)} //required
              />
            <Text style={styles.subNames}>Funding for Lump Sum</Text>

              <RadioButton
                data={RadioBtn} //required
                defaultOption={FundingForLumpSum}
                formStyle = {{flexDirection: 'row'}} 
                containerStyle={{marginBottom: 5,marginTop: 10}}
                labelStyle={{paddingRight: 10}}
                circleContainerStyle={{ }} // add your styles to each outer circle
                innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                onValueChange={(value) => setFundingForLumpSum(FundingForLumpSum = value.id)} //required
              />

            <Text style={styles.subNames}>Impute Disparity</Text>

              <RadioButton
                
                data={RadioBtn} //required
                defaultOption={ImputeDisparity}
                formStyle = {{flexDirection: 'row'}} 
                containerStyle={{marginBottom: 5,marginTop: 10}}
                labelStyle={{paddingRight: 10}}
                circleContainerStyle={{ }} // add your styles to each outer circle
                innerCircleStyle={{ /*backgroundColor: 'green'*/ }} // add your styles to each inner circle
                onValueChange={(value) => setImputeDisparity(ImputeDisparity = value.id)} //required
              />
          </View>

          <Text style={[styles.title,{marginTop: 10}]}>ACTUARIAL EQUIVALENCE</Text>
          
              
               
              <View style={{paddingLeft: 10,}}>
              <Text style={styles.subNames}>Pre-Retirement Interest</Text>

                <TextInput 
                placeholderTextColor = 'rgba(51,51,51,0.7)'
                placeholder="0.00"
                style={[styles.SubtextInput,{color: colors.Logintext}]}
                //autoCapitalize="none"
                value={AEPreRetInt}
                keyboardType='numeric'
                onChangeText={(val) => setAEPreRetInt(AEPreRetInt = val)}
                />

                <Text style={[styles.subNames,{paddingLeft: 0}]}>Post Retirement Mortality</Text>

                <DropDownPicker
                  items={DropdownData.aePostRetMortalityTable}
                    defaultIndex={0}
                    defaultValue={AEPostRetMortalityTable} //value
                    placeholder="Select an retirement mortality"
                    placeholderStyle={{color: colors.Logintext}}
                    activeLabelStyle={{color: 'green'}}
                    labelStyle={{color: colors.Logintext}}
                    style={{borderWidth: 1}}
                    dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                    containerStyle={{ height: 38, flex: 1,marginTop: 10}}
                    searchable={true}
                    searchablePlaceholder="Search..."
                    searchableError="Not Found"
                    searchableStyle={{color: 'rgba(51,51,51,0.5)'}}
                    arrowColor='rgba(51,51,51,0.5)'
                    onChangeItem={item => setAEPostRetMortalityTable(AEPostRetMortalityTable = item.value)}
                />                

              <Text style={[styles.subNames,{}]}>Post Retirement Interest</Text>

                <TextInput 
                placeholderTextColor = 'rgba(51,51,51,0.7)'
                placeholder="0.00"
                style={[styles.SubtextInput,{color: colors.Logintext}]}
                //autoCapitalize="none"
                value={AEPostRetInt}
                keyboardType='numeric'
                onChangeText={(val) => setAEPostRetInt(AEPostRetInt = val)}
                />
            </View>
          <Text style={[styles.title,{marginTop: 10}]}>TESTING ASSUMPTIONS</Text>
            <View style={{paddingLeft: 10, paddingBottom: 50}}>
              
                <Text style={styles.subNames}>Pre-Retirement Interest</Text>
                  <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0.00"
                  style={[styles.SubtextInput,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={TAPreRetInt}
                  keyboardType='numeric'
                  onChangeText={(val) => setTAPreRetInt(TAPreRetInt = val)}
                  />
                <Text style={styles.subNames}>Post Retirement Mortality</Text>  
                <DropDownPicker
                  items={DropdownData.taPostRetMort}
                    defaultIndex={0}
                    defaultValue={TAPostRetMort} //value
                    placeholder="Select an retirement mortality"
                    placeholderStyle={{color: colors.Logintext}}
                    activeLabelStyle={{color: 'green'}}
                    labelStyle={{color: colors.Logintext}}
                    style={{borderWidth: 1}}
                    dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                    containerStyle={{ height: 38, flex: 1,marginTop: 10}}
                    searchable={true}
                    searchablePlaceholder="Search..."
                    searchableError="Not Found"
                    searchableStyle={{color: 'rgba(51,51,51,0.5)'}}
                    arrowColor='rgba(51,51,51,0.5)'
                    onChangeItem={item => setTAPostRetMort(TAPostRetMort = item.value)}
                />              
                <Text style={styles.subNames}>Post Retirement Interest</Text>
                  <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0.00"
                  style={[styles.SubtextInput,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={TAPostRetInt}
                  keyboardType='numeric'
                  onChangeText={(val) => setTAPostRetInt(TAPostRetInt = val)}
                  />
            </View>
        </View>
      </ScrollView>
      </View>
    </View>
  )
}
export default CashBalance;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10
     
    },
    inputContainer: {
      marginTop: 10,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    ScrollContainer: {
      marginTop: 20,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 7
    },
    subNames: {
      paddingRight: 10,
      marginTop: 7,
      fontSize: 12
    },
    icon: {
      padding: 2,
      marginTop: 5,
      marginLeft: 5,
      marginBottom: 5
    },
    textInput: {
      flex: 1,  
      borderBottomWidth: 1.5,
      borderBottomColor: '#989c9d',
    },
    SubtextInput: {
      flex: 1,  
      marginLeft: 2,
      marginBottom: 5,
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#989c9d',
    },
  });