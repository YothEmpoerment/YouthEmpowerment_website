"use client";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineEnvelope, HiCheckCircle, HiArrowRight } from "react-icons/hi2";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgorwvzj";

export default function ContactPage() {
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("loading");
    try {
      const res=await fetch(FORMSPREE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,_subject:"Contact - Youth Empowerment"})});
      if(res.ok){setStatus("success");setForm({name:"",email:"",message:""});}
      else setStatus("error");
    } catch{
      setStatus("error");
    }
  };

  const contacts=[
    {href:"mailto:yempowerment241@gmail.com",icon:<HiOutlineEnvelope size={17}/>,label:"Email",value:"yempowerment241@gmail.com",bg:"#e8f0fb",color:"#044ead"},
    {href:"https://www.linkedin.com/company/youth-empowerment-community/",icon:<FaLinkedinIn size={15}/>,label:"LinkedIn",value:"youth-empowerment-community",bg:"#e8f0fb",color:"#044ead"},
    {href:"https://www.instagram.com/_youthempowerment_/",icon:<FaInstagram size={15}/>,label:"Instagram",value:"_youthempowerment_",bg:"#fdf2f8",color:"#e1306c"},
  ];

  return (
    <div className="pt-[68px]">
      <section className="relative py-28 overflow-hidden" style={{background:"linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)"}}>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)",backgroundSize:"36px 36px"}}/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.18)"}}>Get In Touch</span>
            <h1 className="font-display font-black text-white mb-6" style={{fontSize:"clamp(38px,5.5vw,70px)",lineHeight:"1.08"}}>
              Contact Us
            </h1>
            <p className="text-[15px] max-w-xl mx-auto" style={{color:"rgba(255,255,255,0.68)"}}>Have a question or collaboration idea? We'd love to hear from you.</p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{fill:"#f4f7fe"}} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z"/></svg>
        </div>
      </section>

      <section className="py-20 bg-[var(--ye-off)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn>
              <span className="section-tag">Connect With Us</span>
              <h2 className="font-display font-black text-[var(--ye-heading)] text-[28px] mb-7">Let's Connect</h2>
              <div className="space-y-3.5 mb-8">
                {contacts.map((c)=>(
                  <a key={c.label} href={c.href} target={c.href.startsWith("mailto")?"_self":"_blank"} rel="noopener noreferrer"
                    className="ye-hover-unified flex items-center gap-4 p-5 rounded-2xl bg-[var(--ye-card)] border border-[var(--ye-border)]">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{background:c.bg}}>
                      <span style={{color:c.color}}>{c.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--ye-muted)] mb-0.5">{c.label}</p>
                      <p className="text-[13.5px] font-semibold text-[var(--ye-ink)] truncate">{c.value}</p>
                    </div>
                    <HiArrowRight size={14} className="text-[var(--ye-muted)] flex-shrink-0"/>
                  </a>
                ))}
              </div>

              {/* Map-like card */}
              <div className="ye-hover-unified rounded-2xl overflow-hidden border border-[#dbe5f5] dark:border-[#0d2d6b]" style={{background:"linear-gradient(135deg,#044ead,#022d6e)",minHeight:"140px",position:"relative"}}>
                <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.12) 1.5px,transparent 0)",backgroundSize:"24px 24px"}}/>
                <div className="relative p-6 text-white">
                  <p className="font-display font-black text-[18px] mb-1">Youth Empowerment</p>
                  <p className="text-white/60 text-[13px]">Community · Pakistan</p>
                  <p className="text-white/50 text-[12px] mt-2">Serving students across 10+ cities</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.14} className="lg:mt-28">
              <div className="ye-hover-unified bg-[var(--ye-card)] rounded-3xl p-8 border border-[var(--ye-border)]" style={{boxShadow:"0 8px 40px rgba(4,78,173,0.08)"}}>
                <h3 className="font-display font-black text-[var(--ye-heading)] text-[20px] mb-6">Send a Message</h3>
                <p className="text-[12px] text-[var(--ye-muted)] mb-5">
                  Whether you have a question or want to collaborate, feel free to drop us a message.
                </p>
                {status==="success"?(
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:"#e8f0fb"}}>
                      <HiCheckCircle size={36} style={{color:"#044ead"}}/>
                    </div>
                    <h4 className="font-display font-black text-[18px] text-[#05142e] dark:text-white mb-2">Message Sent!</h4>
                    <p className="text-[13px] text-[#6b7ea8]">We'll get back to you soon.</p>
                    <button onClick={()=>setStatus("idle")} className="ye-hover-unified mt-4 text-[13px] font-semibold" style={{color:"#044ead"}}>Send another →</button>
                  </div>
                ):(
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      {label:"Full Name",key:"name",type:"text",placeholder:"Your full name"},
                      {label:"Email Address",key:"email",type:"email",placeholder:"your@email.com"},
                    ].map((f)=>(
                      <div key={f.key}>
                        <label className="text-[13px] font-bold text-[#1a2d4f] dark:text-[#b8ccee] mb-1.5 block">{f.label}</label>
                        <input type={f.type} required value={(form as any)[f.key]} placeholder={f.placeholder}
                          onChange={(e)=>setForm({...form,[f.key]:e.target.value})} className="ye-input"/>
                      </div>
                    ))}
                    <div>
                      <label className="text-[13px] font-bold text-[#1a2d4f] dark:text-[#b8ccee] mb-1.5 block">Message</label>
                      <textarea required rows={5} value={form.message} placeholder="Your message..." onChange={(e)=>setForm({...form,message:e.target.value})} className="ye-input resize-none"/>
                    </div>
                    {status==="error"&&<p className="text-[12.5px] text-red-500 font-medium">Something went wrong. Please try again or email us directly.</p>}
                    <button type="submit" disabled={status==="loading"} className="btn-primary w-full justify-center disabled:opacity-60">
                      {status==="loading"?"Sending...":"Send Message"} <HiArrowRight size={15}/>
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
