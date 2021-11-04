import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Authentication from "./components/Authentication/Auth";
import Home from "./components/Home/Home";
import LoginWithGithub from "./hooks/LoginWithGithub";

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route
              path="/auth/login-with-github"
              element={<LoginWithGithub />}
            ></Route>
            <Route path="/auth" element={<Authentication />}></Route>
          </Routes>
        </Router>
      </div>
    </React.StrictMode>
  );
}

export default App;
