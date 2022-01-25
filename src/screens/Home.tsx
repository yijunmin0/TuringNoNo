import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import NaverMapView, {Marker, Coord, Align} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import {GRAY, LIGHT_GRAY, PRIMARY_COLOR} from '../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLayout} from '../hooks/useLayout';
import {useNavigation} from '@react-navigation/native';
import {Props} from '../navigation/HomeStack';
import {ImageBackground} from 'react-native';

export const Home = function () {
  const [layout, setLayout] = useLayout();
  const navigation = useNavigation<Props['navigation']>();
  const [myLocation, setMyLocation] = useState<Coord>({
    latitude: 37.497849,
    longitude: 127.027694,
  });
  const P0 = {latitude: 37.564362, longitude: 126.977011};

  const abc = () =>
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log({
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  return (
    <View style={styles.view} onLayout={setLayout}>
      <View style={styles.mapView}>
        <NaverMapView
          style={styles.mapView}
          useTextureView
          zoomControl={false}
          center={{...myLocation, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        >
          {Platform.OS === 'android' ? (
            <Marker coordinate={myLocation} width={60} height={60}>
              <ImageBackground
                source={require('../assets/images/marker.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: LIGHT_GRAY, fontSize: 12}}>47평</Text>
                <Text style={{color: 'white', fontSize: 14}}>11.8억</Text>
              </ImageBackground>
            </Marker>
          ) : (
            <Marker
              image={{uri: require('../assets/images/marker.png')}}
              coordinate={myLocation}
              width={60}
              height={60}
              caption={{
                text: '47평',
                align: Align.Center,
                textSize: 12,
                color: LIGHT_GRAY,
                haloColor: 'transparent',
              }}
              subCaption={{
                text: '11.8억',
                textSize: 14,
                color: 'white',
                haloColor: 'transparent',
              }}
            />
          )}
        </NaverMapView>
      </View>
      <TouchableOpacity>
        <View
          style={[
            styles.gpsIcon,
            {
              left:
                layout.width < layout.height
                  ? layout.width - 60
                  : layout.width - 100,
            },
          ]}>
          <Icon name="crosshairs-gps" size={30} color={PRIMARY_COLOR} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductSpecific');
        }}>
        <View
          style={[
            styles.gpsIcon,
            {
              left:
                layout.width < layout.height
                  ? layout.width - 60
                  : layout.width - 100,
            },
          ]}>
          <Icon name="clipboard-arrow-right" size={30} color={PRIMARY_COLOR} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: PRIMARY_COLOR},
  mapView: {flex: 1, position: 'absolute', width: '100%', height: '100%'},
  gpsIcon: {
    width: 44, //design guide
    height: 44,
    justifyContent: 'center',
    top: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: GRAY,
    borderRadius: 5,
  },
});
