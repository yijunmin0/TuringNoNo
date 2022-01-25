import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {HomeStack} from './src/navigation/HomeStack';

const App = function () {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'black'} />
      <SafeAreaView
        style={styles.SafeAreaView}
        forceInset={{bottom: 'never', top: 'never', horizontal: 'never'}}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {flex: 1},
  mapView: {flex: 1},
});

export default App;
