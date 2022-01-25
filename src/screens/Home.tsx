import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import NaverMapView, {Coord} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import {GRAY, PRIMARY_COLOR} from '../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLayout} from '../hooks/useLayout';
import {useNavigation} from '@react-navigation/native';
import {Props} from '../navigation/HomeStack';
import {API_KEY} from '../../API_KEY';
import {XMLParser} from 'fast-xml-parser';
import {CustomMarker} from '../components/CustomMarker';
import {useEffect} from 'react';
import {locationCodeMatch, locationCodeMath} from '../data/locationCodeMatch';

export const Home = function () {
  const [layout, setLayout] = useLayout();
  const navigation = useNavigation<Props['navigation']>();
  const [tradingDataList, setTradingDataList] = useState();

  //현재 내위치, 시작할 때 한 번 설정되고 그 다음 버튼누를 때 업데이트
  const [myLocation, setMyLocation] = useState<Coord>({
    latitude: 37.497849,
    longitude: 127.027694,
  });
  //화면 중앙위치, 시작할 때 한 번 설정되고 그 다음 화면 움질일 때 업데이트
  const [centerLocation, setCenterLocation] = useState<Coord>({
    latitude: 37.497849,
    longitude: 127.027694,
  });

  //현재 내 위치 받아오기
  const getCurrentPosition = () =>
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

  //실거래가 받아오기
  const getTradingData = async function (location: Coord) {
    await fetch(
      `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=11110&DEAL_YMD=202112`,
    )
      .then(res => res.text())
      .then(textResponse => {
        const parser = new XMLParser();
        return parser.parse(textResponse);
      })
      .then(res => console.log(res.response.body.items.item));
  };

  //구(강남구) 주소를 통해서 위치 받아오기
  const adressToLocation = async function () {
    await fetch(
      'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=분당구 불정로 6&coordinate=127.1054328,37.3595963',
      {
        headers: {
          'X-Ncp-Apigw-Api-Key': 'B93b2T9hOWTpkztSXdR4k1dR0kngwVwyFU5Cw7X7',
          'X-Ncp-Apigw-Api-Key-Id': 'a2l3b78sb7',
        },
      },
    )
      .then(res => res.json())
      .then(res => console.log(res.results));
  };

  //위치를 통해서 구(강남) 받아오기
  const locationToAdress = async function (location: Coord) {
    await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${location.latitude},${location.latitude}&sourcecrs=epsg:4326&output=json&orders=legalcode,admcode`,
      {
        headers: {
          'X-Ncp-Apigw-Api-Key': 'B93b2T9hOWTpkztSXdR4k1dR0kngwVwyFU5Cw7X7',
          'X-Ncp-Apigw-Api-Key-Id': 'a2l3b78sb7',
        },
      },
    )
      .then(res => res.json())
      .then(res => console.log(res.results[1].region.area2.name)); //구 이름 추출
  };
  locationToAdress(centerLocation);
  // useEffect(() => {});

  return (
    <View style={styles.view} onLayout={setLayout}>
      <View style={styles.mapView}>
        <NaverMapView
          style={styles.mapView}
          useTextureView
          zoomControl={false}
          showsMyLocationButton
          center={{...myLocation, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={e => console.log(JSON.stringify(e))}
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        >
          <CustomMarker location={myLocation} />
        </NaverMapView>
      </View>
      <TouchableOpacity
        style={[
          styles.gpsIcon,
          {
            left:
              layout.width < layout.height
                ? layout.width - 60
                : layout.width - 100,
          },
        ]}>
        <View>
          <Icon name="crosshairs-gps" size={30} color={PRIMARY_COLOR} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.gpsIcon,
          {
            left:
              layout.width < layout.height
                ? layout.width - 60
                : layout.width - 100,
          },
        ]}
        onPress={() => {
          navigation.navigate('ProductSpecific');
        }}>
        <View>
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
