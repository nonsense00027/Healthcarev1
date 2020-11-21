import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Patient from "./components/Patient/Patient";
import Tabs from "./components/Patient/Tabs";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <h1>this is login page</h1>
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
    </div>
  );
}

export default App;
