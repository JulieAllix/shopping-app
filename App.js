//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer,
});
 
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'notable': require('./assets/fonts/Notable-Regular.ttf'),
    'noto': require('./assets/fonts/NotoSans-Regular.ttf'),
    'noto-b': require('./assets/fonts/NotoSans-Bold.ttf'),
    'inconsolata': require('./assets/fonts/Inconsolata-Bold.ttf'),
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
 
  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)} 
        onError={() => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
        <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
