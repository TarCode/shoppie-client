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

const queryClient = new QueryClient()

export default function App() {
  const token = localStorage.getItem('token')
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}
