
import React from 'react';
import { PanResponder, StyleSheet, View, Text, Dimensions, Image, ImageEditor } from 'react-native';
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
    _position = {style:{left: 0, right: 0, top: 0, bottom: 0}};
    circle = null;
    crop = null;
    widthBoundary = 200;
    heightBoundary = 350;



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
        // this._position.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {
        // this._circleStyles.style.backgroundColor = 'grey';
        // this._position.style.backgroundColor = 'grey';
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
        const {dx, dy} = gestureState;
        // console.log('dx, dy', dx, dy)
        let moveX;
        let moveY;
        if (dx === 0 && dy === 0) {
            return;
        }
        const left = this._previousLeft + dx;
        const right = this._previousRight + dx;
        const top = this._previousTop + dy;
        const bottom = this._previousBottom + dy;
        // console.log('right', this._position.style.right)
        this.setLeft(left);
        this.setRight(right);
        this.setTop(top);
        this.setBottom(bottom);

        this._updateNativeStyles();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        const {dx, dy} = gestureState;
        // this._unHighlight();
        this._previousLeft += dx;
        this._previousRight += dx;
        this._previousTop += dy;
        this._previousBottom += dy;
    };

    // Top Left functions
    _handleTopLeftPanResponderMove = (event, gestureState) => {
        const left = this._previousLeft + gestureState.dx;
        const top = this._previousTop + gestureState.dy;
        this.setLeft(left);
        this.setTop(top);
       this._updateNativeStyles();
    };

    _handleTopLeftPanResponderEnd = (event, gestureState) => {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    // Bottom Left functions
    _handleBottomLeftPanResponderMove = (event, gestureState) => {
       const left = this._previousLeft + gestureState.dx;
       const bottom = this._previousBottom + gestureState.dy;
       this.setLeft(left);
       this.setBottom(bottom);
       this._updateNativeStyles();
    };

    _handleBottomLeftPanResponderEnd = (event, gestureState) => {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousBottom += gestureState.dy;
    };

    // Top Right functions
    _handleTopRightPanResponderMove = (event, gestureState) => {
       const right = this._previousRight + gestureState.dx;
       const top = this._previousTop + gestureState.dy;
       this.setRight(right);
       this.setTop(top);
       this._updateNativeStyles();
    };

    _handleTopRightPanResponderEnd = (event, gestureState) => {
        this._unHighlight();
        this._previousRight += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    // Bottom Right functions
    _handleBottomRightPanResponderMove = (event, gestureState) => {
       const right = this._previousRight + gestureState.dx;
       const bottom = this._previousBottom + gestureState.dy;
       this.setRight(right);
       this.setBottom(bottom);
       this._updateNativeStyles();
    };

    _handleBottomRightPanResponderEnd = (event, gestureState) => {
        // console.log('gesturedx', gestureState.dx);
        // console.log('gesturedy', gestureState.dy);
        this._unHighlight();
        this._previousRight += gestureState.dx;
        this._previousBottom += gestureState.dy;
    };


    _cropBoxPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
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
        console.log('heightBoundary', this.props.heightBoundary);
        return (

            <View
                style={styles.crop}
                ref={crop => {
                    this.crop = crop;
                }}
            >
                <View style={styles.cropBox} {...this._cropBoxPanResponder.panHandlers}></View>
                <View style={styles.topLeftCorner} {...this._topLeftPanResponder.panHandlers}></View>
                <View style={styles.topRightCorner} {...this._topRightPanResponder.panHandlers}></View>
                <View style={styles.bottomLeftCorner} {...this._bottomLeftPanResponder.panHandlers}></View>
                <View style={styles.bottomRightCorner} {...this._bottomRightPanResponder.panHandlers}></View>
            </View>
        )
    }


    setLeft(left: number) {
        if (left <= 0) {
            this._position.style.left = 0;
        } else if (left >= (this.widthBoundary - this._position.style.right)) {
            this._position.style.left = this.widthBoundary - this._position.style.right;
        } else {
            this._position.style.left = left;
        }
    }
    setRight(right: number) {
        // console.log('right', -right, 'vs', 100 - this._position.style.left)
        if (right >= 0) {
            this._position.style.right = 0;
        } else if (-right >= this.widthBoundary - this._position.style.left) {
            // console.log('got in?')
            this._position.style.right = this.widthBoundary - this._position.style.left;
        } else {
            this._position.style.right = -right;
        }
    }
    setTop(top: number) {
        if (top <= 0) {
            this._position.style.top = 0;
        } else if (top >= this.heightBoundary - this._position.style.bottom) {
            this._position.style.top = this.heightBoundary - this._position.style.bottom;
        } else {
            this._position.style.top = top;
        }
    }
    setBottom(bottom: number) {
        if (bottom >= 0) {
            this._position.style.bottom = 0;
        } else if (-bottom >= this.heightBoundary - this._position.style.top) {
            this._position.style.bottom = this.heightBoundary - this._position.style.top;
        } else {
            this._position.style.bottom = -bottom;
        }
    }
}


const styles = StyleSheet.create({
  crop: {
    // width: 250,
    // height: 350,
    flex: 1,
    // borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,

    opacity: 1
  },
  cropBox: {
     flex: 1,
     backgroundColor: '#D3D3D350',
     // opacity: .4,
     borderWidth: 1,
     borderColor: 'white',
     position: 'absolute',
     left: 0,
     bottom: 0,
     right: 0,
     top: 0,
  },
  container: {
    flex: 1,
    // position: 'absolute'
  },
  topLeftCorner: {
      position: 'absolute',
      left: -2,
      top: -2,
      width: 25,
      height: 25,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderColor: 'white'
  },
  topRightCorner: {
      position: 'absolute',
      right: -2,
      top: -2,
      width: 25,
      height: 25,
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderColor: 'white'
  },
  bottomLeftCorner: {
      position: 'absolute',
      left: -2,
      bottom: -2,
      width: 25,
      height: 25,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      borderColor: 'white'
  },
  bottomRightCorner: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 25,
      height: 25,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderColor: 'white'
  }
});

export default Crop;
