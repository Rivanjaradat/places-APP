import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';

import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailsScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constents/Colors';

const Stack = createNativeStackNavigator();


const commonScreenOptions = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  
    /*headerLeft: () => (
        <Ionicons 
            name="menu" 
            size={24} 
            color={Platform.OS === 'android' ? 'white' : Colors.primary} 
            onPress={() => navigation.toggleDrawer()} 
            style={{ marginLeft: 10, marginRight: 10 }}
        />
    )*/
});

const PlacesNavigator = () => (
    <NavigationContainer>
    <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen 
        name="allList"
        component={PlacesListScreen}
        options={{ title: 'Places List'}}
        />

   
    <Stack.Screen 
            name="PlaceDetail" 
            component={PlaceDetailScreen} 
            options={{ title: 'Place Detail' }}
        />
        <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ title: 'Map' }}
            //go back


        />
        <Stack.Screen 
            name="NewPlace" 
            component={NewPlaceScreen} 
            options={{ title: 'New Place' }}
        />
        
        
    </Stack.Navigator>
    </NavigationContainer>
);


/*const Drawer = createDrawerNavigator();

const ShopNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen 
                name="Products" 
                component={ProductsNavigator}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons 
                            name="cart" 
                            size={23} 
                            color={color} 
                        />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Orders" 
                component={OrderNavigator} 
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons 
                            name="list" 
                            size={23} 
                            color={color} 
                        />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Admin" 
                component={AdminNavigator} 
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons 
                            name="create" 
                            size={23} 
                            color={color} 
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    </NavigationContainer>
);

*/
export default PlacesNavigator;
