// React
import { useState } from "react";

// CSS

// Components
import Home from "./pages/Home/Home";

// Others
import { Route, Routes } from "react-router-dom";
import AllVotes from "./pages/AllVotes/AllVotes";
import VotingPage from "./pages/Vote/Vote";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/voting page" element={<AllVotes />} />
        <Route path="/votes" element={<AllVotes />} />

        <Route path="/vote/:voteId" element={<VotingPage />} />
      </Routes>
    </>
  );
}

export default App;
