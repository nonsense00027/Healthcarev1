import React, { useState, useEffect } from "react";
import "./Patient.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  useTheme,
} from "@material-ui/core";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import Personal from "./Personal";
import Exam from "./Exam";
import Result from "./Result";
import SwipeableViews from "react-swipeable-views";
import { useStateValue } from "../../DataLayer";
import { types } from "../../Reducer";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 50,
    position: "fixed",
    bottom: 20,
    left: 0,
    fontSize: 20,
    height: 80,
  },
});

function Patient() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { patientId } = useParams();
  const [patient, setPatient] = useState();
  const [, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("patients")
      .doc(patientId)
      .onSnapshot((snapshot) => {
        setPatient(snapshot.data());
      });
  }, [patientId]);

  useEffect(() => {
    db.collection("exams").onSnapshot((snapshot) => {
      dispatch({
        type: types.GET_EXAMS,
        payload: snapshot.docs,
      });
    });
  }, [dispatch]);

  console.log(patient);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="patient">
      <Container>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Personal Information"
            icon={<PermContactCalendarIcon />}
          />
          <BottomNavigationAction
            label="Test to be taken"
            icon={<AssignmentIcon />}
          />
          <BottomNavigationAction
            label="Test Results"
            icon={<AssignmentTurnedInIcon />}
          />
        </BottomNavigation>

        {/* {value === 0 && <Personal />}
        {value === 1 && <Exam />}
        {value === 2 && <Result />} */}

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div value={value} index={0} dir={theme.direction}>
            <Personal />
          </div>
          <div value={value} index={1} dir={theme.direction}>
            <Exam />
          </div>
          <div value={value} index={2} dir={theme.direction}>
            <Result />
          </div>
        </SwipeableViews>
      </Container>
    </div>
  );
}

export default Patient;
