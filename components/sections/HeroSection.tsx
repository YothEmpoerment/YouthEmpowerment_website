"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden" style={{background:"linear-gradient(140deg,#044ead 0%,#033d94 35%,#022d6e 65%,#04102b 100%)"}}>
      {/* Layered backgrounds */}
      <div className="absolute inset-0">
        {/* Dot grid */}
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.10) 1.5px,transparent 0)",backgroundSize:"38px 38px"}}/>
        {/* Big glow orbs */}
        <motion.div animate={{scale:[1,1.12,1],opacity:[0.5,0.8,0.5]}} transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{background:"rgba(74,142,230,0.25)"}}/>
        <motion.div animate={{scale:[1,1.18,1],opacity:[0.3,0.55,0.3]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut",delay:2}}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px]" style={{background:"rgba(4,78,173,0.40)"}}/>
        {/* Diagonal light beam */}
        <div className="absolute inset-0" style={{background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.03) 50%,transparent 60%)"}}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full mb-5 sm:mb-6 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em]"
            style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.20)",color:"rgba(255,255,255,0.90)"}}>
            Helping others Learn & Grow
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.12,ease:[0.16,1,0.3,1]}}
            className="font-display font-black text-white leading-[0.98] mb-4 sm:mb-5"
            style={{fontSize:"clamp(36px,5.8vw,72px)"}}>
            Empowering the{" "}
            <span className="relative inline-block">
              <span className="text-white">
                Next Generation
              </span>
            </span>
            <br/>of Innovators
          </motion.h1>

          {/* Mission */}
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.28}}
            className="text-[15px] sm:text-[16px] leading-relaxed mb-6 sm:mb-7 max-w-2xl"
            style={{color:"#ffffff"}}>
            Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.4}}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Link href="/join" className="ye-hover-unified inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-[13px] text-[#044ead] bg-white"
              style={{boxShadow:"0 8px 32px rgba(255,255,255,0.25)"}}>
              Join YE
              <HiArrowRight size={14}/>
            </Link>
            <Link href="/what-we-do" className="ye-hover-unified inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-[13px] text-white"
              style={{background:"rgba(255,255,255,0.10)",border:"2px solid rgba(255,255,255,0.25)"}}>
              Explore Programs
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6,delay:0.55}}
            className="flex items-center gap-4 sm:gap-5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em]" style={{color:"rgba(255,255,255,0.45)"}}>Follow us</span>
            <div className="flex items-center gap-2.5">
              {[
                {href:"https://www.linkedin.com/company/youth-empowerment-community/",icon:<FaLinkedinIn size={14}/>,label:"LinkedIn"},
                {href:"https://www.instagram.com/_youthempowerment_/",icon:<FaInstagram size={14}/>,label:"Instagram"},
                {href:"https://chat.whatsapp.com/EjuiPvLmiPfFKtXRw54lgP",icon:<FaWhatsapp size={14}/>,label:"WhatsApp"},
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="ye-hover-unified w-10 h-10 rounded-xl flex items-center justify-center text-white/60"
                  style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.18)"}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full" style={{fill:"#f4f7fe"}} preserveAspectRatio="none">
          <path d="M0,80 L1440,0 L1440,80 Z"/>
        </svg>
      </div>
    </section>
  );
}
