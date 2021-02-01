import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button,ScrollView,TextInput, Alert, ActivityIndicator,Platform,Dimensions } from 'react-native';
import{ AuthContext } from '../../components/context';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from 'react-native-customizable-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Settings from '../../settings.json';
import { set } from 'react-native-reanimated';
import RadioButtonRN from 'radio-buttons-react-native';
const baseURL = Settings.domain;
const {width,height} = Dimensions.get('window');

const General = ({  route, Error, SetError }) => {
  const [{setDetails},dataState] = React.useContext(AuthContext);
  const DefaultPlan = dataState.DefaultPlan;
  const DropdownData = dataState.DefaultDropdown;
  const [planDetailsData, setPlanDetailsData] = React.useState(null);
  let planDetailsDataState = dataState.Details; //dataState.General for checking
  
  //console.log('==PlanID==>', dataState.plan.planId);
  //console.log('==SelectedPlanID==>', dataState.selectedPlan);

  let [PlanName, setPlanName] = React.useState(DefaultPlan.planName); 
  let [PlanDescription, setPlanDescription] = React.useState(DefaultPlan.planDescription); 
  let [PlanEffDate, setPlanEffDate] = React.useState(DefaultPlan.planEffDate? moment(DefaultPlan.planEffDate).format('MM/DD/YYYY'):null); 
  let [RetAge, setRetAge] = React.useState(DefaultPlan.retAge.toString? DefaultPlan.retAge.toString():null); 
  let [YearOfParticipationForNRA, setYearOfParticipationForNRA] = React.useState(DefaultPlan.yearOfParticipationForNRA);
  let [PSRetAge, setPSRetAge] = React.useState(DefaultPlan.psRetAge);
  let [MinAge, setMinAge] = React.useState(DefaultPlan.minAge);
  let [MonthCk, setMonthCk] = React.useState(DefaultPlan.minSvcMonths != null? true: false);
  let [MinSvcMonths, setMinSvcMonths] = React.useState(DefaultPlan.minSvcMonths);
  let [HourCk, setHourCk] = React.useState((DefaultPlan.minSvcHours && DefaultPlan.minSvcHours > 0) ? true: false);
  let [MinSvcHours, setMinSvcHours] = React.useState(DefaultPlan.minSvcHours ? DefaultPlan.minSvcHours.toString():"0");
  let [EntryDate, setEntryDate] = React.useState(DefaultPlan.entryDate); 
  let [VestingSchedYear1, setVestingSchedYear1] = React.useState(DefaultPlan.vestingSchedYear1 ? DefaultPlan.vestingSchedYear1.toString():"0");
  let [VestingSchedYear2, setVestingSchedYear2] = React.useState(DefaultPlan.vestingSchedYear2 ? DefaultPlan.vestingSchedYear2.toString():"0");
  let [VestingSchedYear3, setVestingSchedYear3] = React.useState(DefaultPlan.vestingSchedYear3 ? DefaultPlan.vestingSchedYear3.toString():null); 
  let [ExcludedYears_18, setExcludedYears_18] = React.useState(DefaultPlan.excludedYears_18); 
  let [ExcludedYears_Eff, setExcludedYears_Eff] = React.useState(DefaultPlan.excludedYears_Eff); 
  let [AgeDefinition, setAgeDefinition] = React.useState(DefaultPlan.ageDefinition === "N"? 1 : 2); 
  let [HCETopPaid, setHCETopPaid] = React.useState(DefaultPlan.hceTopPaid == 1? 1: 2); 
  let [IncludeDefInEmployerCost, setIncludeDefInEmployerCost] = React.useState(DefaultPlan.includeDefInEmployerCost); 
  let [Include401k, setInclude401k] = React.useState(DefaultPlan.include401k); 
  let [MinTaxBracket, setMinTaxBracket] = React.useState(DefaultPlan.minTaxBracket ? DefaultPlan.minTaxBracket.toString():null); 
  let [MaxTaxBracket, setMaxTaxBracket] = React.useState(DefaultPlan.maxTaxBracket ? DefaultPlan.maxTaxBracket.toString():null); 
  let [Entity, setEntity] = React.useState(DefaultPlan.entity); 
  let [PreparedBy, setPreparedBy] = React.useState(DefaultPlan.preparedBy); 
  let [CompanyName, setCompanyName] = React.useState(DefaultPlan.companyName); 

  planDetailsDataState.planName = PlanName;
  planDetailsDataState.planDescription = PlanDescription;
  planDetailsDataState.planEffDate = PlanEffDate;
  planDetailsDataState.retAge = RetAge;
  planDetailsDataState.yearOfParticipationForNRA = YearOfParticipationForNRA === undefined ? null : YearOfParticipationForNRA;
  planDetailsDataState.psRetAge = PSRetAge === undefined ? null : PSRetAge;
  planDetailsDataState.minAge = MinAge === undefined ? null : MinAge;
  planDetailsDataState.monthCk = MonthCk;
  planDetailsDataState.minSvcMonths = MinSvcMonths === undefined ? null : MinSvcMonths;
  planDetailsDataState.hourCk = HourCk;
  planDetailsDataState.minSvcHours = MinSvcHours  ? MinSvcHours.toString() : "0";
  planDetailsDataState.entryDate = EntryDate === undefined ? null : EntryDate;
  planDetailsDataState.vestingSchedYear1 = VestingSchedYear1 ? VestingSchedYear1.toString() : "0";
  planDetailsDataState.vestingSchedYear2 = VestingSchedYear2 ? VestingSchedYear2.toString() : "0";
  planDetailsDataState.vestingSchedYear3 = VestingSchedYear3 ? VestingSchedYear3.toString() : "0";
  planDetailsDataState.excludedYears_18 = ExcludedYears_18;
  planDetailsDataState.excludedYears_Eff = ExcludedYears_Eff
  planDetailsDataState.ageDefinition = AgeDefinition === 1 ? "N" : "Y";
  planDetailsDataState.hceTopPaid = HCETopPaid === undefined ? null : HCETopPaid;
  planDetailsDataState.includeDefInEmployerCost = IncludeDefInEmployerCost;
  planDetailsDataState.include401k = Include401k;
  planDetailsDataState.minTaxBracket = MinTaxBracket ? MinTaxBracket.toString() : "0";
  planDetailsDataState.maxTaxBracket = MaxTaxBracket ? MaxTaxBracket.toString() : "0";
  planDetailsDataState.entity = Entity === undefined ? null : Entity;
  planDetailsDataState.preparedBy = PreparedBy;
  planDetailsDataState.companyName = CompanyName;

  const Scroll = React.useRef();
  let controller;
  //Dd1;
  //let Dd1 = React.useRef(); 
  const Dd2 = React.useRef();
  let [TesthideDrop, setTesthideDrop] = React.useState(false); 
  let [MinAgehideDrop, setMinAgehideDrop] = React.useState(false); 
  let [MonthHideDrop, setMonthHideDrop] = React.useState(false); 
  let [EntryHideDrop, setEntryHideDrop] = React.useState(false); 
  let [TaxHideDrop, setTaxHideDrop] = React.useState(false); 

  let [TestAgemargin, setTestAgemargin] = React.useState(0); 
  let [MinAgemargin, setMinAgemargin] = React.useState(0); 
  let [Monthmargin, setMonthmargin] = React.useState(0); 
  let [EntryDatemargin, setEntryDatemargin] = React.useState(0); 
  let [Taxmargin, setTaxmargin] = React.useState(0); 

  let DropSelected = null;
  const DropdownController = (DropSelected) => {
    if(DropSelected === 1)//Test Age
    {
      setTestAgemargin(TestAgemargin = 150)
      setTesthideDrop(TesthideDrop = true)

      setMinAgemargin(MinAgemargin = 0)
      setMinAgehideDrop(MinAgehideDrop = false)

      setMonthmargin(Monthmargin = 0)
      setMonthHideDrop(MonthHideDrop = false)
      setEntryDatemargin(EntryDatemargin = 0)
      setEntryHideDrop(EntryHideDrop = false)

      setTaxmargin(Taxmargin = 0)
      setTaxHideDrop(TaxHideDrop = false)
    }
    else if(DropSelected === 2)//Min Age
    {
      setTestAgemargin(TestAgemargin = 0)
      setTesthideDrop(TesthideDrop = false)

      setMinAgemargin(MinAgemargin = 150)
      setMinAgehideDrop(MinAgehideDrop = true)

      setMonthmargin(Monthmargin = 0)
      setMonthHideDrop(MonthHideDrop = false)
      setEntryDatemargin(EntryDatemargin = 0)
      setEntryHideDrop(EntryHideDrop = false)
      setTaxmargin(Taxmargin = 0)
      setTaxHideDrop(TaxHideDrop = false)
    }
    else if(DropSelected === 3)//Month
    {
      setTestAgemargin(TestAgemargin = 0)
      setTesthideDrop(TesthideDrop = false)

      setMinAgemargin(MinAgemargin = 0)
      setMinAgehideDrop(MinAgehideDrop = false)

      setMonthmargin(Monthmargin = 150)
      setMonthHideDrop(MonthHideDrop = true)
      setEntryDatemargin(EntryDatemargin = 0)
      setEntryHideDrop(EntryHideDrop = false)
      setTaxmargin(Taxmargin = 0)
      setTaxHideDrop(TaxHideDrop = false)
    }
    else if(DropSelected === 4)//Entry
    {
      setTestAgemargin(TestAgemargin = 0)
      setTesthideDrop(TesthideDrop = false)

      setMinAgemargin(MinAgemargin = 0)
      setMinAgehideDrop(MinAgehideDrop = false)

      setMonthmargin(Monthmargin = 0)
      setMonthHideDrop(MonthHideDrop = false)
      setEntryDatemargin(EntryDatemargin = 150)
      setEntryHideDrop(EntryHideDrop = true)

      setTaxmargin(Taxmargin = 0)
      setTaxHideDrop(TaxHideDrop = false)
    }
    else if(DropSelected === 5)//Tax
    {
      setTestAgemargin(TestAgemargin = 0)
      setTesthideDrop(TesthideDrop = false)

      setMinAgemargin(MinAgemargin = 0)
      setMinAgehideDrop(MinAgehideDrop = false)

      setMonthmargin(Monthmargin = 0)
      setMonthHideDrop(MonthHideDrop = false)
      setEntryDatemargin(EntryDatemargin = 0)
      setEntryHideDrop(EntryHideDrop = false)

      setTaxmargin(Taxmargin = 70)
      setTaxHideDrop(TaxHideDrop = true)
    }
  };

  React.useEffect(() => {
    //Api Data
    //console.log("useEffect ====PLAN DETAILS DATA STATE ======================ROUTE========> ", route, dataState["Plan Details"]);
    
    if (!dataState["Plan Details"] || (dataState["Plan Details"] && dataState["Plan Details"].Name === 'Plan Details')){
      //alert('start');
      console.log("useEffect ====PLAN DETAILS GENERAL=========> ", PlanName, PlanDescription);      
      setPlanDetailsData(planDetailsData => null);
      if (route.params && route.params?.homeClick === 'Add'){
        
          if (DefaultPlan) {
            //console.log('===========================> DEFAULT PLAN', DefaultPlan);
            setPlanDetailsData(planDetailsData => DefaultPlan);
            setPlanDetailsTab(DefaultPlan);
            //alert('selectedPlan: ' + dataState.selectedPlan +  ' planId: ' +  dataState.plan.planId);
            //alert(route.params?.homeClick);
            dataState.selectedPlan = null;
            //route.params.homeClick = "save";
           // alert('DefaultPlan' + route.params.homeClick);
          }else{
            getPlanDetails();
            //alert('from else'+ dataState.plan.planId);
          }
      }else {
        getPlanDetails(dataState.plan.planId);
        //alert('from last' + dataState.plan.planId);
      }    
    }
  }, [dataState.selectedPlan, dataState["Plan Details"], route.params?.homeClick === 'cancel']);

  var Age = [
    {
      id: 1, // required
      text: 'Age at nearest birthday', //required
      label: 'Age at nearest birthday'
    },
    {
      id: 2,
      text: 'Age at last birthday',
      label: 'Age at last birthday'
    },
  ];

  var HCE = [
    {
      id: 1, // required
      //text: 'Yes', //required
      label: 'Yes'
    },
    {
      id: 2,
      ///text: 'No',
      label: 'No'
    },
  ];

    const { colors } = useTheme();
    
    let [value, setDate] = React.useState(new Date());
    let [show, setShow] = React.useState(false);
    let [date, setInputDate] = React.useState(null);
    let today = value;

    const getPlanDetails = async (planId) => {
      let url = null; 
      let method = 'GET';
      let headers = new Headers();
      if (planId){
        url = baseURL + '/Plans/Plan?id=' +  planId;
      }else{
        url = baseURL + '/Plans/PlanInit';
      }
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
            //console.log("FROM UseEffect =====Api Called PLAN========> ", responseJson.obj);
            if (planId){
              setPlanDetailsTab(responseJson.obj[0]);
            } else{
              setPlanDetailsTab(responseJson.obj);
            }

          } else {
            Alert.alert("Data Error", responseJson.message);
            setPlanData(planData => []);
          }
      })
      .catch((error) => {
          Alert.alert("Connection Error", error.message);
          return false;
      });
    }

    const setPlanDetailsTab = (responseData) => {
      setDetails(responseData);
      setPlanDetailsData(planDetailsData => responseData);
      // GENERAL
      setPlanName(PlanName = responseData.planName); 
      setPlanDescription(PlanDescription = responseData.planDescription); 
      setPlanEffDate(PlanEffDate  = responseData.planEffDate? moment(responseData.planEffDate).format('MM/DD/YYYY'):null); 
      setRetAge(RetAge = responseData.retAge.toString? responseData.retAge.toString():null); 
      setYearOfParticipationForNRA(YearOfParticipationForNRA = prepareVal(responseData.yearOfParticipationForNRA));
      setPSRetAge(PSRetAge = prepareVal(responseData.psRetAge));
      setMinAge(MinAge = prepareVal(responseData.minAge));
      setMonthCk(MonthCk  = responseData.minSvcMonths != null? true: false);
      setMinSvcMonths(MinSvcMonths = responseData.minSvcMonths);
      setHourCk(HourCk = (responseData.minSvcHours && responseData.minSvcHours > 0) ? true: false);
      setMinSvcHours(MinSvcHours = responseData.minSvcHours ? responseData.minSvcHours.toString():"0");
      setEntryDate(EntryDate = responseData.entryDate); 
      setVestingSchedYear1(VestingSchedYear1 = responseData.vestingSchedYear1 ? responseData.vestingSchedYear1.toString():"0");
      setVestingSchedYear2(VestingSchedYear2  = responseData.vestingSchedYear2 ? responseData.vestingSchedYear2.toString():"0");
      setVestingSchedYear3(VestingSchedYear3 = responseData.vestingSchedYear3 ? responseData.vestingSchedYear3.toString():"0"); 
      setExcludedYears_18(ExcludedYears_18  = responseData.excludedYears_18); 
      setExcludedYears_Eff(ExcludedYears_Eff  = responseData.excludedYears_Eff); 
      setAgeDefinition(AgeDefinition  =  responseData.ageDefinition === "N"? 1 : 2); //
      setHCETopPaid(HCETopPaid  = responseData.hceTopPaid == 1? 1: 2); 
      setIncludeDefInEmployerCost(IncludeDefInEmployerCost  = responseData.includeDefInEmployerCost); 
      setInclude401k(Include401k  = responseData.include401k); 
      setMinTaxBracket(MinTaxBracket  = responseData.minTaxBracket ? responseData.minTaxBracket.toString():null); 
      setMaxTaxBracket(MaxTaxBracket  = responseData.maxTaxBracket ? responseData.maxTaxBracket.toString():null); 
      setEntity(Entity  = responseData.entity); 
      setPreparedBy(PreparedBy  = responseData.preparedBy); 
      setCompanyName(CompanyName  = responseData.companyName); 
      
    }

    const prepareVal = (val, def) => {
      //console.log(val);
      if (val) {
        return val
      } else{
        if (def){
          return def
        } else{
          return ""
        }
      }
    }
    //DateTimePicker
    const onChange = (event, selectedDate) => {
      let currentDate = selectedDate || date;
      //console.log("A date has been picked: ", date);
      currentDate = moment(currentDate).format('MM/DD/YYYY')
      setShow(Platform.OS === 'ios');
      setDate(value = currentDate);
      setInputDate(date = currentDate)
    };
    
    //DateTimePickerModal
    const handleConfirm = (selectedDate) => {
      let currentDate = selectedDate || date;
      //console.log("A date has been picked: ", date);
      currentDate = moment(currentDate).format('MM/DD/YYYY')
      setShow(show = !show);
      setPlanEffDate(PlanEffDate=currentDate)
      //setDate(value = currentDate);
      //setInputDate(date = currentDate)
    };

    const Test_Age = (value) => {
      if(value < RetAge)
      {
        alert("Normal Retirement Age (NRA) should be less than or equal to Testing Age (TA). The program will automatically update Testing Age equal to NRA.");
        setPSRetAge(PSRetAge = parseInt(RetAge, 10))
        controller.selectItem(parseInt(RetAge, 10));
      }
      else{
        setPSRetAge(PSRetAge = value)
      }
    }

    const NRA_Error = (val) => {
      if((val < 62 || val > 65))
      {
        SetError(Error = true);
      }
      else if(PSRetAge < val)
      {
        alert("Normal Retirement Age (NRA) should be less than or equal to Testing Age (TA). The program will automatically update Testing Age equal to NRA.");
        setPSRetAge(PSRetAge = parseInt(val, 10));
        SetError(Error = false);
        controller.selectItem(parseInt(val, 10));
      }
      else
      {
        SetError(Error = false);
      }
    }
    //console.log(date, "date")
    /*
    if(today != null)
    {
       //convert to M/D/Y: 
        let nowdate = parseInt(today.getMonth()+1) +"-"+ today.getDate() +"-"+ today.getFullYear();
        let thisDate = nowdate.toString();
        console.log("M/D/Y: ", thisDate);
        //setInputDate(date =  thisDate)
    }
    */
    //console.log(date)
    //console.log(value, 'date')
    /*
    open = (setState = true) => {
      this.setState({...(setState && {isVisible: true})
      }, () => this.props.onOpen());
   }
   */
  return(
      
    <KeyboardAwareScrollView
      style={{ /*backgroundColor: '#4c69a5'*/ }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{flex: 1}}
      scrollEnabled={false}
      //enableOnAndroid={false}
  >
     
    <View style= {[styles.container,{backgroundColor: colors.tertiary}]}>
    {!planDetailsData?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color={colors.secondary}/>
        </View>
        : 
    <View style= {styles.inputContainer}>

    <ScrollView ref={Scroll} style= {styles.ScrollContainer}>
      <View style={{marginBottom: 20}}>

        <Text style={styles.title}>Plan Name</Text>

        <TextInput 
          placeholderTextColor = 'rgba(51,51,51,0.7)'
          placeholder="Name"
          style={[styles.textInput,{color: colors.Logintext}]}
          //autoCapitalize="none"
          value={PlanName}
          keyboardType='default'
          onChangeText={(val) => setPlanName(PlanName = val)}
        />
        <Text style={[styles.title,{marginTop: 10}]}>Plan Description</Text>

        <TextInput 
          multiline={true}
          numberOfLines={height > 800 ? 8 : 4}
          placeholderTextColor = 'rgba(51,51,51,0.7)'
          placeholder="Description"
          style={[styles.textArea,{color: colors.Logintext}]}
          //autoCapitalize="none"
          value={PlanDescription}
          keyboardType='default'
          onChangeText={(val) => setPlanDescription(PlanDescription = val)}
        />

        <Text style={[styles.title,{marginTop: 10}]}>Plan Effective Date</Text>
        
        
        <TouchableOpacity style = {{ flexDirection: 'row'}} onPress={() => setShow(show = !show)}>
          <TextInput style={{flex: 1}}
            placeholderTextColor = 'rgba(51,51,51,0.7)'
            placeholder="Date"
            style={[styles.textInput,{color: colors.Logintext}]}
            value={date != null ? date.toString() : PlanEffDate}
            editable={false}
            
            //autoCapitalize="none"
            //keyboardType='default'
            onChangeText={(val) => setPlanEffDate(PlanEffDate = val)}
          />
          <Feather style={{ marginLeft: 5}}
                name="calendar"
                color="grey"
                size={25}
            /> 
        </TouchableOpacity>
          

        {show && (
          <DateTimePickerModal
          isVisible={show}
          mode="date"
          date={(PlanEffDate) ? new Date(PlanEffDate): new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setShow(show = !show)}
        />
        )}
        <Text style={[styles.title,{marginTop: 10}]}>Normal Retirement Age</Text>
          {Error === true  &&
            <Text style={{color: 'red', marginLeft: 2.5, marginRight: 2.5, marginTop: 5, marginBottom: 10, fontSize: 11}}>Valid values are from 62-65. NRA less than 62 generally not allowed per Notice 2007-69.</Text>
          }
          <View style={{...(Platform.OS !== 'android'? {zIndex: 5,flexDirection: 'row'} : {flexDirection: 'row'})}}>
            <Text style={[styles.subNames,{}]}>The later of Age</Text>
            <TextInput style={{alignSelf:'flex-start', flex:1}}
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.SubtextInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={RetAge}
              keyboardType='numeric'
              onChangeText={(val) => [setRetAge(RetAge = val), NRA_Error(val)]}
            />
            <Text style={styles.subNames}>years of participation</Text>
            
              <DropDownPicker
                items={DropdownData.yearOfParticipationForNRA}
                defaultValue={YearOfParticipationForNRA}             
                zIndex={5}
                placeholder=""
                placeholderStyle={{color: colors.Logintext}}
                activeLabelStyle={{color: 'green'}}
                labelStyle={{color: colors.Logintext}}
                itemStyle={{justifyContent: 'flex-start'}}
                style={{borderWidth: 1}}
                dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                containerStyle={{ height: 38, flex: height > 800 ? 0.2 : 1,marginLeft: 0, marginTop:-12}}
                arrowColor='rgba(51,51,51,0.5)'
                onChangeItem={item => setYearOfParticipationForNRA(YearOfParticipationForNRA = item.value)}
              />
            
          </View>  
         
        <Text style={[styles.title,{marginTop: 10}]}>Testing Age</Text>
        
        <DropDownPicker
            //controller={controller}
            isVisible={TesthideDrop}
            controller={(instance) => controller = instance}
            items={DropdownData.psRetAge}
            defaultValue={PSRetAge}
            zIndex={4}
            placeholder="Select an testing age"
            placeholderStyle={{color: colors.Logintext}}
            activeLabelStyle={{color: 'green'}}
            labelStyle={{color: colors.Logintext}}
            itemStyle={{justifyContent: 'flex-start'}}
            style={{borderWidth: 1}}
            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1,zIndex: 10}}
            containerStyle={{ height: 38, flex: 1, marginBottom: TestAgemargin}}
            arrowColor='rgba(51,51,51,0.5)'
            onOpen={() => {[DropSelected = 1, DropdownController(DropSelected),Scroll.current.scrollTo({ x: 0, y: 150, animated: true })]}}
            onClose={() => {[setTesthideDrop(TesthideDrop = false),setTestAgemargin(TestAgemargin = 0)]}}
            onChangeItem={(item) => [Test_Age(item.value)/*,setPSRetAge(PSRetAge = item.value)*/]}
        />
        
        {/*<Button onPress={() => {console.log(JSON.stringify(Dd1, null, 2))}} title='test1'></Button>*/}
        <Text style={[styles.title,{marginTop: 10}]}>Minimum Age</Text>
          
          <DropDownPicker 
              ref={Dd2}
              //controller={(instance) => {Dd1 = instance}}
              isVisible={MinAgehideDrop}
              items={DropdownData.minAge}
              defaultIndex={0}
              defaultValue={MinAge}
              zIndex={3}
              placeholder="Select an minimum Age"
              placeholderStyle={{color: colors.Logintext}}
              activeLabelStyle={{color: 'green'}}
              labelStyle={{color: colors.Logintext}}
              itemStyle={{justifyContent: 'flex-start'}}
              style={{borderWidth: 1}}
              dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
              containerStyle={{ height: 38, flex: 1, marginBottom: MinAgemargin}}
              arrowColor='rgba(51,51,51,0.5)'
              onOpen={() => {[DropSelected = 2, DropdownController(DropSelected),Scroll.current.scrollTo({ x: 0, y: 250, animated: true })]}}
              onClose={() => {[setMinAgehideDrop(MinAgehideDrop = false),setMinAgemargin(MinAgemargin = 0)]}}
              onChangeItem={(item) => setMinAge(MinAge = item.value)}
          />
          
          {/*<Button onPress={() => [sethideDrop(hideDrop = false),setMinAgemargin(MinAgemargin = 0)]} title='test'></Button>
          <Button onPress={() => [console.log(JSON.stringify(Dd2, null, 2))]} title='test'></Button>*/}
        <Text style={[styles.title,{marginTop: 10}]}>Minimum Service</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={MonthCk} onClick = {()=> setMonthCk(MonthCk = !MonthCk)}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Months</Text>
        </View>
          
        <DropDownPicker
              items={DropdownData.minSvcMonths}
              isVisible={MonthHideDrop}
              defaultIndex={0}
              defaultValue={MinSvcMonths}
              zIndex={2}
              placeholder="Select number of months"
              placeholderStyle={{color: colors.Logintext}}
              activeLabelStyle={{color: 'green'}}
              labelStyle={{color: colors.Logintext}}
              itemStyle={{justifyContent: 'flex-start'}}
              style={{borderWidth: 1}}
              dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
              containerStyle={{ height: 38, flex: 1,marginLeft: 5, marginBottom: Monthmargin}}
              arrowColor='rgba(51,51,51,0.5)'
              onOpen={() => {[DropSelected = 3, DropdownController(DropSelected),Scroll.current.scrollTo({ x: 0, y: 400, animated: true })]}}
              onClose={() => {[setMonthHideDrop(MonthHideDrop = false),setMonthmargin(Monthmargin = 0)]}}
              onChangeItem={item => setMinSvcMonths(MinSvcMonths = item.value)}
            />
          
          <View style={{flexDirection: 'row', marginTop: 5,marginBottom: 5}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={HourCk} onClick = {()=> setHourCk(HourCk = !HourCk)}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Hours</Text>
          </View>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="Number of hours"
              style={[styles.SubtextInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MinSvcHours}
              keyboardType='numeric'
              onChangeText={(val) => setMinSvcHours(MinSvcHours = val)}
            />

          <Text style = {{color: colors.Logintext,marginTop: 10,marginBottom: 5}}>Entry Date</Text>
              {
          <DropDownPicker
              items={DropdownData.entryDate}
              isVisible={EntryHideDrop}
              defaultIndex={0}
              defaultValue={EntryDate}
              zIndex={1}
              placeholder="Select entry date"
              placeholderStyle={{color: colors.Logintext}}
              activeLabelStyle={{color: 'green'}}
              labelStyle={{color: colors.Logintext}}
              itemStyle={{justifyContent: 'flex-start'}}
              style={{borderWidth: 1}}
              dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
              containerStyle={{ height: 38, flex: 1,marginLeft: 5,marginBottom: EntryDatemargin}}
              arrowColor='rgba(51,51,51,0.5)'
              onOpen={() => {[DropSelected = 4, DropdownController(DropSelected),Scroll.current.scrollTo({ x: 0, y: 500, animated: true })]}}
              onClose={() => {[setEntryHideDrop(EntryHideDrop = false),setEntryDatemargin(EntryDatemargin = 0)]}}
              onChangeItem={item => setEntryDate(EntryDate = item.value)}
            />
              }
        <Text style={[styles.title,{marginTop: 10}]}>Vesting Schedule</Text>

        <View style={{flexDirection: 'row'}}>
            <Text style={styles.subNames}>Year 1</Text>
            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={VestingSchedYear1}
              keyboardType='numeric'
              onChangeText={(val) => setVestingSchedYear1(VestingSchedYear1 = val)}
            />
            <Text style={styles.subNames}>Year 2</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput2,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={VestingSchedYear2}
              keyboardType='numeric'
              onChangeText={(val) => setVestingSchedYear2(VestingSchedYear2 = val)}
            />

          <Text style={styles.subNames}>Year 3</Text>

          <TextInput 
            placeholderTextColor = 'rgba(51,51,51,0.7)'
            placeholder="0"
            style={[styles.textInput3,{color: colors.Logintext}]}
            //autoCapitalize="none"
            value={VestingSchedYear3}
            keyboardType='numeric'
            onChangeText={(val) => setVestingSchedYear3(VestingSchedYear3 = val)}
          />
          </View>

        <Text style={[styles.title,{marginTop: 10}]}>Excluded Years</Text>

          <View style={{flexDirection: 'row'}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={ExcludedYears_18} onClick = {()=> setExcludedYears_18(ExcludedYears_18 = !ExcludedYears_18)}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Service Prior to Age 18</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={ExcludedYears_Eff} onClick = {()=> setExcludedYears_Eff(ExcludedYears_Eff = !ExcludedYears_Eff)}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Service Prior to Effective Date</Text>
          </View>

        <Text style={[styles.title,{marginTop: 10}]}>Age Definition</Text>

        <RadioButtonRN
            data={Age}
            activeOpacity={1}
            initial={AgeDefinition}
            animationTypes={['pulse']}
            style={{paddingLeft: 0}}
            textStyle={{paddingLeft: 10}}
            boxStyle={{width: 200}}
					  box={false}
            selectedBtn={(e) => setAgeDefinition(AgeDefinition = e.id)}
            circleSize={13}
            activeColor={'#333333'}
            deactiveColor={'grey'}
            textColor={'#333333'}
          />

       
        <Text style={[styles.title,{marginTop: 10}]}>HCE Top Paid Group Limited to 20%</Text>
          
        <RadioButtonRN
            data={HCE}
            activeOpacity={1}
            initial={HCETopPaid}
            animationTypes={['pulse']}
            style={{paddingLeft: 10,flexDirection: 'row'}}
            textStyle={{paddingLeft: 10}}
            boxStyle={{width: 70}}
					  box={false}
            selectedBtn={(e) => setHCETopPaid(HCETopPaid = e.id)}
            circleSize={13}
            activeColor={'#333333'}
            deactiveColor={'grey'}
            textColor={'#333333'}
          />
          {/*
        <RadioButton
          data={HCE} //required
          defaultOption={HCETopPaid}
          formStyle = {{flexDirection: 'row'}} 
          containerStyle={{marginBottom: 0}}
          labelStyle={{paddingRight: 10}}
          circleContainerStyle={{ }} // add your styles to each outer circle
          innerCircleStyle={{ /*backgroundColor: 'green' }} // add your styles to each inner circle
          onValueChange={(value) => setHCETopPaid(HCETopPaid = value.id)} //required
        />
          */}
        <Text style={[styles.title,{marginTop: 10}]}>Include Deferrals in Employer Cost</Text>

          <View style={{flexDirection: 'row'}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={IncludeDefInEmployerCost} onClick = {()=> setIncludeDefInEmployerCost(IncludeDefInEmployerCost = !IncludeDefInEmployerCost)}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5,fontSize: 13.5}}>Check to include deferrals in employer costs</Text>
          </View>



        <Text style={[styles.title,{marginTop: 10}]}>Include 401(k) </Text>

          <View style={{flexDirection: 'row'}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={Include401k} onClick = {()=> [setInclude401k(Include401k = !Include401k),dataState.Is401kChecked = Include401k]}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Check to include 401(k)</Text>
          </View>

        <Text style={[styles.title,{marginTop: 10}]}>Tax Bracket</Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subNames}>Minimum</Text>
            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MinTaxBracket}
              keyboardType='numeric'
              onChangeText={(val) => setMinTaxBracket(MinTaxBracket = val)}
            />
            <Text style={styles.subNames}>Maximum</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput2,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MaxTaxBracket}
              keyboardType='numeric'
              onChangeText={(val) => setMaxTaxBracket(MaxTaxBracket = val)}
            />
          </View>
          
        <Text style={[styles.title,{marginTop: 10}]}>Report Prepared By</Text>

        <TextInput 
          placeholderTextColor = 'rgba(51,51,51,0.7)'
          placeholder="Reporter"
          style={[styles.textInput,{color: colors.Logintext}]}
          //autoCapitalize="none"
          value={PreparedBy}
          keyboardType='default'
          onChangeText={(val) => setPreparedBy(PreparedBy = val)}
        />

        <Text style={[styles.title,{marginTop: 10}]}>Firm</Text>

        <TextInput 
          placeholderTextColor = 'rgba(51,51,51,0.7)'
          placeholder="Firm"
          style={[styles.textInput,{color: colors.Logintext}]}
          //autoCapitalize="none"
          value={planDetailsDataState.companyName}
          keyboardType='default'
          onChangeText={(val) => setCompanyName(CompanyName = val)}
        />
        
        <Text style={[styles.title,{marginTop: 10}]}>How is your business taxed?</Text>
          
          <DropDownPicker
              items={DropdownData.entity}
              isVisible={TaxHideDrop}
              defaultIndex={0}
              defaultValue={Entity}
              placeholder="Select an business taxed" 
              placeholderStyle={{color: colors.Logintext}}
              activeLabelStyle={{color: 'green'}}
              labelStyle={{color: colors.Logintext}}
              style={{borderWidth: 1}}
              itemStyle={{justifyContent: 'flex-start'}}
              dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
              containerStyle={{ height: 38, flex: 1,marginBottom: Taxmargin}}
              arrowColor='rgba(51,51,51,0.5)'
              onOpen={() => {[DropSelected = 5, DropdownController(DropSelected),
                setTimeout(() => {
                  Scroll.current.scrollTo({ x: 0, y: 985, animated: true })
                }, 5)
              ]}}
              onClose={() => {[setTaxHideDrop(TaxHideDrop = false),setTaxmargin(Taxmargin = 0)]}}
              onChangeItem={item => setEntity(Entity = item.value)}
          />
            
        </View>
      </ScrollView>
      </View>
       }
    </View>
   
    </KeyboardAwareScrollView>
  )
}
export default General;

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
    paddingRight: 3,
    marginTop: 7,
    paddingLeft: 3,
    fontSize: height > 800 ? 15 : 12
  },
  textArea: {
    flex: 1,  
    textAlignVertical: 'top',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#989c9d',
  },
  textInput: {
    flex: 1,  
    borderBottomWidth: 1.5,
    borderBottomColor: '#989c9d',
  },
  textInput2: {
    flex: 1, 
    borderBottomWidth: 1.5,
    borderBottomColor: '#989c9d',
  },
  textInput3: {
    flex: 1, 
    borderBottomWidth: 1.5,
    borderBottomColor: '#989c9d',
  },
  SubtextInput: {
    flex: 1,  
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#989c9d',
  },
  });