import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Quiz from "./pages/Quiz";

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Menu />}
        />
        <Route
          path="/quiz"
          element={<Quiz />}
        />
      </Routes>
    </Router>
  );
}
