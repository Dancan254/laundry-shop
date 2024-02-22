import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screen/HomeScreen'; // Adjust the path accordingly
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator/>
      <StatusBar style = "auto"/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
