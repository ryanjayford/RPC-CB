import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,Dimensions,ScrollView,TextInput } from 'react-native';
import{ AuthContext } from '../components/context';
import RadioButtonRN from 'radio-buttons-react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
//import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');

const CopyModal = ({ navigation,route }) => {
    let copy = route.params?.CopyInfo;
    console.log('OpenModal', copy)
  //let [Hide, setHide] = React.useState(true);
  const { colors } = useTheme();
  const [{},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)
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
    return(
       
        <Modal
            animated={true}
            //ref={ref => (this._modal = ref)}
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {}}  
        >
       
        <View style ={styles.ModalBackground}>
            <View style ={styles.Modalcontainer}>

            <View style={styles.Colorcontainer}>
                <View style={styles.headercontainer}>
                    <Text style={[styles.header,{padding: 5}]}>Plan Duplication</Text>
                    <TouchableOpacity style={{ padding: 5, borderRadius: 10}} onPress={() => {navigation.goBack()}}>
                        <Text style={styles.header}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scroll}>
                <Text style={styles.TitleName}>Original Plan</Text>
                <View style={styles.columnNamesContainer}>
                    <Text style={styles.columnNames}>Plan Name: {copy.planName}</Text>
                    
                    <Text style={styles.columnNames}>PLan Description: </Text>
                    <Text style={styles.columnNames}>User ID: {copy.email}</Text>
                       
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
                            placeholderTextColor = 'rgba(51,51,51,0.7)'
                            placeholder="Description"
                            style={[styles.textInput,{color: colors.Logintext}]}
                            //autoCapitalize="none"
                            value={null}
                            keyboardType='default'
                            onChangeText={(val) => {}}
                        />
                    <Text style={styles.columnNames}>User ID: {copy.email}</Text>
                       
                </View>

                <View style={styles.button}>
                
                    <TouchableOpacity style={[styles.signIn,{marginRight: 2.5}]} onPress={() => {}}>
                        <LinearGradient
                            colors={['#00BFFF','#00BFFF']} //'#72be03','#397e05'
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
        </View>
    
        </Modal>
       
    )
}

export default CopyModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(51,51,51, 0.9)'
    },
    Modalcontainer: {
        //flex: 1,
        height: height/1.5,
        //borderRadius: 5,
        //marginBottom: 150,
        //marginTop: 150,
        marginRight: 30,
        marginLeft: 30,
        top: '10%',
        //padding: 20,
        //backgroundColor: 'rgba(51,51,51,1)',
        backgroundColor: 'white',
       //justifyContent: 'center'
    },
    Colorcontainer: {
        padding: 5,
        backgroundColor: '#00BFFF',
        //justifyContent: 'center'
        textAlign: 'center'
        
    },
    headercontainer: {
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',      
        justifyContent: 'space-between',
        
    },
    header: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
        alignContent: 'center',
    },
    scroll: {
        //marginTop: 5,
        marginBottom: 5,
        //paddingHorizontal: 15,
    },
    textInput: {
        flex: 1,  
        height: 40,
        borderBottomWidth: 1.5,
        borderBottomColor: '#989c9d',
    },
    TitleName: {
        padding: 2.5,
        paddingHorizontal: 15,
        color: 'grey',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: 'lightgrey'
    },
    columnNamesContainer: {
        paddingHorizontal: 25,
    },

    columnNames: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    Copyinfo: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5,
        //fontWeight: 'bold'
    },
    button: {
        //backgroundColor: 'grey',
        //marginTop: 10,
        margin: 10,
        flexDirection: 'row'

    },
    signIn: {
        flex: 1,

        height: 40,
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