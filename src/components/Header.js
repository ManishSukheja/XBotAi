import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">Bot AI</h1>
      <nav className="app-nav">
        <Link to="/">New Chat</Link>
        <Link to="/history">Past Conversations</Link>
      </nav>
    </header>
  );
}
