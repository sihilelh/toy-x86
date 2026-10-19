import AppLayout from "@/layout/app.layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Cpu, Layers, Terminal } from "lucide-react";

const REGISTERS = [
  { name: "EAX", bits: 32, sub: "AX (AH/AL)", role: "Accumulator", desc: "Used in arithmetic operations, I/O, and function return values." },
  { name: "EBX", bits: 32, sub: "BX (BH/BL)", role: "Base", desc: "Pointer to base data in DS segment; general storage." },
  { name: "ECX", bits: 32, sub: "CX (CH/CL)", role: "Counter", desc: "Used as loop and shift/rotate counter." },
  { name: "EDX", bits: 32, sub: "DX (DH/DL)", role: "Data", desc: "Used in I/O operations and arithmetic multiplication/division." },
  { name: "ESP", bits: 32, sub: "SP", role: "Stack Pointer", desc: "Points to the top of the runtime call stack." },
  { name: "EBP", bits: 32, sub: "BP", role: "Base Pointer", desc: "Points to the base of the current stack frame." },
  { name: "ESI", bits: 32, sub: "SI", role: "Source Index", desc: "Used as pointer for source in string/stream operations." },
  { name: "EDI", bits: 32, sub: "DI", role: "Destination Index", desc: "Used as pointer for destination in string operations." },
];

const INSTRUCTIONS = [
  { op: "MOV", format: "MOV dest, src", desc: "Copies value from src to dest without altering flags.", category: "Data Transfer" },
  { op: "PUSH", format: "PUSH src", desc: "Decrements ESP by 4 and places operand onto the stack.", category: "Stack" },
  { op: "POP", format: "POP dest", desc: "Pops value from the top of the stack and increments ESP.", category: "Stack" },
  { op: "ADD", format: "ADD dest, src", desc: "Adds src to dest and sets arithmetic status flags (ZF, CF, OF).", category: "Arithmetic" },
  { op: "SUB", format: "SUB dest, src", desc: "Subtracts src from dest and updates status flags.", category: "Arithmetic" },
  { op: "CMP", format: "CMP op1, op2", desc: "Performs subtraction (op1 - op2) to set flags without storing result.", category: "Comparison" },
  { op: "JMP", format: "JMP target", desc: "Unconditional jump to specified address / label.", category: "Control Flow" },
  { op: "JE / JZ", format: "JE target", desc: "Jump if Equal / Jump if Zero (checks if ZF = 1).", category: "Control Flow" },
  { op: "CALL", format: "CALL proc", desc: "Pushes return address onto stack and branches to procedure.", category: "Procedures" },
  { op: "RET", format: "RET", desc: "Pops return address from stack and transfers execution.", category: "Procedures" },
];

const FLAGS = [
  { name: "ZF", label: "Zero Flag", desc: "Set if arithmetic result is zero." },
  { name: "CF", label: "Carry Flag", desc: "Set on unsigned overflow or borrow." },
  { name: "SF", label: "Sign Flag", desc: "Set if result is negative (MSB = 1)." },
  { name: "OF", label: "Overflow Flag", desc: "Set on signed integer arithmetic overflow." },
];

export default function ReferencesView() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="border-2 border-border bg-card p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-primary stroke-[2.5]" />
                <h1 className="font-head text-2xl font-bold tracking-tight">
                  x86 ISA Reference
                </h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Quick architecture cheatsheets, registers, and instruction semantics for toy_x86.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded border border-border bg-muted px-3 py-1 text-xs font-mono">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>SPEC // IA-32 COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Reference Tabs */}
        <Tabs defaultValue="instructions">
          <TabsList>
            <TabsTrigger value="instructions">
              <Terminal className="size-4" />
              <span>Instructions</span>
            </TabsTrigger>
            <TabsTrigger value="registers">
              <Cpu className="size-4" />
              <span>Registers</span>
            </TabsTrigger>
            <TabsTrigger value="flags">
              <Layers className="size-4" />
              <span>Flags &amp; Memory</span>
            </TabsTrigger>
          </TabsList>

          {/* Instructions Tab */}
          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>Core Instruction Set</CardTitle>
                <CardDescription>
                  Standard x86 mnemonics, operands syntax, and behavior.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {INSTRUCTIONS.map((inst) => (
                    <div
                      key={inst.op}
                      className="rounded border-2 border-border bg-muted/30 p-3.5 transition-transform hover:-translate-y-0.5 hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded border border-border bg-primary px-2 py-0.5 font-mono text-xs font-bold text-primary-foreground shadow-xs">
                          {inst.op}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {inst.category}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-xs font-semibold text-foreground">
                        {inst.format}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {inst.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registers Tab */}
          <TabsContent value="registers">
            <Card>
              <CardHeader>
                <CardTitle>General-Purpose Registers (GPR)</CardTitle>
                <CardDescription>
                  32-bit registers available in protected mode execution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {REGISTERS.map((reg) => (
                    <div
                      key={reg.name}
                      className="flex flex-col justify-between rounded border-2 border-border bg-muted/30 p-3.5 transition-transform hover:-translate-y-0.5 hover:shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-head text-base font-bold text-foreground">
                            {reg.name}
                          </span>
                          <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {reg.bits}-BIT
                          </span>
                        </div>
                        <div className="mt-1 font-mono text-xs text-primary font-medium">
                          {reg.role}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {reg.desc}
                        </p>
                      </div>
                      <div className="mt-3 border-t border-border/40 pt-2 text-[11px] font-mono text-muted-foreground">
                        Aliases: {reg.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flags Tab */}
          <TabsContent value="flags">
            <Card>
              <CardHeader>
                <CardTitle>EFLAGS Status Register</CardTitle>
                <CardDescription>
                  Single-bit status flags set by arithmetic and comparison instructions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {FLAGS.map((flag) => (
                    <div
                      key={flag.name}
                      className="flex items-start gap-3 rounded border-2 border-border bg-muted/30 p-3.5"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-border bg-card font-mono text-sm font-bold shadow-xs">
                        {flag.name}
                      </div>
                      <div>
                        <div className="font-head text-sm font-semibold text-foreground">
                          {flag.label}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {flag.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
