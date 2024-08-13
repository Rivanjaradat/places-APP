import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constents/Colors';
import { useRoute, useNavigation } from '@react-navigation/native';

const MapScreen = ({ navigation }) => {
  const route = useRoute();
  const{initialLocations,readonly}=route.params?route.params:{locations:null,readonly:false};
 

  const [selectedLocation, setSelectedLocation] = useState(initialLocations);

  const mapRegion = {
    latitude:initialLocations? initialLocations.lat:31.88836,
    longitude: initialLocations?initialLocations.lng:35.2065,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
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
      ),
    });
  }, [navigation, savePickedLocationHandler, readonly]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
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
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

export default MapScreen;
