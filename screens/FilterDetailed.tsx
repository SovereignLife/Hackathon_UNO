import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import FilterCard from '../components/FilterCard';
import { Text, View } from '../components/Themed';
import { Colors, Button, ActivityIndicator, FAB, Portal, Provider, Title, Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {
    selectCurrentUrl,
    setCurrentUrl
} from '../store/imageSlice';
import { useSelector, useDispatch } from 'react-redux';

const BACKGROUND_COLOR = "#2B3050"

interface Props {
    id: Number,
    preview_url: String
}

export default function FilterDetailed(props: Props) {
    const currentImage = useSelector(selectCurrentUrl)
    const [image, setimage] = useState(null)
    const [imageFiltered, setImageFiltered] = useState(null)
    const [imageFiltering, setImageFiltering] = useState(false)
    const [bestFilters, setbestFilters] = useState(null)
    const dispatch = useDispatch();


    const navigation = props.navigation

    let { id, preview_url } = props.route.params

    useEffect(() => {
        _getBestFilters()
    }, [])

    useEffect(() => {
        if (currentImage) {
            setImageFiltering(true)
            setimage(currentImage)
            _filterImage(currentImage)
        }

    }, [currentImage])



    const _getBestFilters = async () => {
        const response = await fetch('https://photolab.me/api/feed/best')
        const json = await response.json()
        setbestFilters(json)
    }

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
            dispatch(setCurrentUrl(uploadedImage))
            await _filterImage(uploadedImage)

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
            setImageFiltered(json.result_img)
            setImageFiltering(false)

        } catch (E) {
            console.log('filterError', E)
        }


    }

    return (
        <View style={styles.container}>
            <Appbar style={styles.appBar}>
                <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
                <Appbar.Content color="#fff" title="Фильтр" />
            </Appbar>
            <ScrollView>

                <View style={styles.imageContainer}>
                    {image ? <Image source={{ uri: image }} style={styles.image} />
                        :
                        <TouchableOpacity onPress={_pickImage} style={[styles.image, { flexDirection: 'column', position: 'relative', alignItems: 'center' }]}>
                            <Image resizeMode="contain" source={require('../assets/images/sadDog.png')} style={styles.image} />
                        </TouchableOpacity>}
                    {imageFiltered && <Image source={{ uri: imageFiltered }} style={styles.image} />}
                    {imageFiltering && <ActivityIndicator style={styles.activityIndicator} animating={true} size={32} color={Colors.red800} />}
                </View>
                <Title style={[styles.title, { color: '#ff6a66', textAlign: 'center', justifyContent: 'center' }]}>Выбери фотографию</Title>

                <View style={{ flexDirection: 'column', }}>
                    <Button color="#fff" onPress={_pickImage} icon="folder">Выбрать фото</Button>
                    <Button color="#fff" icon="camera">Снять на камеру</Button>
                </View>
                <Title style={styles.title}>Похожие фильтры</Title>
                <ScrollView pagingEnabled={true} style={styles.scrollView} showsHorizontalScrollIndicator={false} horizontal={true}>
                    {bestFilters && bestFilters.map(filter => {
                        return (
                            <TouchableOpacity style={{ width: 100 }} onPress={() => { id = filter.id; _filterImage(currentImage) }}>
                                <FilterCard navigation={navigation} key={filter.id} filter={filter} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 1,
        backgroundColor: BACKGROUND_COLOR,
        marginTop: 25
    },
    scrollView: {
        width: '100%',
        backgroundColor: BACKGROUND_COLOR
    },
    appBar: {
        elevation: 0,
        backgroundColor: 'transparent'
    },
    title: {
        marginTop: 10,
        padding: 10,
        color: '#556272',

        backgroundColor: BACKGROUND_COLOR
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
