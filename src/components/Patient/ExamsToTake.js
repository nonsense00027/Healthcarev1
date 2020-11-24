import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { memo } from "react";
import "./ExamsToTake.css";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: 320,
    margin: 10,
    backgroundColor: "#f6f6f6",
  },
}));

export const ExamsToTake = memo(({ examsToTake }) => {
  const classes = useStyles();

  return (
    <div className="examsToTake">
      {examsToTake.map((exam) => (
        <Card className={classes.root} key={exam.id}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {exam.name}
            </Typography>
            <Typography variant="body2" component="p">
              Dr. Michael L. Tan
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              Add Result
              <SendIcon className="exam__addResultIcon" />
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
});
