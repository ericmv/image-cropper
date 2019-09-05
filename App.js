import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, Dimensions, ImageStore, Button } from 'react-native';
import Crop from './src/components/Crop';
import ImagePicker from './src/components/ImagePicker';

import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function App() {
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [croppedUri, setCroppedUri] = useState(null);
    const [displayWidth, setDisplayWidth] = useState(1);
    const [displayHeight, setDisplayHeight] = useState(1);

    useEffect(() => {
        if (croppedUri) ImageStore.removeImageForTag(croppedUri);
    }, [])

    const handleConfirm = (image) => {
        const widthToHeightRatio = image ? image.width / image.height : null;
        const imageDisplayHeight = image ? Math.round(screenWidth / widthToHeightRatio) : 1;
        const imageDisplayWidth = image ? screenWidth : 1;
        setDisplayWidth(imageDisplayWidth);
        setDisplayHeight(imageDisplayHeight);
        setImage(image);
        setModalVisible(true);
    }

    const handleClose = () => {
        setModalVisible(false);
    }
    const handleCrop = async (top, right, bottom, left, boxWidth, boxHeight) => {
        const imageToScreenWidthRatio = image.width / boxWidth;
        const imageToScreenHeightRatio = image.height / boxHeight;
        const x = Math.round(left * imageToScreenWidthRatio);
        const y = Math.round(top * imageToScreenHeightRatio);
        const width = Math.round((screenWidth - left - right) * imageToScreenWidthRatio);
        const height = Math.round((displayHeight - top - bottom) * imageToScreenHeightRatio);
        const crop = {
            originX: x,
            originY: y,
            width: width,
            height: height
        }

        const croppedImage = await ImageManipulator.manipulateAsync(image.uri, [{crop}], {format: 'jpeg'});

        setCroppedUri(croppedImage.uri);
        setModalVisible(false);
        setImage(null);
    }

    const topBoundary = (screenHeight - displayHeight) / 2;
    const widthScale = 5;
    const heightScale = 7;

    let maxCropWidth;
    let maxCropHeight;
    if ((displayWidth / widthScale) < (displayHeight / heightScale)) {
        maxCropWidth = displayWidth;
        maxCropHeight = (displayWidth * heightScale) / widthScale
    } else {
        maxCropHeight = displayHeight;
        maxCropWidth = (displayHeight * widthScale) / heightScale;
    }

    const startingBottom = displayHeight - maxCropHeight
    const startingRight = displayWidth - maxCropWidth;
    const cropBoxStyle = {
        position: 'absolute',
        flex: 1,
        opacity: 1,
        top: 0,
        bottom: startingBottom,
        left: 0,
        right: startingRight,
    }
    const containerStyle = {
      position: 'absolute',
      flex: 1,
      top: topBoundary,
      bottom: topBoundary,
      left: 0,
      right: 0
    }

    const uri = image ? image.uri : './assets/DSC_0578.jpg';
    return croppedUri ? <View style={styles.container}><Image style={styles.imageContainer} source={{uri: croppedUri}} resizeMode="contain"></Image><Button onPress={() => setCroppedUri(null)} title='Reset'/></View> :
        <View style={styles.container}>
          <ImagePicker onConfirm ={handleConfirm}/>
          <Modal animationType="slide"
             transparent={false}
             visible={modalVisible}
             style={{backgroundColor: 'grey'}}
             onRequestClose={() => {
               Alert.alert('Modal has been closed.');
             }}>
                <Image
                    source={{uri}}
                    resizeMode="contain"
                    style={styles.imageContainer}>
                </Image>
                <Crop style={cropBoxStyle} containerStyle={containerStyle} handleCrop={handleCrop} height={displayHeight} width={displayWidth} startingBottom={startingBottom} startingRight={startingRight}/>
            </Modal>
        </View>
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
