import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import WhatWeDoPreview from "@/components/sections/WhatWeDoPreview";
import HomeCtaSection from "@/components/sections/HomeCtaSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NonGovernmentalOrganization",
    "name": "Youth Empowerment",
    "url": "https://youthempowerment.community",
    "logo": "https://youthempowerment.community/logo.png",
    "description": "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
    "sameAs": [
      "https://www.linkedin.com/company/youth-empowerment-community/",
      "https://www.instagram.com/_youthempowerment_/"
    ]
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
