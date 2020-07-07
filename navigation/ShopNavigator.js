import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import EditUserProductsScreen from '../screens/EditUserProductsScreen';
import UserProductsOverviewScreen from '../screens/UserProductsOverviewScreen';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
        height: Platform.OS === 'android' ? 100 : 70,
    },
    headerTitleStyle: {
        fontFamily: 'noto-b',
        fontSize: 20,
    },
    headerBackTitleStyle: {
        fontFamily: 'noto'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const ShopNavigator = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName="ProductsOverview"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="ProductsOverview" 
                component={ProductsOverviewScreen} 
                options={(navData) => ({
                    title: 'The Plant Shop',
                    headerRight: () => (
                        <HeaderButtons
                        HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Cart" 
                                iconName="ios-cart"
                                onPress={() => {
                                    navData.navigation.navigate('Cart')
                                }}
                            />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />
            <Stack.Screen 
                name="ProductDetails" 
                component={ProductDetailsScreen} 
            />
            <Stack.Screen 
                name="Cart" 
                component={CartScreen} 
                options={() => ({
                    title: 'My cart'
                })}
            />
        </Stack.Navigator>
    );
};

const OrdersNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Orders"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="Orders" 
                component={OrdersScreen}
                options={({ route }) => ({ 
                    title: 'My orders',
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ManageProductsNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="UserProductsOverview"
            screenOptions={defaultStackNavOptions}
        >
            <Stack.Screen 
                name="UserProductsOverview" 
                component={UserProductsOverviewScreen}
                options={(navData) => ({ 
                    title: 'My products',
                    headerRight: () => (
                        <HeaderButtons
                        HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Add" 
                                iconName="ios-add-circle"
                                onPress={() => {
                                    navData.navigation.navigate('Edit')
                                }}
                            />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons
                            HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Menu" 
                                iconName="ios-menu"
                                onPress={() => {
                                    navigation.toggleDrawer();
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />
            <Stack.Screen 
                name="Edit" 
                component={EditUserProductsScreen}
                options={(navData) => ({ 
                    title: 'Edit Products',
                    headerRight: () => (
                        <HeaderButtons
                        HeaderButtonComponent={HeaderButton}
                        >
                            <Item 
                                title="Check" 
                                iconName="ios-checkmark-circle"
                                onPress={() => {
                                    navData.navigation.navigate('UserProductsOverview')
                                }}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: Colors.accentColor,
                    labelStyle: {
                        fontFamily: 'noto'
                    }
                }}>
                <Drawer.Screen 
                    name="Shop" 
                    component={ShopNavigator} 
                />
                <Drawer.Screen 
                    name="Orders" 
                    component={OrdersNavigator} 
                />
                <Drawer.Screen 
                    name="Products" 
                    component={ManageProductsNavigator} 
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;