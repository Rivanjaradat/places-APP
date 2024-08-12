import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import Colors from '../constents/Colors';


const LocationPicker = ({ onLocationPicked }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
    const route = useRoute(); 
    const navigation = useNavigation();
    const mapPickedLocation = route.params?.pickedLocation; 

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
              });
        
           
            setTimeout(() => {
                setIsFetching(false);
            }, 2000);
        } catch (err) {
            console.error('Error fetching location:', err);
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            );
            setIsFetching(false);
        }
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.mapPreview}
                location={pickedLocation}
                onPress={pickOnMapHandler}
            >
                {isFetching ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Text>No location chosen yet!</Text>
                )}
            </MapPreview>
            <View style={styles.actions}>
                <Button
                    title="Get User Location"
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button
                    title="Pick on Map"
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;
