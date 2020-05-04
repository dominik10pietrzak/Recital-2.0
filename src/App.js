import React, { Component } from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";

//components
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import PlayerBlock from "./components/player-block/player-block.component";

//pages
import HomePage from "./pages/homepage/homepage.component";
import MusicPlayer from "./pages/music-player/music-player.component";
import SignInUp from "./pages/sign-in-up/sign-in-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log(this.state);
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        <Switch>
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/player"
                render={() =>
                  this.props.currentUser ? <MusicPlayer /> : <PlayerBlock />
                }
              />
              <Route
                exact
                path="/signin"
                render={() =>
                  this.props.currentUser ? (
                    <Redirect to="/player" />
                  ) : (
                    <SignInUp />
                  )
                }
              />
            </Switch>
            <Footer />
          </>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
