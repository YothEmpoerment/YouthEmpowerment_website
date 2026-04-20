import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope, HiArrowRight } from "react-icons/hi2";

const quickLinks = [
  {href:"/",label:"Home"},{href:"/about",label:"About Us"},{href:"/what-we-do",label:"What We Do"},
  {href:"/team",label:"Our Team"},{href:"/testimonials",label:"Testimonials"},
  {href:"/gallery",label:"Gallery"},{href:"/join",label:"Join YE"},{href:"/contact",label:"Contact"},
];
const programs = ["Web Development","AI & Machine Learning","Cybersecurity","Data Science","UI/UX Design","Leadership Development"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{background:"linear-gradient(180deg,#022d6e 0%,#04102b 100%)"}}>
      {/* Dot pattern */}
      <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.06) 1px,transparent 0)",backgroundSize:"32px 32px"}}/>
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{background:"rgba(4,78,173,0.35)"}}/>
      {/* Top border */}
      <div className="relative h-px" style={{background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2) 30%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.2) 70%,transparent)"}}/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 overflow-visible">
                <Image
                  src="/logo.png"
                  alt="Youth Empowerment logo"
                  fill
                  sizes="(max-width: 640px) 56px, 64px"
                  className="object-contain scale-[1.18]"
                />
              </div>
              <span className="font-display font-extrabold text-white text-lg">Youth<span className="text-[#7ab0f0]">Empowerment</span></span>
            </div>
            <p className="text-[13px] leading-relaxed mb-6 text-white/60">
              Connecting students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                {href:"https://www.linkedin.com/company/youth-empowerment-community/",icon:<FaLinkedinIn size={14}/>},
                {href:"https://www.instagram.com/_youthempowerment_/",icon:<FaInstagram size={14}/>},
                {href:"https://chat.whatsapp.com/EjuiPvLmiPfFKtXRw54lgP",icon:<FaWhatsapp size={14}/>},
                {href:"mailto:yempowerment241@gmail.com",icon:<HiOutlineEnvelope size={15}/>},
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ye-hover-unified w-9 h-9 rounded-xl flex items-center justify-center text-white/60"
                  style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.10)"}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-2 text-[13px] text-white/55">
                    <span className="w-1 h-1 rounded-full bg-[#044ead] flex-shrink-0"/>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5 tracking-wide">Our Programs</h4>
            <ul className="space-y-2.5">
              {programs.map((p) => (
                <li key={p}>
                  <Link href="/what-we-do" className="flex items-center gap-2 text-[13px] text-white/55">
                    <span className="w-1 h-1 rounded-full bg-[#7ab0f0] flex-shrink-0"/>
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5 tracking-wide">Get In Touch</h4>
            <a href="mailto:yempowerment241@gmail.com" className="ye-hover-unified flex items-center gap-3 mb-5 text-[13px] text-white/60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.10)"}}>
                <HiOutlineEnvelope size={14}/>
              </div>
              yempowerment241@gmail.com
            </a>
            <div className="space-y-2.5">
              <a href="https://chat.whatsapp.com/EjuiPvLmiPfFKtXRw54lgP" target="_blank" rel="noopener noreferrer"
                className="ye-hover-unified flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white"
                style={{background:"rgba(34,197,94,0.20)",border:"1px solid rgba(34,197,94,0.30)"}}>
                <FaWhatsapp size={14} className="text-green-400"/>
                <span className="text-white/80">Join WhatsApp Community</span>
              </a>
              <Link href="/join"
                className="ye-hover-unified flex items-center justify-between px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white"
                style={{background:"rgba(4,78,173,0.35)",border:"1px solid rgba(74,142,230,0.30)"}}>
                Apply to Join YE
                <HiArrowRight size={14}/>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{borderColor:"rgba(255,255,255,0.08)"}}>
          <p className="text-[12px] text-white/35">© {new Date().getFullYear()} Youth Empowerment Community. All rights reserved.</p>
          <p className="text-[12px] text-white/25">Built with ❤️ for the next generation of innovators</p>
        </div>
      </div>
    </footer>
  );
}
