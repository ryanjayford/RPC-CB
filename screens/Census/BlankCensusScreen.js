import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CensusScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Census Screen</Text>
      </View>
    );
};

export default CensusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});