import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
      console.log('props: ', this.props);
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}
