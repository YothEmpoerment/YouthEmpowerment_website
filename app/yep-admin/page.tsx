"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CreateFormModal from "./CreateFormModal";
import EditFormModal from "./EditFormModal";

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

interface FormItem {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  slug: string;
  isOpen: boolean;
  createdAt: string;
  questions?: Question[] | null;
  socialLinks?: SocialLinks | null;
  _count: { responses: number };
}


const C = {
  bg: "#0a0f1e",
  surface: "#111827",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.07)",
  text: "#f1f5f9",
  muted: "rgba(255,255,255,0.4)",
  primary: "#6366f1",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
};

// SVG icons
const Icons = {
  forms: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  active: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  eye: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  edit: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  link: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  pause: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
    </svg>
  ),
  play: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  pdf: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  reset: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  trash: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  logout: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

export default function AdminDashboard() {
  const router = useRouter();
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchForms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/yep-admin/forms");
      if (res.status === 401) { router.push("/yep-admin/login"); return; }
      const data = await res.json();
      setForms(data);
    } catch {
      showToast("Failed to fetch forms", "error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchForms(); }, [fetchForms]);

  async function handleLogout() {
    await fetch("/api/yep-admin/logout", { method: "POST" });
    router.push("/yep-admin/login");
  }

  async function handleToggle(form: FormItem) {
    const res = await fetch(`/api/yep-admin/forms/${form.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOpen: !form.isOpen }),
    });
    if (res.ok) { showToast(`Form ${form.isOpen ? "closed" : "opened"}`); fetchForms(); }
    else showToast("Failed to toggle form", "error");
  }

  async function handleDelete(form: FormItem) {
    if (!confirm(`Delete "${form.title}"? This will also delete all ${form._count.responses} responses. This cannot be undone.`)) return;
    const res = await fetch(`/api/yep-admin/forms/${form.id}`, { method: "DELETE" });
    if (res.ok) { showToast("Form deleted"); fetchForms(); }
    else showToast("Failed to delete form", "error");
  }

  async function handleReset(form: FormItem) {
    if (!confirm(`Reset all ${form._count.responses} responses for "${form.title}"?`)) return;
    const res = await fetch(`/api/yep-admin/forms/${form.id}/responses`, { method: "DELETE" });
    if (res.ok) { showToast("Responses cleared"); fetchForms(); }
    else showToast("Failed to reset responses", "error");
  }

  function copyShareLink(slug: string) {
    const url = `${window.location.origin}/attend/${slug}`;
    navigator.clipboard.writeText(url);
    showToast("Share link copied!");
  }

  async function handleDownloadPDF(form: FormItem) {
    try {
      const res = await fetch(`/api/yep-admin/forms/${form.id}`);
      const data = await res.json();
      const { generateAttendancePDF } = await import("@/lib/pdfGenerator");
      generateAttendancePDF(data);
    } catch {
      showToast("Failed to generate PDF", "error");
    }
  }

  // Stats
  const totalForms = forms.length;
  const totalResponses = forms.reduce((s, f) => s + f._count.responses, 0);
  const activeForms = forms.filter(f => f.isOpen).length;

  const statCards = [
    { label: "Total Forms", value: totalForms, icon: Icons.forms, accent: "#6366f1" },
    { label: "Total Responses", value: totalResponses, icon: Icons.users, accent: "#10b981" },
    { label: "Active Forms", value: activeForms, icon: Icons.active, accent: "#f59e0b" },
  ];

  const btnStyle = (color: string, bg: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.3rem 0.65rem",
    border: `1px solid ${color}`,
    borderRadius: "6px", background: bg, color,
    fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
    transition: "all 0.15s", whiteSpace: "nowrap" as const,
    fontFamily: "inherit",
  });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: "1.25rem", right: "1.25rem", zIndex: 9999,
          background: toast.type === "success" ? "rgba(16,185,129,0.92)" : "rgba(239,68,68,0.92)",
          backdropFilter: "blur(10px)", color: "#fff",
          padding: "0.75rem 1.25rem", borderRadius: "10px",
          fontSize: "0.875rem", fontWeight: 600,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          animation: "slideIn 0.3s ease",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <header style={{
        background: "rgba(10,15,30,0.9)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`, padding: "0 2rem",
        height: "60px", display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>YEP Admin</div>
            <div style={{ fontSize: "0.65rem", color: C.muted, letterSpacing: "0.04em" }}>ATTENDANCE MANAGEMENT</div>
          </div>
        </div>
        <button id="admin-logout-btn" onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          padding: "0.45rem 0.9rem",
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: "8px", color: "#fca5a5",
          fontSize: "0.8rem", cursor: "pointer", fontWeight: 500, fontFamily: "inherit",
        }}>
          {Icons.logout} Sign Out
        </button>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {statCards.map((s) => (
            <div key={s.label} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: "14px", padding: "1.25rem 1.5rem",
              display: "flex", alignItems: "center", gap: "1rem",
              borderLeft: `3px solid ${s.accent}`,
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                background: `${s.accent}1a`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.accent,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: C.text, lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: C.muted, marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.2rem", color: C.text }}>
              Attendance Forms
            </h1>
            <p style={{ color: C.muted, fontSize: "0.8rem", margin: 0 }}>
              {forms.length} form{forms.length !== 1 ? "s" : ""} · manage, share, and export
            </p>
          </div>
          <button id="create-form-btn" onClick={() => setShowCreate(true)} style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            padding: "0.65rem 1.25rem",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: "10px", color: "#fff",
            fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
            fontFamily: "inherit",
          }}>
            {Icons.plus} New Form
          </button>
        </div>

        {/* Forms list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: C.muted }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.1)", borderTop: "2px solid #6366f1",
              animation: "spin 0.8s linear infinite", margin: "0 auto 1rem",
            }} />
            Loading forms...
          </div>
        ) : forms.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "4rem 2rem",
            background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px",
          }}>
            <div style={{ color: "rgba(255,255,255,0.15)", marginBottom: "1rem" }}>{Icons.forms}</div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: C.text, marginBottom: "0.5rem" }}>No forms yet</div>
            <div style={{ color: C.muted, fontSize: "0.8rem" }}>Click "New Form" to create your first attendance form.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {forms.map((form) => (
              <div key={form.id} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: "14px", padding: "1.1rem 1.4rem",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                      <h2 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: C.text }}>{form.title}</h2>
                      <span style={{
                        padding: "0.15rem 0.55rem", borderRadius: "99px", fontSize: "0.65rem", fontWeight: 700,
                        letterSpacing: "0.05em",
                        background: form.isOpen ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)",
                        color: form.isOpen ? C.success : C.danger,
                        border: `1px solid ${form.isOpen ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.2)"}`,
                      }}>
                        {form.isOpen ? "OPEN" : "CLOSED"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.775rem", color: C.muted }}>
                        {new Date(form.eventDate).toLocaleDateString("en-US", { dateStyle: "medium" })}
                      </span>
                      <span style={{ fontSize: "0.775rem", color: C.muted }}>
                        {form._count.responses} response{form._count.responses !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {form.description && (
                      <p style={{ margin: "0.4rem 0 0", fontSize: "0.775rem", color: C.muted, lineHeight: 1.5 }}>
                        {form.description}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
                    <a href={`/yep-admin/forms/${form.id}`} style={btnStyle("rgba(99,102,241,0.8)", "rgba(99,102,241,0.08)")}>
                      {Icons.eye} Responses
                    </a>
                    <button onClick={() => setEditingForm(form)} style={btnStyle(C.muted, "rgba(255,255,255,0.04)")}>
                      {Icons.edit} Edit
                    </button>
                    <button onClick={() => copyShareLink(form.slug)} style={btnStyle(C.muted, "rgba(255,255,255,0.04)")}>
                      {Icons.link} Copy Link
                    </button>
                    <button onClick={() => handleToggle(form)} style={btnStyle(
                      form.isOpen ? C.warning : C.success,
                      form.isOpen ? "rgba(245,158,11,0.08)" : "rgba(16,185,129,0.08)"
                    )}>
                      {form.isOpen ? Icons.pause : Icons.play}
                      {form.isOpen ? "Close" : "Open"}
                    </button>
                    <button onClick={() => handleDownloadPDF(form)} style={btnStyle(C.muted, "rgba(255,255,255,0.04)")}>
                      {Icons.pdf} PDF
                    </button>
                    <button onClick={() => handleReset(form)} style={btnStyle(C.warning, "rgba(245,158,11,0.06)")}>
                      {Icons.reset} Reset
                    </button>
                    <button onClick={() => handleDelete(form)} style={btnStyle(C.danger, "rgba(239,68,68,0.08)")}>
                      {Icons.trash} Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showCreate && (
        <CreateFormModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); fetchForms(); showToast("Form created!"); }}
        />
      )}

      {editingForm && (
        <EditFormModal
          form={editingForm}
          onClose={() => setEditingForm(null)}
          onUpdated={() => { setEditingForm(null); fetchForms(); showToast("Form updated!"); }}
        />
      )}

      <style>{`
        @keyframes slideIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input, button, a, select, textarea { font-family: inherit; }
        option { background: #1a2236; color: #f1f5f9; }
      `}</style>
    </div>
  );
}
