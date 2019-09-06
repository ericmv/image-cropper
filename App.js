import React, {useState, useEffect} from 'react';

import ImagePicker from './src/components/ImagePicker';
import Crop from './src/components/Crop';

const handleCrop = (croppedImage) => {
    console.log(croppedImage);
}

export default function App() {
    const [image, setImage] = useState(null);

    return image ?
        <Crop
            uri={image.uri}
            width={image.width}
            height={image.height}
            scaleX={5}
            scaleY={7}
            onCrop={handleCrop}
        /> :
        <ImagePicker onConfirm={setImage}/>
}
