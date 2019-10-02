import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const {width, height} = Dimensions.get('window');

const destination = {latitude: 0.330306, longitude: 32.5741};
const GOOGLE_MAPS_APIKEY = '<YOUR_KEY>';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default props => {
  const {destination} = props;
  return (
    <View style={styles.container}>
      <MapView
        // initialRegion={{
        //   latitude: LATITUDE,
        //   longitude: LONGITUDE,
        //   latitudeDelta: LATITUDE_DELTA,
        //   longitudeDelta: LONGITUDE_DELTA,
        // }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker coordinate={props.destination} pinColor="green" />
        <MapView.Marker coordinate={props.origin} pinColor="blue" />
        {/* <Text>{props.latitude}</Text>
        <Text>{props.longitude}</Text> */}
        <MapViewDirections
          origin={props.origin}
          destination={props.destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="red"
          onReady={result => {
            result !== undefined
              ? props.distanceAndDuration(result.distance, result.duration)
              : null;
          }}
          onError={errorMessage => console.log(errorMessage)}
        />
      </MapView>
    </View>
  );
};
