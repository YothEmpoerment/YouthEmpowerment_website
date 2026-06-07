"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Response {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  submittedAt: string;
}

interface FormDetail {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  slug: string;
  isOpen: boolean;
  responses: Response[];
}

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

  const filtered = form?.responses.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    (r.phone || "").includes(search)
  ) || [];

  const colors = {
    bg: "#0f172a", card: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)", text: "#f1f5f9",
    muted: "rgba(255,255,255,0.45)", primary: "#6366f1",
    success: "#10b981", danger: "#ef4444",
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.muted, fontFamily: "'Inter',sans-serif" }}>
      Loading…
    </div>
  );

  if (!form) return null;

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "rgba(15,23,42,0.8)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${colors.border}`, padding: "0 2rem",
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/yep-admin" style={{ color: colors.muted, textDecoration: "none", fontSize: "0.875rem" }}>
            ← Back
          </Link>
          <span style={{ color: colors.border }}>|</span>
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>🛡️ YEP Admin</span>
        </div>
        <button
          id="download-pdf-btn"
          onClick={handleDownloadPDF}
          style={{
            padding: "0.5rem 1rem",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: "8px",
            color: "#fff", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
          }}
        >
          📄 Download PDF
        </button>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Form info */}
        <div style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: colors.text }}>{form.title}</h1>
            <span style={{
              padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: 700,
              background: form.isOpen ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.12)",
              color: form.isOpen ? colors.success : colors.danger,
              border: `1px solid ${form.isOpen ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.25)"}`,
            }}>
              {form.isOpen ? "● OPEN" : "● CLOSED"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", color: colors.muted, fontSize: "0.85rem" }}>
            <span>📅 {new Date(form.eventDate).toLocaleDateString("en-US", { dateStyle: "long" })}</span>
            <span>👥 {form.responses.length} total response{form.responses.length !== 1 ? "s" : ""}</span>
            <span>🔗 /attend/{form.slug}</span>
          </div>
          {form.description && <p style={{ margin: "0.75rem 0 0", color: colors.muted, fontSize: "0.85rem" }}>{form.description}</p>}
        </div>

        {/* Search */}
        <div style={{ marginBottom: "1rem" }}>
          <input
            id="search-responses"
            type="text"
            placeholder="Search by name, email, or phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${colors.border}`,
              borderRadius: "10px", color: colors.text,
              fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Responses table */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "3rem",
            background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "16px",
            color: colors.muted,
          }}>
            {search ? "No responses match your search." : "No responses yet."}
          </div>
        ) : (
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  {["#", "Name", "Email", "Phone", "Submitted At"].map(h => (
                    <th key={h} style={{
                      padding: "0.75rem 1rem", textAlign: "left",
                      color: colors.muted, fontSize: "0.75rem",
                      fontWeight: 600, letterSpacing: "0.05em",
                      textTransform: "uppercase" as const,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{
                    borderBottom: `1px solid ${colors.border}`,
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "0.875rem 1rem", color: colors.muted, fontSize: "0.85rem" }}>{i + 1}</td>
                    <td style={{ padding: "0.875rem 1rem", fontWeight: 600, fontSize: "0.9rem" }}>{r.name}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "rgba(165,180,252,0.9)", fontSize: "0.85rem" }}>{r.email}</td>
                    <td style={{ padding: "0.875rem 1rem", color: colors.muted, fontSize: "0.85rem" }}>{r.phone || "—"}</td>
                    <td style={{ padding: "0.875rem 1rem", color: colors.muted, fontSize: "0.8rem" }}>
                      {new Date(r.submittedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
