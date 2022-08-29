import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, TextInput } from 'react-native';
import{ AuthContext } from './context';
const {width,height} = Dimensions.get('window');
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Settings from '../settings.json';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
const baseURL = Settings.domain;

const SearchModal = ({ navigation }) => {
    const [{IsSearch},dataState] = React.useContext(AuthContext);
    React.useEffect(() => {
        //GetInterestRate();
    }, []);

    const { colors } = useTheme();

    const filterData = [
        {label: 'Last Modified', value: 'LM'},
        {label: 'Individual User', value: 'IU'},
        {label: 'Company Name', value: 'CN'}
    ];
    const lastModifiedData = [
        {label: 'In 24 hours', value: '0'},
        {label: 'In 48 hours', value: '1'},
        {label: 'This Week', value: '2'},
        {label: 'All plans', value: '3'},
    ];
    const individualUserData = [
        {label: 'Test user1', value: '12'},
        {label: 'Test user2', value: '123'},
        {label: 'Test user3', value: '1234'}
    ];

    let [filterDefault, setfilterDefault] = React.useState('LM');
    let [lastModifiedDefault, setlastModifiedDefault] = React.useState('0');
    let [individualUserDefault, setindividualUserDefault] = React.useState('12');

    let [filterDrop, setfilterDrop] = React.useState(false); 
    //let [filterDropMargin, setfilterDropMargin] = React.useState(10); 

    let [SelectedDrop, setSelectedDrop] = React.useState(false); 
    //let [SelectedDropMargin, setSelectedDropMargin] = React.useState(10);
    let [SearchVal, setSearchVal] = React.useState("");
    

    const DropdownController = (DropSelected) => {
        if(DropSelected === 1)
        {
            //setfilterDropMargin(filterDropMargin = 150)
            setfilterDrop(filterDrop = true)

            //setSelectedDropMargin(SelectedDropMargin = 10)
            setSelectedDrop(SelectedDrop = false)
        }
        else if(DropSelected === 2)
        {
            //setfilterDropMargin(filterDropMargin = 10)
            setfilterDrop(filterDrop = false)

            //setSelectedDropMargin(SelectedDropMargin = 160)
            setSelectedDrop(SelectedDrop = true)
        }
    };

    const setDropData = (value) => {
        if(value == 'IU'){
            return individualUserData;
        }
        return lastModifiedData;
    }

    const OnSearch = (value) => {
        setSearchVal(SearchVal = value);
    }

    const onSend = async () => {
        let val = "";
        if(filterDefault == 'LM'){
            val = lastModifiedDefault;
        }
        else if(filterDefault == 'IU'){
            val = individualUserDefault;
        }
        else{//Cn
            val = SearchVal;
        }

        await IsSearch(filterDefault, val);
        navigation.goBack();
    }

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
                <LinearGradient 
                    colors={[colors.linearlight,colors.linearDark]} 
                    style ={styles.Modalcontainer}
                >
                    <View style={[styles.greencontainer, {backgroundColor: colors.textGreen }]}>
                        <View style={styles.headercontainer}>
                            <Text style={[styles.header,{padding: 5}]}>Search Filter</Text>
                            <TouchableOpacity style={{ padding: 5, borderRadius: 10}} onPress={() => navigation.goBack()}>
                                <Text style={styles.header}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {{padding: 20}}>
                        <DropDownPicker
                            items={filterData}
                            //isVisible={filterDrop}
                            defaultValue={filterDefault}             
                            zIndex={6}
                            placeholder=""
                            placeholderStyle={{color: colors.Logintext}}
                            activeLabelStyle={{color: 'green'}}
                            labelStyle={{color: colors.Logintext}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            style={{borderWidth: 1}}
                            dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                            containerStyle={{ height: 45, marginBottom: 10/*filterDropMargin*/ }}
                            arrowColor='rgba(51,51,51,0.5)'
                            onOpen={() => {DropdownController(1)}}
                            //onClose={() => {[setfilterDropMargin(filterDropMargin = 10)]}}
                            onChangeItem={(item) => setfilterDefault(filterDefault = item.value)}
                        />
                        
                        {filterDefault == 'CN' ?
                            <View style={styles.inputContainer}>
                                <Icon style={styles.inputIcon} name="account-search" size={25} color="grey" />
                                <TextInput style={styles.inputs}
                                    //ref={'txtSearch'}
                                    value={SearchVal}
                                    placeholder="Search"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(value) => OnSearch(value)}
                                />
                            </View>
                            :
                            <DropDownPicker
                                items={setDropData(filterDefault)}
                                defaultValue={filterDefault == 'IU' ? individualUserDefault : lastModifiedDefault} 
                                isVisible={SelectedDrop}            
                                zIndex={5}
                                placeholder=""
                                placeholderStyle={{color: colors.Logintext}}
                                activeLabelStyle={{color: 'green'}}
                                labelStyle={{color: colors.Logintext}}
                                itemStyle={{justifyContent: 'flex-start'}}
                                style={{borderWidth: 1}}
                                dropDownStyle={{backgroundColor: '#fafafa',borderWidth: 1}}
                                containerStyle={{ height: 45, marginBottom: 10/*SelectedDropMargin*/ }}
                                arrowColor='rgba(51,51,51,0.5)'
                                onOpen={() => {[DropdownController(2)]}}
                                //onClose={() => {[setSelectedDropMargin(SelectedDropMargin = 10)]}}
                                onChangeItem={(item) => filterDefault == 'IU' ? setindividualUserDefault(individualUserDefault = item.value) : setlastModifiedDefault(lastModifiedDefault = item.value)}
                            />
                        }

                        <TouchableOpacity onPress={() => onSend()} style={styles.signIn}>
                            <Text style={styles.textSign}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
       
    )
}



export default SearchModal;

const styles = StyleSheet.create({
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(51,51,51, 0.8)',
        justifyContent: 'center',
        alignItems: "center",
    },

    Modalcontainer: {
        maxWidth: '80%',
        width: 700,
        borderRadius: 5,
    },

    header: {
        color: 'white',
        fontSize: 18,
        //flexDirection: 'row',
        fontWeight: 'bold',
        alignContent: 'center',
        //marginBottom: 5,
    },
   
    greencontainer: {
        padding: 10,
        borderRadius: 5,
        textAlign: 'center'
        
    },
    headercontainer: {
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 45,
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 10, 
    },
    inputs:{
        paddingLeft: 10,
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        zIndex: 10
    },
    inputIcon:{
        marginLeft:15,
        justifyContent: 'center'
    },

    signIn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#33333a',
        padding: 10
    },

    textSign: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    
  });