import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';


export default () => {


    return (
        <>
            <Image resizeMode="contain" source={require('../../assets/DSC_0578.jpg')} style={styles.image}>
            </Image>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'grey',
        opacity: .5,
        width: 50,
    }
})
