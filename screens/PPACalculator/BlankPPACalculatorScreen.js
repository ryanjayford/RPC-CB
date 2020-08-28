import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PPACalculatorScreen = () => {
    return (
      <View style={styles.container}>
        <Text>PPA Calculator Screen</Text>
      </View>
    );
};

export default PPACalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});