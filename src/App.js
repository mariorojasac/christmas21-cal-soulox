import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { StyledApp } from "./AppStyles";
import { hatchArray } from "./helpers";
import Hatch from "./Hatch";

const GlobalStyle = createGlobalStyle`
  body {
    background: center / cover url("./images/background.jpg");
    margin: 0;
  }
`;

function App() {
  const [hatches, setHatches] = useState([]);

  useEffect(() => {
    // Could use if statements instead off course
    const calendar = localStorage.calendar
      ? JSON.parse(localStorage.calendar)
      : hatchArray();

    setHatches(calendar);
  }, []);

  // Store calendar in localStorage
  useEffect(() => {
    // Could use if statements instead off course
    hatches.length && localStorage.setItem("calendar", JSON.stringify(hatches));
  }, [hatches]);

  const handleFlipHatch = (id) => {
    const updatedHatches = hatches.map((hatch) =>
      hatch.id === id ? { ...hatch, open: !hatch.open } : hatch
    );
    setHatches(updatedHatches);
  };

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <div>
          <h1>Merry Christmas 2021!</h1>
        </div>
        {hatches.map((hatch) => (
          <Hatch
            key={hatch.id}
            hatchData={hatch}
            handleClick={handleFlipHatch}
          />
        ))}
      </StyledApp>
    </>
  );
}

export default App;
