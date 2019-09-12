import React, {useState, useEffect} from 'react';
import { StyleSheet, View} from 'react-native';

import ImagePicker from './src/components/ImagePicker';
import Crop from './src/components/Crop';

const handleCrop = (croppedImage) => {
    console.log(croppedImage);
}

export default function App() {
    const [image, setImage] = useState(null);

    const handleClose = () => {
        setImage(null);
    }
    return image ?
        <View style={styles.page}>
          <View style={styles.sampleContainer}>
              <Crop
                  uri={image.uri}
                  width={image.width}
                  height={image.height}
                  scaleX={5}
                  scaleY={7}
                  onCrop={handleCrop}
                  onClose={handleClose}
              />
          </View>
          <View style={styles.bottomNav}>
          </View>
        </View>
        :
        <ImagePicker onConfirm={setImage}/>
}

const styles = StyleSheet.create({
    sampleContainer: {
        flex: 1,
        // marginLeft: 50,
        // marginRight: 50,
        // alignSelf: "stretch",
        // display: 'flex',
        borderWidth: 2,
        borderColor: 'white',

        backgroundColor: '#2d3436',
    },
    bottomNav: {
      flex: 1,
      backgroundColor: 'blue'
    },
    page: {
      display: 'flex',
      alignSelf: "stretch",
      paddingLeft: 50,
      paddingRight: 50,
      flex: 1,
      // width: 500,
      // height: 700,
      // padding: 30,
      backgroundColor: '#2d3436',
      borderWidth: 2
    }
})
//
