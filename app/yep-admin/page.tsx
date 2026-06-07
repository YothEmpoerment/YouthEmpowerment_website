"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CreateFormModal from "./CreateFormModal";
import EditFormModal from "./EditFormModal";

interface FormItem {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  slug: string;
  isOpen: boolean;
  createdAt: string;
  _count: { responses: number };
}

const colors = {
  bg: "#0f172a",
  card: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  text: "#f1f5f9",
  muted: "rgba(255,255,255,0.45)",
  primary: "#6366f1",
  primaryLight: "rgba(99,102,241,0.15)",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
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
    if (res.ok) {
      showToast(`Form ${form.isOpen ? "closed" : "opened"} successfully`);
      fetchForms();
    } else {
      showToast("Failed to toggle form", "error");
    }
  }

  async function handleDelete(form: FormItem) {
    if (!confirm(`Delete "${form.title}"? This will also delete all ${form._count.responses} responses. This cannot be undone.`)) return;
    const res = await fetch(`/api/yep-admin/forms/${form.id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Form deleted");
      fetchForms();
    } else {
      showToast("Failed to delete form", "error");
    }
  }

  async function handleReset(form: FormItem) {
    if (!confirm(`Reset all ${form._count.responses} responses for "${form.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/yep-admin/forms/${form.id}/responses`, { method: "DELETE" });
    if (res.ok) {
      showToast("All responses reset");
      fetchForms();
    } else {
      showToast("Failed to reset responses", "error");
    }
  }

  function copyShareLink(slug: string) {
    const url = `${window.location.origin}/attend/${slug}`;
    navigator.clipboard.writeText(url);
    showToast("Share link copied to clipboard!");
  }

  async function handleDownloadPDF(form: FormItem) {
    try {
      const res = await fetch(`/api/yep-admin/forms/${form.id}`);
      const data = await res.json();
      // Dynamic import to avoid SSR issues
      const { generateAttendancePDF } = await import("@/lib/pdfGenerator");
      generateAttendancePDF(data);
    } catch {
      showToast("Failed to generate PDF", "error");
    }
  }

  const btnStyle = (color: string, bg: string): React.CSSProperties => ({
    padding: "0.375rem 0.75rem",
    border: `1px solid ${color}`,
    borderRadius: "6px",
    background: bg,
    color: color,
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: "1.25rem", right: "1.25rem", zIndex: 9999,
          background: toast.type === "success" ? "rgba(16,185,129,0.9)" : "rgba(239,68,68,0.9)",
          backdropFilter: "blur(10px)",
          color: "#fff", padding: "0.875rem 1.25rem", borderRadius: "10px",
          fontSize: "0.875rem", fontWeight: 600,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          animation: "slideIn 0.3s ease",
        }}>
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <header style={{
        background: "rgba(15,23,42,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${colors.border}`,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🛡️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: colors.text }}>YEP Admin</div>
            <div style={{ fontSize: "0.7rem", color: colors.muted }}>Attendance Management</div>
          </div>
        </div>
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "8px",
            color: "#fca5a5",
            fontSize: "0.875rem",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Sign Out
        </button>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.25rem", background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Attendance Forms
            </h1>
            <p style={{ color: colors.muted, fontSize: "0.875rem", margin: 0 }}>
              {forms.length} form{forms.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            id="create-form-btn"
            onClick={() => setShowCreate(true)}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
              transition: "transform 0.15s",
            }}
          >
            + New Form
          </button>
        </div>

        {/* Forms table / list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: colors.muted }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem", animation: "spin 1s linear infinite" }}>⚙️</div>
            Loading forms…
          </div>
        ) : forms.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "4rem 2rem",
            background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "16px",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: colors.text, marginBottom: "0.5rem" }}>No forms yet</div>
            <div style={{ color: colors.muted, fontSize: "0.875rem" }}>Click &quot;+ New Form&quot; to create your first attendance form.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {forms.map((form) => (
              <div key={form.id} style={{
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: "16px",
                padding: "1.25rem 1.5rem",
                transition: "border-color 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  {/* Left: info */}
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                      <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: colors.text }}>
                        {form.title}
                      </h2>
                      <span style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "99px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        background: form.isOpen ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.12)",
                        color: form.isOpen ? colors.success : colors.danger,
                        border: `1px solid ${form.isOpen ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.25)"}`,
                      }}>
                        {form.isOpen ? "● OPEN" : "● CLOSED"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.8rem", color: colors.muted }}>
                        📅 {new Date(form.eventDate).toLocaleDateString("en-US", { dateStyle: "medium" })}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: colors.muted }}>
                        👥 {form._count.responses} response{form._count.responses !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {form.description && (
                      <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: colors.muted, lineHeight: 1.5 }}>
                        {form.description}
                      </p>
                    )}
                  </div>

                  {/* Right: actions */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                    <a
                      href={`/yep-admin/forms/${form.id}`}
                      style={btnStyle("rgba(99,102,241,0.8)", "rgba(99,102,241,0.1)")}
                    >
                      👁 Responses
                    </a>
                    <button onClick={() => setEditingForm(form)} style={btnStyle(colors.muted, "rgba(255,255,255,0.05)")}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => copyShareLink(form.slug)} style={btnStyle(colors.muted, "rgba(255,255,255,0.05)")}>
                      🔗 Copy Link
                    </button>
                    <button
                      onClick={() => handleToggle(form)}
                      style={btnStyle(
                        form.isOpen ? colors.warning : colors.success,
                        form.isOpen ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)"
                      )}
                    >
                      {form.isOpen ? "⏸ Close" : "▶ Open"}
                    </button>
                    <button onClick={() => handleDownloadPDF(form)} style={btnStyle(colors.muted, "rgba(255,255,255,0.05)")}>
                      📄 PDF
                    </button>
                    <button onClick={() => handleReset(form)} style={btnStyle(colors.warning, "rgba(245,158,11,0.08)")}>
                      🔄 Reset
                    </button>
                    <button onClick={() => handleDelete(form)} style={btnStyle(colors.danger, "rgba(239,68,68,0.1)")}>
                      🗑 Delete
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
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input, button, a { font-family: inherit; }
      `}</style>
    </div>
  );
}
