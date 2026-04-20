"use client";

import { motion } from "framer-motion";
import { useCounter } from "@/lib/useCounter";
import FadeIn from "@/components/FadeIn";
import { HiUsers, HiMapPin, HiCalendarDays, HiHeart } from "react-icons/hi2";

const stats = [
  { label: "Students Trained", value: 500, suffix: "+", icon: HiUsers, tagline: "Learners impacted" },
  { label: "Cities Reached", value: 10, suffix: "+", icon: HiMapPin, tagline: "Across Pakistan" },
  { label: "Events Conducted", value: 50, suffix: "+", icon: HiCalendarDays, tagline: "Workshops & bootcamps" },
  { label: "Volunteers", value: 30, suffix: "+", icon: HiHeart, tagline: "Making a difference" },
];

function StatCard({ label, value, suffix, icon: Icon, tagline, index }: any) {
  const { count, ref } = useCounter(value);
  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="ye-hover-unified relative rounded-3xl p-8 text-center overflow-hidden bg-[var(--ye-card)] border border-[var(--ye-border)] shadow-[0_4px_24px_rgba(4,78,173,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-[var(--ye-blue)]">
          <Icon size={22} className="text-white" />
        </div>
        <div className="font-display font-black text-[52px] leading-none mb-1 text-[var(--ye-heading)]">
          {count}{suffix}
        </div>
        <div className="font-bold text-[15px] mb-1.5 text-ye-blue dark:text-white">
          {label}
        </div>
        <div className="text-[12px] text-[var(--ye-muted)]">
          {tagline}
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactSection() {
  return (
    <section className="py-24 bg-[var(--ye-off)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="section-tag">Our Impact</span>
          <h2
            className="font-display font-black text-[#05142e] dark:text-white mb-4"
            style={{ fontSize: "clamp(32px,4vw,50px)" }}
          >
            Numbers That Tell Our Story
          </h2>
          <p className="text-[#6b7ea8] dark:text-[#8a9bc4] max-w-xl mx-auto text-[15px]">
            Every number represents a real student, a real city, a real life touched by the Youth Empowerment community.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}