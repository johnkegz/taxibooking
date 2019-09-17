import React, {Component} from 'react';;
import {Button, Text, View} from 'react-native';;

export class Home extends Component {
  render() {
    return (
      <View>
        <Button
          title="go to maps"
          onPress={() => this.props.navigation.navigate('Maps')}
        />
        <Text> home </Text>
      </View>
    );
  }
}

export default Home;
