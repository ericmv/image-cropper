import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Crop from './src/components/Crop';
export default function App() {
  return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
            <Crop></Crop>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  placeholder: {
      width: 350,
      height: 550,
      borderWidth: 2,
      borderColor: 'black'
  }
});
