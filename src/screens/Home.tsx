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
import {locationAddressCodeMatch} from '../data/locationAddressCodeMatch';

export const Home = React.memo(function () {
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
  const getTradingData = async function (addressCode: number) {
    return await fetch(
      `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&numbOfRows=1&LAWD_CD=${addressCode}&DEAL_YMD=202112`,
    )
      .then(res => res.text())
      .then(textResponse => {
        const parser = new XMLParser();
        return parser.parse(textResponse);
      })
      .then(res => res.response.body.items.item)
      .catch(err => console.log(err));
  };

  //구(강남구) 주소를 통해서 위치 받아오기
  const addressToLocation = async function (법정동, 지번) {
    return await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${법정동} ${지번}&coordinate=127.1054328,37.3595963`,
      {
        headers: {
          'X-Ncp-Apigw-Api-Key': 'B93b2T9hOWTpkztSXdR4k1dR0kngwVwyFU5Cw7X7',
          'X-Ncp-Apigw-Api-Key-Id': 'a2l3b78sb7',
        },
      },
    )
      .then(res => res.json())
      .then(res => {
        return {latitude: res.addresses[0].y, longitude: res.addresses[0].x};
      })
      .catch(err => console.log(err));
  };
  console.log(addressToLocation('도곡동', 467 - 1));

  //위치를 통해서 구(강남) 받아오기
  const locationToAddress = async function (
    location: Coord,
  ): Promise<keyof typeof locationAddressCodeMatch> {
    return await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${location.longitude},${location.latitude}&sourcecrs=epsg:4326&output=json&orders=legalcode,admcode`,
      {
        headers: {
          'X-Ncp-Apigw-Api-Key': 'B93b2T9hOWTpkztSXdR4k1dR0kngwVwyFU5Cw7X7',
          'X-Ncp-Apigw-Api-Key-Id': 'a2l3b78sb7',
        },
      },
    )
      .then(res => res.json())
      .then(res => res.results[1].region.area2.name) //구 이름 추출
      .catch(err => console.log(err));
  };

  useEffect(() => {
    (async function () {
      const address = await locationToAddress(centerLocation);
      const prevData = await getTradingData(locationAddressCodeMatch[address]);
      // console.log(prevData);
      const data = prevData.map((object: any) => {
        const picked = (({
          거래금액,
          년,
          월,
          일,
          지번,
          법정동,
          아파트,
          전용면적,
          층,
        }) => ({
          거래금액,
          년,
          월,
          일,
          지번,
          법정동,
          아파트,
          전용면적,
          층,
        }))(object);
        return picked;
      });
      const newData = data.map(() => {});
    })();
  }, []);
  //거래금액 건축년도 년 월 일 도로명주소
  //도로명 주소 => 위도경도값으로 변경

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
          // onCameraChange={e => console.log(JSON.stringify(e))}
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
});

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
