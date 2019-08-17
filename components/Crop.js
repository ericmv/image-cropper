
import React from 'react';
import { PanResponder, StyleSheet, View, Text, Dimensions } from 'react-native';
// const React = require('react');
// const {PanResponder, StyleSheet, View, Text} = require('react-native');
const CIRCLE_SIZE = 50;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const imageWidth = 350;
const imageHeight = 550;

console.log('screenWidth', screenWidth);

class Crop extends React.Component {
    _circleStyles = {style:{}};
    _position = {style:{}};
    circle = null;
    crop = null;

    // _topLeftCircleStyles = {style: {}}
    // _topRightCircleStyles = {style: {}}
    // _bottomLeftCircleStyles = {style: {}}
    // _bottomRightCircleStyles = {style: {}}

    // topLeftCircle = null;
    // topRightCircle = null;
    // bottomLeftCircle = null;
    // bottomRightCircle = null;

    _previousLeft = 0;
    _previousTop = 0;
    _previousRight = 0;
    _previousBottom = 0;

    _highlight() {
        // this._circleStyles.style.backgroundColor = 'blue';
        this._position.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {
        // this._circleStyles.style.backgroundColor = 'grey';
        this._position.style.backgroundColor = 'grey';
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        // console.log('this.circleStyles', this._circleStyles);
        // this.circle && this.circle.setNativeProps(this._circleStyles);
        // console.log('this.position.right', this._position.style.right);
        this.crop  && this.crop.setNativeProps(this._position);
    }

    _handleStartShouldSetPanResponder = (event, gestureState) => {
         return true;
    }
    _handleMoveShouldSetPanResponder = (event, gestureState) => {
        return true;
    }
    _handlePanResponderGrant2 = (event, gestureState) => {
        // this._highlight();
    }
    _handlePanResponderGrant = (event, gestureState) => {
        this._highlight();
    }
    _handlePanResponderMove = (event, gestureState) => {
        // const left = this._previousLeft + gestureState.dx;
        // const top = this._previousTop + gestureState.dy;
        // if (left <= 0) {
        //     this._position.style.left = 0
        // } else if (left + 250 > imageWidth) {
        //     this._position.style.left = imageWidth - 250;
        // } else {
        //     this._position.style.left = left;
        // }
        // if (top <= 0) {
        //     this._position.style.top = 0
        // } else if (top + 350 > imageHeight) {
        //     this._position.style.top = imageHeight - 350;
        // } else {
        //     this._position.style.top = top;
        // }
       // this._circleStyles.style.left = this._previousLeft + gestureState.dx;
       // this._circleStyles.style.top = this._previousTop + gestureState.dy;
       // this._updateNativeStyles();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        // this._unHighlight();
        // console.log('gesturedx', gestureState.dx);
        // console.log('gesturedy', gestureState.dy);
        // this._previousLeft += gestureState.dx;
        // this._previousTop += gestureState.dy;
    };

    // Top Left functions
    _handleTopLeftPanResponderMove = (event, gestureState) => {
       this._position.style.left = this._previousLeft + gestureState.dx;
       this._position.style.top = this._previousTop + gestureState.dy;
       this._updateNativeStyles();
    };

    _handleTopLeftPanResponderEnd = (event, gestureState) => {
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    // Bottom Left functions
    _handleBottomLeftPanResponderMove = (event, gestureState) => {
       this._position.style.left = this._previousLeft + gestureState.dx;
       this._position.style.bottom = -(this._previousBottom + gestureState.dy);
       this._updateNativeStyles();
    };

    _handleBottomLeftPanResponderEnd = (event, gestureState) => {
        this._previousLeft += gestureState.dx;
        this._previousBottom += gestureState.dy;
    };

    // Top Right functions
    _handleTopRightPanResponderMove = (event, gestureState) => {
       this._position.style.right = -(this._previousRight + gestureState.dx);
       this._position.style.top = (this._previousTop + gestureState.dy);
       this._updateNativeStyles();
    };

    _handleTopRightPanResponderEnd = (event, gestureState) => {
        this._previousRight += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    // Bottom Right functions
    _handleBottomRightPanResponderMove = (event, gestureState) => {
       this._position.style.right = -(this._previousRight + gestureState.dx);
       this._position.style.bottom = -(this._previousBottom + gestureState.dy);
       this._updateNativeStyles();
    };

    _handleBottomRightPanResponderEnd = (event, gestureState) => {
        console.log('gesturedx', gestureState.dx);
        console.log('gesturedy', gestureState.dy);
        this._unHighlight();
        this._previousRight += gestureState.dx;
        this._previousBottom += gestureState.dy;
    };





    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant2,
        onPanResponderMove: this._handlePanResponderMove,
        onPanResponderRelease: this._handlePanResponderEnd,
        onPanResponderTerminate: this._handlePanResponderEnd,
    })

    //  Top Left Responder
    _topLeftPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleTopLeftPanResponderMove,
        onPanResponderRelease: this._handleTopLeftPanResponderEnd,
        onPanResponderTerminate: this._handleTopLeftPanResponderEnd,
    })

    //  Bottom Left Responder
    _bottomLeftPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleBottomLeftPanResponderMove,
        onPanResponderRelease: this._handleBottomLeftPanResponderEnd,
        onPanResponderTerminate: this._handleBottomLeftPanResponderEnd,
    })

    //  Top Right Responder
    _topRightPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleTopRightPanResponderMove,
        onPanResponderRelease: this._handleTopRightPanResponderEnd,
        onPanResponderTerminate: this._handleTopRightPanResponderEnd,
    })

    //  Bottom Right Responder
    _bottomRightPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleBottomRightPanResponderMove,
        onPanResponderRelease: this._handleBottomRightPanResponderEnd,
        onPanResponderTerminate: this._handleBottomRightPanResponderEnd,
    })

    render() {
        return (
                <View
                    style={styles.crop}
                    ref={crop => {
                        this.crop = crop;
                    }}
                >
                    <View style={styles.cropBox}></View>
                    <View style={styles.topLeftCorner} {...this._topLeftPanResponder.panHandlers}></View>
                    <View style={styles.topRightCorner} {...this._topRightPanResponder.panHandlers}></View>
                    <View style={styles.bottomLeftCorner} {...this._bottomLeftPanResponder.panHandlers}></View>
                    <View style={styles.bottomRightCorner} {...this._bottomRightPanResponder.panHandlers}></View>
                </View>
        )
    }

    setLeft(left: number) {
        if (left <= 0) {
            this.position.left = 0;
        } else if (left >= (this.widthBoundary - this.position.right)) {
            this.position.left = this.widthBoundary - this.position.right;
        } else {
            this.position.left = left;
        }
    }
}


const styles = StyleSheet.create({
  crop: {
    // width: 250,
    // height: 350,
    flex: 1,
    backgroundColor: 'grey',
    // borderRadius: CIRCLE_SIZE / 2,
    opacity: .6,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0
  },
  container: {
    flex: 1,
    height: 500,
  },
  topLeftCorner: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 30,
      height: 30,
      borderWidth: 2,
  },
  topRightCorner: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 30,
      height: 30,
      borderWidth: 2,
  },
  bottomLeftCorner: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 30,
      height: 30,
      borderWidth: 2,
  },
  bottomRightCorner: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 30,
      height: 30,
      borderWidth: 2,
  }
});

export default Crop;
