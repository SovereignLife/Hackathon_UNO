import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface Props {

}

const WIDTH = 64

const CurrentImage = (props: Props) => {
    return (
        <View style={styles.imageContainer}>
            <Text>123</Text>
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
        justifyContent: 'center',
        alignItems: 'center'

    }
})