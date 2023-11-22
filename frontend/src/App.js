import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import BookDetail from "./components/BookDeataile";
import SearchPage from  "./pages/SearchPage"
import About from "./pages/About";
const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route exact element={<HomePage />} path="/" />
        <Route exact element={<About />} path="/about" />
        <Route exact element={<LoginPage />} path="/login" />
        <Route exact element={<SignUpPage />} path="/signup" />
        <Route exact element={<ProfilePage />} path="/profile" />
        <Route exact element={<SearchPage />} path="/search" />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/search/books/:bookId" element={<BookDetail />} />
      </Routes>
    </>
  );
};

export default App;
