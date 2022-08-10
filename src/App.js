import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {

  const token = localStorage.getItem('token')
  return (
    <Router>
      {
        token ?
          <div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div> :
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
      }

    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder='email' />
      <input type="password" placeholder='Password' />
    </div>
  );
}

function Register() {
  return <h2>Register</h2>;
}
