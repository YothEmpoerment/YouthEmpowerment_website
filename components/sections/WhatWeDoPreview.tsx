"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { HiOutlineCodeBracket, HiOutlineStar, HiOutlineBriefcase, HiArrowRight } from "react-icons/hi2";

const cards = [
  {
    icon:HiOutlineCodeBracket, num:"01",
    title:"Tech Education",
    description:"Hands-on programs in Web Dev, AI, Cybersecurity, Data Science, and more — designed to make you industry-ready.",
    accent:"#044ead",
  },
  {
    icon:HiOutlineStar, num:"02",
    title:"Leadership Development",
    description:"Public speaking, team management, and event leadership workshops that build real-world confidence and skills.",
    accent:"#1a5fc0",
  },
  {
    icon:HiOutlineBriefcase, num:"03",
    title:"Career Support",
    description:"Connect with industry professionals, get mentorship, and gain the guidance you need to launch your tech career.",
    accent:"#033d94",
  },
];

export default function WhatWeDoPreview() {
  return (
    <section className="py-24 bg-[var(--ye-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <FadeIn>
            <span className="section-tag">What We Do</span>
            <h2 className="font-display font-black text-[var(--ye-heading)]" style={{fontSize:"clamp(30px,4vw,50px)"}}>
              How We Empower<br/>Students
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[var(--ye-muted)] text-[15px] leading-relaxed max-w-md">
              Three pillars that define the Youth Empowerment experience — designed for holistic student growth.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((c,i) => (
            <motion.div key={c.title}
              initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:"-50px"}} transition={{duration:0.65,delay:i*0.12,ease:[0.16,1,0.3,1]}}
              className="ye-hover-unified relative rounded-3xl p-8 overflow-hidden cursor-default bg-[var(--ye-off)] border-[1.5px] border-[var(--ye-border)]"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center"
                    style={{width:"52px",height:"52px",background:`${c.accent}15`}}>
                    <c.icon size={22} style={{color:c.accent}}/>
                  </div>
                  <span className="font-display font-black text-[36px] leading-none" style={{color:`var(--ye-border)`}}>
                    {c.num}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-[20px] text-[var(--ye-heading)] mb-3">
                  {c.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[var(--ye-muted)]">
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn className="text-center">
          <Link href="/what-we-do" className="btn-primary">
            Explore All Programs <HiArrowRight size={16}/>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
