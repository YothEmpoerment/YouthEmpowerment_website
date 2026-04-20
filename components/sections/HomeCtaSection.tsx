"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiXMark, HiCheckCircle, HiArrowRight } from "react-icons/hi2";
import FadeIn from "@/components/FadeIn";

function VolunteerModal({onClose}:{onClose:()=>void}) {
  const [submitted,setSubmitted]=useState(false);
  const [form,setForm]=useState({name:"",email:"",skill:"",message:""});
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const res=await fetch("https://formspree.io/f/xpwzzvkn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,_subject:"Volunteer Application - Youth Empowerment"})});
    if(res.ok) setSubmitted(true);
  };
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{background:"rgba(4,20,46,0.75)",backdropFilter:"blur(8px)"}}
      onClick={(e)=>e.target===e.currentTarget&&onClose()}>
      <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9,y:20}}
        className="bg-white dark:bg-[#04102b] rounded-3xl p-8 w-full max-w-lg"
        style={{boxShadow:"0 32px 80px rgba(4,78,173,0.30)",border:"1.5px solid #dbe5f5"}}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-black text-[22px] text-[#05142e] dark:text-white">Become a Volunteer</h3>
            <p className="text-[13px] text-[#6b7ea8] mt-0.5">Share your skills with the community</p>
          </div>
          <button onClick={onClose} className="ye-hover-unified w-9 h-9 rounded-xl flex items-center justify-center text-[#6b7ea8]">
            <HiXMark size={18}/>
          </button>
        </div>
        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:"#e8f0fb"}}>
              <HiCheckCircle size={36} style={{color:"#044ead"}}/>
            </div>
            <h4 className="font-display font-black text-xl text-[#05142e] dark:text-white mb-2">Application Received!</h4>
            <p className="text-[#6b7ea8] text-sm">We'll reach out soon. Thank you for wanting to make a difference!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {label:"Full Name",key:"name",type:"text",placeholder:"Your full name"},
              {label:"Email",key:"email",type:"email",placeholder:"your@email.com"},
              {label:"Your Skill",key:"skill",type:"text",placeholder:"e.g. Web Development, Teaching"},
            ].map((f) => (
              <div key={f.key}>
                <label className="text-[13px] font-semibold text-[#1a2d4f] dark:text-[#b8ccee] mb-1.5 block">{f.label}</label>
                <input type={f.type} required value={(form as any)[f.key]} placeholder={f.placeholder}
                  onChange={(e)=>setForm({...form,[f.key]:e.target.value})} className="ye-input"/>
              </div>
            ))}
            <div>
              <label className="text-[13px] font-semibold text-[#1a2d4f] dark:text-[#b8ccee] mb-1.5 block">Why do you want to volunteer?</label>
              <textarea required rows={3} value={form.message} placeholder="Tell us your motivation..."
                onChange={(e)=>setForm({...form,message:e.target.value})} className="ye-input resize-none"/>
            </div>
            <button type="submit" className="btn-primary w-full justify-center">Submit Application <HiArrowRight size={16}/></button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HomeCtaSection() {
  const [showModal,setShowModal]=useState(false);
  return (
    <section className="py-24 bg-[#f4f7fe] dark:bg-[#061030] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-12">
          <span className="section-tag">Take Action</span>
          <h2 className="font-display font-black text-[#05142e] dark:text-white" style={{fontSize:"clamp(28px,4vw,48px)"}}>
            Ready to Make a Difference?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volunteer */}
          <FadeIn delay={0.1}>
            <div className="ye-hover-unified relative rounded-3xl p-10 overflow-hidden" style={{background:"linear-gradient(135deg,#044ead 0%,#022d6e 100%)"}}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl" style={{background:"rgba(255,255,255,0.08)",transform:"translate(30%,-30%)"}}/>
              <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-2xl" style={{background:"rgba(4,78,173,0.4)",transform:"translate(-20%,30%)"}}/>
              <div className="relative">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5" style={{background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.90)"}}>
                  Volunteer
                </div>
                <h3 className="font-display font-black text-white text-[26px] mb-3">Become a Volunteer</h3>
                <p className="text-[14px] leading-relaxed mb-7" style={{color:"rgba(255,255,255,0.72)"}}>
                  Share your skills, inspire students, and grow as a leader. Join our passionate team and make a real difference.
                </p>
                <button onClick={()=>setShowModal(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-[14px] text-[#044ead] bg-white transition-all group"
                  style={{boxShadow:"0 8px 24px rgba(255,255,255,0.20)"}}>
                  Apply Now <HiArrowRight size={15}/>
                </button>
              </div>
            </div>
          </FadeIn>
          {/* Community */}
          <FadeIn delay={0.18}>
            <div className="ye-hover-unified relative rounded-3xl p-10 overflow-hidden bg-[#05142e] dark:bg-[#081e50]" style={{border:"1.5px solid rgba(255,255,255,0.06)"}}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{background:"rgba(34,197,94,0.12)",transform:"translate(30%,-30%)"}}/>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5" style={{background:"rgba(34,197,94,0.15)",color:"rgba(74,222,128,0.90)"}}>
                  <FaWhatsapp size={11}/> Community
                </div>
                <h3 className="font-display font-black text-white text-[26px] mb-3">Join Our Community</h3>
                <p className="text-[14px] leading-relaxed mb-7" style={{color:"rgba(255,255,255,0.55)"}}>
                  Connect with 500+ students, stay updated on events, and be part of a movement changing the future of tech education.
                </p>
                <a href="https://chat.whatsapp.com/EjuiPvLmiPfFKtXRw54lgP" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-[14px] text-white transition-all"
                  style={{background:"#16a34a",boxShadow:"0 8px 24px rgba(22,163,74,0.35)"}}>
                  <FaWhatsapp size={16}/> Join WhatsApp Group
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <AnimatePresence>{showModal&&<VolunteerModal onClose={()=>setShowModal(false)}/>}</AnimatePresence>
    </section>
  );
}
