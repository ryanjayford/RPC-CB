import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../../components/context';
//import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons'; 
import ContactScreen from './BookmarkScreen';
import Settings from '../../settings.json';

const baseURL = Settings.domain;

const ContactStack = createStackNavigator();

const ContactStackScreen = ({navigation}) => {
  
  const { colors } = useTheme();
  return (
    <ContactStack.Navigator headerMode='screen' screenOptions={{
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
            <ContactStack.Screen name="My Contact" component={ContactScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor= {colors.primary} onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
            
    </ContactStack.Navigator>
  )
};

export default ContactStackScreen;
