import React, { useState, useCallback } from 'react';
import { ScrollView, View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constents/Colors';
import * as placesActions from '../store/places-actions';
import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = () => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();
 
    const dispatch = useDispatch();
    const navigation = useNavigation();
   

  

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback(location => {
        console.log(location);
        setPickedLocation(location);
    }, []);

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const savePlaceHandler = async () => {
        if (titleValue.trim().length === 0 || !selectedImage || !pickedLocation) {
            Alert.alert('Invalid input', 'Please provide a title, pick an image, and choose a location.');
            return;
        }
        try {
            await dispatch(placesActions.addPlace(titleValue, selectedImage, pickedLocation));
            navigation.goBack();
        } catch (err) {
            console.error('Error saving place:', err);
            Alert.alert('An error occurred!', 'Unable to save the place.');
        }
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={navigation} onLocationPicked={locationPickedHandler} />
                <Button
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
