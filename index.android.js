import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { api } from './src/api';

export default class weather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pin: { latitude: 0, longitude: 0 },
      city: '',
      temperature: '',
      description: ''
    };
  }

  onRegionChangeComplete(region) {
    this.setState({ 
      pin: { latitude: region.latitude, longitude: region.longitude }
    });

    api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      });
  }

  render() {
   const { region } = this.props;
   console.log(region);

   return (
    <View style={styles.container}>
        <MapView 
          annotations={[this.state.pin]}
          style={styles.map} 
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => weather);
