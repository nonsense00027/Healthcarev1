import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Patient from "./components/Patient/Patient";
import Medtech from "./components/Medtech/Medtech";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import Tabs from "./components/Patient/Tabs";
import Header from "./components/Header";
import { useStateValue } from "./DataLayer";
import { auth, db } from "./firebase";
import { types } from "./Reducer";
import { collectIdsAndDocs } from "./utilities";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("USER", authUser.uid);
        db.collection("users")
          .doc(authUser.uid)
          .onSnapshot((snapshot) => {
            const user = collectIdsAndDocs(snapshot);
            dispatch({
              type: types.SET_USER,
              payload: user,
            });
            setLoading(false);
          });
      } else {
        console.log("USER IS NULL");
        dispatch({
          type: types.SET_USER,
          payload: null,
        });
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("current user", user);
  if (loading) {
    return (
      <div className="app__loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Router>
      {user ? (
        <div className="app">
          <Switch>
            <Route path="/medtech">
              <Header />
              <Medtech />
            </Route>
            <Route path="/patients/:patientId">
              <Header />
              <Patient />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
