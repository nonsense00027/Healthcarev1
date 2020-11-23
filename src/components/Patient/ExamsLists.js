import React from "react";
import { IconButton, ListItem } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { db } from "../../firebase";

export const ExamsLists = ({ exams, patientId, examsToTake }) => {
  const handleAdd = (data) => {
    const newExam = {
      name: data.name,
      status: false,
    };
    db.collection("patients")
      .doc(patientId)
      .collection("exams")
      .doc(data.id)
      .set(newExam, { merge: true });
  };

  const handleRemove = (id) => {
    db.collection("patients")
      .doc(patientId)
      .collection("exams")
      .doc(id)
      .delete();
  };

  const isAdded = (id) => {
    const added = examsToTake.filter((item) => item.id === id);
    return added.length > 0;
  };

  console.log("ExamLists rendered");
  return (
    <>
      {exams.map((exam) => (
        <ListItem key={exam.id} button className="exam__list">
          {exam.name}
          {isAdded(exam.id) ? (
            <IconButton
              className="exam__iconButton"
              onClick={() => handleRemove(exam.id)}
            >
              <CancelIcon className="exam__cancelIcon" />
            </IconButton>
          ) : (
            <IconButton
              className="exam__iconButton"
              onClick={() => handleAdd(exam)}
            >
              <CheckCircleIcon className="exam__listIcon" />
            </IconButton>
          )}
        </ListItem>
      ))}
    </>
  );
};
