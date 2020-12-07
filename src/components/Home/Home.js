import React, { useState, useEffect } from "react";
import "./Home.css";
import PatientsTable from "./PatientsTable";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import {
  Button,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../firebase";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../DataLayer";
import { useHistory } from "react-router-dom";
import { collectIdsAndDocs } from "../../utilities";
import { types } from "../../Reducer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [{ user, patients }, dispatch] = useStateValue();
  const [firstname, setFirstname] = useState("");
  const history = useHistory();
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(1);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [cbc, setCbc] = useState("");
  const [electrolytes, setElectrolytes] = useState("");
  const [bloodpressure, setBloodpressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [doctor, setDoctor] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [doctors, setDoctors] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setFirstname("");
    setLastname("");
    setAge(1);
    setContact("");
    setAddress("");
    setDetails("");
    setBloodpressure("");
    setTemperature("");
    setCbc("");
    setElectrolytes("");
    setDoctor("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("patients")
      .add({
        firstname,
        lastname,
        age,
        contact,
        address,
        cbc,
        bloodpressure,
        electrolytes,
        temperature,
        doctor,
        details,
      })
      .then((res) => {
        console.log(res.id);
        setSnackbarOpen(true);
        handleClose();
        handleReset();
      })
      .catch((err) => alert(err.message));
  };

  const filterPatients = (patients) => {
    var newPatients;
    if (user.role === "Doctor") {
      newPatients = patients.filter((patient) => patient.doctor === user.id);
    } else {
      newPatients = patients;
    }
    return newPatients;
  };

  useEffect(() => {
    db.collection("users")
      .where("role", "==", "Doctor")
      .onSnapshot((snapshot) => {
        setDoctors(snapshot.docs.map((doc) => collectIdsAndDocs(doc)));
      });
  }, []);

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      dispatch({
        type: types.GET_PATIENTS,
        payload: snapshot.docs,
      });
    });
  }, [dispatch]);

  if (user.role === "Admin") {
    history.push("/admin");
  }

  if (user.role === "Medtech") {
    history.push("/medtech");
  }

  return (
    <div className="home">
      <Container>
        <PatientsTable patients={filterPatients(patients)} />
        <Tooltip title="Add Patient" aria-label="add" arrow>
          <Fab
            color="primary"
            aria-label="add"
            className="home__addPatient"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={`${classes.paper} home__modal`}>
          <center>
            <h2 className="home__formHeader">Patients Information</h2>
          </center>
          <form onSubmit={handleSubmit} className="home__addPatientForm">
            <div>
              <TextField
                label="First Name"
                autoFocus
                fullWidth
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <TextField
                label="Last Name"
                fullWidth
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <TextField
                label="Contact No."
                fullWidth
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Blood Pressure"
                fullWidth
                value={bloodpressure}
                onChange={(e) => setBloodpressure(e.target.value)}
              />
              <TextField
                label="Temperature"
                fullWidth
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="CBC"
                fullWidth
                value={cbc}
                onChange={(e) => setCbc(e.target.value)}
              />
              <TextField
                label="Electrolytes"
                fullWidth
                value={electrolytes}
                onChange={(e) => setElectrolytes(e.target.value)}
              />
            </div>
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                fullWidth
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Assign Doctor
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.lastname}, {doctor.firstname}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <TextField
                label="Details"
                fullWidth
                multiline
                rowsMax={6}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              fullWidth
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Patient was successfully added!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
