import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ImageEditor, Modal, Dimensions, ImageStore } from 'react-native';
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

    useEffect(() => {
        if (croppedUri) ImageStore.removeImageForTag(croppedUri);
    }, [])

    const handleConfirm = (image) => {
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
        const y = Math.round((top - topBoundary) * imageToScreenHeightRatio);
        const width = Math.round((screenWidth - left - right) * imageToScreenWidthRatio);
        const height = Math.round((screenHeight - top - bottom) * imageToScreenHeightRatio);
        // console.log('offset', x, y);
        console.log('width of croppped image', width);
        console.log('height of cropped image', height);

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

        // const cropData = {
        //     offset: {x: 0, y: 0},
        //     size: {width: 2048, height: 2048}
        // };
        // setModalVisible(false);
        // setImage(null);
        // function onSuccess(uri) {
        //     console.log('uri of cropped image', uri);
        //     setCroppedUri(uri);
        //     // ImageStore.removeImageForTag(uri);
        // }
        // function onFailure(err) {
        //     console.log('oh no');
        // }
        // ImageEditor.cropImage(image.uri, cropData, onSuccess, onFailure)
    }
    const widthToHeightRatio = image ? image.width / image.height : null;
    const maxCropHeight = image ? Math.round(screenWidth / widthToHeightRatio) : 1;
    const maxCropWidth = image ? screenWidth : 1;
    // console.log('image.width', image ? image.width : null);
    // console.log('image.height', image ? image.height: null);
    console.log('screenWidth', screenWidth);
    console.log('screenHeight', screenHeight);

    // console.log('widthToHeightRatio', widthToHeightRatio);

    console.log('imageHeight', maxCropHeight);


    const topBoundary = (screenHeight - maxCropHeight) / 2;
    const bottomBoundary = -topBoundary;
    const cropBoxStyle = {
        position: 'absolute',
        flex: 1,
        opacity: 1,
        top: topBoundary,
        bottom: topBoundary,
        left: 0,
        right: 0
    }

    const uri = image ? image.uri : './assets/DSC_0578.jpg';
    console.log('CROPPED URI', croppedUri);
    return croppedUri ? <View style={styles.container}><Image style={styles.imageContainer} source={{uri: croppedUri}} resizeMode="contain"></Image></View> :


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
                <Crop style={cropBoxStyle} topBoundary={topBoundary} bottomBoundary={bottomBoundary} handleCrop={handleCrop} height={maxCropHeight} width={maxCropWidth}/>
            </Modal>
        </View>



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
    // padding: 20
    // alignItems: 'center',
    // justifyContent: 'center',

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
      bottom: 0
  }
});
