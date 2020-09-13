import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
    selectCurrentUrl,
    setCurrentUrl
} from '../store/imageSlice';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Button, Avatar } from 'react-native-paper';

interface Props {

}

const WIDTH = 64

const CurrentImage = (props: Props) => {
    const currentImage = useSelector(selectCurrentUrl)
    const [image, setimage] = useState(null)
    const [imageUploaded, setImageUploaded] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
    const dispatch = useDispatch();

    const _pickImage = async () => {
        try {
            setImageUploading(true)
            setImageUploaded(null)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            setimage(result.uri)
            const uploadedImage = await _uploadImage(result)
            setImageUploaded(uploadedImage)
            dispatch(setCurrentUrl(uploadedImage))
            setImageUploading(false)
        } catch (E) {
            console.log('pickError', E);
        }
    };

    const _uploadImage = async (image: ImagePicker.ImagePickerResult) => {
        try {
            let splitedUri = image.uri.split('/')
            let name = splitedUri[splitedUri.length - 1]
            let type = name.split('.')[1]

            const file = {
                uri: image.uri,
                name,
                type: `image/${type}`
            }

            const body = new FormData()
            body.append('file', file)
            const response = await fetch('http://upload-soft.photolab.me/upload.php', {
                method: 'POST',
                body
            })
            return await response.text()
        } catch (E) {

            console.log('uploadError', E);
            return ''
        }
    }

    return (
        <View style={[{ display: currentImage ? 'flex' : "none" }, styles.imageContainer]}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', borderRadius: WIDTH / 2, overflow: 'hidden' }} onPress={_pickImage}>
                {currentImage && <Image style={{ width: WIDTH, height: WIDTH }} source={{ uri: currentImage }} />}
            </TouchableOpacity>
        </View>
    )
}

export default CurrentImage


const styles = StyleSheet.create({
    imageContainer: {

        elevation: 4,
        width: WIDTH,
        height: WIDTH,
        borderRadius: WIDTH / 2,
        backgroundColor: '#fff',
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center'

    }
})