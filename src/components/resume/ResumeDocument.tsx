import type { Resume } from "@/lib/resume-data";
import { Mail, Phone, Linkedin, Github, MapPin, Calendar } from "lucide-react";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-heading mb-2 border-b-2 pb-1 text-[13px] font-bold tracking-wide uppercase">
      {children}
    </h2>
  );
}

function EntryBlock({
  title,
  subtitle,
  meta,
  location,
  bullets,
}: {
  title: string;
  subtitle: string;
  meta: string;
  location: string;
  bullets: string[];
}) {
  return (
    <div className="mb-3 break-inside-avoid">
      <h3 className="resume-serif text-[12.5px] font-semibold leading-tight">{title}</h3>
      {subtitle ? <p className="text-[9.5px] text-neutral-600">{subtitle}</p> : null}
      {(meta || location) && (
        <div className="mt-0.5 flex flex-wrap gap-3 text-[8.5px] text-neutral-500">
          {meta ? (
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-2.5" /> {meta}
            </span>
          ) : null}
          {location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-2.5" /> {location}
            </span>
          ) : null}
        </div>
      )}
      <ul className="mt-1 space-y-[3px]">
        {bullets.filter(Boolean).map((b, i) => (
          <li key={i} className="relative pl-3 text-[8.8px] leading-[1.45] text-neutral-800">
            <span className="absolute left-0 top-[5px] size-[3px] rounded-full bg-neutral-500" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeDocument({ data }: { data: Resume }) {
  return (
    <div
      className="resume-page mx-auto bg-white text-neutral-900"
      style={{ ["--resume-accent" as string]: data.accent }}
    >
      <div className="px-10 pt-10 pb-8">
        <header>
          <h1 className="resume-serif text-[28px] font-bold uppercase leading-none tracking-tight">
            {data.name}
          </h1>
          <p className="resume-serif mt-1 text-[13px] font-semibold text-neutral-700">{data.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[8.5px] text-neutral-600">
            {data.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="size-2.5" /> {data.phone}
              </span>
            )}
            {data.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="size-2.5" /> {data.email}
              </span>
            )}
            {data.linkedin && (
              <span className="inline-flex items-center gap-1">
                <Linkedin className="size-2.5" /> {data.linkedin}
              </span>
            )}
            {data.github && (
              <span className="inline-flex items-center gap-1">
                <Github className="size-2.5" /> {data.github}
              </span>
            )}
            {data.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-2.5" /> {data.location}
              </span>
            )}
          </div>
        </header>

        <div className="mt-5 grid grid-cols-[1.35fr_1fr] gap-7">
          <div>
            <section className="mb-4">
              <SectionHeading>{data.summaryTitle}</SectionHeading>
              <p className="text-[8.8px] leading-[1.5] text-neutral-800">{data.summary}</p>
            </section>

            {data.experience.length > 0 && (
              <section className="mb-4">
                <SectionHeading>Professional Experience</SectionHeading>
                {data.experience.map((e) => (
                  <EntryBlock key={e.id} {...e} />
                ))}
              </section>
            )}

            {data.projects.length > 0 && (
              <section>
                <SectionHeading>Projects</SectionHeading>
                {data.projects.map((p) => (
                  <EntryBlock key={p.id} {...p} />
                ))}
              </section>
            )}
          </div>

          <div>
            {data.skills.length > 0 && (
              <section className="mb-4">
                <SectionHeading>Technical Skills</SectionHeading>
                {data.skills.map((g) => (
                  <div key={g.id} className="mb-2.5 break-inside-avoid">
                    <p className="mb-1 text-[9.5px] font-semibold">{g.label}</p>
                    <p className="text-[8.2px] leading-[1.55] text-neutral-700">
                      {g.items.filter(Boolean).join(", ")}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {data.certifications.length > 0 && (
              <section className="mb-4">
                <SectionHeading>Certifications</SectionHeading>
                {data.certifications.map((c) => (
                  <div key={c.id} className="mb-2 break-inside-avoid border-b border-dashed pb-1.5">
                    <p className="text-[9px] font-semibold leading-snug">{c.title}</p>
                    <p className="text-[8px] text-neutral-500">{c.subtitle}</p>
                  </div>
                ))}
              </section>
            )}

            {data.achievements.length > 0 && (
              <section className="mb-4">
                <SectionHeading>Key Achievements</SectionHeading>
                {data.achievements.map((a) => (
                  <div key={a.id} className="mb-2 break-inside-avoid">
                    <p className="text-[9px] font-semibold">{a.title}</p>
                    <p className="text-[8.2px] leading-[1.45] text-neutral-700">{a.subtitle}</p>
                  </div>
                ))}
              </section>
            )}

            {data.education.length > 0 && (
              <section className="mb-4">
                <SectionHeading>Education</SectionHeading>
                {data.education.map((e) => (
                  <div key={e.id} className="mb-2 break-inside-avoid">
                    <p className="resume-serif text-[10px] font-semibold">{e.title}</p>
                    <p className="text-[8.2px] leading-[1.45] text-neutral-600">{e.subtitle}</p>
                  </div>
                ))}
              </section>
            )}

            {data.languages.length > 0 && (
              <section>
                <SectionHeading>Languages</SectionHeading>
                {data.languages.filter(Boolean).map((l, i) => (
                  <p key={i} className="border-b border-dashed py-1 text-[9px] font-medium">
                    {l}
                  </p>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
