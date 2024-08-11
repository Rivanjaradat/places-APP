import React,{useState} from 'react';
import { StyleSheet, Text, View,Button ,TextInput,ScrollView} from 'react-native';
import Colors from '../constents/Colors';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
const NewPlaceScreen=({navigation}) =>{
    const [image,setImage]=useState();
    const dispatch=useDispatch();
    const [title,setTitle]=useState('');
    const titleChangeHandler = (text) => {
        // you could add validation
        setTitle(text);
    };
    const imageTakenHandler=imagePath=>{
        setImage(imagePath);
    }
    const savePlaceHandler=()=>{
        dispatch(placesActions.addPlace(title,image));
        
        navigation.goBack();

    }
    React.useLayoutEffect(() => {
       
        navigation.setOptions({
          headerTitle: 'Add places',
          
        });
      }, [navigation]);
    return (
        <ScrollView>
        <View style={styles.form}>
            <Text style={styles.lable}>Title</Text>
            <TextInput  style={styles.textInput} 
            value={title}
            onChangeText={titleChangeHandler}

            />
            <ImagePicker onImageTaken={imageTakenHandler}/>
            <Button title="Save Place"  color={Colors.primary}onPress={savePlaceHandler} />
                </View>
        </ScrollView>
        
    );
};
const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    lable: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    }
});
export default NewPlaceScreen;