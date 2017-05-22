import React from 'react';
import { Text, View } from 'react-native';
import Regl from 'regl';
import { GLView } from 'expo';

class ReglScreen extends React.Component {
    constructor() {
        super();
        this.state = {
		};
    }

    onContextCreate = gl => {
        const regl = Regl({ gl });

		//TODO: does raf give dt? I can't remember.
        const onTick = dt => {
			regl.poll();
			regl.clear({
				color: [0, 0, 0, 1],
				depth: 1,
			});

			// In regl, draw operations are specified declaratively using. Each JSON
			// command is a complete description of all state. This removes the need to
			// .bind() things like buffers or shaders. All the boilerplate of setting up
			// and tearing down state is automated.
			regl({

				// In a draw call, we can pass the shader source code to regl
				frag: `
				precision mediump float;
				uniform vec4 color;
				void main () {
				gl_FragColor = color;
				}`,

				vert: `
				precision mediump float;
				attribute vec2 position;
				void main () {
				gl_Position = vec4(position, 0, 1);
				}`,

				attributes: {
				position: [
  	  	  	  	  [-1, 0],
  	  	  	  	  [0, -1],
  	  	  	  	  [1, 1]
				]
				},

				uniforms: {
				color: [1, 0, 0, 1]
				},

				count: 3
			})(() => {
                regl.draw();
            });

			//webGL to signal that we should prioritize finishing all GL commands.
			//I suppose this should be done at the end of every frame before endFrameEXP...
			//TODO: ask people if this is truly necessary?
			gl.flush();
			//Swaps (displays) current frame
			//Always do this after doing everything for a frame with GLView (expo)
			gl.endFrameEXP();

			requestAnimationFrame(onTick);
        };
        onTick();
    };

    render = () => (
        <View style={{ margin: 20, marginBottom: 100, height: '100%', flex: 1, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 24 }}>Regl GL sprites - <Text onPress={ () => this.props.navigator.pop() }>Back</Text></Text>
            <GLView style={{ width: '100%', height: '100%', borderColor: 'black', borderWidth: 1, borderStyle: 'solid' }} onContextCreate={ this.onContextCreate } />
            <Text>gl 3d page</Text>
        </View>
    );
    /*
        */
};

export default ReglScreen;
