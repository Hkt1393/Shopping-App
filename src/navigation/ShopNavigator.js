import {Platform, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductOverview from '../screens/shop/ProductOverview';
import Colors from '../Theme/Colors';
import ProductDetail from '../screens/shop/ProductDetail';
import Cart from '../screens/shop/Cart';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Order from '../screens/shop/Order';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function ShopNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={ProductsScreen} />
        <Drawer.Screen name="Order" component={Order} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ProductsScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialIcons name="menu" size={25} color="white" />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="ProductOverview"
        component={ProductOverview}
        options={{title: 'All Products'}}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
