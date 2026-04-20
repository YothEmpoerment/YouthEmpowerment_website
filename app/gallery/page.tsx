"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { HiXMark, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const galleryItems = [
  {id:1,category:"Collaborations",src:"/collab1.jpg",alt:"Workshop session"},
  {id:2,category:"Bootcamps",src:"/bootcamp1.jpg",alt:"Bootcamp"},
  {id:3,category:"Giveaways",src:"/giveaway.jpg",alt:"Group photo"},
  {id:4,category:"Collaborations",src:"/collab2.jpg",alt:"Workshop hands-on"},
  {id:5,category:"Certificates",src:"/cert4.jpg",alt:"Certificate ceremony"},
  {id:6,category:"Bootcamps",src:"/bootcamp2.jpg",alt:"Bootcamp coding"},
  {id:7,category:"Collaborations",src:"/collab3.jpg",alt:"Team group photo"},
  {id:8,category:"Certificates",src:"/cert2.jpg",alt:"Workshop discussion"},
  {id:9,category:"Certificates",src:"/cert3.jpg",alt:"Award presentation"},
  {id:10,category:"Bootcamps",src:"/bootcamp3.jpg",alt:"Coding bootcamp"},
  {id:11,category:"Bootcamps",src:"/bootcamp4.jpg",alt:"Community gathering"},
  {id:12,category:"Certificates",src:"/cert1.jpg",alt:"Tech workshop"},
];

const categories = ["All","Collaborations","Bootcamps","Certificates","Giveaways"];

export default function GalleryPage() {
  const [cat,setCat]=useState("All");
  const [lb,setLb]=useState<number|null>(null);
  const filtered=cat==="All"?galleryItems:galleryItems.filter(g=>g.category===cat);
  const prev=()=>setLb(i=>i!==null?(i-1+filtered.length)%filtered.length:null);
  const next=()=>setLb(i=>i!==null?(i+1)%filtered.length:null);

  return (
    <div className="pt-[68px]">
      <section className="relative py-28 overflow-hidden" style={{background:"linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)"}}>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)",backgroundSize:"36px 36px"}}/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{background:"rgba(255,255,255,0.10)",border:"1.5px solid rgba(255,255,255,0.18)"}}>Visual Stories</span>
            <h1 className="font-display font-black text-white mb-6" style={{fontSize:"clamp(38px,5.5vw,70px)",lineHeight:"1.08"}}>
              Our Gallery
            </h1>
            <p className="text-[15px] max-w-xl mx-auto" style={{color:"rgba(255,255,255,0.68)"}}>Moments captured from workshops, bootcamps, ceremonies, and community gatherings.</p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{fill:"#f4f7fe"}} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z"/></svg>
        </div>
      </section>

      <section className="py-20 bg-[#f4f7fe] dark:bg-[#061030]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter pills */}
          <FadeIn className="flex flex-wrap justify-center gap-2.5 mb-10">
            {categories.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                className={`ye-hover-unified px-5 py-2.5 rounded-2xl text-[13px] font-bold ${cat===c?"text-white":"text-[#6b7ea8] dark:text-[#7a97c8]"}`}
                style={cat===c?{background:"#044ead"}:{background:"white",border:"1.5px solid #dbe5f5"}}>
                {c}
              </button>
            ))}
          </FadeIn>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((item,i)=>(
                <motion.div key={item.id} layout
                  initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.85}}
                  transition={{duration:0.3,delay:i*0.03}}
                  onClick={()=>setLb(i)}
                  className="ye-hover-unified relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  style={{boxShadow:"0 4px 16px rgba(4,78,173,0.08)"}}>
                  <img src={item.src} alt={item.alt} className="w-full h-full object-contain bg-white"/>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-bold text-white/90 px-2.5 py-1 rounded-lg" style={{background:"rgba(4,78,173,0.70)",backdropFilter:"blur(8px)"}}>{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lb!==null&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{background:"rgba(4,20,46,0.92)",backdropFilter:"blur(12px)"}}
            onClick={()=>setLb(null)}>
            <button onClick={()=>setLb(null)} className="absolute top-5 right-5 w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all z-10" style={{background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.15)"}}>
              <HiXMark size={18}/>
            </button>
            <button onClick={(e)=>{e.stopPropagation();prev();}} className="ye-hover-unified absolute left-5 w-11 h-11 rounded-2xl flex items-center justify-center text-white z-10" style={{background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.15)"}}>
              <HiChevronLeft size={18}/>
            </button>
            <button onClick={(e)=>{e.stopPropagation();next();}} className="ye-hover-unified absolute right-5 w-11 h-11 rounded-2xl flex items-center justify-center text-white z-10" style={{background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.15)"}}>
              <HiChevronRight size={18}/>
            </button>
            <motion.img key={lb} initial={{scale:0.88,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.88,opacity:0}}
              transition={{duration:0.25}}
              src={filtered[lb].src.replace("w=600","w=1200")} alt={filtered[lb].alt}
              onClick={(e)=>e.stopPropagation()}
              className="max-w-5xl max-h-[80vh] w-full object-contain rounded-3xl"
              style={{boxShadow:"0 32px 80px rgba(0,0,0,0.5)"}}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
