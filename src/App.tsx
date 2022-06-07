import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Gifts from './pages/Gifts';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/gifts" element={<Gifts/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
