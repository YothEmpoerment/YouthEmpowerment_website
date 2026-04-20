import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { HiCodeBracket,HiCpuChip,HiShieldCheck,HiCommandLine,HiChartBar,HiPaintBrush,HiCloud,HiDevicePhoneMobile,HiMicrophone,HiUserGroup,HiStar,HiCalendarDays,HiArrowRight } from "react-icons/hi2";

export const metadata: Metadata = { title:"What We Do", description:"Explore Youth Empowerment's technical and leadership development programs." };

const techPrograms = [
  {icon:HiCodeBracket,title:"Web Development",description:"Build modern websites and apps using HTML, CSS, JavaScript, React, and Next.js.",accent:"#044ead"},
  {icon:HiCpuChip,title:"AI & Machine Learning",description:"Explore data, models, and intelligent systems with Python and popular ML frameworks.",accent:"#1a5fc0"},
  {icon:HiShieldCheck,title:"Cybersecurity Fundamentals",description:"Learn to protect digital assets, understand threats, and secure systems and networks.",accent:"#033d94"},
  {icon:HiCommandLine,title:"Programming Foundations",description:"Master core programming concepts in Python and build a strong problem-solving mindset.",accent:"#022d6e"},
  {icon:HiChartBar,title:"Data Science",description:"Analyze real-world data using Python, Pandas, and visualization tools to extract insights.",accent:"#044ead"},
  {icon:HiPaintBrush,title:"UI/UX Design",description:"Design beautiful, user-centered interfaces using Figma and core UX principles.",accent:"#1a5fc0"},
  {icon:HiCloud,title:"Cloud & DevOps",description:"Learn cloud infrastructure, CI/CD pipelines, Docker, and modern deployment workflows.",accent:"#033d94"},
  {icon:HiDevicePhoneMobile,title:"Mobile App Development",description:"Build cross-platform mobile apps with React Native and ship to iOS and Android.",accent:"#022d6e"},
];

const leadership = [
  {icon:HiMicrophone,title:"Public Speaking",description:"Develop confidence, articulation, and stage presence through structured exercises.",accent:"#044ead"},
  {icon:HiUserGroup,title:"Team Management",description:"Learn to lead teams effectively, delegate tasks, and foster productive collaboration.",accent:"#1a5fc0"},
  {icon:HiStar,title:"Confidence Development",description:"Build genuine self-confidence through personal development workshops and challenges.",accent:"#033d94"},
  {icon:HiCalendarDays,title:"Event Leadership",description:"Plan and execute real community events from start to finish — gaining real experience.",accent:"#022d6e"},
];

function ProgramCard({icon:Icon,title,description,accent,index}:any){
  return (
    <FadeIn delay={index*0.06}>
      <div className="ye-hover-unified bg-white dark:bg-[#081e50] rounded-3xl p-7 border border-[#dbe5f5] dark:border-[#0d2d6b] h-full relative overflow-hidden">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{background:`${accent}12`}}>
          <Icon size={19} style={{color:accent}}/>
        </div>
        <h3 className="font-display font-extrabold text-[16px] text-[#05142e] dark:text-white mb-2">{title}</h3>
        <p className="text-[12.5px] text-[#6b7ea8] leading-relaxed">{description}</p>
      </div>
    </FadeIn>
  );
}

export default function WhatWeDoPage() {
  return (
    <div className="pt-[68px]">
      <section className="relative py-28 overflow-hidden" style={{background:"linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)"}}>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)",backgroundSize:"36px 36px"}}/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.18)"}}>Programs & Initiatives</span>
            <h1 className="font-display font-black text-white mb-6" style={{fontSize:"clamp(38px,5.5vw,70px)",lineHeight:"1.08"}}>
              What We Do
            </h1>
            <p className="text-[15px] leading-relaxed max-w-xl mx-auto" style={{color:"rgba(255,255,255,0.68)"}}>From technical skills to personal growth — comprehensive programs to prepare students for the real world.</p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{fill:"#f4f7fe"}} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z"/></svg>
        </div>
      </section>

      <section className="py-20 bg-[#f4f7fe] dark:bg-[#061030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-display font-black text-sm" style={{background:"#044ead"}}>1</div>
              <span className="section-tag !mb-0">Technical Development</span>
            </div>
            <h2 className="font-display font-black text-[#05142e] dark:text-white" style={{fontSize:"clamp(26px,3.5vw,42px)"}}>Build In-Demand Tech Skills</h2>
            <p className="text-[#6b7ea8] mt-2 max-w-xl text-[14.5px]">Taught by mentors and industry professionals — hands-on, practical, and career-focused.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {techPrograms.map((p,i)=><ProgramCard key={p.title} {...p} index={i}/>)}
          </div>
          <FadeIn><Link href="/join" className="btn-primary">Apply for Technical Programs <HiArrowRight size={16}/></Link></FadeIn>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#04102b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-display font-black text-sm" style={{background:"#044ead"}}>2</div>
              <span className="section-tag !mb-0">Leadership Development</span>
            </div>
            <h2 className="font-display font-black text-[#05142e] dark:text-white" style={{fontSize:"clamp(26px,3.5vw,42px)"}}>Grow As a Leader</h2>
            <p className="text-[#6b7ea8] mt-2 max-w-xl text-[14.5px]">Technical skills get you in the door. Leadership skills help you thrive and make an impact.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {leadership.map((p,i)=><ProgramCard key={p.title} {...p} index={i}/>)}
          </div>
          <FadeIn><Link href="/join" className="btn-primary">Join Leadership Development <HiArrowRight size={16}/></Link></FadeIn>
        </div>
      </section>
    </div>
  );
}
