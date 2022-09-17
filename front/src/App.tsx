import React from 'react';
import Main from "./components/main/Main";
import Login from "./components/auth/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./components/auth/Register";
import {useAuth} from "./context/AuthProvider";
import axios from "axios";


function App() {
        // координаты для теста (слева широта)
        //  [47.246625, 39.729554]
        //  [47.234727, 39.756884]
        //  [47.227331, 39.698231]

  return (
      <Routes>
          <Route
              path={"/"}
              element={
                  <RequireAuth>
                      <Main />
                  </RequireAuth>
              }
          />
          <Route
              path={"/login"}
              element={<Login />}
          />
          <Route
              path={'/register'}
              element={<Register />}
          />
      </Routes>
  );
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const {token} = useAuth();
    if (!token) {
        return <Navigate to="/login" />;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return children;
}

export default App;
