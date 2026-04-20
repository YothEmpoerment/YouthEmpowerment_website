import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import PakistanPresenceMapDynamic from "@/components/PakistanPresenceMapDynamic";
import { HiUsers, HiLightBulb, HiHeart, HiShieldCheck, HiHandRaised, HiSparkles } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Youth Empowerment's story, mission, vision, and core values.",
};

const values = [
  {icon:HiUsers,title:"Collaboration",description:"We believe in the power of working together. Every achievement is a collective success.",accent:"#044ead"},
  {icon:HiLightBulb,title:"Innovation",description:"We encourage creative thinking and embrace new ideas that push boundaries.",accent:"#1a5fc0"},
  {icon:HiHeart,title:"Mentorship",description:"Experienced members guide newcomers, creating a cycle of continuous learning.",accent:"#033d94"},
  {icon:HiHandRaised,title:"Empowerment",description:"We give students the tools, confidence, and opportunities they need to thrive.",accent:"#022d6e"},
  {icon:HiShieldCheck,title:"Integrity",description:"We operate with honesty, transparency, and a commitment to our community's best interests.",accent:"#044ead"},
  {icon:HiSparkles,title:"Excellence",description:"We strive for high standards in every initiative and continuously improve the quality of our work.",accent:"#1a5fc0"},
];

const cities = ["Karachi","Lahore","Islamabad","Peshawar","Quetta","Multan","Faisalabad","Rawalpindi","Hyderabad","Sialkot"];

const cityCoordinates = [
  { name: "Karachi", lat: 24.8607, lng: 67.0011 },
  { name: "Lahore", lat: 31.5204, lng: 74.3587 },
  { name: "Islamabad", lat: 33.6844, lng: 73.0479 },
  { name: "Peshawar", lat: 34.0151, lng: 71.5249 },
  { name: "Quetta", lat: 30.1798, lng: 66.975 },
  { name: "Multan", lat: 30.1575, lng: 71.5249 },
  { name: "Faisalabad", lat: 31.4504, lng: 73.135 },
  { name: "Rawalpindi", lat: 33.5651, lng: 73.0169 },
  { name: "Hyderabad", lat: 25.396, lng: 68.3578 },
  { name: "Sialkot", lat: 32.4945, lng: 74.5229 },
];

export default function AboutPage() {
  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden" style={{background:"linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)"}}>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)",backgroundSize:"36px 36px"}}/>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]" style={{background:"rgba(74,142,230,0.20)",transform:"translate(30%,-30%)"}}/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.18)"}}>
              About Us
            </span>
            <h1 className="font-display font-black text-white mb-6" style={{fontSize:"clamp(38px,5.5vw,70px)",lineHeight:"1.08"}}>
              Our Story
            </h1>
            <p className="text-[16px] leading-relaxed max-w-2xl mx-auto" style={{color:"rgba(255,255,255,0.70)"}}>
              Youth Empowerment Community was created to connect students who are eager to learn, grow, and make an impact. We bring together passionate learners, mentors, and industry professionals to share knowledge, build skills, and prepare for the future of technology.
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{fill:"#f4f7fe"}} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z"/></svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#f4f7fe] dark:bg-[#061030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.08}>
              <div className="ye-hover-unified relative rounded-3xl p-10 overflow-hidden h-full" style={{background:"linear-gradient(135deg,#044ead,#022d6e)"}}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{background:"rgba(255,255,255,0.08)",transform:"translate(30%,-30%)"}}/>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{background:"rgba(255,255,255,0.15)"}}>
                    <HiSparkles size={22} color="white"/>
                  </div>
                  <h2 className="font-display font-black text-white text-[24px] mb-3">Our Mission</h2>
                  <p className="text-[14px] leading-relaxed" style={{color:"rgba(255,255,255,0.72)"}}>
                    We help students develop the technical and professional skills they need to succeed through mentorship, hands-on learning, and collaboration.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.16}>
              <div className="ye-hover-unified relative rounded-3xl p-10 overflow-hidden h-full bg-[#05142e] dark:bg-[#081e50]" style={{border:"1.5px solid rgba(255,255,255,0.06)"}}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{background:"rgba(4,78,173,0.25)",transform:"translate(30%,-30%)"}}/>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{background:"rgba(4,78,173,0.30)"}}>
                    <HiLightBulb size={22} style={{color:"#f5a623"}}/>
                  </div>
                  <h2 className="font-display font-black text-white text-[24px] mb-3">Our Vision</h2>
                  <p className="text-[14px] leading-relaxed" style={{color:"rgba(255,255,255,0.58)"}}>
                    To be a supportive community where every student feels confident, inspired, and ready to take opportunities in the tech world.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-[#04102b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="section-tag">What Guides Us</span>
            <h2 className="font-display font-black text-[#05142e] dark:text-white" style={{fontSize:"clamp(28px,4vw,48px)"}}>Core Values</h2>
            <p className="text-[#6b7ea8] mt-3 max-w-lg mx-auto text-[14.5px]">These six principles shape everything we do at Youth Empowerment.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v,i) => (
              <FadeIn key={v.title} delay={i*0.07}>
                <div className="ye-hover-unified bg-[#f4f7fe] dark:bg-[#081e50] rounded-3xl p-7 border border-[#dbe5f5] dark:border-[#0d2d6b]">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{background:"#044ead"}}>
                    <v.icon size={20} style={{color:"#ffffff"}}/>
                  </div>
                  <h3 className="font-display font-extrabold text-[17px] text-[#05142e] dark:text-white mb-2">{v.title}</h3>
                  <p className="text-[13px] text-[#6b7ea8] leading-relaxed">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* National Presence */}
      <section className="py-20 bg-[#f4f7fe] dark:bg-[#061030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="section-tag">Where We Are</span>
            <h2 className="font-display font-black text-[#05142e] dark:text-white" style={{fontSize:"clamp(28px,4vw,48px)"}}>National Presence</h2>
            <p className="text-[#6b7ea8] mt-3 max-w-lg mx-auto text-[14.5px]">Youth Empowerment is growing its footprint across cities, bringing quality tech education everywhere.</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <FadeIn className="lg:col-span-2">
              <div className="ye-hover-unified rounded-3xl p-5 sm:p-6 border border-[#dbe5f5] dark:border-[#0d2d6b] bg-white dark:bg-[#081e50] h-full">
                <PakistanPresenceMapDynamic cities={cityCoordinates} />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="ye-hover-unified rounded-3xl p-5 border border-[#dbe5f5] dark:border-[#0d2d6b] bg-white dark:bg-[#081e50] h-full">
                <h3 className="font-display font-black text-[20px] text-[#05142e] dark:text-white mb-3">Highlighted Cities</h3>
                <p className="text-[13px] text-[#6b7ea8] mb-4">Active learning communities and workshops across Pakistan.</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {cities.map((city) => (
                    <div key={city} className="rounded-xl px-3 py-2 bg-[#f4f7fe] dark:bg-[#061840] border border-[#dbe5f5] dark:border-[#0d2d6b]">
                      <p className="text-[12px] font-semibold text-[#1a2d4f] dark:text-[#b8ccee]">{city}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
