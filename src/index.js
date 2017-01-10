
//     react-native-loading-spinner-overlay
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source:
// <https://github.com/niftylettuce/react-native-loading-spinner-overlay>

// # react-native-loading-spinner-overlay
//
// <https://github.com/facebook/react-native/issues/2501>
// <https://rnplay.org/apps/1YkBCQ>
// <https://github.com/facebook/react-native/issues/2501>
// <https://github.com/brentvatne/react-native-overlay>
//

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';

const SIZES = ['small', 'normal', 'large'];
var {windowHeight, windowWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height:windowHeight,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height:windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold'
  }
});



export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible, textContent: this.props.textContent };
  }

  static propTypes = {
    visible: React.PropTypes.bool,
    textContent: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOf(SIZES),
    overlayColor: React.PropTypes.string
  };

  static defaultProps = {
    visible: false,
    textContent: "",
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        <ActivityIndicator
          color={this.props.color}
          size={this.props.size}
          style={{ flex: 1, top:windowHeight/2, left:windowWidth/2}}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.textContent, this.props.textStyle]}>{this.state.textContent}</Text>
        </View>
      </View>);
  }

  _renderSpinner() {
    const { visible } = this.state;

    if (!visible)
      return (
        <View />
      );

    const spinner = (
      <View style={[
        styles.container,
        { backgroundColor: this.props.overlayColor }
      ]} key={`spinner_${Date.now()}`}>
        {this.props.children ? this.props.children : this._renderDefaultContent()}
      </View>
    );

    return (
      <View style={{flex:1, height:windowHeight,width:windowWidth,backgroundColor:'rgba(0,0,0,0.2)'}} visible={visible} >
        {spinner}
      </View>
    );

  }

  render() {
    return this._renderSpinner();
  }

}
