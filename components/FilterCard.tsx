import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    filter: { id: Number, result_url: String },
    navigation: NavigationType
}

const FilterCard = (props: Props) => {

    const { id, result_url } = props.filter

    const goToFilterDetailed = () => {
        props.navigation.navigate('FilterDetailed', { id, result_url })
    }
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={goToFilterDetailed} >
                <Image style={styles.image} source={{ uri: result_url }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 1,
        borderRadius: 6,
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
