type memoryBlock =
  | {
      opcode: string;
      operands: string[];
    }
  | number;

type registerMap = Map<string, number | boolean>;

function pc_inc(reg: registerMap) {
  reg.set("pc", (reg.get("pc") as number) + 1);
}

function movv(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set(opr[0], parseInt(opr[1]));
  pc_inc(reg);
}

function add(opr: string[], mem: memoryBlock[], reg: registerMap) {
  const acc = (reg.get(opr[0]) as number) + (reg.get(opr[1]) as number);
  reg.set("acc", acc);
  pc_inc(reg);
}

function out(opr: string[], mem: memoryBlock[], reg: registerMap) {
  console.log(reg.get(opr[0]));
  pc_inc(reg);
}

function sub(opr: string[], mem: memoryBlock[], reg: registerMap) {
  const acc = (reg.get(opr[0]) as number) - (reg.get(opr[1]) as number);
  reg.set("acc", acc);
  pc_inc(reg);
}

function call(opr: string[], mem: memoryBlock[], reg: registerMap) {
  const new_sp = (reg.get("sp") as number) + 1;
  reg.set("sp", new_sp);
  mem[new_sp] = reg.get("pc") as number;
  reg.set("pc", parseInt(opr[0]));
}

function push(opr: string[], mem: memoryBlock[], reg: registerMap) {
  const new_sp = (reg.get("sp") as number) + 1;
  reg.set("sp", new_sp);
  mem[new_sp] = reg.get(opr[0]) as number;
  pc_inc(reg);
}

function pop(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set(opr[0], mem[reg.get("sp") as number] as number);
  reg.set("sp", (reg.get("sp") as number) - 1);
  pc_inc(reg);
}

function ret(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set("pc", mem[reg.get("sp") as number] as number);
  pc_inc(reg);
}

function halt(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set("halt", true);
  reg.set("pc", (reg.get("pc") as number) + 1);
}

const actionMap = { movv, add, sub, out, call, push, pop, ret, halt } as const;

export function runvm(memory: memoryBlock[], registers: registerMap) {
  while (registers.get("halt") === false) {
    const pc = registers.get("pc") as number;
    const instruction = memory[pc] as { opcode: string; operands: string[] };

    const fn = actionMap[instruction.opcode as keyof typeof actionMap];
    fn(instruction.operands, memory, registers);
  }
}

export function loadMemory(
  instructions: string[],
  memorySize: number,
): memoryBlock[] {
  const memory: memoryBlock[] = new Array(memorySize).fill(0);

  const parsedInstructions = instructions.map((ins) => ins.split(" "));

  for (const ins of parsedInstructions) {
    memory[parseInt(ins[0])] = {
      opcode: ins[1],
      operands: ins.slice(2),
    };
  }
  return memory;
}

export function initRegisters(): Map<string, number | boolean> {
  return new Map<string, number | boolean>([
    ["r1", 0],
    ["r2", 0],
    ["r3", 0],
    ["r4", 0],
    ["r5", 0],
    ["r6", 0],
    ["sp", 0],
    ["pc", 0],
    ["acc", 0],
    ["ivec", 0],
    ["int", 0],
    ["timer", 0],
    ["halt", false],
  ]);
}
