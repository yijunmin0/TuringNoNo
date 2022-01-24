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
import {PRIMARY_COLOR} from '../../config';
import Icon from 'react-native-vector-icons/AntDesign';

export const Home = function () {
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
    <View style={styles.View}>
      <TouchableOpacity>
        <View>
          <Icon name="left" size={20}></Icon>
        </View>
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  View: {flex: 1},
  mapView: {flex: 1},
});
