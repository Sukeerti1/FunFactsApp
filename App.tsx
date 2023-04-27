import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import HomeScreen from './src/views/Home';
import { Provider } from "react-redux";
import  store from "./src/store"
import Navigator from "./src/navigations";

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.statusBarContainer}>
      <StatusBar barStyle="light-content" />
    </View>
    <Navigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "black",
  },
});
