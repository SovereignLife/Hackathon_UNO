import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Colors, Button, ActivityIndicator, FAB, Portal, Provider } from 'react-native-paper';

interface Props {
    id: Number,
    preview_url: String
}

export default function FilterDetailed(props: Props) {
    const [image, setimage] = useState(null)
    const [imageFiltered, setImageFiltered] = useState(null)
    const [imageFiltering, setImageFiltering] = useState(false)
    const { id, preview_url } = props.route.params
    useEffect(() => {
        _pickImage()
    }, [])

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const getRandomArbitrary = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    const _pickImage = async () => {
        try {
            setImageFiltering(true)
            setImageFiltered(null)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            setimage(result.uri)
            const uploadedImage = await _uploadImage(result)
            setImageFiltered(await _filterImage(uploadedImage))
            setImageFiltering(false)
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

    const _filterImage = async (image_url: string | Blob) => {
        try {
            const body = new FormData()
            body.append('url', image_url)
            body.append('key', "v6CbLECJv2CMnq5t")
            body.append('id', id.toString())
            const response = await fetch('https://photolab.me/api/create', { method: 'POST', body })
            const json = await response.json()
            console.log('template', id, 'text', json)
            return json.result_img

        } catch (E) {
            console.log('filterError', E)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                {imageFiltered && <Image source={{ uri: imageFiltered }} style={styles.image} />}
                {imageFiltering && <ActivityIndicator style={styles.activityIndicator} animating={true} size={32} color={Colors.red800} />}
            </View>
            <View>
                <Button onPress={_pickImage} icon="folder">Выбрать фото</Button>
                <Button icon="camera">Снять на камеру</Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 1,
        marginTop: 25
    },
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    activityIndicator: {
        position: 'absolute'

    }
});
