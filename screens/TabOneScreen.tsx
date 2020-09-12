import React, { useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TextInput, Button } from 'react-native-paper';

export default function TabOneScreen() {
  const [text, setText] = useState('')
  const [image, setimage] = useState(null)
  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setimage(result.uri)
      let splitedUri = result.uri.split('/')
      let name = splitedUri[splitedUri.length - 1]
      let type = name.split('.')[1]

      const file = {
        uri: result.uri,
        name,
        type: `image/${type}`
      }

      const body = new FormData()
      body.append('file', file)
      const response = await fetch('http://upload-soft.photolab.me/upload.php', {
        method: 'POST',
        body
      })
      const text = await response.text()


    } catch (E) {
      console.log(E);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button onPress={_pickImage}>Выбор файла</Button>
      {image && <Image source={{ uri: image }} style={{ width: '50%', height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
