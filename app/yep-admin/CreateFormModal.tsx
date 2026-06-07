"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateFormModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/yep-admin/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, eventDate }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to create form"); return; }
      onCreated();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px", color: "#f1f5f9",
    fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", color: "rgba(255,255,255,0.65)",
    fontSize: "0.8rem", marginBottom: "0.4rem", fontWeight: 500,
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: "1rem",
    }} onClick={onClose}>
      <div style={{
        background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "480px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, color: "#f1f5f9", fontSize: "1.2rem", fontWeight: 700 }}>Create New Form</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.25rem", cursor: "pointer" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Form Title *</label>
            <input id="new-form-title" style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Youth Leadership Summit 2025" />
          </div>
          <div>
            <label style={labelStyle}>Description (optional)</label>
            <textarea
              id="new-form-desc"
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the event..."
            />
          </div>
          <div>
            <label style={labelStyle}>Event Date *</label>
            <input id="new-form-date" style={inputStyle} type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", padding: "0.75rem", color: "#fca5a5", fontSize: "0.85rem" }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: "0.75rem",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px", color: "rgba(255,255,255,0.7)",
              cursor: "pointer", fontWeight: 500,
            }}>
              Cancel
            </button>
            <button id="submit-new-form" type="submit" disabled={loading} style={{
              flex: 2, padding: "0.75rem",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              border: "none", borderRadius: "8px",
              color: "#fff", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "Creating…" : "Create Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
