import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi2";

export const metadata: Metadata = { title:"Join Youth Empowerment", description:"Apply to join Youth Empowerment and kickstart your tech journey." };

const benefits = [
  "Learn in-demand technical skills from experienced mentors",
  "Build confidence through leadership and public speaking programs",
  "Connect with like-minded students and industry professionals",
  "Work on real hands-on projects for your portfolio",
  "Attend workshops, bootcamps, and networking events",
  "Get career guidance and mentorship for your tech journey",
];

export default function JoinPage() {
  return (
    <div className="pt-[68px]">
      <section className="relative py-28 overflow-hidden" style={{background:"linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)"}}>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)",backgroundSize:"36px 36px"}}/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.18)"}}>Get Started</span>
            <h1 className="font-display font-black text-white mb-6" style={{fontSize:"clamp(38px,5.5vw,70px)",lineHeight:"1.08"}}>
              Join Youth Empowerment
            </h1>
            <p className="text-[15px] max-w-2xl mx-auto leading-relaxed" style={{color:"rgba(255,255,255,0.68)"}}>
              Join Youth Empowerment to learn in-demand skills, gain confidence, and connect with mentors. Collaborate with like-minded students and grow through hands-on experience.
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{fill:"#f4f7fe"}} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z"/></svg>
        </div>
      </section>

      <section className="py-20 bg-[var(--ye-off)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Benefits */}
            <div className="lg:col-span-2">
              <FadeIn>
                <span className="section-tag">Why Join Us</span>
                <h2 className="font-display font-black text-[var(--ye-heading)] text-[28px] mb-7">Everything you need to succeed</h2>
                <div className="space-y-3.5 mb-8">
                  {benefits.map((b,i)=>(
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:"#044ead"}}>
                        <HiCheckCircle size={13} color="white"/>
                      </div>
                      <span className="text-[13.5px] text-[#1a2d4f] dark:text-[#b8ccee] leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="ye-hover-unified bg-[var(--ye-card)] rounded-3xl p-6 border border-[var(--ye-border)]">
                  <p className="text-[12px] font-bold text-[var(--ye-muted)] uppercase tracking-widest mb-4">Connect with us</p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      {href:"https://www.linkedin.com/company/youth-empowerment-community/",icon:<FaLinkedinIn size={14}/>,label:"youth-empowerment-community",color:"#044ead",bg:"#e8f0fb"},
                      {href:"https://www.instagram.com/_youthempowerment_/",icon:<FaInstagram size={14}/>,label:"_youthempowerment_",color:"#e1306c",bg:"#fdf2f8"},
                    ].map((s)=>(
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="group ye-hover-unified flex items-center gap-3 px-4 py-3 rounded-2xl" style={{background:s.bg,border:`1.5px solid ${s.color}20`}}>
                        <span style={{color:s.color}}>{s.icon}</span>
                        <span className="text-[13px] font-semibold text-[#1a2d4f] dark:text-[#05142e]">{s.label}</span>
                        <HiArrowRight size={13} className="ml-auto" style={{color:s.color}}/>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Google Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.12}>
                <div className="ye-hover-unified bg-[var(--ye-card)] rounded-3xl overflow-hidden border border-[var(--ye-border)]" style={{boxShadow:"0 8px 40px rgba(4,78,173,0.10)"}}>
                  <div className="px-7 py-5 flex items-center gap-3" style={{background:"linear-gradient(135deg,#044ead,#022d6e)"}}>
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                      <span className="text-white font-display font-black text-sm">YE</span>
                    </div>
                    <div>
                      <h3 className="font-display font-black text-white text-[16px]">Application Form</h3>
                      <p className="text-[12px]" style={{color:"rgba(255,255,255,0.65)"}}>Fill out the form below to apply</p>
                    </div>
                  </div>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdlv4-jENQStieCe0D6C2_XvmZneG1Hxi6xCd1Kv8nyfpjqgA/viewform?embedded=true"
                    width="100%" height="600" frameBorder="0" marginHeight={0} marginWidth={0}
                    className="block" title="Youth Empowerment Application Form">Loading…</iframe>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
