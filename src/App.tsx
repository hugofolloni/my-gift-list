import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Event from './pages/Event';
import MyEvents from './pages/MyEvents';
import CreateUser from './pages/CreateUser';

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/event" element={<Event/>}/>
        <Route path="/profile" element={<MyEvents/>}/>
        <Route path='/signup' element={<CreateUser/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
