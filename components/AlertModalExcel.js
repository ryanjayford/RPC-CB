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

           
                <View style={styles.headercontainer}>
                    <Text style={[styles.header,{padding: 5}]}>Census Upload</Text>
                    <Text style={[styles.message,{padding: 5}]}>Are you sure you want to upload New Census?</Text>
                </View>
           
                
                <View style={styles.button}>
                
                    <TouchableOpacity style={[styles.signIn,{marginRight: 2.5}]} onPress={() => {[navigation.goBack(), 
                        setTimeout(() => {
                            setScreen({Name: 'Census', Method: 'PickAndUpload'})
                        }, 800)
                    ]}}>
                        <View style={styles.signIn}>
                            <Text style={[styles.textSign, {color:'#333333'}]}>Yes</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, {marginLeft: 2.5}]}>
                        <Text style={[styles.textSign, {color: '#333333'}]}>No</Text>
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
        height: height/5,
        width: width/1.2,
        borderRadius: 5,
        //marginBottom: Platform.OS === 'ios' ? height/2.4 : height/2.52,
       // marginTop: Platform.OS === 'ios' ? height/2.4 : height/2.52,
        //marginRight: 30,
        //marginLeft: 30,
        //top: '10%',
        //padding: 20,
        //backgroundColor: 'rgba(51,51,51,1)',
        backgroundColor: 'white',
       //justifyContent: 'center'
    },
    headercontainer: {
        marginLeft: 5,
        marginRight: 5,   
        flexDirection: 'column',
        padding: 5,
        textAlign: 'center'
    },
    header: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold',
        alignContent: 'center',
    },
    message: {
        fontSize: 15,
        color: 'grey',
        //fontWeight: 'bold',
        alignContent: 'center',
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
   
    Copyinfo: {
        //paddingHorizontal: 25,
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5,
        //fontWeight: 'bold'
    },
    button: {
        //backgroundColor: 'grey',
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    signIn: {
        //flex: 1,
        width: 40,
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