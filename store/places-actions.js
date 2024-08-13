import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES'; // To fetch data from the database 

export const addPlace = (title, image, location) => {
  return async dispatch => {
    let address = 'Unknown address';

    // Attempt to fetch address using Nominatim API
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address from Nominatim API!');
      }

      const resData = await response.json();
      if (resData.address) {
        address = resData.address.road || 'Fallback address';
      } else {
        throw new Error('No results found from Nominatim API!');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      // Use default or fallback address if API fails
      address = 'Fallback address';
    }

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });

      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      });
    } catch (err) {
      console.error('Error saving place:', err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log('Loaded Places:', dbResult);
      dispatch({ type: SET_PLACES, places: dbResult });
    } catch (err) {
      console.error('Error loading places:', err);
      throw err;
    }
  };
};
