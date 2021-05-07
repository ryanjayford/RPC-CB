import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity,Image, ScrollView } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {LinearGradient} from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../../components/context';
import * as ImagePicker from 'expo-image-picker'

const {width,height} = Dimensions.get('window');

const SettingsScreen = ({navigation}) => {
    const [{ toggleTheme }, dataState] = React.useContext(AuthContext);
    let [Logo, setLogo] = React.useState(null);
    const catchRbt = [
      {
        id: 1,  //'I'
        //text: 'Yes', 
        label: 'Set Individual Logo'
      },
      {
        id: 2, //'G'
        //text: 'No',
        label: 'Set Group Logo'
      },
    ];
    const emails = [
        {label: 'USA', value: 'usa'},
        {label: 'UK', value: 'uk'},
        {label: 'France', value: 'france'},
    ]
    const _pickLogo = async() => {
      let CameraRollStatus = await ImagePicker.requestCameraRollPermissionsAsync()
      if(CameraRollStatus.status === 'granted')
      {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          aspect: [3, 3.5]
        })
        
        if(!result.cancelled) {
          setLogo(Logo = result.uri);
        }
      }
    }
    return (
      <LinearGradient 
        colors={['#eeecc5','#fcfdf8']}
        style = {styles.container}
      >  
        <View style={styles.header}>
          <Text style={styles.title}>Setup Report Logo</Text>
        </View>
        <ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          <Text style={[styles.subtitle, {marginTop: 20}]}>Select Logo Category:</Text>
          <RadioButtonRN
              data={catchRbt}
              activeOpacity={2}
              initial={1}
              animationTypes={['pulse']}
              style={{paddingLeft: 10,flexDirection: 'row'}}
              textStyle={{paddingLeft: 10}}
              boxStyle={{width: 150}}
              box={false}
              selectedBtn={(e) => {/*setCatchUp(CatchUp = e.id)*/}}
              circleSize={13}
              activeColor={'green'}
              deactiveColor={'grey'}
              textColor={'#333333'}
            />
            <Text style={[styles.subtitle,{marginTop: 12}]}>Select User:</Text>
            <DropDownPicker
                items={emails}
                defaultValue={'uk'}             
                zIndex={10}
                placeholder=""
                placeholderStyle={{color: 'grey'}}
                activeLabelStyle={{color: 'green'}}
                labelStyle={{color: 'grey'}}
                itemStyle={{justifyContent: 'flex-start'}}
                style={{borderWidth: 1}}
                dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                containerStyle={{ height: 38, marginTop: 12, marginBottom: 12}}
                arrowColor='rgba(51,51,51,0.5)'
                onChangeItem={item => {/*setYearOfParticipationForNRA(YearOfParticipationForNRA = item.value)*/}}
            />
            <Text style={styles.subtitle}>Upload Logo Image:</Text>

            <View style={styles.button}>
                <View style={{ padding: 20}}>
                  { Logo !== null ?
                    <Image source={{ uri: Logo }} style={{ width: height > 800 ? 500 : 250, height: height > 800 ? 500 : 250 }}/> :
                    <Image source={require("../../assets/user.jpg")} style={{ width: height > 800 ? 500 : 250, height: height > 800 ? 500 : 250 }} />
                  }
                </View>
                <TouchableOpacity style={[styles.signIn, {backgroundColor: '#333333'}]} onPress={() => {_pickLogo()}}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>{'Upload Logo'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {marginTop: 15 }]}>
                    <LinearGradient
                        colors={['#72be03','#397e05']} //'#72be03','#397e05'
                        style={styles.signIn}
                        start={[0, 1]} end={[1, 0]}
                    >
                      <Text style={[styles.textSign, {color: 'white'}]}>Upload</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </LinearGradient>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //alignItems: 'center', 
    //justifyContent: 'center'
  },
  header: {
    backgroundColor: 'green',
    padding: 15
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    marginTop: height > 800 ? 30 : 10
  },
  signIn: {
      width: '100%',
      marginTop: height > 800 ? 10 : 0,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 15
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },

});
