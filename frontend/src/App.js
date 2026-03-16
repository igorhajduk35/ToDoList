import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api")
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, []);


  return (
    <div className="App">
      <h1>React and Python</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
