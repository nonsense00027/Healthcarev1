import React, { useState } from "react";
import "./AdminLogin.css";
import login from "../../img/login.svg";
import { Button, TextField } from "@material-ui/core";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

function AdminLogin({ handleAdminLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="adminLogin">
      <img src={login} alt="" className="adminLogin__img" />
      <div className="adminLogin__content">
        <center>
          <h5>Welcome to System name</h5>
        </center>
        <form
          onSubmit={(e) => handleAdminLogin(e, { email, password })}
          className="adminLogin__form"
        >
          <div>
            <TextField
              label="Email address"
              autoFocus
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <center>
              <p className="login__error">Invalid Credentials</p>
            </center>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
