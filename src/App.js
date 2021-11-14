import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Authentication from "./components/Authentication/Auth";
import Home from "./components/Home/Home";
import Repos from "./components/Repos/Repos";
import LoginWithGithub from "./hooks/LoginWithGithub";

library.add(fab, faCodeBranch, faFolderOpen);

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/home" exact element={<Home />}></Route>
            <Route path="/repos/:name/:id" exact element={<Repos />}></Route>
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
