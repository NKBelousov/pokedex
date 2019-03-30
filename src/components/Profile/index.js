import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Profile extends Component {
  render() {
    const {
      router: {
        params: { name },
      },
    } = this.props.store;
    return <h1>Hello, {name}</h1>;
  }
}

export default Profile;
