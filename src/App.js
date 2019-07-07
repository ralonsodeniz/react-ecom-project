import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./pages/sign-in-and-up/sign-in-and-up.component";
import { auth } from "./firebase/firebase.utils"; // we need this to make our app aware of a google auth process
import "./App.css";

class App extends Component {
  // we need app to be a class component to register the user
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      // this is a method in the auth library that registers when a user changes in the firebase auth
      this.setState({ currentUser: user }); // from the user authentication object we get we focus on displayName and email
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // this is the same as above
  //   subscribeAndUnsubscribeFromAuth = () =>
  //   auth.onAuthStateChanged(user => {
  //     this.setState({ currentUser: user });
  //     console.log(user);
  //   });

  // componentDidMount() {
  //   this.subscribeAndUnsubscribeFromAuth();
  // }

  // componentWillUnmount() {
  //   this.subscribeAndUnsubscribeFromAuth();
  // }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
