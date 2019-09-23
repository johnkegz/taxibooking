import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';

export class Places extends Component {
  state = {
    destination: '',
    origin: '',
    locationDescription: [],
    fieldType: '',
    fieldStatus: false,
  };
  handleTextChange = e => {
    const locationType = e.target === 3 ? 'destination' : 'origin';
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=<YOUR KEY>&input=${
          e.nativeEvent.text
        } s&radius=2000`,
      )
      .then(data => {
        this.setState({
          fieldStatus: true,
          locationDescription: data.data.predictions,
          fieldType: locationType,
        });
      })
      .catch(err => err);
    return this.setState({
      [locationType]: e.nativeEvent.text,
    });
  };

  handleListItemPress(description, fieldType) {
    return this.setState({
      fieldStatus: false,
      [fieldType]: description,
    });
  }

  displayLocationList = locationDescription => {
    const {fieldType} = this.state;
    const location = locationDescription.map(loc => (
      <TouchableOpacity
        key={loc.id}
        onPress={() => this.handleListItemPress(loc.description, fieldType)}>
        <Text key={loc.id}>{loc.description}</Text>
      </TouchableOpacity>
    ));
    return location;
  };
  render() {
    const {locationDescription, destination, origin, fieldStatus} = this.state;
    return (
      <View>
        <TextInput
          value={destination}
          placeholder="Destination"
          onChange={e => this.handleTextChange(e)}
        />
        <TextInput
          value={origin}
          placeholder="Origin"
          onChange={e => this.handleTextChange(e)}
        />
        <View>
          {fieldStatus === true ? (
            this.displayLocationList(locationDescription)
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}

export default Places;
