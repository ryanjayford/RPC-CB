import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Modal,Dimensions,Platform } from 'react-native';
import{ AuthContext } from '../components/context';
//import RadioButtonRN from 'radio-buttons-react-native';
//import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
//import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window');

const AlertModal = ({ navigation }) => {

  //let [Hide, setHide] = React.useState(true);
  const { colors } = useTheme();
  const [{setScreen},dataState] = React.useContext(AuthContext);
    //console.log('dataState',dataState.plan)
    
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
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.header,{padding: 5}]}>Census Upload</Text>
                        <Text style={[styles.message,{padding: 5}]}>Are you sure you want to upload the new census template?</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={[styles.signIn,{marginRight: 2.5}]} onPress={() => {[navigation.goBack(), 
                            setTimeout(() => {
                                setScreen({Name: 'Census', Method: 'PickAndUpload'})
                            }, 800)
                        ]}}>
                            <Text style={[styles.textSign, {color:'white'}]}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {marginLeft: 2.5}]}>
                            <Text style={[styles.textSign, {color: 'white'}]}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
       
    )
}

export default AlertModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(51,51,51, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Modalcontainer: {
        //flex: 1,
        //height: height/5,
        width: '80%',
        borderRadius: 5,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    header: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        alignContent: 'center',
    },
    message: {
        fontSize: 16,
        color: 'grey',
        //fontWeight: 'bold',
        alignContent: 'center',
    },
    button: {
        //backgroundColor: 'grey',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    signIn: {
        //flex: 1,
        padding: 10,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: "#72be03",
        borderRadius: 5
        
    },
    textSign: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  
  });