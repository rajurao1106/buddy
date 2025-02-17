import React from "react";
import SignInForm from "./pages/SignInForm";
import SignupForm from "./pages/SignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/SigninForm" element={<SignInForm />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}
