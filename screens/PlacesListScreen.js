import React from 'react';
import { StyleSheet, Text, View,Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import Colors from '../constents/Colors';
const PlacesListScreen= ({navigation}) =>{
    const places = useSelector(state => state.places.places);
    React.useLayoutEffect(() => {
       
        navigation.setOptions({
          headerTitle: 'All places',
          headerRight: () => (
            <Ionicons 
                name="add" 
                size={24} 
                color={Platform.OS === 'android' ? 'white' : Colors.primary} 
                onPress={
                    () => navigation.navigate('NewPlace')
                } 
                style={{ marginLeft: 10, marginRight: 10 }}
            />
        )
          
        });
      }, [navigation]);
    return (
        <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={null}
            onSelect={() => {
              navigation.navigate('PlaceDetail', {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id 
              });
            }}
          />
        )}
      />
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default PlacesListScreen;