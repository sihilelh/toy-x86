import AppLayout from "@/layout/app.layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, Info, ShieldCheck, Terminal, Sparkles } from "lucide-react";

export default function AboutView() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Hero */}
        <div className="border-2 border-border bg-card p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Info className="size-5 text-primary stroke-[2.5]" />
                <h1 className="font-head text-2xl font-bold tracking-tight">
                  About toy_x86
                </h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                An interactive micro-architecture playground and assembly learning environment.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded border border-border bg-primary px-3 py-1 font-mono text-xs font-bold text-primary-foreground shadow-xs">
              <span>BUILD v0.1.0-ALPHA</span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded border-2 border-border bg-primary shadow-xs">
                <Cpu className="size-5 text-primary-foreground stroke-[2.25]" />
              </div>
              <CardTitle>Cycle-Accurate Core</CardTitle>
              <CardDescription>
                Emulates 32-bit x86 protected-mode instruction decoding and register updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Designed for step-by-step execution, pipeline tracing, and register inspection.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded border-2 border-border bg-card shadow-xs">
                <Terminal className="size-5 text-foreground stroke-[2.25]" />
              </div>
              <CardTitle>Interactive Terminal</CardTitle>
              <CardDescription>
                Write assembly directly in the browser and watch execution in real time.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Instant feedback with memory visualization, register watch windows, and stack frames.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded border-2 border-border bg-accent shadow-xs">
                <Sparkles className="size-5 text-foreground stroke-[2.25]" />
              </div>
              <CardTitle>Neobrutalist UI</CardTitle>
              <CardDescription>
                High-contrast typography and retro aesthetics for a focused developer workflow.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Built on Tailwind CSS, Radix/Base UI foundations, and accessible components.
            </CardContent>
          </Card>
        </div>

        {/* System Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Architecture Specifications</CardTitle>
            <CardDescription>
              Low-level hardware emulation parameters and virtual environment bounds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
              <div className="rounded border-2 border-border bg-muted/40 p-3">
                <div className="text-muted-foreground">WORD SIZE</div>
                <div className="mt-1 text-base font-bold text-foreground">32-bit (DWORD)</div>
              </div>
              <div className="rounded border-2 border-border bg-muted/40 p-3">
                <div className="text-muted-foreground">MEMORY ADDRESSING</div>
                <div className="mt-1 text-base font-bold text-foreground">Flat 4GB Virtual</div>
              </div>
              <div className="rounded border-2 border-border bg-muted/40 p-3">
                <div className="text-muted-foreground">STACK CONVENTION</div>
                <div className="mt-1 text-base font-bold text-foreground">cdecl / stdcall</div>
              </div>
              <div className="rounded border-2 border-border bg-muted/40 p-3">
                <div className="text-muted-foreground">FLAGS SUPPORT</div>
                <div className="mt-1 text-base font-bold text-foreground">EFLAGS (ZF, CF, SF, OF)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Ethos */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary stroke-[2.5]" />
              <CardTitle>Educational &amp; Experimental</CardTitle>
            </div>
            <CardDescription>
              toy_x86 is created to demystify low-level systems programming and binary execution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Whether you are learning assembly for the first time, debugging shellcode patterns, or exploring compiler output, toy_x86 gives you an immediate visual sandbox without needing virtual machines or native toolchains.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
