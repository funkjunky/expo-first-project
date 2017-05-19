import React from 'react';
import { Text, View } from 'react-native';
import * as THREE from 'three';
import { createTHREEViewClass, Gyroscope, Accelerometer } from 'expo';

const THREEView = createTHREEViewClass(THREE);

class Gl3d extends React.Component {
    constructor() {
        super();
        this.state = {
			rotation: { x: 0, y: 0, z: 0 },
			position: { x: 0, y: 0, z: 0 }
		};
    }

    componentWillMount() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
        this.camera.position.z = 1000;
        this.geometry = new THREE.BoxGeometry(200, 200, 200);
        this.material = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0x555555, shininess: 30 } );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(100, 100, 50);
        this.scene.add(dirLight);

        Gyroscope.addListener(({ x, y, z }) => this.setState({
			rotation: {
				x: this.state.rotation.x + x,
				y: this.state.rotation.y + y,
				z: this.state.rotation.z + z
			}
		}));

        Accelerometer.addListener(({ x, y, z }) => this.setState({
			position: {
				x: this.state.position.x + x,
				y: this.state.position.y + y,
				z: this.state.position.z + z
			}
		}));
    }

    tick = (dt) => {
        this.mesh.rotation.x = this.state.rotation.x / 2;
        this.mesh.rotation.y = this.state.rotation.y / 2;
        this.mesh.rotation.z = this.state.rotation.z / 2;

/*
        this.mesh.position.x = this.state.position.x * 2;
        this.mesh.position.y = this.state.position.y * 2;
        this.mesh.position.z = this.state.position.z * 2;
*/
    }

    render = () => (
        <View style={{ margin: 20, height: '100%', flex: 1, justifyContent: 'space-between' }}>
            <Text>3D cube and gyro - <Text onPress={ () => this.props.navigator.pop() }>Back</Text></Text>
            <Text>Acc Location (Seems off): { JSON.stringify(this.state.position) }</Text>
            <THREEView
                style={{ flex: 1 }}
                scene={this.scene}
                camera={this.camera}
                tick={this.tick}
            />
            <Text>gl 3d page</Text>
        </View>
    );
    /*
        */
};

export default Gl3d;
