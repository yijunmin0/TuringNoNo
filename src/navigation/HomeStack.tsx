import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {ProductSpecific} from '../screens/ProductSpecific';

export function HomeStack() {
  const Stack = createStackNavigator<HomeStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductSpecific" component={ProductSpecific} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type HomeStackParamList = {
  Home: undefined;
  ProductSpecific: undefined;
};

// export type ProductSpecificProps = StackScreenProps<
//   HomeStackParamList,
//   'ProductSpecific'
// >;

export type Props = StackScreenProps<HomeStackParamList>;
