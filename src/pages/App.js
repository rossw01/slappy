import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [playerId, setPlayerId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (playerId.length == 0) {
      return;
    }
    navigate(`/players/${playerId}`);
  };

  return (
    <div className="App">
      <h1>Slappy.gg</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Input PlayerID"
          onChange={(e) => setPlayerId(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
