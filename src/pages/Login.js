import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import AuthService from "../services/AuthService";

import { connect } from "react-redux";
import { initLogin } from "../redux/account/actions";

const Login = props => {
  const [userCombo, setUserCombo] = useState({ user: null, pass: null });
  const [preventMultiSubmit, setPreventMultiSubmit] = useState(false);

  const changeInput = e => {
    setUserCombo({
      ...userCombo,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = e => {
    e.preventDefault();

    if (preventMultiSubmit) return;
    setPreventMultiSubmit(true);

    try {
      props.onInitLogin(userCombo.user, userCombo.pass, () =>
        setPreventMultiSubmit(false)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <TextField
          id="standard-basic"
          name="user"
          label="Email"
          onChange={changeInput}
        />
        <TextField
          id="standard-basic"
          name="pass"
          label="Password"
          type="password"
          onChange={changeInput}
        />
        <input value="SUBMIT" type="submit" />
      </form>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLogin: (user, pass, callback) =>
      dispatch(initLogin(user, pass, callback))
  };
};

export default connect(null, mapDispatchToProps)(Login);
