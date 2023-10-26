import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CSRFToken from "../src/services/CSRFToken";
const App = () => {
  return (
    <>
      <Navbar />
      <CSRFToken />
      <Routes>
        <Route exact element={<HomePage />} path="/" />
        <Route exact element={<LoginPage />} path="/login" />
        <Route exact element={<SignUpPage />} path="/signup" />
        <Route exact element={<ProfilePage />} path="/profile" />
      </Routes>
    </>
  );
};

export default App;
