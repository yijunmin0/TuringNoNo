import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeStack} from './src/navigation/HomeStack';

const App = function () {
  return (
    <View style={styles.View}>
      <HomeStack />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {flex: 1},
  mapView: {flex: 1},
});

export default App;
