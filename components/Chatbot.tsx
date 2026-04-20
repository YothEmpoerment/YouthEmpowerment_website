"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiChatBubbleLeftRight, HiPaperAirplane } from "react-icons/hi2";

type Message = {role:"bot"|"user";text:string};

const FAQ: Record<string,string> = {
  hello:"Hi there! 👋 I'm the YE Assistant. How can I help you today?",
  hi:"Hello! 👋 Welcome to Youth Empowerment! What would you like to know?",
  hey:"Hey! 👋 Great to see you here. How can I assist?",
  about:"Youth Empowerment is a student community focused on technology education, leadership development, and mentorship. We connect students with mentors and industry professionals.",
  join:"To join YE, visit our Join page and fill out the application form, or join our WhatsApp: https://chat.whatsapp.com/EjuiPvLmiPfFKtXRw54lgP",
  programs:"We offer Web Development, AI & ML, Cybersecurity, Data Science, UI/UX Design, Cloud & DevOps, Mobile App Dev, and Leadership programs.",
  contact:"Email us at yempowerment241@gmail.com or find us on LinkedIn and Instagram (@_youthempowerment_).",
  free:"YE is community-driven and accessible to students. Contact us for details on specific programs.",
  team:"Our team includes passionate volunteers, mentors, and educators dedicated to empowering students in tech.",
  volunteer:"We welcome volunteers! Visit our Contact page or apply through the Join page.",
  events:"We run workshops, bootcamps, and networking events. Follow us on Instagram and LinkedIn to stay updated!",
  default:"I'm not sure about that. Please email us at yempowerment241@gmail.com for more info! 😊",
};

function getResponse(input:string):string{
  const lower=input.toLowerCase();
  for(const key in FAQ){if(lower.includes(key))return FAQ[key];}
  return FAQ.default;
}

const INITIAL:Message[]=[{role:"bot",text:"Hi! 👋 I'm the YE Assistant. Ask me anything about Youth Empowerment!"}];

export default function Chatbot(){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState<Message[]>(INITIAL);
  const [input,setInput]=useState("");
  const bottomRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{if(open)bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,open]);

  const send=()=>{
    const text=input.trim();
    if(!text)return;
    setMsgs(m=>[...m,{role:"user",text}]);
    setInput("");
    setTimeout(()=>setMsgs(m=>[...m,{role:"bot",text:getResponse(text)}]),500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,scale:0.88,y:16}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.88,y:16}}
            transition={{duration:0.25,ease:[0.16,1,0.3,1]}}
            className="w-80 rounded-3xl overflow-hidden" style={{boxShadow:"0 24px 64px rgba(4,20,46,0.30)",border:"1.5px solid #dbe5f5",background:"white"}}>
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between" style={{background:"linear-gradient(135deg,#044ead,#022d6e)"}}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:"rgba(255,255,255,0.15)"}}>
                  <span className="text-white font-display font-black text-[11px]">YE</span>
                </div>
                <div>
                  <p className="text-white font-display font-extrabold text-[13px]">YE Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
                    <p className="text-[10px]" style={{color:"rgba(255,255,255,0.65)"}}>Online · Always here to help</p>
                  </div>
                </div>
              </div>
              <button onClick={()=>setOpen(false)} className="ye-hover-unified w-7 h-7 rounded-lg flex items-center justify-center text-white/60">
                <HiXMark size={14}/>
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto overflow-x-hidden p-4 space-y-3" style={{background:"#f4f7fe"}}>
              {msgs.map((m,i)=>(
                <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[12px] leading-relaxed font-medium break-words whitespace-pre-wrap ${
                    m.role==="user"?"rounded-br-sm text-white":"rounded-bl-sm text-[#1a2d4f] bg-white border border-[#dbe5f5]"
                  }`} style={m.role==="user"?{background:"#044ead",boxShadow:"0 2px 8px rgba(4,78,173,0.25)"}:{}}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef}/>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-[#dbe5f5] flex gap-2">
              <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&send()}
                placeholder="Ask something..."
                className="flex-1 px-3.5 py-2.5 rounded-2xl text-[12px] font-medium outline-none" style={{background:"#f4f7fe",border:"1.5px solid #dbe5f5",color:"#05142e"}}/>
              <button onClick={send} className="ye-hover-unified w-9 h-9 rounded-2xl flex items-center justify-center text-white flex-shrink-0" style={{background:"#044ead"}}>
                <HiPaperAirplane size={13}/>
              </button>
            </div>

            {/* Quick replies */}
            <div className="px-3 pb-3 bg-white flex flex-wrap gap-1.5">
              {["Join YE","Programs","Contact","Volunteer"].map(q=>(
                <button key={q} onClick={()=>{setInput(q);setTimeout(send,50);}}
                  className="ye-hover-unified px-3 py-1.5 rounded-xl text-[11px] font-bold" style={{background:"#e8f0fb",color:"#044ead"}}>
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen(true)}
          className="ye-hover-unified w-14 h-14 rounded-2xl flex items-center justify-center text-white relative"
          style={{ background: "linear-gradient(135deg,#044ead,#022d6e)", boxShadow: "0 8px 28px rgba(4,78,173,0.45)" }}
        >
          <HiChatBubbleLeftRight size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
        </motion.button>
      )}
    </div>
  );
}
