import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Linking,ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '@react-navigation/native';

const BookmarkScreen = () => {
    const { colors } = useTheme();
    const Ebg = async () => {
        let webLink = 'https://www.ebgsystems.com/';
        let result = await WebBrowser.openBrowserAsync(webLink);
        //setresult(thisresult = result) 
    };  

    return (
      <LinearGradient 
        colors={[colors.linearlight,colors.linearDark]}
        style = {styles.container}
      >
        <ScrollView>
          <View style={[styles.header,{backgroundColor: colors.icon}]}>
            <Text style = {styles.Title}>Office</Text>
          </View>

          <View style={{padding: 20, margin: 20, borderRadius: 5, backgroundColor: colors.background}}>
            <Text style = {[styles.SubTitle, {color: colors.textGreen}]}>EBG Systems, Inc.</Text>
            <Text style = {[styles.info, {color: colors.textLight}]}>5320 N Sheridan Rd{"\n"}
                  Unit 1610{"\n"}
                  Chicago, IL 60640</Text>
            <Text style = {[styles.info, {color: colors.textLight}]}>P: (773) 866-2088</Text>
            <Text style = {[styles.info, {color: colors.textLight}]}>F: (773) 866-2012 </Text>
            <TouchableOpacity onPress={()=> Linking.openURL('mailto:info@ebgsystems.com')}>
              <Text style={[styles.link, {color: colors.email}]}>info@ebgsystems.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> Ebg()}>
              <Text style={[styles.link, {color: colors.email}]}>www.ebgsystems.com</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.header,{backgroundColor: colors.icon}]}>
            <Text style = {styles.Title}>Support</Text>
          </View>
          <View style={{padding: 20, margin: 20, borderRadius: 5, backgroundColor: colors.background}}>
            <Text style = {[styles.SubTitle, {color: colors.textGreen}]}>Support Team</Text>
            <Text style = {[styles.info, {color: colors.textLight}]}>P: (773) 866-2087</Text>
            <Text style = {[styles.info, {color: colors.textLight}]}>F: (773) 866-2012</Text>
            <TouchableOpacity onPress={()=> Linking.openURL('mailto:support@ebgsystems.com')}>
              <Text style={[styles.link, {color: colors.email}]}>support@ebgsystems.com</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //alignItems: 'center', 
        //justifyContent: 'center',
    },
    header: {
      //backgroundColor: '#008000',
      padding: 10
    },
    Title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white'
    },
    SubTitle: {
      fontSize: 28,
      //color: '#008000',
      marginBottom: 10,
    },
    info: {
      fontSize: 18,
    },
    link: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
      //color: '#008000',
      textDecorationLine: 'underline',

    },
});
