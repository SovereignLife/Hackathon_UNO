import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Colors, Button, ActivityIndicator, FAB, Portal, Provider, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import coolFilters from '../coolFilters.json'
import FilterCard from '../components/FilterCard'

const BACKGROUND_COLOR = "#2B3050"

export default function TabOneScreen({ navigation }) {
  const [image, setimage] = useState(null)
  const [imageFiltered, setImageFiltered] = useState(null)
  const [imageFiltering, setImageFiltering] = useState(false)
  const [bestFilters, setbestFilters] = useState(null)

  useEffect(() => {
    _getBestFilters()
  }, [])

  const _getBestFilters = async () => {
    const response = await fetch('https://photolab.me/api/feed/best')
    const json = await response.json()
    setbestFilters(json)
  }

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Топ фильтров</Title>

      <View style={styles.row}>
        {bestFilters && bestFilters.map(filter => {
          return (
            <FilterCard navigation={navigation} key={filter.id} filter={filter} />
          )
        })}
      </View>
    </ScrollView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
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
  title: {
    marginTop: 10,
    padding: 10,
    color: '#fff',


  },
  activityIndicator: {
    position: 'absolute'

  },
  row: {
    flexDirection: 'column',
    maxHeight: 4000,
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,

  }
});
