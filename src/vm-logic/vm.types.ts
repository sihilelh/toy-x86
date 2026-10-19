export type memoryBlock =
  | {
      opcode: string;
      operands: string[];
    }
  | number;

export type registerMap = Map<string, number | boolean>;
