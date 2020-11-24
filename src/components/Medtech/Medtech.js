import React, { useState, useEffect } from "react";
import "./Medtech.css";
import { Container, TextField } from "@material-ui/core";
import { ExamsToTake } from "../Patient/ExamsToTake";
import { db } from "../../firebase";
import { collectIdsAndDocs } from "../../utilities";

function Medtech() {
  const [patientId, setPatientId] = useState("");
  const [examsToTake, setExamsToTake] = useState([]);

  const handleGetPatient = (e) => {
    e.preventDefault();
    db.collection("patients")
      .doc(patientId)
      .collection("exams")
      // .where("status", "==", false)
      .get()
      .then((result) => {
        setExamsToTake(result.docs.map((doc) => collectIdsAndDocs(doc)));
      })
      .catch((err) => console.log(err.message));
  };

  console.log(examsToTake);

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
        <ExamsToTake examsToTake={examsToTake} />
      </Container>
    </div>
  );
}

export default Medtech;
