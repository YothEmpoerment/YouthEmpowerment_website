import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YEP Admin",
  description: "Youth Empowerment Admin Panel",
  robots: { index: false, follow: false },
};

export default function YepAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="yep-admin-root">
      {children}
    </div>
  );
}
