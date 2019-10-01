import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Maps from '../Map';
import Geolocation from 'react-native-geolocation-service';
import Places from './places';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'LOCATION Permission',
        message:
          'App needs access to your location ' +
          'so you can take get current position easier.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 'You can use GPS';
    } else {
      return 'Location permission denied';
    }
  } catch (err) {
    alert(err);
  }
}
// import { red } from 'ansi-colors';
const styles = StyleSheet.create({
  places: {
    top: 10,
  },
});
export class Home extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    er: 'null',
  };

  componentWillMount() {
    requestLocationPermission();
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          er: 'null',
        });
      },
      error => {
        alert('position error', error.message);
        this.setState({
          er: error.message,
        });
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  }
  render() {
    const {latitude, longitude} = this.state;
    return (
      <View>
        <View style={styles.places}>
          <Places />
        </View>
        <View>
          <Maps latitude={latitude} longitude={longitude} />
        </View>
      </View>
    );
  }
}

export default Home;
