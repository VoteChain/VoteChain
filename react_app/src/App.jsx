import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={"/images/logo.jpg"} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>VoteChain</h1>
      <p>A decentralized voting system.</p>
      <div className="card">
        <h1>Comming soon!!!</h1>
        <Button
          title={"Get Started"}
          handleClick={() => console.log("Get started")}
          theme={"primary"}
        />
      </div>
    </>
  );
}

export default App;
