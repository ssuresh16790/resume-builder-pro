import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultResume, type Resume } from "@/lib/resume-data";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { Button } from "@/components/ui/button";
import { Download, FileText, RotateCcw, Palette } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resume Builder — Create an ATS-ready CV in minutes" },
      {
        name: "description",
        content:
          "Build a polished, ATS-friendly resume with a live A4 preview, editable sections, accent themes and instant PDF export.",
      },
      { property: "og:title", content: "Resume Builder — Create an ATS-ready CV in minutes" },
      {
        property: "og:description",
        content: "Edit your resume on the left, watch the A4 preview update live, then export a print-perfect PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Builder,
});

const STORAGE_KEY = "resume-builder-v1";

const ACCENTS = ["#2e3a59", "#0f766e", "#b45309", "#9333ea", "#be123c", "#111827"];

function Builder() {
  const [data, setData] = useState<Resume>(defaultResume);
  const [zoom, setZoom] = useState(0.78);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved) as Resume);
      } catch {
        /* ignore corrupt state */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="no-print sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileText className="size-4" />
            </span>
            <div>
              <h1 className="text-sm font-semibold leading-none">Resume Builder</h1>
              <p className="text-[11px] text-muted-foreground">Live preview · autosaved</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1.5 sm:flex">
              <Palette className="size-3.5 text-muted-foreground" />
              {ACCENTS.map((c) => (
                <button
                  key={c}
                  aria-label={`Accent ${c}`}
                  onClick={() => setData({ ...data, accent: c })}
                  className="size-5 rounded-full border border-border transition-transform hover:scale-110"
                  style={{ backgroundColor: c, outline: data.accent === c ? "2px solid currentColor" : undefined }}
                />
              ))}
            </div>
            <select
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-9 rounded-md border border-input bg-background px-2 text-xs"
            >
              {[0.6, 0.7, 0.78, 0.9, 1].map((z) => (
                <option key={z} value={z}>
                  {Math.round(z * 100)}%
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setData(defaultResume);
              }}
            >
              <RotateCcw /> Reset
            </Button>
            <Button size="sm" onClick={() => window.print()}>
              <Download /> Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-6 lg:grid-cols-[minmax(340px,440px)_1fr]">
        <section className="no-print lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2">
          <ResumeEditor data={data} onChange={setData} />
        </section>

        <section className="print-area flex justify-center overflow-x-auto">
          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
            className="shadow-2xl print:transform-none print:shadow-none"
          >
            <ResumeDocument data={data} />
          </div>
        </section>
      </div>
    </main>
  );
}
