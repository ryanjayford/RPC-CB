import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
const {width,height} = Dimensions.get('window')

const slideUp = {
    from: {
      width: width,
      height: height*1.95,
    },
    to: {
      width: width,
      height: height/2.5,
    },
  };

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        firstname: '',
        lastname: '',
        username: '',
        phone:'',
        password: '',
        confirm_password: '',
        promocode:'',
        check_firstNameInputChange: false,
        check_lastNameInputChange: false,
        check_userNameInputChange: false,
        check_phoneInputChange: false,
        check_promoCodeInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const { colors } = useTheme();

    const textInputChange = (val, field) => {
        if( val.length !== 0 ) {
            switch(field) {
                case 'firstname':
                    // code block
                    setData({
                        ...data,
                        firstname: val,
                        check_firstNameInputChange: true
                    });
                    break;
                case 'lastname':
                    // code block
                    setData({
                        ...data,
                        lastname: val,
                        check_lastNameInputChange: true
                    });
                    break;
                case 'username':
                    // code block
                    setData({
                        ...data,
                        username: val,
                        check_userNameInputChange: true
                    });
                    break;
                case 'phone':
                    // code block
                    setData({
                        ...data,
                        phone: val,
                        check_phoneInputChange: true
                    });
                break;
                case 'promocode':
                    // code block
                    setData({
                        ...data,
                        promocode: val,
                        check_promoCodeInputChange: true
                    });
                    break;
                default:
                  // code block
            }
        } else {
            switch(field) {
                case 'firstname':
                    // code block
                    setData({
                        ...data,
                        firstname: val,
                        check_firstNameInputChange: false
                    });
                    break;
                case 'lastname':
                    // code block
                    setData({
                        ...data,
                        lastname: val,
                        check_lastNameInputChange: false
                    });
                    break;
                case 'username':
                    // code block
                    setData({
                        ...data,
                        username: val,
                        check_userNameInputChange: false
                    });
                    break;
                case 'phone':
                    // code block
                    setData({
                        ...data,
                        phone: val,
                        check_phoneInputChange: false
                    });
                break;
                case 'promocode':
                    // code block
                    setData({
                        ...data,
                        promocode: val,
                        check_promoCodeInputChange: false
                    });
                    break;
                default:
                  // code block
            }
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={[styles.container, {backgroundColor: colors.accent}]}>
          <StatusBar barStyle="light-content"/>
          <View style = {styles.logocontainer}>
            
            <View style = {styles.height}>
                <Animatable.Image 
                    animation='bounceIn'
                    duration= {2000}
                style = {styles.logo} source = {require('../assets/logo.png')} />
                
                <Animatable.Text
                    animation='bounceIn'
                    duration= {2000}
                style={styles.text_sub}>Free 7-day trial for first-time users</Animatable.Text>
                <Animatable.Text 
                    animation='bounceIn'
                    duration= {2000}
                style={styles.text_header}>Register Now!</Animatable.Text>
            
            </View>

            <Animatable.View  
                animation= {slideUp}
                duration= {1000}
                direction="reverse"
                delay= {500}
            style = {{ position: 'absolute'}}  >
                <LinearGradient 
                    colors={['#397e05','#72be03']}
                    style = {styles.header}         
                    >
                </LinearGradient>
            </Animatable.View>
        </View>
        


        <Animatable.View 
            animation="fadeInUpBig"
            delay= {1000}
            style={styles.footer}
        >
            <ScrollView>
            
            <Text style={[styles.text_footer,{color: colors.Logintext}]}>First Name</Text>
            <View style={[styles.action,{borderColor: colors.Logintext}]}>
                <FontAwesome 
                    name="user-o"
                    color={colors.Logintext}
                    size={20}
                />
                <TextInput 
                    placeholderTextColor = {colors.placeholder}
                    placeholder="Your First Name"
                    style={[styles.textInput,{color: colors.Logintext}]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, 'firstname')}
                />
                {data.check_firstNameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="#72be03"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, { marginTop: 35,color: colors.Logintext }]}>Last Name</Text>
            <View style={[styles.action,{borderColor: colors.Logintext}]}>
                <FontAwesome 
                    name="user-o"
                    color={colors.Logintext}
                    size={20}
                />
                <TextInput 
                    placeholderTextColor = {colors.placeholder}
                    placeholder="Your Last Name"
                    style={[styles.textInput,{color: colors.Logintext}]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, 'lastname')}
                />
                {data.check_lastNameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="#72be03"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, { marginTop: 35,color: colors.Logintext }]}>Email(Username)</Text>
            <View style={[styles.action,{borderColor: colors.Logintext}]}>
                <Feather
                    name="mail"
                    color={colors.Logintext}
                    size={20}
                />
                <TextInput 
                    placeholderTextColor = {colors.placeholder}
                    placeholder="Your Email"
                    style={[styles.textInput,{color: colors.Logintext}]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, 'username')}
                />
                {data.check_userNameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="#72be03"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            
            { /* phone and ext*/}
            <View style={{ flexDirection: 'row'}}>
                <Text style={[styles.text_footer, { marginTop: 35, width: '60%', marginRight: 5,color: colors.Logintext }]}>Phone</Text>
                <Text style={[styles.text_footer, { marginTop: 35, width: '30%',color: colors.Logintext  }]}>Ext</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
            
                <View style={[styles.action2,{borderColor: colors.Logintext}]}>
                    <Feather
                        name="phone"
                        color={colors.Logintext}
                        size={20}
                        //style={{ flexDirection: 'row'}}
                    />
                    <TextInput 
                        placeholderTextColor = {colors.placeholder}
                        placeholder="Your Phone Number"
                        style={[styles.textInput,{color: colors.Logintext}]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val, 'phone')}
                    />
                    {data.check_phoneInputChange ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="#72be03"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                </View>
                
                
                <View style={[styles.action3,{borderColor: colors.Logintext}]}>
                    <Feather 
                        name="hash"
                        color={colors.Logintext}
                        size={20}
                    />
                    <TextInput 
                        placeholderTextColor = {colors.placeholder}
                        placeholder="Your Ext"
                        style={[styles.textInput,{color: colors.Logintext}]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="#72be03"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                </View>
             
            </View> 
            { /* phone and ext end*/}

            { /* company name and code */}
            <View style={{ flexDirection: 'row'}}>
                <Text style={[styles.text_footer, { marginTop: 35, width: '60%', marginRight: 5,color: colors.Logintext }]}>Company</Text>
                <Text style={[styles.text_footer, { marginTop: 35, width: '30%',color: colors.Logintext  }]}>Code</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
            
                <View style={[styles.action2,{borderColor: colors.Logintext}]}>
                    <Feather
                        name="home"
                        color={colors.Logintext}
                        size={20}
                        //style={{ flexDirection: 'row'}}
                    />
                    <TextInput 
                        placeholderTextColor = {colors.placeholder}
                        placeholder="Your Company"
                        style={[styles.textInput,{color: colors.Logintext}]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val, 'phone')}
                    />
                    {data.check_phoneInputChange ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="#72be03"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                </View>
                
                
                <View style={[styles.action3,{borderColor: colors.Logintext}]}>
                    <Feather 
                        name="slack"
                        color={colors.Logintext}
                        size={20}
                    />
                    <TextInput 
                        placeholderTextColor = {colors.placeholder}
                        placeholder="Your Code"
                        style={[styles.textInput,{color: colors.Logintext}]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="#72be03"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                </View>
             
            </View> 
            { /* company name and code end*/}

            <Text style={[styles.text_footer, {
                marginTop: 35,color: colors.Logintext
            }]}>Password</Text>
            <View style={[styles.action,{borderColor: colors.Logintext}]}>
                <Feather 
                    name="lock"
                    color={colors.Logintext}
                    size={20}
                />
                <TextInput 
                    placeholderTextColor = {colors.placeholder}
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput,{color: colors.Logintext}]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color={colors.Logintext}
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color={colors.Logintext}
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35,color: colors.Logintext
            }]}>Confirm Password</Text>
            <View style={[styles.action,{borderColor: colors.Logintext}]}>
                <Feather 
                    name="lock"
                    color={colors.Logintext}
                    size={20}
                />
                <TextInput 
                    placeholderTextColor = {colors.placeholder}
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={[styles.textInput,{color: colors.Logintext}]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color={colors.Logintext}
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color={colors.Logintext}
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, { marginTop: 35,color: colors.Logintext }]}>Promo Code</Text>
            <View style={[styles.action,{borderColor: colors.Logintext}]}>
                <FontAwesome 
                    name="ticket"
                    color={colors.Logintext}
                    size={20}
                />
                <TextInput 
                    placeholderTextColor = {colors.placeholder}
                    placeholder="Your Promo Code"
                    style={[styles.textInput,{color: colors.Logintext}]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, 'promocode')}
                />
                {data.check_promoCodeInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="#72be03"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}
                >
                <LinearGradient
                    colors={['#72be03','#397e05']}
                    style={styles.signIn}
                    start={[0, 1]} end={[1, 0]}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Register</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#72be03',
                        borderWidth: 1.5,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#72be03'
                    }]}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      //backgroundColor: '#465558',
    },
    row1: {
        //flex: 1,
        flexDirection: "row",
        width:100
    },

    logocontainer: {
        alignItems: 'center',
        flexGrow: 0.2,
       justifyContent: 'center',
    },
    height: {
        zIndex: 2,
        elevation: 10
    },
    logo: {
        width: width/3,
        height: height/9.5,
        //alignItems: 'center',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? 10 : 2.25,

    },
    text_sub: {
        color: '#fff',
        //fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
    },
    /*
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    */
   header: {
        width: width,
        height: height+100,
        //height: height/3,
        transform: [{ scaleX: 1.6 }],
        borderRadius: 190,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    footer: {
        ///flex: Platform.OS === 'ios' ? 3 : 5,
        flex: 3,
        marginTop: 10,
        //backgroundColor: '#465558',
        //borderTopLeftRadius: 30,
        //borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    
    text_footer: {
        //color: '#989c9d',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1.5,
        //borderBottomColor: '#989c9d',
        paddingBottom: 5
    },
    action2: {
        flexDirection: 'row',
        marginTop: 10,
        width: '60%',
        borderBottomWidth: 1.5,
        //borderBottomColor: '#989c9d',
        paddingBottom: 5,
        marginRight: 5,
    },
    action3: {
        flexDirection: 'row',
        marginTop: 10,
        width: '40%',
        borderBottomWidth: 1.5,
        //borderBottomColor: '#989c9d',
        paddingBottom: 5
    },

    textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        //color: '#989c9d',
        
    },
    button: {
        alignItems: 'center',
        marginTop: 50
        
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
        
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
