const consonants = "bdfghjklmnprstvz";
const vowels = "aiou";

export const encode = (input: number): string => {
  if (input < 0 || input > 0xffffffff) {
    throw new Error("Could not encode proquint: Input out of range");
  }
  const ints = [input & 0xffff, (input >> 16) & 0xffff];
  let output = "";
  for (let i = 0; i < 2; i++) {
    const int = ints[i] as number;
    let x = (int % 256) * 256 + int / 256;
    const c3 = x & 0x0f;
    x >>= 4;
    const v2 = x & 0x03;
    x >>= 2;
    const c2 = x & 0x0f;
    x >>= 4;
    const v1 = x & 0x03;
    x >>= 2;
    const c1 = x & 0x0f;
    output += (consonants[c1] as string) + vowels[v1] + consonants[c2] + vowels[v2] + consonants[c3];
  }
  return output;
}

export const decode = (input: string): number => {
  if (input.length < 10) {
    throw new Error("Could not decode proquint: Invalid input length " + input.length);
  }
  const strings = [input.slice(0, 5), input.slice(5)];
  const ints: [number, number, number, number] = [0, 0, 0, 0];
  for (let i = 0; i < 2; i++) {
    const string = strings[i] as string;
    const bytes: [number, number, number, number, number] = [0, 0, 0, 0, 0];
    for (let j = 0; j < 5; j++) {
      const char = string[j] as string;
      const int = j % 2 === 0 ? consonants.indexOf(char) : vowels.indexOf(char);
      if (int === -1) {
        throw new Error("Could not decode proquint: Invalid character at position " + j);
      }
      bytes[j] = int;
    }
    const x = (bytes[0] << 12) | (bytes[1] << 10) | (bytes[2] << 6) | (bytes[3] << 4) | bytes[4];
    const n = (x % 256) * 256 + x / 256;
    ints[i * 2] = n >> 8 % 256;
    ints[i * 2 + 1] = n % 256;
  }
  return (
    (((ints[2] << 24) >>> 0) | (((ints[3] << 16) >>> 0) >>> 0) | (((ints[0] << 8) >>> 0) >>> 0) | (ints[1] >>> 0)) >>> 0
  );
}
