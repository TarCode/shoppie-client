import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "./views/login";
import { Register } from "./views/register";

export default function App() {

  const token = localStorage.getItem('token')
  return (
    <Router>
      <div className="container">
        {
          token ?
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes> :
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        }
      </div>

    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
