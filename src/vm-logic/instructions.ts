import type { memoryBlock, registerMap } from "./vm.types.ts";

function pc_inc(reg: registerMap) {
  reg.set("pc", (reg.get("pc") as number) + 1);
}

function mov(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set(opr[0], reg.get(opr[1]) as number);
  pc_inc(reg);
}

function movv(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set(opr[0], parseInt(opr[1]));
  pc_inc(reg);
}

function loadr(opr: string[], mem: memoryBlock[], reg: registerMap) {
  reg.set(opr[0], mem[reg.get(opr[1]) as number] as number);
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

export const actionMap = {
  movv,
  add,
  sub,
  out,
  call,
  push,
  pop,
  ret,
  halt,
} as const;
