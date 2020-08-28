import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CalculateScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Calculate Screen</Text>
      </View>
    );
};

export default CalculateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});