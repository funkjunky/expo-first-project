import React from 'react';
import { Text, View } from 'react-native';
import { Permissions, Location, MapView } from 'expo';

class MapScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            location: null
        };
    }

    componentWillMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.warn('Access to location denied');
            this.setState({
                location: false
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        let mapView = <Text>Waiting for Location...</Text>;
        if(this.state.location) {
            const { coords: { longitude, latitude } } = this.state.location;
            mapView = <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    longitude,
                    latitude,
                    longitudeDelta: 0.008,
                    latitudeDelta: 0.004
                }}
                showsUserLocation={ true }
                userLocationAnnotationTitle="You!"
            />
        }
        return <View style={{ margin: 20, height: '100%', flex: 1, justifyContent: 'space-between' }}>
            <Text>THE MAP - <Text onPress={ () => this.props.navigator.pop() }>Back</Text></Text>
            { mapView }
            <Text>Location: { JSON.stringify(this.state.location) }</Text>
        </View>;
    }
}

export default MapScreen;
