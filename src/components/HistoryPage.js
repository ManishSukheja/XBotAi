import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
  }, []);

  return (
    <div className="history">
      <h2>Conversation History</h2>

      {history.length === 0 && <p>No saved conversations yet.</p>}

      {history.map((item, i) => (
        <div className="history-item" key={i}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <strong>Conversation {i + 1}</strong>
            <span>•</span>
            <span>Rating: {"★".repeat(item.rating || 0)}</span>
          </div>
          <div style={{ marginTop: 8 }}>
            {item.messages.map((m, idx) => (
              <div key={idx}>
                <strong>{m.sender}:</strong> {m.text}
                {m.sender === "Soul AI" && m.feedback && (
                  <em style={{ marginLeft: 6, color: "#6c757d" }}>
                    ({m.feedback})
                  </em>
                )}
              </div>
            ))}
          </div>
          {item.note && (
            <div style={{ marginTop: 6, fontStyle: "italic" }}>
              Feedback: {item.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
