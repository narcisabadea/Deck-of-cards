import React from "react";
import "./App.css";
import Cards from "./components/home/Cards";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      <Cards />
    </div>
  );
}

export default App;
