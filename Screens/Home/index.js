import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
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
    origin: {lat: 0, lng: 0},
    destination: {lat: 0, lng: 0},
    distance: 0,
    duration: 0,
  };

  //get origin and destination
  getOriginAndDestination = (directionType, fieldType) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${directionType}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=<YOUR_KEY>`,
      )
      .then(data => {
        return this.setState({
          fieldStatus: false,
          [fieldType]: data.data.candidates[0].geometry.location,
        });
      })
      .catch(e => {
        console.log('error ++', e);
      });
    return true;
  };

  distanceAndDuration = (distance, duration) => {
    this.setState({
      distance: distance,
      duration: duration,
    });
    return true;
  };

  UNSAFE_componentWillMount() {
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
    const {
      latitude,
      longitude,
      origin,
      destination,
      distance,
      duration,
    } = this.state;
    const newDestination = {
      latitude: destination.lat,
      longitude: destination.lng,
    };
    const newOrigin = {
      latitude: origin.lat,
      longitude: origin.lng,
    };
    return (
      <View>
        <View style={styles.places}>
          <Places getOriginAndDestination={this.getOriginAndDestination} />
        </View>
        <View>
          <Maps
            origin={newOrigin}
            destination={newDestination}
            latitude={latitude}
            longitude={longitude}
            distanceAndDuration={this.distanceAndDuration}
          />
        </View>
      </View>
    );
  }
}

export default Home;
