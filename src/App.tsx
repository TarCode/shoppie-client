import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Login } from "./views/login";
import { Register } from "./views/register";
import { Home } from "./views/home";
import './App.css'

const queryClient = new QueryClient()

export default function App() {
  const isLoggedIn = localStorage.getItem('user')
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container">
          {
            isLoggedIn ?
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
    </QueryClientProvider>
  );
}
