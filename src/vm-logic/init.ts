import { actionMap } from "./vm.func.ts";
import { type registerMap, type memoryBlock } from "./vm.types.ts";

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
