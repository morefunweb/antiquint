import { expect, test } from "vitest";
import { encode, decode } from "../src/antiquint.ts";

const quints: [string, number][] = [
  ["hopaplanim", 1483901514],
  ["givukrahut", 1035056695],
  ["rajukdiduh", 1947498161],
  ["nuzibzifil", 2549403807],
  ["sumurnolon", 3919133646],
  ["fosatbabab", 3371],
  ["gihokbabab", 9781],
  ["basopbabab", 10755],
  ["bababbabab", 0],
];

test("Decode", {repeats: 3}, () => {
  quints.forEach(([encoded, decoded]) => {
    expect(encode(decoded)).toBe(encoded);
  });
});

test("Encode", {repeats: 3}, () => {
  quints.forEach(([encoded, decoded]) => {
    expect(decode(encoded)).toBe(decoded);
  });
});
