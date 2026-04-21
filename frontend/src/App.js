import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Team from './pages/Team';

function App() {
  return(
    <BrowserRouter>
      <NavigationBar/>

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
