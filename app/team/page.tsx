"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FaBullhorn, FaCog, FaLaptopCode, FaLinkedinIn, FaPenNib, FaTimes } from "react-icons/fa";

type Person = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

type Team = {
  name: string;
  lead: Person;
  members: Person[];
};

type Department = {
  name: string;
  head: Person;
  icon: React.ComponentType<{ size?: number }>;
  teams: Team[];
};

type SelectedTeam = {
  departmentName: string;
  team: Team;
};

function formatWebDevTeamLabel(label: string) {
  if (label !== "Web Dev Team") return label;
  return (
    <>
      Web Dev
      <br />
      Team
    </>
  );
}

function formatModalTeamTitle(label: string) {
  if (label === "Web Dev Team") return "Web Development Team";
  return label;
}

function avatar(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0E5BB8&color=fff&size=256`;
}

function localPhoto(fileName: string) {
  return `/${fileName}`;
}

function makePerson(name: string, role: string, linkedin: string, image?: string): Person {
  return {
    name,
    role,
    image: image ?? avatar(name),
    linkedin,
  };
}

const lead = makePerson("Irfan Ali Lashari", "Lead", "https://www.linkedin.com/in/irfan-ali-lashari/", localPhoto("irfan-ali-lashari.jpg"));
const coLead = makePerson("Fiza Memon", "Deputy Lead", "https://www.linkedin.com/in/fiza-memon-829630260/", localPhoto("fiza-fahim.jpg"));

const departments: Department[] = [
  {
    name: "Management & Operations",
    head: makePerson("Tayyaba Amir", "Head", "https://www.linkedin.com/in/tayyba-aamir-267a27334/", localPhoto("tayyaba-amir.jpg")),
    icon: FaCog,
    teams: [
      {
        name: "Technical & Operation Team",
        lead: makePerson("Asma Ahmed", "Team Lead", "https://www.linkedin.com/in/asma-ahmed-8301a92a7/", localPhoto("asma.jpg")),
        members: [
          makePerson("Syeda Maham Batool", "Member", "https://www.linkedin.com/in/maham-abbas/", localPhoto("moham-techops.jpg")),
          makePerson("Aqsa", "Member", "", localPhoto("aqsa.jpg")),
          makePerson("Muhammad Saad", "Member", "https://www.linkedin.com/in/muhammad-saad-13ab46298/", localPhoto("saad-techops-member.jpg")),
        ],
      },
      {
        name: "Team Host",
        lead: makePerson("Alishba Saboor", "Team Lead", "https://www.linkedin.com/in/alishba-saboor/", localPhoto("alishba.jpg")),
        members: [
          makePerson("Maham Shakeel", "Member", "https://www.linkedin.com/in/maham-shakeel-901194264/", localPhoto("moham-teamhost.jpg")),
          makePerson("Fizah Memon", "Member", "https://www.linkedin.com/in/fiza-memon-829630260/", localPhoto("./fizah.jpg")),
          makePerson("Sana Manjhand", "Member", "https://www.linkedin.com/in/sana-manjhand-a6923a397/", localPhoto("sana.jpg")),
        ],
      },
    ],
  },
  {
    name: "Social Media & Marketing",
    head: makePerson("Umama Saif", "Head", "https://www.linkedin.com/in/umama-s-21899a333/", localPhoto("umama.jpg")),
    icon: FaBullhorn,
    teams: [
      {
        name: "Social & Marketing Team",
        lead: makePerson("Sineha Rubab", "Team Lead", "https://www.linkedin.com/in/sineha-rubab/", localPhoto("sineha.jpg")),
        members: [
          makePerson("Retika Lohana", "Member", "https://www.linkedin.com/in/retika-lohana-89465a350/", localPhoto("retika .jpg")),
          makePerson("Malaika Zulqarnain", "Member", "https://www.linkedin.com/in/malaika-zulqarnain-7029422b6/", localPhoto("malaika.jpg")),
          makePerson("Noor Fatima", "Member", "https://www.linkedin.com/in/noor-fatima-b09905355/", localPhoto("noor.jpg")),
        ],
      },
      {
        name: "HR & PR Team",
        lead: makePerson("Syed Muhammad Saad Ali Shah", "Team Lead", "https://www.linkedin.com/in/syed-muhammad-saad-ali-shah-63a1331a9/", localPhoto("saad-hrpr-lead.jpg")),
        members: [
          makePerson("Rukiya Munawar", "Member", "https://www.linkedin.com/in/rukiya-munawar-158a3a308/", localPhoto("rukiya.jpg")),
          makePerson("Imtiaz Ali", "Member", "https://www.linkedin.com/in/imtiazali-civilengineer88/", localPhoto("imtiaz.jpg")),
          makePerson("Sunaina Tariq", "Member", "https://www.linkedin.com/in/sunaina-tariq-518683361/", localPhoto("samaina.jpg")),
        ],
      },
    ],
  },
  {
    name: "Content & Production",
    head: makePerson("Abrish Hamayoun", "Head", "https://www.linkedin.com/in/abrish-hamayoun-khan-812079329/", localPhoto("abrish.jpg")),
    icon: FaPenNib,
    teams: [
      {
        name: "Creativity & Content Team",
        lead: makePerson("Zafar Ali", "Team Lead", "https://www.linkedin.com/in/zafar-android-dev/", localPhoto("zafar.jpg")),
        members: [
          makePerson("Ahmed Raza", "Member", "https://www.linkedin.com/in/ahmed-raza-866b95344/", localPhoto("ahmad.jpg")),
          makePerson("Farhan Ali", "Member", "https://www.linkedin.com/in/farhan-ali-aa54a1331/", localPhoto("farhan .jpg")),
        ],
      },
      {
        name: "Graphics & Media Team",
        lead: makePerson("Sabahat Fayyaz", "Team Lead", "https://www.linkedin.com/in/sabahat-fayyaz/", localPhoto("sabahat.jpg")),
        members: [
          makePerson("Javeria", "Member", "", localPhoto("javeria-graphics-member.jpg")),
          makePerson("Haseeb", "Member", "", localPhoto("haseeb.jpg")),
        ],
      },
    ],
  },
  {
    name: "Web Dev Team",
    head: makePerson("M Sufyan Jura", "Lead", "https://www.linkedin.com/in/muhammadsufyanjura47/", localPhoto("sufyan-web-head.jpg")),
    icon: FaLaptopCode,
    teams: [
      {
        name: "Web Dev Team",
        lead: makePerson("Muhammad Sufyan Jura", "Team Lead", "https://www.linkedin.com/in/muhammadsufyanjura47/", localPhoto("sufyan-web-teamlead.jpg")),
        members: [
          makePerson("Laiba Zahid", "Member", "https://www.linkedin.com/in/laiba-zahid-400b04318/", localPhoto("laiba.jpg")),
          makePerson("Abdullah Azhar", "Member", "https://www.linkedin.com/in/abdullahazhar202/", localPhoto("ahad.jpg")),
          makePerson("Muhammad Shoaib", "Member", "", localPhoto("shoaib.jpg")),
        ],
      },
    ],
  },
];

function rolePillStyles(role: string) {
  if (role === "Lead" || role === "Deputy Lead" || role === "Head" || role === "Team Lead") return "bg-blue-600 text-white";
  return "bg-slate-200 text-slate-700";
}

function avatarRing(role: string) {
  if (role === "Lead") return "ring-4 ring-blue-100";
  if (role === "Co-Lead") return "ring-4 ring-sky-100";
  if (role === "Head") return "ring-4 ring-amber-100";
  if (role === "Team Lead") return "ring-4 ring-indigo-100";
  return "ring-2 ring-slate-100";
}

function PersonCard({ person, compact = false }: { person: Person; compact?: boolean }) {
  const [imgSrc, setImgSrc] = useState(person.image);

  useEffect(() => {
    setImgSrc(person.image);
  }, [person.image]);

  return (
    <div
      className={`h-full rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.12)] ${compact ? "p-2.5 sm:p-3" : "overflow-hidden p-3 sm:p-4"}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`relative h-[100px] w-[100px] overflow-hidden rounded-full bg-slate-100 ${avatarRing(person.role)}`}>
          <Image
            src={imgSrc}
            alt={person.name}
            fill
            className="object-cover"
            sizes="100px"
            onError={() => setImgSrc(avatar(person.name))}
          />
        </div>
        <div className={`min-w-0 w-full ${compact ? "mt-2" : "mt-2.5"}`}>
          <p className={`${compact ? "text-[0.88rem] sm:text-[0.92rem]" : "text-[0.95rem] sm:text-[1rem]"} font-black leading-tight text-slate-900`}>
            {person.name}
          </p>
          <span
            className={`mt-1 inline-flex rounded-full ${compact ? "px-2 py-0.5 text-[9.5px]" : "px-2.5 py-1 text-[10px]"} font-bold uppercase tracking-[0.14em] ${rolePillStyles(person.role)}`}
          >
            {person.role}
          </span>
          <div className={compact ? "mt-2" : "mt-2.5"}>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full border border-blue-600 ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"} font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white`}
            >
              <FaLinkedinIn size={compact ? 10 : 12} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({ department, onViewTeam }: { department: Department; onViewTeam: (team: Team) => void }) {
  const Icon = department.icon;

  return (
    <div className="h-full rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(15,23,42,0.12)] sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-black leading-tight text-slate-900 sm:text-xl">{formatWebDevTeamLabel(department.name)}</h3>
          <p className="mt-1 text-sm text-slate-500">Department Head</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
        <PersonCard person={department.head} compact />

        <div className="mt-3 space-y-3">
          {department.teams.map((team) => (
            <div key={team.name} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-sm font-semibold leading-tight text-slate-800">{formatWebDevTeamLabel(team.name)}</p>
              <button
                type="button"
                onClick={() => onViewTeam(team)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                View Team
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamModal({ selectedTeam, onClose }: { selectedTeam: SelectedTeam | null; onClose: () => void }) {
  useEffect(() => {
    if (!selectedTeam) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, selectedTeam]);

  if (!selectedTeam) return null;

  const members = selectedTeam.team.members;
  const isTwoMemberTeam = members.length === 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
        >
          <FaTimes />
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-4 sm:p-5 lg:p-6">
          <div className="pr-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">{selectedTeam.departmentName}</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">{formatModalTeamTitle(selectedTeam.team.name)}</h3>
          </div>

          <div className="mt-5">
            <div className="mx-auto w-full max-w-xl">
              <PersonCard person={selectedTeam.team.lead} />
            </div>

            <div className="my-5 flex justify-center text-blue-600">
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 w-1 rounded-full bg-blue-500" />
                <div className="text-3xl leading-none">↓</div>
              </div>
            </div>

            <div className={`grid gap-3 sm:grid-cols-2 ${isTwoMemberTeam ? "lg:grid-cols-2 max-w-3xl mx-auto" : "lg:grid-cols-3"}`}>
              {members.map((member) => (
                <PersonCard key={member.name} person={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam | null>(null);

  const selectedTeamName = useMemo(() => selectedTeam?.team.name ?? "", [selectedTeam]);

  return (
    <div className="min-h-screen bg-slate-50 pt-[68px] text-slate-900">
      <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(140deg,#044ead 0%,#033d94 40%,#022d6e 70%,#04102b 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px,rgba(255,255,255,0.09) 1.5px,transparent 0)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-white/80" style={{ background: "rgba(255,255,255,0.10)", border: "1.5px solid rgba(255,255,255,0.18)" }}>
              Team Structure
            </span>
            <h1 className="font-display font-black text-white mb-6" style={{ fontSize: "clamp(38px,5.5vw,70px)", lineHeight: "1.08" }}>
              Youth Empowerment Team
            </h1>
            <p className="text-[15px] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.68)" }}>
              Meet the passionate individuals driving our mission to empower youth and create a brighter future.
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" style={{ fill: "#f8fafc" }} preserveAspectRatio="none"><path d="M0,60 L1440,0 L1440,60 Z" /></svg>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Team Hierarchy</h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">Lead, Co-Lead, departments, and team details.</p>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <div className="w-full max-w-xl">
                <PersonCard person={lead} />
              </div>
              <div className="my-3 flex flex-col items-center gap-1 text-blue-600">
                <div className="h-8 w-1 rounded-full bg-blue-500" />
                <div className="text-3xl leading-none">↓</div>
              </div>
              <div className="w-full max-w-xl">
                <PersonCard person={coLead} />
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {departments.map((department) => (
                <DepartmentCard
                  key={department.name}
                  department={department}
                  onViewTeam={(team) => setSelectedTeam({ departmentName: department.name, team })}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-black text-slate-900">Want to Join This Team?</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Bring your skills and passion to support youth empowerment.
            </p>
            <Link href="/join" className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Apply to Join YE
            </Link>
          </div>
        </div>
      </section>

      <TeamModal selectedTeam={selectedTeam} onClose={() => setSelectedTeam(null)} />

      {selectedTeam ? <div className="sr-only">Open team modal for {selectedTeamName}</div> : null}
    </div>
  );
}
