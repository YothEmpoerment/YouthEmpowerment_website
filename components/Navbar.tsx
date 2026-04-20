"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/team", label: "Team" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggle = () => {
    if (resolvedTheme === "dark") setTheme("light");
    else setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/96 dark:bg-[#04102b]/95 backdrop-blur-xl shadow-[0_8px_28px_rgba(4,20,46,0.16)] border-b border-[#dbe5f5] dark:border-[#0d2d6b]"
        : "bg-gradient-to-r from-[#04102b]/90 via-[#03235b]/88 to-[#04102b]/90 backdrop-blur-lg border-b border-white/15 shadow-[0_6px_24px_rgba(4,20,46,0.22)]"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0 overflow-visible">
            <Image
              src="/logo.png"
              alt="Youth Empowerment logo"
              fill
              priority
              sizes="(max-width: 640px) 56px, 64px"
              className="object-contain scale-[1.18]"
            />
          </div>
          <span className={`font-display font-extrabold text-[13px] whitespace-nowrap sm:hidden ${scrolled ? "text-[#05142e] dark:text-white" : "text-white"}`}>
            Youth Empowerment
          </span>
          <span className={`font-display font-extrabold text-[17px] hidden sm:block ${scrolled ? "text-[#05142e] dark:text-white" : "text-white"}`}>
            Youth<span style={{color: scrolled ? "#044ead" : "#7ab0f0"}}>Empowerment</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href} className={`relative px-3.5 py-2.5 text-[13.5px] font-semibold rounded-xl transition-all duration-200 ${
                scrolled
                  ? (active ? "text-[#044ead] dark:text-[#5b8fe8]" : "text-[#1a2d4f] dark:text-[#c3d7fb]")
                  : (active ? "text-white" : "text-white/95 hover:opacity-85")
              }`}>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-xl ${scrolled ? "bg-[#044ead]/8 dark:bg-[#044ead]/20" : "bg-white/15"}`}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
                <span className={`absolute left-3.5 right-3.5 -bottom-[2px] h-[2px] rounded-full ${active ? "bg-current opacity-100" : "bg-current opacity-0"}`} />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/join" className="ye-hover-unified sm:hidden inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold text-white"
            style={{background:"linear-gradient(135deg,#044ead,#1a5fc0)",boxShadow:"0 4px 12px rgba(4,78,173,0.28)"}}>
            Join
          </Link>
          <a href="https://www.linkedin.com/company/youth-empowerment-community/" target="_blank" rel="noopener noreferrer"
            className={`ye-hover-unified hidden sm:flex w-8 h-8 rounded-lg items-center justify-center ${scrolled ? "text-[#6b7ea8]" : "text-white/80"}`}><FaLinkedinIn size={14}/></a>
          <a href="https://www.instagram.com/_youthempowerment_/" target="_blank" rel="noopener noreferrer"
            className={`ye-hover-unified hidden sm:flex w-8 h-8 rounded-lg items-center justify-center ${scrolled ? "text-[#6b7ea8]" : "text-white/80"}`}><FaInstagram size={14}/></a>
          <button onClick={toggle} className={`ye-hover-unified w-8 h-8 rounded-lg flex items-center justify-center ${scrolled ? "text-[#6b7ea8]" : "text-white/85"}`} aria-label="Toggle theme">
            {mounted && (resolvedTheme === "dark" ? <FiSun size={15}/> : <FiMoon size={15}/>)}
          </button>
          <Link href="/join" className="ye-hover-unified hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white ml-1" style={{background:"linear-gradient(135deg,#044ead,#1a5fc0)",boxShadow:"0 4px 16px rgba(4,78,173,0.30)"}}>
            Join YE →
          </Link>
          <button onClick={() => setOpen(!open)} className={`ye-hover-unified lg:hidden w-9 h-9 rounded-xl flex items-center justify-center ${scrolled ? "text-[#05142e] dark:text-white" : "text-white"}`}>
            {open ? <FiX size={17}/> : <FiMenu size={17}/>}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
            className="lg:hidden overflow-hidden border-t border-[#dbe5f5] dark:border-[#0d2d6b] bg-white dark:bg-[#04102b]">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  className={`ye-hover-unified flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === l.href ? "text-white" : "text-[#1a2d4f] dark:text-[#7a97c8]"}`}
                  style={pathname === l.href ? {background:"#044ead"} : {}}>
                  {l.label}
                </Link>
              ))}
              <Link href="/join" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-white mt-2" style={{background:"linear-gradient(135deg,#044ead,#1a5fc0)"}}>
                Join YE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
