import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ReportsScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Reports Screen</Text>
      </View>
    );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});