import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./pages/sign-in-and-up/sign-in-and-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"; // we need this to make our app aware of a google auth process
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
    // this is a method in the auth library that registers when a user changes in the firebase auth
    // it's going to be a async since we potentially have to do api calls to our db to get the users registered
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // here we execute auth.onAuthStateChanged() and store what it returns
      if (userAuth) {
        // we check if t he userAuth object is not null
        const userRef = await createUserProfileDocument(userAuth); // we save the returned userRef object from the firestore with the id of the user that has loggedin
        userRef.onSnapshot(snapShot => {
          // onSnapshot adds a listener for documentSnapshot and triggers an action when it happens
          this.setState(
            {
              currentUser: {
                id: snapShot.id, // we get the id of the registered user from the documentSnapshot
                ...snapShot.data() // since the properties of the docuemnt are not in the documentSnapshot we get them with the .data() method of documentSnapshot and we spread it into the currentUser object from the state
              }
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({ currentUser: userAuth }); // if the user logs out or it is null because any other reason we set the currentUser to null (we know in this case userAuth is going to be null)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // and then we use it in the componentWillUnmount to close the subscription
  }

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
