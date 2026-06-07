"use client";

import { useEffect, useState, use } from "react";

interface Question {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio" | "checkbox";
  options?: string[];
  required: boolean;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

interface FormInfo {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  isOpen: boolean;
  questions?: Question[] | null;
  socialLinks?: SocialLinks | null;
  _count: { responses: number };
}

type PageState = "loading" | "not_found" | "closed" | "form" | "success" | "duplicate";

const SOCIAL_CONFIG = [
  { key: "facebook", label: "Facebook", color: "#1877f2" },
  { key: "instagram", label: "Instagram", color: "#e1306c" },
  { key: "twitter", label: "Twitter / X", color: "#1da1f2" },
  { key: "linkedin", label: "LinkedIn", color: "#0a66c2" },
  { key: "youtube", label: "YouTube", color: "#ff0000" },
];

const inputBase: React.CSSProperties = {
  width: "100%", padding: "0.8rem 1rem",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px", color: "#f1f5f9",
  fontSize: "0.95rem", outline: "none", boxSizing: "border-box",
  fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
};

export default function AttendancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [formInfo, setFormInfo] = useState<FormInfo | null>(null);
  const [pageState, setPageState] = useState<PageState>("loading");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
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

  function handleAnswerChange(qId: string, value: string, isCheckbox = false, checked = false) {
    setAnswers(prev => {
      if (!isCheckbox) return { ...prev, [qId]: value };
      const existing = Array.isArray(prev[qId]) ? (prev[qId] as string[]) : [];
      if (checked) return { ...prev, [qId]: [...existing, value] };
      return { ...prev, [qId]: existing.filter(v => v !== value) };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate required custom questions
    const questions: Question[] = Array.isArray(formInfo?.questions) ? (formInfo!.questions as Question[]) : [];
    for (const q of questions) {
      if (!q.required) continue;
      const val = answers[q.id];
      const isEmpty = !val || (Array.isArray(val) && val.length === 0) || val === "";
      if (isEmpty) { setError(`"${q.label}" is required.`); return; }
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/attend/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, answers }),
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
    background: "linear-gradient(135deg, #0a0f1e 0%, #1a1040 60%, #0a0f1e 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    padding: "1.5rem",
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px", padding: "2.5rem",
    width: "100%", maxWidth: "500px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
  };

  const questions: Question[] = Array.isArray(formInfo?.questions) ? (formInfo!.questions as Question[]) : [];
  const socialLinks = formInfo?.socialLinks || {};
  const hasSocial = SOCIAL_CONFIG.some(s => (socialLinks as Record<string, string>)[s.key]);

  // --- Status pages ---
  if (pageState === "loading") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTop: "2px solid #6366f1", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
        <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.875rem" }}>Loading form...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (pageState === "not_found") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Form Not Found</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.875rem" }}>This attendance form does not exist or has been removed.</p>
      </div>
    </div>
  );

  if (pageState === "closed") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.5rem" }}>{formInfo?.title}</h1>
        <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "99px", background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)", fontSize: "0.7rem", fontWeight: 700, marginBottom: "0.75rem" }}>CLOSED</div>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.875rem" }}>Attendance submissions for this event are no longer being accepted.</p>
      </div>
    </div>
  );

  if (pageState === "success") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ width: "72px", height: "72px", background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "0 8px 24px rgba(16,185,129,0.35)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Attendance Recorded!</h1>
        <p style={{ color: "rgba(255,255,255,0.55)", margin: "0 0 1.5rem" }}>
          Thank you, <strong style={{ color: "#a5b4fc" }}>{name}</strong>! Your attendance has been registered.
        </p>
        {formInfo && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem", marginBottom: hasSocial ? "1.5rem" : 0 }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: 0 }}>
              {formInfo.title} — {new Date(formInfo.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          </div>
        )}
        {hasSocial && (
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Stay connected — follow us on social media</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
              {SOCIAL_CONFIG.map(s => {
                const url = (socialLinks as Record<string, string>)[s.key];
                if (!url) return null;
                return (
                  <a key={s.key} href={url} target="_blank" rel="noopener noreferrer" style={{
                    padding: "0.45rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600,
                    background: `${s.color}18`, border: `1px solid ${s.color}40`, color: s.color,
                    textDecoration: "none", transition: "all 0.15s",
                  }}>
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (pageState === "duplicate") return (
    <div style={base}>
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h1 style={{ color: "#f1f5f9", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Already Registered</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "0 0 1.5rem", fontSize: "0.875rem" }}>
          Attendance with this email address has already been recorded for this event.
        </p>
        <button onClick={() => { setPageState("form"); setEmail(""); setError(""); }} style={{
          padding: "0.75rem 1.5rem",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          border: "none", borderRadius: "10px",
          color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem",
          fontFamily: "inherit",
        }}>
          Try a Different Email
        </button>
      </div>
    </div>
  );

  // Main form
  return (
    <div style={base}>
      <div style={{ ...card, maxWidth: "520px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "52px", height: "52px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius: "14px", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 1rem",
            boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div style={{ display: "inline-block", padding: "0.2rem 0.7rem", borderRadius: "99px", background: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.25)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.6rem" }}>
            OPEN FOR SUBMISSIONS
          </div>
          <h1 style={{ color: "#f1f5f9", fontSize: "1.3rem", fontWeight: 800, margin: "0 0 0.4rem", lineHeight: 1.3 }}>
            {formInfo?.title}
          </h1>
          {formInfo?.description && (
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", margin: "0 0 0.4rem", lineHeight: 1.5 }}>
              {formInfo.description}
            </p>
          )}
          {formInfo?.eventDate && (
            <p style={{ color: "rgba(165,180,252,0.6)", fontSize: "0.78rem", margin: 0 }}>
              {new Date(formInfo.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          )}
        </div>

        {/* Social follow prompt (before form) */}
        {hasSocial && (
          <div style={{
            background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem",
          }}>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", margin: "0 0 0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Follow Us
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {SOCIAL_CONFIG.map(s => {
                const url = (socialLinks as Record<string, string>)[s.key];
                if (!url) return null;
                return (
                  <a key={s.key} href={url} target="_blank" rel="noopener noreferrer" style={{
                    padding: "0.35rem 0.8rem", borderRadius: "7px", fontSize: "0.75rem", fontWeight: 600,
                    background: `${s.color}18`, border: `1px solid ${s.color}40`, color: s.color,
                    textDecoration: "none",
                  }}>
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Fixed fields */}
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              Full Name <span style={{ color: "#f87171" }}>*</span>
            </label>
            <input id="attend-name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your full name" style={inputBase} />
          </div>

          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              Email Address <span style={{ color: "#f87171" }}>*</span>
            </label>
            <input id="attend-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={inputBase} />
          </div>

          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", marginBottom: "0.4rem", fontWeight: 500 }}>
              Phone Number <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input id="attend-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" style={inputBase} />
          </div>

          {/* Dynamic custom questions */}
          {questions.map(q => (
            <div key={q.id}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", marginBottom: "0.4rem", fontWeight: 500 }}>
                {q.label}
                {q.required && <span style={{ color: "#f87171", marginLeft: "0.25rem" }}>*</span>}
              </label>

              {q.type === "text" && (
                <input type="text" value={(answers[q.id] as string) || ""} onChange={e => handleAnswerChange(q.id, e.target.value)} style={inputBase} placeholder={q.label} />
              )}
              {q.type === "textarea" && (
                <textarea value={(answers[q.id] as string) || ""} onChange={e => handleAnswerChange(q.id, e.target.value)} style={{ ...inputBase, minHeight: "80px", resize: "vertical" }} placeholder={q.label} />
              )}
              {q.type === "select" && (
                <select value={(answers[q.id] as string) || ""} onChange={e => handleAnswerChange(q.id, e.target.value)} style={{ ...inputBase, appearance: "none" }}>
                  <option value="">Select an option...</option>
                  {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
              {q.type === "radio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {q.options?.map(opt => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
                      <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => handleAnswerChange(q.id, opt)} style={{ accentColor: "#6366f1" }} />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {q.type === "checkbox" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {q.options?.map(opt => {
                    const checked = Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt);
                    return (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
                        <input type="checkbox" value={opt} checked={checked} onChange={e => handleAnswerChange(q.id, opt, true, e.target.checked)} style={{ accentColor: "#6366f1" }} />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", color: "#fca5a5", fontSize: "0.875rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "1px", flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button id="attend-submit-btn" type="submit" disabled={submitting} style={{
            width: "100%", padding: "0.9rem",
            background: submitting ? "rgba(99,102,241,0.45)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: "10px",
            color: "#fff", fontSize: "0.95rem", fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            boxShadow: submitting ? "none" : "0 4px 15px rgba(99,102,241,0.35)",
            transition: "all 0.2s", marginTop: "0.25rem",
            fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          }}>
            {submitting ? (
              <>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", animation: "spin 0.8s linear infinite" }} />
                Submitting...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Mark My Attendance
              </>
            )}
          </button>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", margin: 0 }}>
            Your information is used only for event attendance tracking.
          </p>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; } option { background: #1a2236; color: #f1f5f9; }`}</style>
    </div>
  );
}
