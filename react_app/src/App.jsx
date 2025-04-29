import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={"/images/logo.jpg"} className="logo" alt="Vite logo" />
        </a>
        {/* <a href="https://react.dev" target="_blank">
          <img
            src={"/images/logo.jpg"}
            className="logo react"
            alt="React logo"
          />
        </a> */}
      </div>
      <h1>VoteChain</h1>
      <p>A decentralized voting system.</p>
      <div className="card">
        <h1>Comming soon!!!</h1>
      </div>
    </>
  );
}

export default App;
