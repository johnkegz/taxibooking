import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

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
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: props.latitude,
            longitude: props.longitude,
          }}
          pinColor="green"
        />
        {/* <Text>{props.latitude}</Text>
        <Text>{props.longitude}</Text> */}
      </MapView>
    </View>
  );
};
