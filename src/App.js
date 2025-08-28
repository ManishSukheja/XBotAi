import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import HistoryPage from "./components/HistoryPage";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />

       <div className="app-main">
  <main className="app-content">
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </main>
</div>
      </div>
    </Router>
  );
}
