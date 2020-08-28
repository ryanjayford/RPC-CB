import React from 'react';
import { 
    View,
    StyleSheet, 
    ImageBackground, 
    Image, 
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Avatars from '../model/avatars';
import{ AuthContext } from '../components/context';

export function DrawerContent(props) {
    const paperTheme = useTheme();
    const [{ signOut, toggleTheme}, dataState] = React.useContext(AuthContext);
    const userProfile = dataState;
    
    let portrait = null;
    

    const userData = Avatars.filter( item => {
        return userProfile.userName == item.email;
    });
    
    if (userData && userData.length) {
        //Base64
        portrait = `data:image/jpeg;base64, ${userData[0].avatar}`;
    } 

    return(
        <View style={{flex:1}}>
            <ScrollView {...props}>
                <View style={styles.drawerContent}>
                <LinearGradient colors={['#72be03','#397e05']} style={styles.userInfoSection}>
                        
                        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity>
                                { portrait !== null ?
                                    <Image source={{ uri: portrait }} style={styles.profile}/> :
                                    <Image source={require("../assets/user.jpg")} style={styles.profile} />
                                }
                            </TouchableOpacity>
                            <View style ={styles.Box}>
                            <Image source={require("../assets/logo.png")} 
                            style={styles.logo} />
                            <Text style = {styles.LogoName}>The Retirement Planning Center</Text>
                            </View>
                        </View>

                        <Text style = {styles.Name}>{userProfile.firstName + ' ' + userProfile.lastName}</Text>

                        <View style ={{flexDirection: 'row'}}>
                            <Text style = {styles.Email}>{userProfile.userName}</Text>
                            <Icon name="email" size={16} color="white" />
                        </View>
                     
                    </LinearGradient >
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItemList {...props} />
                    </Drawer.Section>
                    { /*<Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon2 
                                name="ios-person" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="contacts" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Contact"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Setup"
                            onPress={() => {props.navigation.navigate('SettingScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="help" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Help"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section> */}
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch style={styles.switch} color= "#72be03" value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </ScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        padding: 16,
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'white'
    },
    logo: {
        //justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'flex-end',
        width: 100,
        height: 60,
    },
    Name: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 8
    },
    Box: {
        flexDirection: 'column',
    },
    LogoName: {
        fontSize: 9,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    Email: {
        color: 'white',
        fontSize: 13,
        marginRight: 4,

    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    switch: {
        transform: Platform.OS === 'ios' ? [{ scaleX: .8 }, { scaleY: .8 }] : [{ scaleX: 1 }, { scaleY: 1 }],
    }
  });