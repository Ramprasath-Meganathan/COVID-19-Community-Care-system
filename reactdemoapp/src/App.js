import React from "react";
import Home from "./components/Home";
import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom'

function App(){
  return(
    <Router>
      <Home/>
    </Router>
    
  );
}

export default App;