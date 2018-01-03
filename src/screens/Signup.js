import React from 'react';
import { signup } from '../services/api';
import { View, StyleSheet, Image, ScrollView, TextInput, Button, Text, Keyboard, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Login extends React.Component {
	static navigationOptions = {
		header: null
	}

	state = {
		user: '',
		password: '',
		isAuthenticated: false
	}

	async submit() {
		try {
			const response = await signup(this.state.user, this.state.password)
			this._user.clear();
			this._password.clear();
			Keyboard.dismiss();
			this.isAuthenticated = true;
			this.props.navigation.dispatch(
				NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'home' })
					]
				})
			);
		} catch ({ message }) {
			this.setState({
				error: message
			})
		}
	}
	render() {
		return (
			<View
				style={styles.container}>
				<Image
					style={[ styles.logo ]}
					source={require('../assets/img/whatsapplogo.png')} />
				<ScrollView style={styles.container}>
					<TextInput
						ref={(textInput) =>this._user = textInput }
						style={styles.inputField}
						value={this.state.text}
						onChangeText={(user) => this.setState({user})}
						onSubmitEditing={(event) => this._password.focus()}
						editable={true}
						maxLength={40}
						multiline={false}
						placeholder="Masukkan Email"
					/>
					<TextInput
						ref={(textInput) =>this._password = textInput }
						style={styles.inputField}
						value={this.state.text}
						onChangeText={(password) => this.setState({password})}
						onSubmitEditing={(event) => this.submit()}
						editable={true}
						secureTextEntry={true}
						maxLength={40}
						multiline={false}
						placeholder="Masukkan Password"
					/>
					{ this.state.error &&
						<View style={styles.validationErrors}>
							<Text style={styles.error}>{this.state.error}</Text>
						</View>
					}
					<View style={styles.buttonStyle}>
						<Button
							onPress={() => this.submit()} 
							title="Daftar" />
					</View>
					<View style={styles.redirectLink}>
						<Text>Sudah punya akun? </Text>
						<TouchableOpacity onPress={() =>
						this.props.navigation.navigate('login')}>
						<Text style={styles.link}>Masuk</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.copyright}>
						<Text style={{fontSize: 18, color: '#19B5FE'}}>https://daengweb.id</Text>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logo: {
    width: '100%',
    height: 200
  },
  inputField: {
    marginTop: 20,
    alignSelf: 'center',
    height: 55,
    width: '80%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#CACACA"
  },
  redirectLink: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  link: {
    color: 'blue'
  },
  validationErrors: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red'
  },
  buttonStyle: {
  	marginTop: 15,
  	flex: 1
  },
  copyright: {
  	marginTop: 15,
  	flex: 1,
  	alignSelf: 'center'
  }
})