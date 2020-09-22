import React from "react";
import Autocomplete from "../src/components/Autocomplete/";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>Search github users</h1>
      <div className="auto-container">
        <Autocomplete />
      </div>
    </div>
  );
}

export default App;
