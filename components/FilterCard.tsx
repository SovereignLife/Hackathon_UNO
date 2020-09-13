import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    filter: { id: Number, result_url: String },
    navigation: NavigationType,

}

const FilterCard = (props: Props) => {

    const { id, result_url, content_preview } = props.filter
    //const width = content_preview.original_size.width / 
    const width = '45%'
    const height = content_preview.original_size.height / 4
    const goToFilterDetailed = () => {
        props.navigation.navigate('FilterDetailed', { id, result_url })
    }
    return (
        <View style={[styles.card, { width, height }]}>
            <TouchableOpacity onPress={goToFilterDetailed} >
                <Image style={[styles.image, { width: '100%', height }]} source={{ uri: result_url }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 1,
        borderColor: '#000',
        borderRadius: 2,
        overflow: 'hidden',
        margin: 6,
        width: '45%',
        height: 300,
    },
    image: {
        height: '100%',
        width: '100%'
    }
})

export default FilterCard
