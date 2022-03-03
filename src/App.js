import { Container, LinearProgress } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import "./styles.css";
import UserForm from "./pages/UserForm";
import UserList from "./pages/UserList";

const App = () => {
  const { status } = useSelector((state) => state.users);
  // const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        <Container>
          <h1>Dashboard</h1>
          {status === "loading" && (
            <LinearProgress
              color="primary"
              sx={{ position: "fixed", left: "30px", right: "30px" }}
            />
          )}
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/form" element={<UserForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
