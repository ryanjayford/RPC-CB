import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OwnerOnlyScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Owner Only Screen</Text>
      </View>
    );
};

export default OwnerOnlyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});