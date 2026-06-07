import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mark Attendance | Youth Empowerment Programme",
  description: "Submit your attendance for a Youth Empowerment Programme event.",
  robots: { index: false, follow: false },
};

export default function AttendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
