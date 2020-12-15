import { Container } from "@material-ui/core";
import React from "react";
import "./Result.css";
import ResultItem from "./ResultItem";

function Result({ results }) {
  console.log("Results", results);
  return (
    <div className="result">
      <Container>
        {/* {results.map((result) => (
          <ResultItem key={result.id} result={result} />
        ))} */}
        {results.map((result) => (
          // <h2>{result.name}</h2>
          <ResultItem result={result} />
        ))}
      </Container>
    </div>
  );
}

export default Result;
