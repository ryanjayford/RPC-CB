import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Linking } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

const BookmarkScreen = () => {

    const Ebg = async () => {
        let webLink = 'https://www.ebgsystems.com/';
        let result = await WebBrowser.openBrowserAsync(webLink);
        //setresult(thisresult = result) 
    };  
    return (
      <LinearGradient 
        colors={['#eeecc5','#fcfdf8']}
        style = {styles.container}
      >
        <View style={styles.header}>
          <Text style = {styles.Title}>Office</Text>
        </View>
        <View style={{padding: 20}}>
          <Text style = {styles.SubTitle}>EBG Systems, Inc.</Text>
          <Text style = {styles.info}>5320 N Sheridan Rd{"\n"}
                Unit 1610{"\n"}
                Chicago, IL 60640</Text>
          <Text style = {styles.info}>P: (773) 866-2088</Text>
          <Text style = {styles.info}>F: (773) 866-2012 </Text>
          <TouchableOpacity onPress={()=> Linking.openURL('mailto:info@ebgsystems.com')}>
            <Text style={styles.link}>info@ebgsystems.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Ebg()}>
            <Text style={styles.link}>www.ebgsystems.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style = {styles.Title}>Support</Text>
        </View>
        <View style={{padding: 20}}>
          <Text style = {styles.SubTitle}>Support Team</Text>
          <Text style = {styles.info}>P: (773) 866-2087</Text>
          <Text style = {styles.info}>F: (773) 866-2012</Text>
          <TouchableOpacity onPress={()=> Linking.openURL('mailto:support@ebgsystems.com')}>
            <Text style={styles.link}>support@ebgsystems.com</Text>
          </TouchableOpacity>
        </View>
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
      backgroundColor: '#008000',
      padding: 10
    },
    Title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white'
    },
    SubTitle: {
      fontSize: 28,
      color: '#008000',
      marginBottom: 10,
    },
    info: {
      fontSize: 18,
    },
    link: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#008000',
      textDecorationLine: 'underline',

    },
});
