import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, Dimensions, ImageStore, Button, PixelRatio } from 'react-native';
import Cropbox from './Cropbox';
import ImagePicker from './ImagePicker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const screenWidth = Math.round(Dimensions.get('window').width);
console.log('screenWidth', screenWidth);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Crop({uri, height, width, scaleX, scaleY, onCrop, onClose}) {
    const [displayWidth, setDisplayWidth] = useState(null);
    const [displayHeight, setDisplayHeight] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);

    useEffect(() => {
        if (containerHeight && containerWidth) {
            const ratio = PixelRatio.get();
            const imageDisplayWidth = width / ratio ;
            const imageDisplayHeight = height / ratio ;
            console.log('imageDisplayWidth', imageDisplayWidth);
            // const widthToHeightRatio = width / height;
            // const imageDisplayHeight = Math.round(containerWidth / widthToHeightRatio);
            // const imageDisplayWidth = Math.round(containerHeight * widthToHeightRatio);
            // const imageDisplayWidth = containerWidth;


            // const a = containerWidth
            //
            // if ((displayWidth / scaleX) < (displayHeight / scaleY)) {
            //     maxCropWidth = displayWidth;
            //     maxCropHeight = (displayWidth * scaleY) / scaleX;
            //     console.log('here', containerWidth, displayWidth);
            //     rightBoundary = ((containerWidth - displayWidth) / 2);
            // } else { // if width is the limiting factor
            //     maxCropHeight = displayHeight;
            //     maxCropWidth = (displayHeight * scaleX) / scaleY;
            //     topBoundary = ((containerHeight - displayHeight) / 2);
            // }





            setDisplayWidth(imageDisplayWidth);
            setDisplayHeight(imageDisplayHeight);
        }
    }, [containerHeight, containerWidth]);

    const handleClose = () => {
        setModalVisible(false);
    }
    const onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerHeight(height);
        setContainerWidth(width);
    }
    const handleCrop = async (top, right, bottom, left, boxWidth, boxHeight) => {
        const imageToScreenWidthRatio = width / boxWidth;
        const imageToScreenHeightRatio = height / boxHeight;
        const x = Math.round(left * imageToScreenWidthRatio);
        const y = Math.round(top * imageToScreenHeightRatio);
        const cropWidth = Math.round((screenWidth - left - right) * imageToScreenWidthRatio);
        const cropHeight = Math.round((displayHeight - top - bottom) * imageToScreenHeightRatio);
        const crop = {
            originX: x,
            originY: y,
            width: cropWidth,
            height: cropHeight
        }

        const croppedImage = await ImageManipulator.manipulateAsync(uri, [{crop}], {format: 'jpeg'});
        onCrop(croppedImage);

        onClose();
    }


    let topBoundary = 0;
    let rightBoundary = 0;

    let maxCropWidth;
    let maxCropHeight;
    if ((displayWidth / scaleX) < (displayHeight / scaleY)) {
        maxCropWidth = displayWidth;
        maxCropHeight = (displayWidth * scaleY) / scaleX;
        console.log('here', containerWidth, displayWidth);
        rightBoundary = ((containerWidth - displayWidth) / 2);
    } else { // if width is the limiting factor
        maxCropHeight = displayHeight;
        maxCropWidth = (displayHeight * scaleX) / scaleY;
        topBoundary = ((containerHeight - displayHeight) / 2);
    }

    const startingBottom = displayHeight - maxCropHeight;
    const startingRight = displayWidth - maxCropWidth;
    console.log('rightBoundary', rightBoundary);
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
      left: rightBoundary,
      right: rightBoundary
    }

    return (
        <View style={styles.container} onLayout={onPageLayout}>
            <Image source={{uri}} resizeMode="contain" style={styles.imageContainer} />
            {
                displayWidth && displayHeight && <Cropbox style={cropBoxStyle} containerStyle={containerStyle} handleCrop={handleCrop} height={displayHeight} width={displayWidth} startingBottom={startingBottom} startingRight={startingRight}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  imageContainer: {
      width: undefined,
      height: undefined,
      flex: 1,
      backgroundColor: '#2d3436',
  }
});
