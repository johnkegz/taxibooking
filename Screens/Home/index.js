import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import Maps from '../Map';
import Geolocation from 'react-native-geolocation-service';

export class Home extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    error: null,
  };
  componentWillMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => {
        this.setState({
          error: null,
        });
      },
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true},
    );
  }
  render() {
    const {latitude, longitude} = this.state;
    return (
      <View>
        <Maps latitude={latitude} longitude={longitude} />
      </View>
    );
  }
}

export default Home;
