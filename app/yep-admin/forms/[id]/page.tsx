"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

interface Response {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  submittedAt: string;
  answers?: Record<string, string | string[]> | null;
}

interface FormDetail {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  slug: string;
  isOpen: boolean;
  questions?: Question[] | null;
  responses: Response[];
}

const C = {
  bg: "#0a0f1e", card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.07)", text: "#f1f5f9",
  muted: "rgba(255,255,255,0.4)", primary: "#6366f1",
  success: "#10b981", danger: "#ef4444",
};

export default function FormResponsesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<FormDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchForm() {
      const res = await fetch(`/api/yep-admin/forms/${id}`);
      if (res.status === 401) { router.push("/yep-admin/login"); return; }
      if (!res.ok) { router.push("/yep-admin"); return; }
      setForm(await res.json());
      setLoading(false);
    }
    fetchForm();
  }, [id, router]);

  async function handleDownloadPDF() {
    if (!form) return;
    const { generateAttendancePDF } = await import("@/lib/pdfGenerator");
    generateAttendancePDF(form);
  }

  const questions: Question[] = Array.isArray(form?.questions) ? (form!.questions as Question[]) : [];

  const filtered = (form?.responses || []).filter(r => {
    const base = `${r.name} ${r.email} ${r.phone || ""}`.toLowerCase();
    const answers = r.answers
      ? Object.values(r.answers).flat().join(" ").toLowerCase()
      : "";
    return base.includes(search.toLowerCase()) || answers.includes(search.toLowerCase());
  });

  if (loading) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: "'Inter',sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTop: "2px solid #6366f1", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
        Loading...
      </div>
    </div>
  );

  if (!form) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <header className="admin-header" style={{
        background: "rgba(10,15,30,0.9)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`, padding: "0 2rem",
        height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/yep-admin" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            color: C.muted, textDecoration: "none", fontSize: "0.8rem",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Dashboard
          </Link>
          <span style={{ color: C.border }}>|</span>
          <span className="breadcrumbs-title" style={{ fontWeight: 700, fontSize: "0.875rem" }}>{form.title}</span>
        </div>
        <button
          id="download-pdf-btn"
          onClick={handleDownloadPDF}
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            padding: "0.45rem 1rem",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: "8px",
            color: "#fff", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Export PDF
        </button>
      </header>

      <main className="admin-main" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Form info */}
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800 }}>{form.title}</h1>
            <span style={{
              padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.65rem", fontWeight: 700,
              background: form.isOpen ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)",
              color: form.isOpen ? C.success : C.danger,
              border: `1px solid ${form.isOpen ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.2)"}`,
            }}>
              {form.isOpen ? "OPEN" : "CLOSED"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", color: C.muted, fontSize: "0.8rem" }}>
            <span>{new Date(form.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}</span>
            <span>{form.responses.length} response{form.responses.length !== 1 ? "s" : ""}</span>
            <span>/attend/{form.slug}</span>
          </div>
          {form.description && <p style={{ margin: "0.75rem 0 0", color: C.muted, fontSize: "0.8rem" }}>{form.description}</p>}
        </div>

        {/* Search */}
        <div style={{ marginBottom: "1rem", position: "relative" }}>
          <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: C.muted }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input
            id="search-responses"
            type="text"
            placeholder="Search responses by name, email, phone, or answers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "0.7rem 1rem 0.7rem 2.5rem",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${C.border}`,
              borderRadius: "10px", color: C.text,
              fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "3rem",
            background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px",
            color: C.muted, fontSize: "0.875rem",
          }}>
            {search ? "No responses match your search." : "No responses yet."}
          </div>
        ) : (
          <div style={{ overflow: "auto", borderRadius: "14px", border: `1px solid ${C.border}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  {["#", "Full Name", "Email", "Phone", ...questions.map(q => q.label), "Submitted At"].map(h => (
                    <th key={h} style={{
                      padding: "0.7rem 1rem", textAlign: "left",
                      color: C.muted, fontSize: "0.7rem",
                      fontWeight: 700, letterSpacing: "0.06em",
                      textTransform: "uppercase", whiteSpace: "nowrap",
                      borderBottom: `1px solid ${C.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id}
                    style={{ borderBottom: `1px solid ${C.border}`, transition: "background 0.12s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "0.8rem 1rem", color: C.muted, fontSize: "0.8rem" }}>{i + 1}</td>
                    <td style={{ padding: "0.8rem 1rem", fontWeight: 600, fontSize: "0.875rem" }}>{r.name}</td>
                    <td style={{ padding: "0.8rem 1rem", color: "rgba(165,180,252,0.85)", fontSize: "0.8rem" }}>{r.email}</td>
                    <td style={{ padding: "0.8rem 1rem", color: C.muted, fontSize: "0.8rem" }}>{r.phone || "—"}</td>
                    {questions.map(q => {
                      const val = r.answers?.[q.id];
                      const display = Array.isArray(val) ? val.join(", ") : val || "—";
                      return (
                        <td key={q.id} style={{ padding: "0.8rem 1rem", color: C.muted, fontSize: "0.8rem", maxWidth: "180px" }}>
                          <span title={display}>{display.length > 40 ? display.slice(0, 40) + "…" : display}</span>
                        </td>
                      );
                    })}
                    <td style={{ padding: "0.8rem 1rem", color: C.muted, fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                      {new Date(r.submittedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input, button, a { font-family: inherit; }

        @media (max-width: 600px) {
          .admin-header {
            padding: 0 1rem !important;
          }
          .admin-main {
            padding: 1rem 0.75rem !important;
          }
          .breadcrumbs-title {
            max-width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            vertical-align: middle;
          }
        }
      `}</style>
    </div>
  );
}
