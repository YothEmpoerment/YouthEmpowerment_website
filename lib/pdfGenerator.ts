import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Response {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  submittedAt: string;
}

interface FormData {
  title: string;
  description: string | null;
  eventDate: string;
  slug: string;
  isOpen: boolean;
  responses: Response[];
}

export function generateAttendancePDF(form: FormData) {
  const doc = new jsPDF();

  // Header background
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 0, 210, 40, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Youth Empowerment Programme", 14, 14);

  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Attendance Report", 14, 22);

  // Status badge
  const statusColor = form.isOpen ? [16, 185, 129] : [239, 68, 68];
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(14, 27, 22, 7, 2, 2, "F");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(form.isOpen ? "OPEN" : "CLOSED", 25, 32, { align: "center" });

  // Form info section
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(form.title, 14, 55);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);

  const eventDateStr = new Date(form.eventDate).toLocaleDateString("en-US", { dateStyle: "long" });
  doc.text(`Event Date: ${eventDateStr}`, 14, 63);
  doc.text(`Total Attendees: ${form.responses.length}`, 14, 70);
  doc.text(`Generated: ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`, 14, 77);

  if (form.description) {
    doc.text(`Description: ${form.description}`, 14, 84);
  }

  // Divider
  doc.setDrawColor(230, 230, 230);
  doc.line(14, form.description ? 90 : 83, 196, form.description ? 90 : 83);

  // Table
  if (form.responses.length === 0) {
    doc.setFontSize(11);
    doc.setTextColor(150, 150, 150);
    doc.text("No responses submitted yet.", 14, form.description ? 100 : 93);
  } else {
    autoTable(doc, {
      startY: form.description ? 95 : 88,
      head: [["#", "Full Name", "Email Address", "Phone", "Submitted At"]],
      body: form.responses.map((r, i) => [
        String(i + 1),
        r.name,
        r.email,
        r.phone || "—",
        new Date(r.submittedAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }),
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 4,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [248, 248, 255],
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40 },
        2: { cellWidth: 60 },
        3: { cellWidth: 30 },
        4: { cellWidth: 45 },
      },
      margin: { left: 14, right: 14 },
    });
  }

  // Footer
  const pageCount = (doc as jsPDF & { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(
      `Youth Empowerment Programme — Attendance Report — Page ${i} of ${pageCount}`,
      105, 290, { align: "center" }
    );
  }

  // Save
  const safeName = form.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  doc.save(`attendance_${safeName}_${eventDateStr.replace(/\s/g, "_")}.pdf`);
}
