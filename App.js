import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ImageEditor } from 'react-native';
import Crop from './src/components/Crop';
export default function App() {
  return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/DSC_0578.jpg')}
        resizeMode="contain" style={styles.placeholder}>

            <Crop></Crop>
        </ImageBackground>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  placeholder: {
      // width: 350,
      // height: 550,
      // borderWidth: 2,
      flex: 1,
      // position: 'absolute',
      borderColor: 'black',
  }
});
