import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View ,Button} from 'react-native';
import Colors from '../constents/Colors';
const PlaceDetailScreen= ({navigation}) =>{
    const route = useRoute();
    const placeId = route.params.placeId;
    const placeName=route.params. placeTitle
   
    React.useLayoutEffect(() => {
       
        navigation.setOptions({
          headerTitle: placeName
          
        });
      }, [navigation]);
    return (
        <View style={styles.container}>
            <Text>PlaceDetail Screen</Text>
            <Button title="Go to New Place" onPress={()=>navigation.navigate('NewPlace')} />

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
export default PlaceDetailScreen;