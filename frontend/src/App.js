import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api")
      .then(res => res.json())
      .then(data => setMessage(data.message))
    console.log(typeof users, users);
  }, []);

  const get_users = () => {
    fetch("http://localhost:5050/get_users")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data.users);
      });
  };

  const add_user = () => {
    fetch("http://localhost:5050/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: newUserName})
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        get_users();
      });
  }

  return (
    <div className="App">
      <h1>React and Python</h1>
      <p>{message}</p>
      <button onClick={get_users}>Load users</button>
      <ul>
        {Array.isArray(users) && users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="name of user"></input>
      <button onClick={add_user}>Add user</button>
    </div>
  );
}

export default App;
