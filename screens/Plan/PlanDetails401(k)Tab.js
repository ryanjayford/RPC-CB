import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView,TextInput } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import RadioButtonRN from 'radio-buttons-react-native';


const FOI = ({ navigation }) => {
    const [{},dataState] = React.useContext(AuthContext);
    const DefaultPlan = dataState.DefaultPlan;
    let Details = dataState.Details;
    let DetailsFetchedData = dataState.DetailsFetchedData;
    
    let [TotOwnerCost, setTotOwnerCost] = React.useState(DefaultPlan.totOwnerCost ? DefaultPlan.totOwnerCost.toString() : null); 
    let [TotNonOwnerCost, setTotNonOwnerCost] = React.useState(DefaultPlan.totNonOwnerCost ? DefaultPlan.totNonOwnerCost.toString() : null); 
    let [CatchUp, setCatchUp] = React.useState(DefaultPlan.catchUp == "Y" ? 1:2); 
    let [IncludeMatch, setIncludeMatch] = React.useState(DefaultPlan.includeMatch == 0 ? 1:2); 
    let [MatchPercent1, setMatchPercent1] = React.useState(DefaultPlan.matchPercent1 ? DefaultPlan.matchPercent1.toString() : "0.0");
    let [MatchLimit1, setMatchLimit1] = React.useState(DefaultPlan.matchLimit1 ? DefaultPlan.matchLimit1.toString() : "0.0");
    let [MatchPercent2, setMatchPercent2] = React.useState(DefaultPlan.matchPercent2 ? DefaultPlan.matchPercent2.toString() : "0.0");
    let [MatchLimit2, setMatchLimit2] = React.useState(DefaultPlan.matchLimit2 ? DefaultPlan.matchLimit2.toString() : "0.0" );
    let [MatchPercent3, setMatchPercent3] = React.useState(DefaultPlan.matchPercent3 ? DefaultPlan.matchPercent3.toString() : "0.0");
    let [MatchLimit3, setMatchLimit3] = React.useState(DefaultPlan.matchLimit3 ? DefaultPlan.matchLimit3.toString() : "0.0");
    let [IsSafeHarborContrib, setIsSafeHarborContrib] = React.useState(DefaultPlan.isSafeHarborContrib);
    let [Exclusions, setExclusions] = React.useState(DefaultPlan.exclusions == 0 ? 4:1); 

    //changing value of loginstate details
    Details.totOwnerCost = TotOwnerCost ? TotOwnerCost.toString() : "0";
    Details.totNonOwnerCost = TotNonOwnerCost ? TotNonOwnerCost.toString() : "0";
    Details.catchUp = CatchUp === undefined ? null : CatchUp;
    Details.includeMatch = IncludeMatch === undefined ? null : IncludeMatch;
    Details.matchPercent1 = MatchPercent1 ? MatchPercent1.toString() : "0";
    Details.matchLimit1 = MatchLimit1 ? MatchLimit1.toString() : "0";
    Details.matchPercent2 = MatchPercent2 ? MatchPercent2.toString() : "0";
    Details.matchLimit2 = MatchLimit2 ? MatchLimit2.toString() : "0";
    Details.matchPercent3 = MatchPercent3 ? MatchPercent3.toString() : "0";
    Details.matchLimit3 = MatchLimit3 ? MatchLimit3.toString() : "0";
    Details.isSafeHarborContrib = IsSafeHarborContrib;
    Details.exclusions = Exclusions === undefined ? null : Exclusions;
    
   //console.log('Details',Details)
   const catchRbt = [
    {
      id: 1, 
      //text: 'Yes', 
      label: 'Yes'
    },
    {
      id: 2,
      //text: 'No',
      label: 'No'
    },
  ];

  const matchRbt = [
    {
      id: 1, 
      label: 'No Match'
    },
    {
      id: 2,
      label: 'Regular Match'
    },
    {
      id: 3, 
      label: 'Safe Harbor Match'
    },
    {
      id: 4,
      label: 'Discretionary Match'
    },
  ];

  const exclusionRbt = [
    {
      id: 1,
      label: 'Owner'
    },
    {
      id: 2,
      label: 'HCE'
    },
    {
      id: 3, 
      label: 'Non-owner HCE'
    },
    {
      id: 4,
      label: 'None'
    },
  ];
    
    const { colors } = useTheme();
    

    React.useEffect(() => {
      //Api Data
      //console.log("useEffect ====PLAN DETAILS DATA STATE ======================ROUTE========> ", route, dataState["Plan Details"]);
      console.log("USE EFFECT 401 TAB+++++++++++++++++");
      if (dataState["Plan Details"] === null || (dataState["Plan Details"] && dataState["Plan Details"].Name === 'Plan Details')){
        setPlanDetailsTab();     
      }
    }, [dataState.DetailsFetchedData]);
  
  
    const setPlanDetailsTab = () => {
      console.log('==============401K==================FETCHED DATA', DetailsFetchedData.planName);
  
      if (DetailsFetchedData && DetailsFetchedData.planName){
        console.log("has Data12"); ////edit this with dataState.DetailsFetchedData

        let User401k = DetailsFetchedData
        setTotOwnerCost(TotOwnerCost = User401k.totOwnerCost.toString());
        setTotNonOwnerCost(TotNonOwnerCost = User401k.totNonOwnerCost.toString())
        setCatchUp(CatchUp = User401k.catchUp === '1' ? 1 : 2)
        setIncludeMatch(IncludeMatch = User401k.includeMatch)
        setMatchPercent1(MatchPercent1 = User401k.matchPercent1.toString())
        setMatchLimit1(MatchLimit1 = User401k.matchLimit1.toString())
        setMatchPercent2(MatchPercent2 = User401k.matchPercent2.toString())
        setMatchLimit2(MatchLimit2 = User401k.matchLimit2.toString())
        setMatchPercent3(MatchPercent3 = User401k.matchPercent3.toString())
        setMatchLimit3(MatchLimit3 = User401k.matchLimit3.toString())
        setIsSafeHarborContrib(IsSafeHarborContrib = User401k.isSafeHarborContrib)
        setExclusions(Exclusions = User401k.exclusions)
        
      }
    }

    return(
    
    <View style= {[styles.container,{backgroundColor: colors.primary}]}>
    <View style= {styles.inputContainer}>
      <ScrollView style= {styles.ScrollContainer}>

      <View style={{marginBottom: 20}}>
        <Text style={styles.title}>Deferral %</Text>
          
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subNames}>Owner</Text>
            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0.00"
              style={[styles.textInput,{color: colors.Logintext}]}
              value={TotOwnerCost}
              //autoCapitalize="none"
              keyboardType='numeric'
              onChangeText={(val) => setTotOwnerCost(TotOwnerCost = val)}
            />
            <Text style={styles.subNames}>Non-Owner</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0.00"
              style={[styles.textInput2,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={TotNonOwnerCost}
              keyboardType='numeric'
              onChangeText={(val) => setTotNonOwnerCost(TotNonOwnerCost = val)}
            />
          </View>

        <Text style={[styles.title,{marginTop: 10}]}>Catch-Up</Text>

        <RadioButtonRN
            data={catchRbt}
            activeOpacity={2}
            initial={CatchUp}
            animationTypes={['pulse']}
            style={{paddingLeft: 10,flexDirection: 'row'}}
            textStyle={{paddingLeft: 10}}
            boxStyle={{width: 70}}
					  box={false}
            selectedBtn={(e) => setCatchUp(CatchUp = e.id)}
            circleSize={13}
            activeColor={'#333333'}
            deactiveColor={'grey'}
            textColor={'#333333'}
          />


        <Text style={[styles.title,{marginTop: 10}]}>Match %</Text>

        <RadioButtonRN
            data={matchRbt}
            activeOpacity={2}
            initial={IncludeMatch}
            animationTypes={['pulse']}
            style={{paddingLeft: 0}}
            textStyle={{paddingLeft: 10}}
            boxStyle={{width: 200}}
					  box={false}
            selectedBtn={(e) => setIncludeMatch(IncludeMatch = e.id)}
            circleSize={13}
            activeColor={'#333333'}
            deactiveColor={'grey'}
            textColor={'#333333'}
          />

          <View style={{flexDirection: 'row', marginTop: 5}}>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput,{color: colors.Logintext}]}
              value={MatchPercent1}
              //autoCapitalize="none"
              keyboardType='numeric'
              onChangeText={(val) => setMatchPercent1(MatchPercent1 = val)}
            />
            <Text style={styles.MatchNum}>% of first</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput2,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MatchLimit1}
              keyboardType='numeric'
              onChangeText={(val) => setMatchLimit1(MatchLimit1 = val)}
            />
            <Text style={styles.MatchNum}>%</Text>

          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MatchPercent2}
              keyboardType='numeric'
              onChangeText={(val) => setMatchPercent2(MatchPercent2 = val)}
            />
            <Text style={styles.MatchNum}>% of first</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput2,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MatchLimit2}
              keyboardType='numeric'
              onChangeText={(val) => setMatchLimit2(MatchLimit2 = val)}
            />
            <Text style={styles.MatchNum}>%</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MatchPercent3}
              keyboardType='numeric'
              onChangeText={(val) => setMatchPercent3(MatchPercent3 = val)}
            />
            <Text style={styles.MatchNum}>% of first</Text>

            <TextInput 
              placeholderTextColor = 'rgba(51,51,51,0.7)'
              placeholder="0"
              style={[styles.textInput2,{color: colors.Logintext}]}
              //autoCapitalize="none"
              value={MatchLimit3}
              keyboardType='numeric'
              onChangeText={(val) => setMatchLimit3(MatchLimit3 = val)}
            />
            <Text style={styles.MatchNum}>%</Text>
          </View>

        <Text style={[styles.title,{marginTop: 10}]}>3% Safe Harbor Contribution </Text>

        <View style={{flexDirection: 'row'}}>
            <CheckBox 
            style={{paddingRight: 5}}
            checkedCheckBoxColor = {'#333333'}
            uncheckedCheckBoxColor	= {colors.Logintext}
            isChecked={IsSafeHarborContrib} onClick = {()=> setIsSafeHarborContrib(IsSafeHarborContrib = !IsSafeHarborContrib)}/>
            <Text style = {{color: colors.Logintext,paddingTop: 2.5}}>Yes</Text>
        </View>
        <Text style={[styles.title,{marginTop: 10}]}>Exclusions</Text>

        <RadioButtonRN
            data={exclusionRbt}
            activeOpacity={2}
            initial={Exclusions}
            animationTypes={['pulse']}
            style={{paddingLeft: 0}}
            textStyle={{paddingLeft: 10}}
            boxStyle={{width: 200}}
					  box={false}
            selectedBtn={(e) => setExclusions(Exclusions = e.id)}
            circleSize={13}
            activeColor={'#333333'}
            deactiveColor={'grey'}
            textColor={'#333333'}
          />

        </View>
      </ScrollView>
      </View>
    </View>
  )
}
export default FOI;

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
      paddingLeft: 5,
      fontSize:12
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
    MatchNum: {
      paddingRight: 10,
      marginTop: 7,
      paddingLeft: 10,
    }
  });