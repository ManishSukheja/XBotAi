import React, { useEffect, useState } from "react";
import data from "../data.json";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stars, setStars] = useState(0);
  const [textFeedback, setTextFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("currentChat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("currentChat", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input };
    const found = data.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );
    const aiResponse = found
      ? found.response
      : "Sorry, Did not understand your query!";
    const aiMsg = { sender: "Soul AI", text: aiResponse, feedback: null };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  };

  const handleThumb = (idx, val) => {
    setMessages((m) => {
      const copy = [...m];
      copy[idx] = { ...copy[idx], feedback: val };
      return copy;
    });
  };

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push({
      messages,
      rating: stars,
      note: textFeedback,
      savedAt: Date.now()
    });
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.removeItem("currentChat");
    setMessages([]);
    setStars(0);
    setTextFeedback("");
  };

  // Suggested prompts as cards
  const suggestedPrompts = [
    {
      title: "Hi, what is the weather",
      desc: "Get immediate AI generated response"
    },
    {
      title: "Hi, what is my location",
      desc: "Get immediate AI generated response"
    },
    {
      title: "Hi, what is the temperature",
      desc: "Get immediate AI generated response"
    },
    {
      title: "Hi, how are you",
      desc: "Get immediate AI generated response"
    }
  ];

  // Welcome card for zero messages
  if (messages.length === 0) {
    return (
      <div className="welcome-card">
        <h2>How Can I Help You Today?</h2>
        <div className="bot-logo"></div>
        <div className="prompt-grid">
          {suggestedPrompts.map((p, idx) => (
            <div
              className="prompt-card"
              key={idx}
              onClick={() => setInput(p.title)}
            >
              <strong>{p.title}</strong>
              <div>{p.desc}</div>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Ask</button>
          <button type="button" className="btn btn-ghost" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    );
  }

  // Normal chat screen if messages exist
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => {
          const isAI = msg.sender === "Soul AI";
          return (
            <div key={i} className={`message ${isAI ? "bot" : "user"}`}>
              <span className="sender">
                {isAI ? <span>Soul AI</span> : "You"}
              </span>
              <p>{msg.text}</p>
              {isAI && (
                <div className="feedback-buttons">
                  <button onClick={() => handleThumb(i, "like")}>👍</button>
                  <button onClick={() => handleThumb(i, "dislike")}>👎</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rating" aria-label="conversation rating">
        {[1,2,3,4,5].map((n) => (
          <span
            key={n}
            className={`star ${n <= stars ? "active" : ""}`}
            onClick={() => setStars(n)}
            role="button"
            aria-label={`${n} star`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="textfeedback"
        placeholder="Tell us what you thought about this conversation…"
        value={textFeedback}
        onChange={(e) => setTextFeedback(e.target.value)}
      />
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message Bot AI…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Ask</button>
        <button type="button" className="btn btn-ghost" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
