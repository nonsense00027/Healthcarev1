import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Patient from "./components/Patient/Patient";
import Medtech from "./components/Medtech/Medtech";
import Login from "./components/Login/Login";
import Tabs from "./components/Patient/Tabs";
import Header from "./components/Header";
import { useStateValue } from "./DataLayer";
import { auth } from "./firebase";
import { types } from "./Reducer";

function App() {
  const [{ user }, dispatch] = useStateValue();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       console.log("USER", authUser);
  //       dispatch({
  //         type: types.SET_USER,
  //         payload: authUser,
  //       });
  //     } else {
  //       console.log("USER IS NULL");
  //       dispatch({
  //         type: types.SET_USER,
  //         payload: null,
  //       });
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <div className="app">
      {user ? (
        <Router>
          <Switch>
            <Route path="/login">
              <h1>this is login page</h1>
            </Route>
            <Route path="/medtech">
              <Header />
              <Medtech />
            </Route>
            <Route path="/patients/:patientId">
              <Header />
              <Patient />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
