import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ImageEditor, Modal, Dimensions } from 'react-native';
import Crop from './src/components/Crop';
import ImagePicker from './src/components/ImagePicker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function App() {
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirm = (image) => {
        setImage(image);
        setModalVisible(true);
    }
    const handleClose = () => {
        setModalVisible(false);
    }
    console.log(image, modalVisible)
    const widthToHeightRatio = image ? image.width / image.height : null;
    const maxCropHeight = image ? Math.round(screenWidth / widthToHeightRatio) : null;
    console.log('widthToHeightRatio', widthToHeightRatio);
    console.log('maxCropHeight', maxCropHeight);
    console.log('screenWidth', screenWidth);
    console.log('screenHeight', screenHeight);
    const uri = image ? image.uri : './assets/DSC_0578.jpg';
    // const imageToCrop = require()
  return (
      <View style={styles.container}>
          <ImagePicker onConfirm ={handleConfirm}/>
          <Modal animationType="slide"
             transparent={false}
             visible={modalVisible}
             onRequestClose={() => {
               Alert.alert('Modal has been closed.');
             }}>
                <Image
                    source={{uri}}
                    resizeMode="contain"
                    style={styles.imageContainer}>
                </Image>
                <Crop heightBoundary={maxCropHeight}/>
            </Modal>
      </View>

  );

}

// <View style={styles.container}>
//   <ImagePicker onConfirm ={handleConfirm}/>
//   <Modal animationType="slide"
//     transparent={false}
//     visible={modalVisible}
//     onRequestClose={() => {
//       Alert.alert('Modal has been closed.');
//     }}>
//       <ImageBackground source={require('./assets/DSC_0578.jpg')}
//       resizeMode="contain" style={styles.placeholder}>
//
//           <Crop></Crop>
//       </ImageBackground>
//   </Modal>
//
// </View>

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
