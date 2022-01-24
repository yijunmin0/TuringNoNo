import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {HomeStack} from './src/navigation/HomeStack';

const App = function () {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.SafeAreaView}
        forceInset={{bottom: 'never', top: 'never', horizontal: 'never'}}>
        <HomeStack />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
  mapView: {flex: 1},
});

export default App;
