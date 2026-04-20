"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import testimonialsData from "@/data/testimonials.json";
import { HiStar } from "react-icons/hi2";

function TestCard({ name, role, text, rating, image }: any) {
  const safeName = typeof name === "string" && name.trim().length > 0 ? name.trim() : "Anonymous";
  const safeImage = typeof image === "string" && image.trim().length > 0 ? image.trim() : null;
  const initials =
    safeName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? "")
      .join("") || "YE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="ye-hover-unified bg-white dark:bg-[#081e50] rounded-3xl p-7 border border-[#dbe5f5] dark:border-[#0d2d6b] relative overflow-hidden min-h-[250px]"
    >
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <HiStar key={i} size={14} style={{ color: "#f5a623", fill: "#f5a623" }} />
        ))}
      </div>
      <p className="text-[13.5px] text-[#1a2d4f] dark:text-[#b8ccee] leading-relaxed mb-6 italic">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-[#dbe5f5] dark:ring-[#0d2d6b]">
          {safeImage ? (
            <Image src={safeImage} alt={safeName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-[#044ead] text-white text-[11px] font-bold">
              {initials}
            </div>
          )}
        </div>
        <div>
          <p className="font-display font-extrabold text-[14px] text-[#05142e] dark:text-white">{safeName}</p>
          <p className="text-[11px] text-[#6b7ea8]">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FeedbackCarousel({ title, items, accent }: { title: string; items: any[]; accent: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const max = items.length;
  const active = useMemo(() => items[index], [items, index]);

  useEffect(() => {
    if (paused || max <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % max);
    }, 2000);
    return () => clearInterval(timer);
  }, [paused, max]);

  return (
    <section className="py-20 bg-[#f4f7fe] dark:bg-[#061030] even:bg-white even:dark:bg-[#04102b]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
              <h2 className="font-display font-black text-[#05142e] dark:text-white text-[26px]">{title}</h2>
            </div>
          </div>
        </FadeIn>

        <motion.div key={`${title}-${index}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <TestCard {...active} />
        </motion.div>

        <div className="mt-5 flex justify-center gap-2">
          {items.map((item, dotIndex) => (
            <button
              key={item.id}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ background: dotIndex === index ? "#044ead" : "#b7c9ea" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="pt-[68px]">
      <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{ background: "rgba(255,255,255,0.10)", border: "1.5px solid rgba(255,255,255,0.18)" }}>Testimonials</span>
            <h1 className="font-display font-black text-white mb-6" style={{ fontSize: "clamp(38px,5.5vw,70px)", lineHeight: "1.08" }}>
              What People Say
            </h1>
            <p className="text-[15px] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.68)" }}>Real stories from students and volunteers whose lives were touched by Youth Empowerment.</p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{ fill: "#f4f7fe" }} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z" /></svg>
        </div>
      </section>

      <FeedbackCarousel title="Student Feedback" items={testimonialsData.students} accent="#044ead" />
      <FeedbackCarousel title="Volunteer Feedback" items={testimonialsData.volunteers} accent="#1a5fc0" />
    </div>
  );
}
