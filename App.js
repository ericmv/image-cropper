import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, Dimensions, ImageStore, Button } from 'react-native';
import ImagePicker from './src/components/ImagePicker';
import Crop from './src/components/Crop';



export default function App() {

    return <Crop />

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
  },
  imageContainer: {
      width: undefined,
      height: undefined,
      // borderWidth: 2,
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#2d3436',
  }
});
