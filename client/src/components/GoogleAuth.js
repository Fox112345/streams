import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_G_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) return null;
    if (this.props.isSignedIn) {
      return (
        <button
          className={`ui red google button medium`}
          onClick={this.onSignOutClick}
        >
          <i className={`google icon`} />
          Sign out
        </button>
      );
    } else {
      return (
        <button
          className={`ui blue google button medium`}
          onClick={this.onSignInClick}
        >
          <i className={`google icon`} />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default connect(
  (state) => ({
    isSignedIn: state.auth.isSignedIn,
  }),
  { signIn, signOut }
)(GoogleAuth);
