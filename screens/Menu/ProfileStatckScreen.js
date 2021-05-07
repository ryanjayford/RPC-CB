import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
//import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons'; 
import ProfileScreen from './ProfileScreen';
import Settings from '../../settings.json';

const baseURL = Settings.domain;

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => {
  
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator headerMode='screen' screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerPressColorAndroid: 'transparent',
            headerBackImage: ({ tintColor })=> <Entypo name="chevron-left" size={25} color={tintColor} />,
            headerTitleAlign: 'center',
            headerBackTitleVisible: true,
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <ProfileStack.Screen name="My Profile" component={ProfileScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor= {colors.primary} onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
            
    </ProfileStack.Navigator>
  )
};

export default ProfileStackScreen;
