import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {ProductSpecific} from '../screens/ProductSpecific';
import {PRIMARY_COLOR} from '../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function HomeStack() {
  const Stack = createStackNavigator<HomeStackParamList>();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: PRIMARY_COLOR},
        headerTitleAlign: 'center',
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="TuringNoNo" component={Home} />
      <Stack.Screen
        name="ProductSpecific"
        component={ProductSpecific}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

type HomeStackParamList = {
  TuringNoNo: undefined;
  ProductSpecific: undefined;
};

// export type ProductSpecificProps = StackScreenProps<
//   HomeStackParamList,
//   'ProductSpecific'
// >;

export type Props = StackScreenProps<HomeStackParamList>;
