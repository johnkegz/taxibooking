import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default () => (
  <View style={styles.container}>
    <MapView
      //   provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 0.342885,
        longitude: 32.591601,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <MapView.Marker
        coordinate={{
          latitude: 0.342885,
          longitude: 32.591601,
        }}
        pinColor="green"
      />
    </MapView>
  </View>
);
