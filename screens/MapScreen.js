import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const MapScreen= ({navigation}) =>{
    React.useLayoutEffect(() => {
       
        navigation.setOptions({
          headerTitle: 'map',
          
        });
      }, [navigation]);
    return (
        <View style={styles.container}>
            <Text>Map Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default MapScreen;