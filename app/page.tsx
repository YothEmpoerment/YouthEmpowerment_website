import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import WhatWeDoPreview from "@/components/sections/WhatWeDoPreview";
import HomeCtaSection from "@/components/sections/HomeCtaSection";

export const metadata: Metadata = {
  // ✅ "Home" was bad — Google uses this as the page title in search results
  title: "Youth Empowerment | Empowering the Next Generation of Innovators",
  description:
    "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology. Join our community today.",
  alternates: {
    canonical: "https://youthempowerment.community",
  },
  openGraph: {
    title: "Youth Empowerment | Empowering the Next Generation of Innovators",
    description:
      "Join thousands of young innovators, mentors, and professionals building impactful careers in technology.",
    url: "https://youthempowerment.community",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Youth Empowerment Community",
      },
    ],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NonGovernmentalOrganization",
        name: "Youth Empowerment",
        url: "https://youthempowerment.community",
        logo: "https://youthempowerment.community/logo.png",
        description:
          "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
        sameAs: [
          "https://www.linkedin.com/company/youth-empowerment-community/",
          "https://www.instagram.com/_youthempowerment_/",
        ],
      },
      {
        // ✅ Added WebPage schema — helps Google understand page purpose
        "@type": "WebPage",
        "@id": "https://youthempowerment.community/#webpage",
        url: "https://youthempowerment.community",
        name: "Youth Empowerment | Empowering the Next Generation of Innovators",
        isPartOf: { "@id": "https://youthempowerment.community/#website" },
        about: { "@id": "https://youthempowerment.community/#organization" },
        description:
          "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://youthempowerment.community",
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ImpactSection />
      <WhatWeDoPreview />
      <HomeCtaSection />
    </>
  );
}
