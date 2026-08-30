import type { Entry, Resume, Simple, SkillGroup } from "@/lib/resume-data";
import { uid } from "@/lib/resume-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";

type Props = {
  data: Resume;
  onChange: (next: Resume) => void;
};

function EntryEditor({
  entries,
  onChange,
  addLabel,
}: {
  entries: Entry[];
  onChange: (next: Entry[]) => void;
  addLabel: string;
}) {
  const patch = (id: string, p: Partial<Entry>) =>
    onChange(entries.map((e) => (e.id === id ? { ...e, ...p } : e)));

  return (
    <div className="space-y-4">
      {entries.map((e) => (
        <div key={e.id} className="rounded-lg border border-border bg-card p-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <Input
              value={e.title}
              placeholder="Title"
              onChange={(ev) => patch(e.id, { title: ev.target.value })}
            />
            <Input
              value={e.subtitle}
              placeholder="Subtitle / company"
              onChange={(ev) => patch(e.id, { subtitle: ev.target.value })}
            />
            <Input
              value={e.meta}
              placeholder="Dates"
              onChange={(ev) => patch(e.id, { meta: ev.target.value })}
            />
            <Input
              value={e.location}
              placeholder="Location"
              onChange={(ev) => patch(e.id, { location: ev.target.value })}
            />
          </div>
          <Label className="mt-3 mb-1 block text-xs text-muted-foreground">
            Bullet points (one per line)
          </Label>
          <Textarea
            rows={6}
            value={e.bullets.join("\n")}
            onChange={(ev) => patch(e.id, { bullets: ev.target.value.split("\n") })}
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-destructive"
            onClick={() => onChange(entries.filter((x) => x.id !== e.id))}
          >
            <Trash2 /> Remove
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onChange([
            ...entries,
            { id: uid(), title: "", subtitle: "", meta: "", location: "", bullets: [""] },
          ])
        }
      >
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}

function SimpleEditor({
  items,
  onChange,
  addLabel,
  placeholders,
}: {
  items: Simple[];
  onChange: (next: Simple[]) => void;
  addLabel: string;
  placeholders: [string, string];
}) {
  return (
    <div className="space-y-3">
      {items.map((c) => (
        <div key={c.id} className="rounded-lg border border-border bg-card p-3">
          <Input
            className="mb-2"
            value={c.title}
            placeholder={placeholders[0]}
            onChange={(ev) => onChange(items.map((x) => (x.id === c.id ? { ...x, title: ev.target.value } : x)))}
          />
          <Textarea
            rows={2}
            value={c.subtitle}
            placeholder={placeholders[1]}
            onChange={(ev) =>
              onChange(items.map((x) => (x.id === c.id ? { ...x, subtitle: ev.target.value } : x)))
            }
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-destructive"
            onClick={() => onChange(items.filter((x) => x.id !== c.id))}
          >
            <Trash2 /> Remove
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, { id: uid(), title: "", subtitle: "" }])}
      >
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}

export function ResumeEditor({ data, onChange }: Props) {
  const set = <K extends keyof Resume>(key: K, value: Resume[K]) =>
    onChange({ ...data, [key]: value });

  const patchGroup = (id: string, p: Partial<SkillGroup>) =>
    set(
      "skills",
      data.skills.map((g) => (g.id === id ? { ...g, ...p } : g)),
    );

  return (
    <Accordion type="multiple" defaultValue={["details", "summary"]} className="w-full">
      <AccordionItem value="details">
        <AccordionTrigger>Personal details</AccordionTrigger>
        <AccordionContent className="grid gap-2">
          <Input value={data.name} placeholder="Full name" onChange={(e) => set("name", e.target.value)} />
          <Input value={data.role} placeholder="Job title" onChange={(e) => set("role", e.target.value)} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Input value={data.phone} placeholder="Phone" onChange={(e) => set("phone", e.target.value)} />
            <Input value={data.email} placeholder="Email" onChange={(e) => set("email", e.target.value)} />
            <Input value={data.linkedin} placeholder="LinkedIn" onChange={(e) => set("linkedin", e.target.value)} />
            <Input value={data.github} placeholder="GitHub" onChange={(e) => set("github", e.target.value)} />
          </div>
          <Input value={data.location} placeholder="Location" onChange={(e) => set("location", e.target.value)} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="summary">
        <AccordionTrigger>Professional summary</AccordionTrigger>
        <AccordionContent>
          <Textarea rows={6} value={data.summary} onChange={(e) => set("summary", e.target.value)} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience">
        <AccordionTrigger>Experience</AccordionTrigger>
        <AccordionContent>
          <EntryEditor
            entries={data.experience}
            onChange={(v) => set("experience", v)}
            addLabel="Add experience"
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects">
        <AccordionTrigger>Projects</AccordionTrigger>
        <AccordionContent>
          <EntryEditor entries={data.projects} onChange={(v) => set("projects", v)} addLabel="Add project" />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills">
        <AccordionTrigger>Technical skills</AccordionTrigger>
        <AccordionContent className="space-y-3">
          {data.skills.map((g) => (
            <div key={g.id} className="rounded-lg border border-border bg-card p-3">
              <Input
                className="mb-2"
                value={g.label}
                placeholder="Group name"
                onChange={(e) => patchGroup(g.id, { label: e.target.value })}
              />
              <Input
                value={g.items.join(", ")}
                placeholder="Comma separated skills"
                onChange={(e) => patchGroup(g.id, { items: e.target.value.split(",").map((s) => s.trim()) })}
              />
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-destructive"
                onClick={() => set("skills", data.skills.filter((x) => x.id !== g.id))}
              >
                <Trash2 /> Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => set("skills", [...data.skills, { id: uid(), label: "", items: [] }])}
          >
            <Plus /> Add skill group
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="certs">
        <AccordionTrigger>Certifications</AccordionTrigger>
        <AccordionContent>
          <SimpleEditor
            items={data.certifications}
            onChange={(v) => set("certifications", v)}
            addLabel="Add certification"
            placeholders={["Certification name", "Issuer"]}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="achievements">
        <AccordionTrigger>Key achievements</AccordionTrigger>
        <AccordionContent>
          <SimpleEditor
            items={data.achievements}
            onChange={(v) => set("achievements", v)}
            addLabel="Add achievement"
            placeholders={["Achievement title", "Description"]}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent>
          <SimpleEditor
            items={data.education}
            onChange={(v) => set("education", v)}
            addLabel="Add education"
            placeholders={["Degree", "School · years · grade"]}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="languages">
        <AccordionTrigger>Languages</AccordionTrigger>
        <AccordionContent>
          <Textarea
            rows={3}
            value={data.languages.join("\n")}
            onChange={(e) => set("languages", e.target.value.split("\n"))}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
