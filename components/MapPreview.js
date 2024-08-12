import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://static-maps.yandex.ru/1.x/?ll=${
      props.location.lng
    },${
      props.location.lat
    }&size=400,200&z=14&l=map&pt=${props.location.lng},${props.location.lat},pm2rdm`;
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image 
          style={styles.mapImage} 
          source={{ uri: imagePreviewUrl }} 
          onError={(e) => console.log(e.nativeEvent.error)} // Log image loading errors
        />
      ) : (
        <Text>No location chosen yet!</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure the container takes full width
    height: 200, // Set a default height
  },
  mapImage: {
    width: '100%',
    height: '100%',
  }
});

export default MapPreview;
