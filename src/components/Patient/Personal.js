import React, { useState, memo } from "react";
import "./Personal.css";
import { TextField } from "@material-ui/core";

export const Personal = memo(({ patient }) => {
  const [firstname, setFirstname] = useState(patient?.firstname);
  const [lastname, setLastname] = useState(patient?.lastname);
  const [age, setAge] = useState(patient?.age);
  const [contact, setContact] = useState(patient?.contact);
  const [address, setAddress] = useState(patient?.address);
  const [details, setDetails] = useState(patient?.details);
  const [cbc, setCbc] = useState(patient?.cbc);
  const [electrolytes, setElectrolytes] = useState(patient?.electrolytes);
  const [bloodpressure, setBloodpressure] = useState(patient?.bloodpressure);
  const [temperature, setTemperature] = useState(patient?.temperature);
  const [edit, setEdit] = useState(true);
  console.log(patient.firstname);

  return (
    <div className="personal">
      <div>
        <TextField
          variant="outlined"
          label="First Name"
          autoFocus
          fullWidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          label="Last Name"
          fullWidth
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <TextField
          label="Contact No."
          variant="outlined"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Blood Pressure"
          fullWidth
          value={bloodpressure}
          onChange={(e) => setBloodpressure(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Temperature"
          fullWidth
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="CBC"
          fullWidth
          value={cbc}
          onChange={(e) => setCbc(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Electrolytes"
          fullWidth
          value={electrolytes}
          onChange={(e) => setElectrolytes(e.target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Details"
          fullWidth
          multiline
          rowsMax={6}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
    </div>
  );
});
