import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, Dimensions, ImageStore, Button } from 'react-native';
import Cropbox from './Cropbox';
import ImagePicker from './ImagePicker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Crop({uri, height, width, scaleX, scaleY, onCrop, onClose}) {
    const [displayWidth, setDisplayWidth] = useState(null);
    const [displayHeight, setDisplayHeight] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);

    // useEffect(() => {
    //     if (uri && height && width && scaleX && scaleY) {
    //         const widthToHeightRatio = width / height;
    //         const imageDisplayHeight = Math.round(screenWidth / widthToHeightRatio);
    //         const imageDisplayWidth = screenWidth;
    //         setDisplayWidth(imageDisplayWidth);
    //         setDisplayHeight(imageDisplayHeight);
    //     }
    // }, [uri, height, width, scaleX, scaleY]);

    useEffect(() => {
        if (containerHeight && containerWidth) {
            const widthToHeightRatio = width / height;
            const imageDisplayHeight = Math.round(containerWidth / widthToHeightRatio);
            const imageDisplayWidth = containerWidth;
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
        console.log("ON LAYOUT",width, height);
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
        // setCroppedUri(croppedImage.uri);

    }

    const topBoundary = ((containerHeight - displayHeight) / 2);
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
    // backgroundColor: 'transparent',
    // marginRight: 50,
    // marginLeft: 50
  },
  imageContainer: {
      width: undefined,
      height: undefined,
      // borderWidth: 2,
      flex: 1,
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      backgroundColor: 'transparent',
  }
});
