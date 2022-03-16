import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView,TextInput,Dimensions } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
//import CheckBox from 'react-native-check-box';
import RadioButtonRN from 'radio-buttons-react-native';
import Checkbox from 'expo-checkbox';

const {width,height} = Dimensions.get('window');

const FOI = ({ navigation }) => {
    const [{},dataState] = React.useContext(AuthContext);
    const DefaultPlan = dataState.DefaultPlan;
    let Details = dataState.Details;
    let DetailsFetchedData = dataState.DetailsFetchedData;

    
   //console.log('My Catchup ========>', dataState.DetailsFetchedData.catchUp)    
    //console.log('DefaultPlan------->',DefaultPlan)
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
    let [SafeHarbor3Pcnt, setSafeHarbor3Pcnt] = React.useState(DefaultPlan.safeHarbor3Pcnt  === 3 ? 1:2);
    let [Exclusions, setExclusions] = React.useState(DefaultPlan.exclusions == 0 ? 4:1); 

    //changing value of loginstate details
    Details.totOwnerCost = TotOwnerCost ? TotOwnerCost.toString() : "0";
    Details.totNonOwnerCost = TotNonOwnerCost ? TotNonOwnerCost.toString() : "0";
    Details.catchUp = CatchUp === undefined ? 'Y': CatchUp === 1? 'Y': 'N';

    if(IsSafeHarborContrib === true && IncludeMatch === 3)//IsSafeHarborContrib is true and Discretionary Match is selected
    {
      Details.includeMatch = 3;//Discretionary Match
    }
    else if(IsSafeHarborContrib === true && IncludeMatch === 2)//IsSafeHarborContrib is true and Regular Match is selected
    {
      Details.includeMatch = 1;//Regular Match
    }
    else if(IsSafeHarborContrib === true && IncludeMatch === 1)//IsSafeHarborContrib is true and no match is selected
    {
      Details.includeMatch = 0;//No Match
    }
    else if(IsSafeHarborContrib === false)//IsSafeHarborContrib is false
    {
      switch(IncludeMatch) {
        case 1://No Match
          Details.includeMatch = 0;
          break;
        
        case 2://Regular Match 
          Details.includeMatch = 1;
          break;
   
        case 3://Safe Harbor Match
          Details.includeMatch = 2;
          break;
   
        case 4://Discretionary Match
          Details.includeMatch = 3;
          break;
   
        default:
          Details.includeMatch = null;
          //Details.includeMatch = IncludeMatch === undefined ? null : IncludeMatch;
        }
    }
    Details.matchPercent1 = MatchPercent1 ? MatchPercent1.toString() : "0";
    Details.matchLimit1 = MatchLimit1 ? MatchLimit1.toString() : "0";
    Details.matchPercent2 = MatchPercent2 ? MatchPercent2.toString() : "0";
    Details.matchLimit2 = MatchLimit2 ? MatchLimit2.toString() : "0";
    Details.matchPercent3 = MatchPercent3 ? MatchPercent3.toString() : "0";
    Details.matchLimit3 = MatchLimit3 ? MatchLimit3.toString() : "0";
    Details.isSafeHarborContrib = IsSafeHarborContrib;
    Details.safeHarbor3Pcnt = SafeHarbor3Pcnt === 1 ? 3 : 4;

    switch(Exclusions) {
      case 1://Owner in mobile
      Details.exclusions = 3;
        break;
      
      case 2://HCE in mobile
      Details.exclusions = 2;
        break;

      case 3://Non-owner HCE in mobile
      Details.exclusions = 1;
        break;

      case 4://None in mobile
      Details.exclusions = 0;
        break;

      default:
        Details.includeMatch = null;
    }
    
   
    
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

  const SHRbt = [
    {
      id: 1, 
      //text: 'Yes', 
      label: '3%'
    },
    {
      id: 2,
      //text: 'No',
      label: '4%'
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
  /*
  const SubmatchRbt = [
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
      label: 'Discretionary Match'
    },
  ];
  */
  
 
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
    //includeMatchArray
    let [matchChoice, setmatchChoice] = React.useState(matchRbt); 

    React.useEffect(() => {
      //Api Data
      //console.log("useEffect ====PLAN DETAILS DATA STATE ======================ROUTE========> ", route, dataState["Plan Details"]);
     //console.log("USE EFFECT 401 TAB+++++++++++++++++");
      if (dataState["Plan Details"] === null || (dataState["Plan Details"] && dataState["Plan Details"].Name === 'Plan Details')){
        setPlanDetailsTab();     
      }
    }, [dataState.DetailsFetchedData]);
  
  
    const setPlanDetailsTab = () => {
     //console.log('==============401K==================FETCHED DATA', DetailsFetchedData.planName);
      
      if (DetailsFetchedData && DetailsFetchedData.planName){
       //console.log("has Data"); ////edit this with dataState.DetailsFetchedData

        let User401k = DetailsFetchedData
        setTotOwnerCost(TotOwnerCost = User401k.totOwnerCost.toString());
        setTotNonOwnerCost(TotNonOwnerCost = User401k.totNonOwnerCost.toString());
        setCatchUp(CatchUp = User401k.catchUp === 'Y' ? 1 : 2);
        /*
        if(User401k.isSafeHarborContrib === true && User401k.includeMatch === 4)// checking User401k.includeMatch
        {
          setIncludeMatch(IncludeMatch = 3);
        }
        else{
          setIncludeMatch(IncludeMatch = User401k.includeMatch);
        }*/

        if(User401k.isSafeHarborContrib === true && User401k.includeMatch === 3)//IsSafeHarborContrib is true and Discretionary Match is selected
        {
          setIncludeMatch(IncludeMatch = 3);
        }
        else if(User401k.isSafeHarborContrib === true && User401k.includeMatch === 1)//IsSafeHarborContrib is true and Regular Match is selected
        {
          setIncludeMatch(IncludeMatch = 2);
        }
        else if(User401k.isSafeHarborContrib === true && User401k.includeMatch === 0)//IsSafeHarborContrib is true and no match is selected
        {
          setIncludeMatch(IncludeMatch = 1);
        }
        else if(IsSafeHarborContrib === false)//IsSafeHarborContrib is false
        {
          switch(User401k.includeMatch) {
            case 0://No Match in website
            setIncludeMatch(IncludeMatch = 1);
              break;
            
            case 1://Regular Match in website
            setIncludeMatch(IncludeMatch = 2);
              break;
      
            case 2://Safe Harbor Match in website
            setIncludeMatch(IncludeMatch = 3);
              break;
      
            case 3://Discretionary Match in website
            setIncludeMatch(IncludeMatch = 4);
              break;
      
            default:
              Details.includeMatch = null;
          }
        }


        setMatchPercent1(MatchPercent1 = User401k.matchPercent1.toString());
        setMatchLimit1(MatchLimit1 = User401k.matchLimit1.toString());
        setMatchPercent2(MatchPercent2 = User401k.matchPercent2.toString());
        setMatchLimit2(MatchLimit2 = User401k.matchLimit2.toString());
        setMatchPercent3(MatchPercent3 = User401k.matchPercent3.toString());
        setMatchLimit3(MatchLimit3 = User401k.matchLimit3.toString());
        setIsSafeHarborContrib(IsSafeHarborContrib = User401k.isSafeHarborContrib);

        switch(User401k.exclusions) {
          case 3://Owner in website
            setExclusions(Exclusions = 1);
            break;
          
          case 2://HCE in website
            setExclusions(Exclusions = 2);
            break;
    
          case 1://Non-owner HCE in website
            setExclusions(Exclusions = 3);
            break;
    
          case 0://None in website
            setExclusions(Exclusions = 4);
            break;
    
          default:
            //Details.includeMatch = null;
        }
        //setExclusions(Exclusions = User401k.exclusions);
        
        //IsSafeHarborContrib if true or false
        SetIncludeMatchAarry();
      }
    }

    const SetIncludeMatchAarry = () => {
      if(IsSafeHarborContrib === true)
        {
          setmatchChoice(matchChoice =  [
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
              label: 'Discretionary Match'
            },
          ])
          setMatchPercent1(MatchPercent1 = '0')
          setMatchLimit1(MatchLimit1 = '0')
          setMatchPercent2(MatchPercent2 = '0')
          setMatchLimit2(MatchLimit2 = '0')
          setMatchPercent3(MatchPercent3 = '0')
          setMatchLimit3(MatchLimit3 = '0')
        }
        else
        {
          //IsSafeHarborContrib = false
          setmatchChoice(matchChoice =  [
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
          ])
        }
    }

    const CurrentMatch = (id) => {
      if(id !== IncludeMatch)
      {
        if(id === 3 && IsSafeHarborContrib === false)
        {
          //console.log('id ', id)
          setIncludeMatch(IncludeMatch = id);
          setMatchPercent1(MatchPercent1 = '100');
          setMatchLimit1(MatchLimit1 = '3');
          setMatchPercent2(MatchPercent2 = '50');
          setMatchLimit2(MatchLimit2 = '2');
          setMatchPercent3(MatchPercent3 = '0');
          setMatchLimit3(MatchLimit3 = '0');

        }
        else
        {
          //console.log('id 2 ', id)
          setIncludeMatch(IncludeMatch = id);
          setMatchPercent1(MatchPercent1 = '0');
          setMatchLimit1(MatchLimit1 = '0');
          setMatchPercent2(MatchPercent2 = '0');
          setMatchLimit2(MatchLimit2 = '0');
          setMatchPercent3(MatchPercent3 = '0');
          setMatchLimit3(MatchLimit3 = '0');
        }
      }
    }

    const Is3Percentcheck = () => {
      setIsSafeHarborContrib(IsSafeHarborContrib = !IsSafeHarborContrib);
      if(IsSafeHarborContrib === true && IncludeMatch === 3) //when 3% is check and match is 3
      {
        setmatchChoice(matchChoice =  [
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
            label: 'Discretionary Match'
          },
        ])
        setIncludeMatch(IncludeMatch = 1);
        setMatchPercent1(MatchPercent1 = '0')
        setMatchLimit1(MatchLimit1 = '0')
        setMatchPercent2(MatchPercent2 = '0')
        setMatchLimit2(MatchLimit2 = '0')
        setMatchPercent3(MatchPercent3 = '0')
        setMatchLimit3(MatchLimit3 = '0')
       // alert('Safe Harbor Match is deactivated')
      }
      else if(IsSafeHarborContrib === true && IncludeMatch === 4)// 3% is check and match is 4
      {
        setmatchChoice(matchChoice =  [
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
            label: 'Discretionary Match'
          },
        ])
        setIncludeMatch(IncludeMatch = 3);
        setMatchPercent1(MatchPercent1 = '0')
        setMatchLimit1(MatchLimit1 = '0')
        setMatchPercent2(MatchPercent2 = '0')
        setMatchLimit2(MatchLimit2 = '0')
        setMatchPercent3(MatchPercent3 = '0')
        setMatchLimit3(MatchLimit3 = '0')
       // alert('Safe Harbor Match is deactivated')
      }
      else if(IsSafeHarborContrib === false && IncludeMatch === 3)// 3% is not check and match is 3
      {
        setmatchChoice(matchChoice =   [
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
        ])
        setIncludeMatch(IncludeMatch = 4);
        setMatchPercent1(MatchPercent1 = '0')
        setMatchLimit1(MatchLimit1 = '0')
        setMatchPercent2(MatchPercent2 = '0')
        setMatchLimit2(MatchLimit2 = '0')
        setMatchPercent3(MatchPercent3 = '0')
        setMatchLimit3(MatchLimit3 = '0')
       // alert('Safe Harbor Match is deactivated')
      }
      else if(IsSafeHarborContrib === true) // when match is not 3 or 4 ... array will only change
      {
        setmatchChoice(matchChoice =  [
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
            label: 'Discretionary Match'
          },
        ])
        //setIncludeMatch(IncludeMatch = 3);
        setMatchPercent1(MatchPercent1 = '0')
        setMatchLimit1(MatchLimit1 = '0')
        setMatchPercent2(MatchPercent2 = '0')
        setMatchLimit2(MatchLimit2 = '0')
        setMatchPercent3(MatchPercent3 = '0')
        setMatchLimit3(MatchLimit3 = '0')
       // alert('Safe Harbor Match is deactivated')
      }
      else // default
      {
        setmatchChoice(matchChoice =  [
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
        ])
        if(IncludeMatch === 3)
        {
          setIncludeMatch(IncludeMatch = 1);
        }
      }
    }

    return(
    
    <View style= {[styles.container,{backgroundColor: colors.primary}]}>
    <View style= {styles.inputContainer}>
      <ScrollView style= {styles.ScrollContainer}>

        <View style={{marginBottom: 20, marginTop: height > 800 ? 20 : 0}}>
          <Text style={styles.title}>Deferral %</Text>
            
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subNames}>Owner</Text>
              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0.00"
                  style={[styles.textInput,{color: colors.Logintext}]}
                  value={TotOwnerCost}
                  //autoCapitalize="none"
                  keyboardType='numeric'
                  onChangeText={(val) => setTotOwnerCost(TotOwnerCost = val)}
                />
              </View>
              <Text style={styles.subNames}>Non-Owner</Text>
              <View style={{flex: 1}}>
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
              data={matchChoice}
              activeOpacity={2}
              initial={IncludeMatch}
              animationTypes={['pulse']}
              style={{paddingLeft: 0}}
              textStyle={{paddingLeft: 10}}
              boxStyle={{width: 200}}
              box={false}
              selectedBtn={(e) => CurrentMatch(e.id)}
              circleSize={13}
              activeColor={'#333333'}
              deactiveColor={'grey'}
              textColor={'#333333'}
            />

            <View style={{flexDirection: 'row', marginTop: 5}}>

              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0"
                  style={[styles.textInput,{color: colors.Logintext}]}
                  value={MatchPercent1}
                  //autoCapitalize="none"
                  keyboardType='numeric'
                  onChangeText={(val) => setMatchPercent1(MatchPercent1 = val)}
                />
              </View>
              <Text style={styles.MatchNum}>% of first</Text>
              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0"
                  style={[styles.textInput2,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={MatchLimit1}
                  keyboardType='numeric'
                  onChangeText={(val) => setMatchLimit1(MatchLimit1 = val)}
                />
              </View>
              <Text style={styles.MatchNum}>%</Text>

            </View>

            <View style={{flexDirection: 'row'}}>

              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0"
                  style={[styles.textInput,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={MatchPercent2}
                  keyboardType='numeric'
                  onChangeText={(val) => setMatchPercent2(MatchPercent2 = val)}
                />
              </View>
              <Text style={styles.MatchNum}>% of first</Text>
              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0"
                  style={[styles.textInput2,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={MatchLimit2}
                  keyboardType='numeric'
                  onChangeText={(val) => setMatchLimit2(MatchLimit2 = val)}
                />
              </View>
              <Text style={styles.MatchNum}>%</Text>

            </View>

            <View style={{flexDirection: 'row'}}>

              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0"
                  style={[styles.textInput,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={MatchPercent3}
                  keyboardType='numeric'
                  onChangeText={(val) => setMatchPercent3(MatchPercent3 = val)}
                />
              </View>
              <Text style={styles.MatchNum}>% of first</Text>
              <View style={{flex: 1}}>
                <TextInput 
                  placeholderTextColor = 'rgba(51,51,51,0.7)'
                  placeholder="0"
                  style={[styles.textInput2,{color: colors.Logintext}]}
                  //autoCapitalize="none"
                  value={MatchLimit3}
                  keyboardType='numeric'
                  onChangeText={(val) => setMatchLimit3(MatchLimit3 = val)}
                />
              </View>
              <Text style={styles.MatchNum}>%</Text>
              
            </View>

          <Text style={[styles.title,{marginTop: 10}]}>3% Safe Harbor Contribution </Text>

          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Checkbox
              style={styles.checkStyle}
              value={IsSafeHarborContrib}
              onValueChange={()=> Is3Percentcheck()}
              color={IsSafeHarborContrib ? "#333333" : colors.Logintext}
            />
            <Text style = {{color: colors.Logintext,marginRight: 10}}>Non-elective</Text>
           
            <RadioButtonRN
              data={SHRbt}
              activeOpacity={2}
              initial={SafeHarbor3Pcnt}
              animationTypes={['pulse']}
              style={{paddingLeft: 10, flexDirection: 'row', marginBottom: 8 }}
              textStyle={{paddingLeft: 10}}
              boxStyle={{width: 70}}
              box={false}
              selectedBtn={(e) => {setSafeHarbor3Pcnt(SafeHarbor3Pcnt = e.id)}}
              circleSize={13}
              activeColor={'#333333'}
              deactiveColor={'grey'}
              textColor={'#333333'}
            />

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
      flex: 1,
      marginTop: 10,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    ScrollContainer: {
      marginTop: 20,
      paddingHorizontal: height > 800 ? 20 : 16,
    },
    title: {
      fontSize: height > 800 ? 18 : 14,
      fontWeight: 'bold',
      marginBottom: 7
    },
    subNames: {
      paddingRight: 10,
      marginTop: 7,
      paddingLeft: 5,
      fontSize: height > 800 ? 15 : 12
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
      fontSize: height > 800 ? 18 : 15
    },
    checkStyle: {
        margin: 8,
    }
  });