"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Activity,
  ChevronRight,
} from "lucide-react";
import { ResearchCard } from "@/components/research-card";
import { getMemberBySlug } from "@/lib/members";
import { allProjects } from "@/lib/projects";
import { tagColor, LOCALE_KEY } from "@/lib/constants";
import { translations, type Locale } from "@/lib/translations";

const researchData: Record<string, { tags: string[]; date: string }> = {
  volatility:    { tags: ["Crypto", "Volatility", "ML"],   date: "Mar 2025" },
  momentum:      { tags: ["Equities", "Factor", "Macro"],  date: "Jan 2025" },
  microstructure:{ tags: ["HFT", "Microstructure"],        date: "Nov 2024" },
  regime:        { tags: ["Crypto", "ML"],                 date: "Sep 2024" },
  correlation:   { tags: ["Equities", "Macro"],            date: "Jul 2024" },
  marketMaking:  { tags: ["HFT", "Microstructure"],        date: "May 2024" },
  liquidityRisk: { tags: ["Equities", "Factor"],           date: "Feb 2024" },
  tailRisk:      { tags: ["Crypto", "Volatility"],         date: "Dec 2023" },
};

export default function MemberProfilePage() {
  const params = useParams<{ slug: string }>();
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const member = getMemberBySlug(params.slug);
  const t = translations[locale];

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-neutral-900">Member not found</p>
          <Link href="/#team">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to team
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const memberProjects = allProjects.filter((p) =>
    member.projects.includes(p.title)
  );

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        {/* NAV */}
        <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold tracking-tight text-neutral-900">AIR&D</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocale((l) => (l === "en" ? "es" : "en"))}
                className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
              >
                <span className={locale === "en" ? "font-semibold text-neutral-900" : ""}>EN</span>
                <span className="mx-1 text-neutral-300">|</span>
                <span className={locale === "es" ? "font-semibold text-neutral-900" : ""}>SP</span>
              </button>
              <Link href="/#team">
                <Button size="sm" variant="outline" className="border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-500 rounded-full h-8 px-4 text-xs font-medium">
                  {t.nav.team}
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          {/* BACK LINK */}
          <Link
            href="/#team"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.nav.team}
          </Link>

          {/* PROFILE HEADER */}
          <section className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="w-24 h-24 border-2 border-neutral-200 shrink-0">
              <AvatarFallback className="bg-neutral-100 text-neutral-600 text-2xl font-semibold">
                {member.initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">{member.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs border-neutral-300 text-neutral-600">
                    {t.roles[member.roleKey]}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-neutral-300 text-neutral-600">
                    {t.focus[member.focusKey]}
                  </Badge>
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed max-w-2xl">{member.bio}</p>

              {/* SOCIAL LINKS */}
              <div className="flex gap-1 pt-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={member.linkedin} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={`mailto:${member.email}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{member.email}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
                      <Github className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Twitter</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-200" />

          {/* PUBLICATIONS */}
          {member.papers.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {locale === "en" ? "Publications" : "Publicaciones"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {member.papers.map((key) => {
                  const paper = t.researchPapers[key];
                  const meta = researchData[key];
                  return (
                    <ResearchCard
                      key={key}
                      title={paper.title}
                      desc={paper.desc}
                      tags={meta.tags}
                      date={meta.date}
                      readLabel={t.research.read}
                    />
                  );
                })}
              </div>
            </section>
          )}

          <Separator className="bg-neutral-200" />

          {/* PROJECTS */}
          {memberProjects.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {locale === "en" ? "Projects" : "Proyectos"}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {memberProjects.map((project) => (
                  <ResearchCard
                    key={project.title}
                    title={project.title}
                    desc={project.desc}
                    tags={project.tags}
                    date={project.date}
                    readLabel={locale === "en" ? "View" : "Ver"}
                  />
                ))}
              </div>
            </section>
          )}

          <Separator className="bg-neutral-200" />

          {/* CONTACT CTA */}
          <section className="space-y-4 pb-8">
            <h2 className="text-xl font-bold text-neutral-900">
              {locale === "en" ? "Get in Touch" : "Contacto"}
            </h2>
            <p className="text-sm text-neutral-600">
              {locale === "en"
                ? `Interested in ${member.name.split(" ")[0]}'s work? Reach out directly.`
                : `¿Interesado en el trabajo de ${member.name.split(" ")[0]}? Escríbele directamente.`}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:border-neutral-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-neutral-200 mt-4 bg-white">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs text-neutral-600">{t.footer.company}</span>
            </Link>
            <p className="text-xs text-neutral-500">© 2025</p>
          </div>
        </footer>
      </main>
    </TooltipProvider>
  );
}
