import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import ShopNavigator from './src/navigation/ShopNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
