"use client";

import { useState } from "react";

interface Question {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio" | "checkbox";
  options?: string[];
  required: boolean;
}

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.65rem 0.9rem",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px", color: "#f1f5f9",
  fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.6)",
  fontSize: "0.78rem", marginBottom: "0.35rem", fontWeight: 500,
  textTransform: "uppercase", letterSpacing: "0.04em",
};

const sectionTitle: React.CSSProperties = {
  color: "#a5b4fc", fontSize: "0.8rem", fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase",
  marginBottom: "0.75rem", paddingBottom: "0.4rem",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const QUESTION_TYPES = [
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Single Choice" },
  { value: "checkbox", label: "Multiple Choice" },
];

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function CreateFormModal({ onClose, onCreated }: Props) {
  const [tab, setTab] = useState<"basic" | "questions">("basic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addQuestion() {
    setQuestions(prev => [...prev, { id: genId(), label: "", type: "text", required: false }]);
  }

  function removeQuestion(id: string) {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }

  function updateQuestion(id: string, updates: Partial<Question>) {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }

  function addOption(qId: string) {
    setQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: [...(q.options || []), ""] } : q
    ));
  }

  function updateOption(qId: string, idx: number, val: string) {
    setQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: q.options?.map((o, i) => i === idx ? val : o) } : q
    ));
  }

  function removeOption(qId: string, idx: number) {
    setQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: q.options?.filter((_, i) => i !== idx) } : q
    ));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title || !eventDate) { setError("Title and event date are required"); return; }
    setLoading(true);
    try {
      const payload = {
        title, description, eventDate,
        questions: questions.length > 0 ? questions : null,
        socialLinks: null, // Hardcoded on the public page
      };
      const res = await fetch("/api/yep-admin/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.8rem",
    fontWeight: 600, cursor: "pointer", border: "none",
    background: active ? "rgba(99,102,241,0.25)" : "transparent",
    color: active ? "#a5b4fc" : "rgba(255,255,255,0.4)",
    transition: "all 0.15s",
  });

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: "1rem",
    }} onClick={onClose}>
      <div style={{
        background: "#1a2236", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "600px",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ margin: 0, color: "#f1f5f9", fontSize: "1.15rem", fontWeight: 700 }}>Create New Form</h2>
            <p style={{ margin: "0.2rem 0 0", color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>Configure your attendance form</p>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", color: "rgba(255,255,255,0.5)", width: "32px", height: "32px",
            cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem", background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "0.25rem" }}>
          {[["basic", "Basic Info"], ["questions", `Questions (${questions.length})`]].map(([key, label]) => (
            <button key={key} style={tabStyle(tab === key)} onClick={() => setTab(key as "basic" | "questions")}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Tab */}
          {tab === "basic" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Form Title *</label>
                <input id="new-form-title" style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Youth Leadership Summit 2025" />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea id="new-form-desc" style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the event..." />
              </div>
              <div>
                <label style={labelStyle}>Event Date *</label>
                <input id="new-form-date" style={inputStyle} type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
              </div>
            </div>
          )}

          {/* Questions Tab */}
          {tab === "questions" && (
            <div>
              <p style={sectionTitle}>Custom Questions</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "1rem" }}>
                Full Name and Email are always collected. Add extra questions below.
              </p>

              {questions.length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px dashed rgba(255,255,255,0.1)", marginBottom: "1rem" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" style={{ marginBottom: "0.5rem" }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", margin: 0 }}>No custom questions yet. Click below to add one.</p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
                {questions.map((q, qi) => (
                  <div key={q.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: 600 }}>QUESTION {qi + 1}</span>
                      <button type="button" onClick={() => removeQuestion(q.id)} style={{
                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                        borderRadius: "6px", color: "#fca5a5", padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem", cursor: "pointer",
                      }}>Remove</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <label style={labelStyle}>Question Label</label>
                        <input style={inputStyle} value={q.label} onChange={e => updateQuestion(q.id, { label: e.target.value })} placeholder="e.g. What city are you from?" />
                      </div>
                      <div>
                        <label style={labelStyle}>Type</label>
                        <select style={{ ...inputStyle, width: "140px" }} value={q.type} onChange={e => updateQuestion(q.id, { type: e.target.value as Question["type"], options: ["select", "radio", "checkbox"].includes(e.target.value) ? [""] : undefined })}>
                          {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", marginBottom: "0.75rem" }}>
                      <input type="checkbox" checked={q.required} onChange={e => updateQuestion(q.id, { required: e.target.checked })} />
                      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>Required field</span>
                    </label>
                    {(q.type === "select" || q.type === "radio" || q.type === "checkbox") && (
                      <div>
                        <label style={labelStyle}>Answer Options</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {(q.options || []).map((opt, oi) => (
                            <div key={oi} style={{ display: "flex", gap: "0.5rem" }}>
                              <input style={{ ...inputStyle, flex: 1 }} value={opt} onChange={e => updateOption(q.id, oi, e.target.value)} placeholder={`Option ${oi + 1}`} />
                              <button type="button" onClick={() => removeOption(q.id, oi)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#fca5a5", padding: "0.3rem 0.6rem", cursor: "pointer" }}>
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={() => addOption(q.id)} style={{ ...inputStyle, background: "transparent", border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)", cursor: "pointer", textAlign: "left", width: "auto" }}>
                            + Add option
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button type="button" onClick={addQuestion} style={{
                width: "100%", padding: "0.75rem",
                background: "rgba(99,102,241,0.1)", border: "1px dashed rgba(99,102,241,0.4)",
                borderRadius: "10px", color: "#a5b4fc", fontSize: "0.875rem",
                fontWeight: 600, cursor: "pointer",
              }}>
                + Add Question
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", padding: "0.75rem", color: "#fca5a5", fontSize: "0.85rem", marginTop: "1rem" }}>
              {error}
            </div>
          )}

          {/* Footer */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: "0.75rem",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 500, fontSize: "0.875rem",
            }}>Cancel</button>
            <button id="submit-new-form" type="submit" disabled={loading} style={{
              flex: 2, padding: "0.75rem",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              border: "none", borderRadius: "8px",
              color: "#fff", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, fontSize: "0.9rem",
            }}>
              {loading ? "Creating..." : "Create Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
