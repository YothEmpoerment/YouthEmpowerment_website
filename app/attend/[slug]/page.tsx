"use client";

import { useEffect, useState, use } from "react";

interface FormInfo {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  isOpen: boolean;
  _count: { responses: number };
}

type PageState = "loading" | "not_found" | "closed" | "form" | "success" | "duplicate";

export default function AttendancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [formInfo, setFormInfo] = useState<FormInfo | null>(null);
  const [pageState, setPageState] = useState<PageState>("loading");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch(`/api/attend/${slug}`);
        if (res.status === 404) { setPageState("not_found"); return; }
        const data: FormInfo = await res.json();
        setFormInfo(data);
        setPageState(data.isOpen ? "form" : "closed");
      } catch {
        setPageState("not_found");
      }
    }
    loadForm();
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/attend/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (res.status === 409) { setPageState("duplicate"); return; }
      if (!res.ok) { setError(data.error || "Submission failed"); return; }
      setPageState("success");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const base: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "1.5rem",
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  };

  if (pageState === "loading") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem", animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</div>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>Loading attendance form…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (pageState === "not_found") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Form Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>This attendance form does not exist or has been removed.</p>
      </div>
    </div>
  );

  if (pageState === "closed") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>{formInfo?.title}</h1>
        <div style={{
          display: "inline-block", padding: "0.3rem 0.9rem", borderRadius: "99px",
          background: "rgba(239,68,68,0.15)", color: "#fca5a5",
          border: "1px solid rgba(239,68,68,0.3)", fontSize: "0.8rem",
          fontWeight: 700, marginBottom: "1rem",
        }}>
          ● CLOSED
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
          Attendance submissions for this event are no longer being accepted.
        </p>
        {formInfo?.eventDate && (
          <p style={{ color: "rgba(255,255,255,0.35)", marginTop: "0.75rem", fontSize: "0.85rem" }}>
            Event: {new Date(formInfo.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        )}
      </div>
    </div>
  );

  if (pageState === "success") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{
          width: "72px", height: "72px",
          background: "linear-gradient(135deg,#10b981,#059669)",
          borderRadius: "50%", display: "flex", alignItems: "center",
          justifyContent: "center", margin: "0 auto 1.5rem",
          fontSize: "2rem", boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
        }}>✓</div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Attendance Recorded!</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 1rem" }}>
          Thank you, <strong style={{ color: "#a5b4fc" }}>{name}</strong>! Your attendance has been successfully registered.
        </p>
        {formInfo && (
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", padding: "1rem",
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: 0 }}>
              📅 {formInfo.title} — {new Date(formInfo.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (pageState === "duplicate") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Already Registered</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
          Attendance with this email address has already been recorded for this event.
        </p>
        <button
          onClick={() => { setPageState("form"); setEmail(""); setError(""); }}
          style={{
            marginTop: "1.5rem", padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: "10px",
            color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
          }}
        >
          Try Different Email
        </button>
      </div>
    </div>
  );

  // Main form state
  return (
    <div style={base}>
      <div style={card}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "56px", height: "56px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius: "14px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "1.5rem",
            margin: "0 auto 1rem", boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
          }}>📋</div>
          <div style={{
            display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "99px",
            background: "rgba(16,185,129,0.15)", color: "#6ee7b7",
            border: "1px solid rgba(16,185,129,0.3)", fontSize: "0.7rem",
            fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.75rem",
          }}>
            ● OPEN FOR SUBMISSIONS
          </div>
          <h1 style={{ color: "#f1f5f9", fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.4rem", lineHeight: 1.3 }}>
            {formInfo?.title}
          </h1>
          {formInfo?.description && (
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", margin: "0 0 0.5rem", lineHeight: 1.5 }}>
              {formInfo.description}
            </p>
          )}
          {formInfo?.eventDate && (
            <p style={{ color: "rgba(165,180,252,0.7)", fontSize: "0.8rem", margin: 0 }}>
              📅 {new Date(formInfo.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Name */}
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              Full Name *
            </label>
            <input
              id="attend-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Your full name"
              style={{
                width: "100%", padding: "0.8rem 1rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px", color: "#f1f5f9",
                fontSize: "0.95rem", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              Email Address *
            </label>
            <input
              id="attend-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                width: "100%", padding: "0.8rem 1rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px", color: "#f1f5f9",
                fontSize: "0.95rem", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Phone */}
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              Phone Number <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="attend-phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              style={{
                width: "100%", padding: "0.8rem 1rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px", color: "#f1f5f9",
                fontSize: "0.95rem", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "8px", padding: "0.75rem 1rem",
              color: "#fca5a5", fontSize: "0.875rem",
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            id="attend-submit-btn"
            type="submit"
            disabled={submitting}
            style={{
              width: "100%", padding: "0.9rem",
              background: submitting
                ? "rgba(99,102,241,0.5)"
                : "linear-gradient(135deg,#6366f1,#8b5cf6)",
              border: "none", borderRadius: "10px",
              color: "#fff", fontSize: "1rem", fontWeight: 700,
              cursor: submitting ? "not-allowed" : "pointer",
              boxShadow: submitting ? "none" : "0 4px 15px rgba(99,102,241,0.4)",
              transition: "all 0.2s", marginTop: "0.5rem",
            }}
          >
            {submitting ? "Submitting…" : "Mark My Attendance ✓"}
          </button>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: 0 }}>
            Your information is used only for event attendance tracking.
          </p>
        </form>
      </div>
    </div>
  );
}
