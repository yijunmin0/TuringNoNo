import React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import NaverMapView, {Marker, Coord} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import {GRAY, PRIMARY_COLOR} from '../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {useLayout} from '../hooks/useLayout';
import {useEffect} from 'react';

export const Home = function () {
  const [layout, setLayout] = useLayout();
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
          zoomControl={false}
          center={{...myLocation, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        >
          <Marker
            coordinate={myLocation}
            onClick={() => console.warn('onClick! p0')}
          />
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
          <Icon name="crosshairs-gps" size={30} color={PRIMARY_COLOR}></Icon>
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
