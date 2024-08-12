import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk' 

import PlacesNavigator from './navigation/placesNavigation';
import  placesReducer from './store/places-reducer'; 
import {init} from './helpers/db';
init().then(()=>{
  console.log('Initialized database');
}).catch(err=>{
  console.log('Initializing db failed');
  console.log(err);
});
const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); 

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <PlacesNavigator />
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
