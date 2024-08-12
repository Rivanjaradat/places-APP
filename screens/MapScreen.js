import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constents/Colors';

const MapScreen = ({ route, navigation }) => {
  const { initialLocation = { lat: 31.888363440411652, lng: 35.206599871088855 }, readonly = false } = route.params || {};

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation.lat,
    longitude: initialLocation.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        readonly ? null : (
          <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        )
      )
    });
  }, [navigation, savePickedLocationHandler, readonly]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
