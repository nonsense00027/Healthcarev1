import React, { useState, useEffect } from "react";
import "./Medtech.css";
import { Container, TextField } from "@material-ui/core";
import { ExamsToTake } from "../Patient/ExamsToTake";
import { db } from "../../firebase";
import { collectIdsAndDocs } from "../../utilities";
import { useStateValue } from "../../DataLayer";
import { useHistory } from "react-router-dom";

function Medtech() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState({});
  const [examsToTake, setExamsToTake] = useState([]);

  const handleGetPatient = (e) => {
    e.preventDefault();
    db.collection("patients")
      .doc(patientId)
      .get()
      .then((result) => {
        console.log("USER", result);
        if (result.exists) {
          history.push(`/patients/${patientId}`);
        } else {
          alert("Patient not found");
        }
      });

    //   db.collection("patients")
    //     .doc(patientId)
    //     .collection("exams")
    //     .where("status", "==", false)
    //     .get()
    //     .then((result) => {
    //       setExamsToTake(
    //         result.docs.map((doc) => ({
    //           ...doc.data(),
    //           id: doc.id,
    //           patientId: patientId,
    //         }))
    //       );
    //     })
    //     .catch((err) => console.log(err.message));

    //   db.collection("patients")
    //     .doc(patientId)
    //     .get()
    //     .then((doc) => {
    //       setPatient(collectIdsAndDocs(doc));
    //     })
    //     .catch((err) => console.log(err.message));
  };

  if (user.role === "Admin") {
    history.pus("/admin");
  }
  console.log("patient", patient);

  return (
    <div className="medtech">
      <Container>
        <div className="medtech__patientId">
          <form onSubmit={handleGetPatient}>
            <TextField
              variant="outlined"
              label="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </form>
        </div>

        {/* <div className="medtech__info">
          <h3>Patient Information</h3>
          <p>
            <strong>Name:</strong> {patient?.lastname}, {patient?.firstname}
          </p>
          <p>
            <strong>Age:</strong> {patient?.age}
          </p>
          <p>
            <strong>Address:</strong> {patient?.address}
          </p>
          <p>
            <strong>Details:</strong> {patient?.detail}
          </p>
        </div> */}
        {/* <ExamsToTake examsToTake={examsToTake} /> */}
      </Container>
    </div>
  );
}

export default Medtech;
