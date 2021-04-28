import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,ScrollView,Dimensions,TextInput } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from 'react-native-customizable-radio-button';
import Interest from '../../components/InterestModal'
import * as WebBrowser from 'expo-web-browser';
import RadioButtonRN from 'radio-buttons-react-native';
const {width,height} = Dimensions.get('window');

const CashBalance = ({ route }) => {
  const [{},dataState] = React.useContext(AuthContext);
  //Open modal
  let [Open, setOpen] = React.useState(false); 
  //get modal data
  let [ModalData, setModalData] = React.useState(null); 
  if(ModalData)
  {
    console.log('from cash balance modal', ModalData);
  }

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
  let DetailsFetchedData = dataState.DetailsFetchedData;

  //console.log('MORTALITY TABLE===========>',Balance.aePostRetMortalityTable, DefaultPlan.aePostRetMortalityTable, DropdownData.aePostRetMortalityTable);


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

  Balance.isPBGCCovered = IsPBGCCovered === 1 ? true : false;
  Balance.cbInterestCredit = CBInterestCredit ? CBInterestCredit.toString() : "0";
  Balance.overrideSegRate1 = OverrideSegRate1 ? OverrideSegRate1.toString() : "0";
  Balance.overrideSegRate2 = OverrideSegRate2 ? OverrideSegRate2.toString() : "0";
  Balance.overrideSegRate3 = OverrideSegRate3 ? OverrideSegRate3.toString() : "0";
  Balance.preRetMortality = PreRetMortality === 1 ? true : false;
  Balance.mortalityTableCombined = MortalityTableCombined === 1 ? true : false;
  Balance.fundingForLumpSum = FundingForLumpSum === 1 ? true : false;
  Balance.imputeDisparity = ImputeDisparity === 1 ? true : false;
  Balance.aePostRetMortalityTable = AEPostRetMortalityTable === undefined ? null : AEPostRetMortalityTable;
  Balance.aePreRetInt = AEPreRetInt ? AEPreRetInt.toString() : "0";
  Balance.aePostRetInt = AEPostRetInt ? AEPreRetInt.toString() : "0";
  Balance.taPostRetMort = TAPostRetMort === undefined ? null : TAPostRetMort;
  Balance.taPreRetInt = TAPreRetInt ? TAPreRetInt.toString() : "0";
  Balance.taPostRetInt = TAPostRetInt ? TAPostRetInt.toString() : "0";

  const CBScroll = React.useRef();
  let [ACTUARIALMargin, setACTUARIALMargin] = React.useState(0); 
  let [TESTINGMargin, setTESTINGMargin] = React.useState(0); 

  let [ACTUARIALhideDrop, setACTUARIALhideDrop] = React.useState(false); 
  let [TESTINGhideDrop, setTESTINGhideDrop] = React.useState(false); 

  let CashDropSelected = null;
  const DropdownCashController = (CashDropSelected) => {
    if(CashDropSelected === 1)//ACTUARIAL
    {
      setACTUARIALMargin(ACTUARIALMargin = 150)
      setACTUARIALhideDrop(ACTUARIALhideDrop = true)

      setTESTINGMargin(TESTINGMargin = 0)
      setTESTINGhideDrop(TESTINGhideDrop = false)
    }
    else if(CashDropSelected === 2)//Testing
    {
      setACTUARIALMargin(ACTUARIALMargin = 0)
      setACTUARIALhideDrop(ACTUARIALhideDrop = false)

      setTESTINGMargin(TESTINGMargin = 150)
      setTESTINGhideDrop(TESTINGhideDrop = true)
    }
  };
  React.useEffect(() => {
    //Api Data
    //console.log("useEffect ====PLAN DETAILS DATA STATE ======================ROUTE========> ", route, dataState["Plan Details"]);
    console.log("USE EFFECT CB TAB+++++++++++++++++");
    if (dataState["Plan Details"] === null || (dataState["Plan Details"] && dataState["Plan Details"].Name === 'Plan Details')){
      setPlanDetailsTab();     
    }
  }, [dataState.DetailsFetchedData]);


  const setPlanDetailsTab = () => {
    console.log('=================CB=====================FETCHED DATA', dataState.selectedPlan, '=', DetailsFetchedData.planId, DetailsFetchedData.planName);

    if (DetailsFetchedData && DetailsFetchedData.planName){
      console.log("has Data");
      let UserCB = DetailsFetchedData;
      //console.log(UserCB.isPBGCCovered,UserCB.preRetMortality,UserCB.mortalityTableCombined, UserCB.fundingForLumpSum, UserCB.imputeDisparity);

      setIsPBGCCovered(IsPBGCCovered = UserCB.isPBGCCovered === true ? 1 : 2); 
      setCBInterestCredit(CBInterestCredit = UserCB.cbInterestCredit.toString())
      setOverrideSegRate1(OverrideSegRate1 = UserCB.overrideSegRate1.toString()); 
      setOverrideSegRate2(OverrideSegRate2 = UserCB.overrideSegRate2.toString()); 
      setOverrideSegRate3(OverrideSegRate3 = UserCB.overrideSegRate3.toString());
      setPreRetMortality(PreRetMortality = UserCB.preRetMortality === true ? 1 : 2);
      setMortalityTableCombined(MortalityTableCombined = UserCB.mortalityTableCombined === true ? 1 : 2);
      setFundingForLumpSum(FundingForLumpSum = UserCB.fundingForLumpSum === true ? 1 : 2);
      setImputeDisparity(ImputeDisparity = UserCB.imputeDisparity === true ? 1 : 2);
      setAEPostRetMortalityTable(AEPostRetMortalityTable = UserCB.aePostRetMortalityTable);
      setAEPreRetInt(AEPreRetInt = UserCB.aePreRetInt.toString());
      setAEPostRetInt(AEPostRetInt = UserCB.aePostRetInt.toString()); 
      setTAPostRetMort(TAPostRetMort = UserCB.taPostRetMort);
      setTAPreRetInt(TAPreRetInt = UserCB.taPreRetInt.toString());
      setTAPostRetInt(TAPostRetInt = UserCB.taPostRetInt.toString()); 
    } //edit this with dataState.DetailsFetchedData
  }

  //console.log("Balance", Balance)
  const { colors } = useTheme();

  const RadioBtn = [
    {
      id: 1, // required
      label: 'Yes', //required
    },
    {
      id: 2,
      label: 'No',
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
      <ScrollView ref={CBScroll} style= {styles.ScrollContainer}>
        <View style={{marginBottom: 20}}> 
          <Text style={styles.title}>Will Plan be covered by PBGC?</Text>
          <RadioButtonRN
            data={RbtnData}
            activeOpacity={2}
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
            <Interest Open={Open} setOpen={setOpen} setModalData={setModalData} ModalData={ModalData}/>
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

            <RadioButtonRN
              data={RadioBtn} //required
              activeOpacity={1}
                initial={PreRetMortality}
                animationTypes={['pulse']}
                style={{paddingLeft: 5,flexDirection: 'row'}}
                textStyle={{paddingLeft: 10}}
                boxStyle={{width: 70}}
                box={false}
                selectedBtn={(e) => setPreRetMortality(PreRetMortality = e.id)}
                circleSize={13}
                activeColor={'#333333'}
                deactiveColor={'grey'}
                textColor={'#333333'}
              />
            <Text style={styles.subNames}>Combined Mortality Table</Text>

              <RadioButtonRN
                data={RadioBtn} //required
                activeOpacity={1}
                initial={MortalityTableCombined}
                animationTypes={['pulse']}
                style={{paddingLeft: 5,flexDirection: 'row'}}
                textStyle={{paddingLeft: 10}}
                boxStyle={{width: 70}}
                box={false}
                selectedBtn={(e) => setMortalityTableCombined(MortalityTableCombined = e.id)}
                circleSize={13}
                activeColor={'#333333'}
                deactiveColor={'grey'}
                textColor={'#333333'}
              />
            <Text style={styles.subNames}>Funding for Lump Sum</Text>

              <RadioButtonRN
                data={RadioBtn} //required
                activeOpacity={1}
                initial={FundingForLumpSum}
                animationTypes={['pulse']}
                style={{paddingLeft: 5,flexDirection: 'row'}}
                textStyle={{paddingLeft: 10}}
                boxStyle={{width: 70}}
                box={false}
                selectedBtn={(e) => setFundingForLumpSum(FundingForLumpSum = e.id)}
                circleSize={13}
                activeColor={'#333333'}
                deactiveColor={'grey'}
                textColor={'#333333'}
              />

            <Text style={styles.subNames}>Impute Disparity</Text>

              <RadioButtonRN
                
                data={RadioBtn} //required
                activeOpacity={1}
                initial={ImputeDisparity}
                animationTypes={['pulse']}
                style={{paddingLeft: 5,flexDirection: 'row'}}
                textStyle={{paddingLeft: 10}}
                boxStyle={{width: 70}}
                box={false}
                selectedBtn={(e) => setImputeDisparity(ImputeDisparity = e.id)}
                circleSize={13}
                activeColor={'#333333'}
                deactiveColor={'grey'}
                textColor={'#333333'}
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

              <Text style={[styles.subNames,{paddingLeft: 0}]}>Post Retirement Mortality</Text>

              <DropDownPicker
                items={DropdownData.aePostRetMortalityTable}
                  isVisible={ACTUARIALhideDrop}
                  defaultIndex={0}
                  defaultValue={AEPostRetMortalityTable.toString()} //value
                  placeholder="Select an retirement mortality"
                  placeholderStyle={{color: colors.Logintext}}
                  activeLabelStyle={{color: 'green'}}
                  labelStyle={{color: colors.Logintext}}
                  style={{borderWidth: 1}}
                  itemStyle={{justifyContent: 'flex-start'}}
                  dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                  containerStyle={{ height: 38, flex: 1,marginTop: 10, marginBottom: ACTUARIALMargin}}
                  searchable={true}
                  searchablePlaceholder="Search..."
                  searchableError={() => alert('Not found from dropdown')}
                  searchableStyle={{color: 'rgba(51,51,51,0.5)'}}
                  arrowColor='rgba(51,51,51,0.5)'
                  onOpen={() => [CashDropSelected = 1,DropdownCashController(CashDropSelected),CBScroll.current.scrollTo({ x: 0, y: 500, animated: true })]}
                onClose={() => {[setACTUARIALhideDrop(ACTUARIALhideDrop = false),setACTUARIALMargin(ACTUARIALMargin = 0)]}}
                  onChangeItem={item => setAEPostRetMortalityTable(AEPostRetMortalityTable = item.value)}
              /> 
            </View>
          <Text style={[styles.title,{marginTop: 10}]}>TESTING ASSUMPTIONS</Text>
            <View style={{paddingLeft: 10}}>
              
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
                  <Text style={styles.subNames}>Post Retirement Mortality</Text>  
                  <DropDownPicker
                    items={DropdownData.taPostRetMort}
                    isVisible={TESTINGhideDrop}
                    defaultIndex={0}
                    defaultValue={TAPostRetMort} //value
                    placeholder="Select an retirement mortality"
                    placeholderStyle={{color: colors.Logintext}}
                    activeLabelStyle={{color: 'green'}}
                    labelStyle={{color: colors.Logintext}}
                    style={{borderWidth: 1}}
                    itemStyle={{justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                    containerStyle={{ height: 38, flex: 1,marginTop: 10, marginBottom: TESTINGMargin}}
                    searchable={true}
                    searchablePlaceholder="Search..."
                    searchableError={() => alert('Not found from dropdown')}
                    searchableStyle={{color: 'rgba(51,51,51,0.5)'}}
                    arrowColor='rgba(51,51,51,0.5)'
                    onOpen={() => [CashDropSelected = 2,DropdownCashController(CashDropSelected),
                        setTimeout(() => {
                          CBScroll.current.scrollTo({ x: 0, y: 750, animated: true })
                        }, 1)
                      ]}
                    onClose={() => {[setTESTINGhideDrop(TESTINGhideDrop = false),setTESTINGMargin(TESTINGMargin = 0)]}}
                    onChangeItem={item => setTAPostRetMort(TAPostRetMort = item.value)}
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
      fontSize: height > 800 ? 18 : 14,
      fontWeight: 'bold',
      marginBottom: 7
    },
    subNames: {
      paddingRight: 10,
      marginTop: 7,
      fontSize: height > 800 ? 15 : 12
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