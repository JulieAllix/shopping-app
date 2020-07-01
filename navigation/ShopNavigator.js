import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
        height: Platform.OS === 'android' ? 100 : 50,
    },
    headerTitleStyle: {
        fontFamily: 'notable',
        fontSize: 24,
    },
    headerBackTitleStyle: {
        fontFamily: 'noto'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const Products = ({navigation}) => {
    return (
        <NavigationContainer
            initialRouteName="Products Overview"
            headerMode="screen"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Navigator>
                <Stack.Screen 
                    name="Products Overview" 
                    component={ProductsOverviewScreen} 
                />
                <Stack.Screen 
                    name="Product Details" 
                    component={ProductDetailsScreen} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Products;