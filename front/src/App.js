import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Layout from "./components/Layout"
import Home from "./components/Home"
import Songs from "./components/Songs"
import NotFound from "./components/NotFound"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
  // const [LoggedIn, setLoggedIn] = useState('0')

  // useEffect(()=>{
  //   setLoggedIn(window.sessionStorage.getItem("loggedIn"))
  // }, [window.sessionStorage.getItem("loggedIn")])

  // console.log(LoggedIn)
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route path="/home" element={<Home />}/>  
            <Route path="/songs" element={<Songs />}/>  
            <Route path="/login" element={<Login />}/> 
            <Route path="/register" element={<Register />}/> 
            <Route path="/" element={<Navigate to="/home" repalce />}/>
            <Route path="*" element={<NotFound text="Такой страницы не существует"/>}/>  
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
