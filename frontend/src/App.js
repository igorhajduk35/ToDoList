import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Team from './pages/Team';

function App() {
  // const [message, setMessage] = useState("");
  // const [users, setUsers] = useState([]);
  // const [newUserName, setNewUserName] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5050/api")
  //     .then(res => res.json())
  //     .then(data => setMessage(data.message))
  // }, []);

  // const get_users = () => {
  //   fetch("http://localhost:5050/get_users")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setUsers(data.users);
  //     });
  // };

  // const add_user = () => {
  //   fetch("http://localhost:5050/add_user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({username: newUserName})
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       get_users();
  //     });
  // }

  return(
    <BrowserRouter>
      <NavigationBar />


      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/my_tasks" element={<Tasks/>}/>
        <Route path="/my_team" element={<Team/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
