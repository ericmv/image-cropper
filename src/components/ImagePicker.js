import React from 'react'
import {
    View,
    Text,
    CameraRoll,
    Button,
    Image,
    FlatList,
    Dimensions,
    TouchableHighlight,
    ImagePickerIOS
} from 'react-native';



const { width } = Dimensions.get('window')
const tileDimensions = width/4;


class ImagePicker extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [],
            selected: {},
            image: null
        };
    }

    componentDidMount() {
        const params = {
            first: 20,
            assetType: 'Photos'
        }

        CameraRoll.getPhotos(params).then((results) => {
            // console.log('RESULTS', results);
            const images = results.edges.map((image) => {
                return image.node.image;
            })
            this.setState({images: images})
        })
    }

    selectTile = (item, index) => {
        const selected = this.state.selected;
        if (!selected[index]) {
            selected[index] = item;
        } else {
            delete selected[index];
        }
        this.setState({selected: selected});
    }

    renderTile = ({item, index}) => {
        const isSelected = this.state.selected[index.toString()];
        const opacity = isSelected ? 0.5 : 1;
        return (
            <TouchableHighlight
                onPress={() => this.selectTile(item, index)}
                style={{opacity: opacity}}
            >
                <Image
                    style={{width: tileDimensions, height: tileDimensions}}
                    source={{uri: item.uri}}
                />
            </TouchableHighlight>

        )
    }

    handleConfirm = async () => {
        const selected = this.state.selected;
        const index = Object.keys(selected)[0];
        const image = selected[index];
        const uri = image.uri;
        this.props.onConfirm(image);
        // Object.keys(selected).forEach(async (key) => {
        //     const image = selected[key];
        //     const uri = image.uri;
        //     const response = await fetch(uri);
        //     const blob = await response.blob();
        //     // Upload
        // })
    }


    render() {

        return (
            <View>

                <View>
                    <FlatList
                        data={this.state.images}
                        numColumns={4}
                        renderItem={this.renderTile}
                        keyExtractor={(_,index) => index}
                        extraData={this.state}
                    />
                </View>
                <Button
                    title="Choose"
                    onPress={this.handleConfirm}
                />
            </View>
        )
    }

}


export default ImagePicker;
