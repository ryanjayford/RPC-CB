import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView,TouchableOpacity,TextInput } from 'react-native';
import{ AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';

const PlanCopy = ({navigation,route}) => {
    const [{ClassAddorEdit },dataState] = React.useContext(AuthContext);
   //console.log('checker',route.params?.CopyInfo)
    const { colors } = useTheme();
    let copy = route.params?.CopyInfo;
    const data = [
        {
          id: 1,
          label: 'Yes'
         },
         {
          id: 2,
          label: 'No'
         }
        ];
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            <Text style={styles.TitleName}>Original Plan</Text>
            <View style={styles.columnNamesContainer}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.columnNames}>Plan Name:  <Text style={styles.Copyinfo}>{copy.planName}</Text></Text>

                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.columnNames}>PLan Description: <Text style={styles.Copyinfo}>ewiueiweyiquweywqieyqwuieyqeuqew</Text></Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.columnNames}>User ID:  <Text style={styles.Copyinfo}>{copy.email}</Text></Text>
                <Text style={styles.columnNames}>Copy Plan Detail Only</Text>
                    <RadioButtonRN
                        data={data}
                        activeOpacity={1}
                        initial={2}
                        animationTypes={['pulse']}
                        style={{paddingLeft: 10,flexDirection: 'row'}}
                        textStyle={{paddingLeft: 10}}
                        boxStyle={{width: 70}}
                        box={false}
                        selectedBtn={(e) => {}}
                        circleSize={12}
                        activeColor={'#333333'}
                        deactiveColor={'grey'}
                        textColor={'#333333'}
                    />
            </View>
            <Text style={styles.TitleName}>New Plan</Text>
            <View style={styles.columnNamesContainer}>
                <Text style={styles.columnNames}>Plan Name</Text>
                <TextInput 
                    placeholderTextColor = 'rgba(51,51,51,0.7)'
                    placeholder="Name"
                    style={[styles.textInput,{color: colors.Logintext}]}
                    //autoCapitalize="none"
                    value={null}
                    keyboardType='default'
                    onChangeText={(val) => {}}
                />
                <Text style={styles.columnNames}>PLan Description</Text>
                <TextInput 
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor = 'rgba(51,51,51,0.7)'
                    placeholder="Description"
                    style={[styles.textArea,{color: colors.Logintext}]}
                    //autoCapitalize="none"
                    value={null}
                    keyboardType='default'
                    onChangeText={(val) => {}}
                />
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.columnNames}>User ID: <Text style={styles.Copyinfo}>{copy.email}</Text></Text>
            </View>

            <View style={styles.button}>
                <TouchableOpacity style={[styles.signIn,{marginRight: 2.5, marginBottom: 10}]} onPress={() => {}}>
                    <LinearGradient
                        colors={['#72be03','#397e05']} //'#72be03','#397e05'
                        style={styles.signIn}
                        start={[0, 1]} end={[1, 0]}
                    >
                        <Text style={[styles.textSign, {color:'#fff'}]}>Copy</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {borderColor: '#333333', borderWidth: 1.5,marginLeft: 2.5}]}>
                    <Text style={[styles.textSign, {color: '#333333'}]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    );
};

export default PlanCopy;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        //alignItems: 'center', 
        //justifyContent: 'center'
    },
    scroll: {
        marginTop: 5,
        marginBottom: 5,
        //paddingHorizontal: 15,
    },
    TitleName: {
        padding: 2.5,
        paddingHorizontal: 15,
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: 'lightgrey'
    },
    columnNamesContainer: {
        paddingHorizontal: 25,
    },
    textArea: {
        flex: 1,  
        textAlignVertical: 'top',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#989c9d',
    },

    columnNames: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    Copyinfo: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5,
        fontWeight: 'normal'
    },
    textInput: {
        flex: 1,  
        height: 30,
        borderBottomWidth: 1.5,
        borderBottomColor: '#989c9d',
        marginBottom: 5,
    },
    button: {
        //backgroundColor: 'grey',
        //marginTop: 10,
        margin: 10,
        flexDirection: 'column'

    },
    signIn: {
        flex: 1,

        height: 50,
        justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 5
        
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});