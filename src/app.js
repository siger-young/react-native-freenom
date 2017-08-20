/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import FreenomApi from './utils/api';

export default class RNFreenom extends Component {
	constructor(props)
	{
		super(props);
        this.state = {
            ping: '',
        };
	}
    componentDidMount() {
        FreenomApi.callApi('service/ping')
        .then((data) => data.text())
        .then((ping) => this.setState({ ping: ping }));
    }
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					RNFreenom [Ping data: {this.state.ping}]
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('RNFreenom', () => RNFreenom);
