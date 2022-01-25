import React from 'react';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ImageBackground, Platform, Text} from 'react-native';
import {Align, Coord, Marker} from 'react-native-nmap';
import {LIGHT_GRAY} from '../../config';

type CustomMarkerProps = {
  location: Coord;
};

export const CustomMarker: FC<CustomMarkerProps> = function ({location}) {
  return (
    <>
      {Platform.OS === 'android' ? (
        <Marker coordinate={location} width={60} height={60}>
          <ImageBackground
            source={require('../assets/images/marker.png')}
            style={styles.androidMarker}>
            <Text style={styles.androidCaption}>47평</Text>
            <Text style={styles.androidCaption}>11.8억</Text>
          </ImageBackground>
        </Marker>
      ) : (
        <Marker
          image={{
            uri: 'https://github.com/yijunmin0/TuringNoNo/blob/%ED%99%88%ED%99%94%EB%A9%B4%EA%B0%9C%EB%B0%9C/src/assets/images/marker.png?raw=true',
          }}
          coordinate={location}
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
    </>
  );
};

const styles = StyleSheet.create({
  androidMarker: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidCaption: {color: LIGHT_GRAY, fontSize: 12},
  androidSubCaption: {color: 'white', fontSize: 14},
});
