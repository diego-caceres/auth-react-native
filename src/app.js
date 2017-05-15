import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends React.Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBQyjpYdEF3Rkb1I14RVsPGLqTOuPZ2Egg',
      authDomain: 'auth-24654.firebaseapp.com',
      databaseURL: 'https://auth-24654.firebaseio.com',
      projectId: 'auth-24654',
      storageBucket: 'auth-24654.appspot.com',
      messagingSenderId: '146050164740'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    });
  }

  onLogOutPress() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case false:
        return <LoginForm />;
      case true:
        return (
          <View style={styles.containerStyle}>
            <Button onPress={this.onLogOutPress.bind(this)}>
              Log out
            </Button>
          </View>
        );
      default:
        return <Spinner size="large" />
    }

  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {

    minHeight: 50,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export default App;
