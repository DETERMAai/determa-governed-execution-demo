function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    return Object.keys(source).sort().reduce<Record<string, unknown>>((acc, key) => {
      const item = source[key];
      if (item !== undefined) acc[key] = normalize(item);
      return acc;
    }, {});
  }
  return value;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(normalize(value));
}

// Synchronous SHA-256 implementation for deterministic local-demo hashing.
export function sha256(input: string): string {
  const rightRotate = (value: number, amount: number) => (value >>> amount) | (value << (32 - amount));
  const maxWord = 2 ** 32;
  const words: number[] = [];
  const ascii = unescape(encodeURIComponent(input));
  const bitLength = ascii.length * 8;
  const hash: number[] = [];
  const k: number[] = [];
  const composite: Record<number, boolean> = {};
  let candidate = 2;
  while (k.length < 64) {
    if (!composite[candidate]) {
      for (let i = candidate * candidate; i < 313; i += candidate) composite[i] = true;
      if (hash.length < 8) hash.push((Math.sqrt(candidate) * maxWord) | 0);
      k.push((Math.cbrt(candidate) * maxWord) | 0);
    }
    candidate += 1;
  }
  let padded = ascii + "\x80";
  while ((padded.length % 64) !== 56) padded += "\x00";
  for (let i = 0; i < padded.length; i += 1) words[i >> 2] |= padded.charCodeAt(i) << ((3 - i) % 4) * 8;
  words.push((bitLength / maxWord) | 0, bitLength | 0);
  for (let offset = 0; offset < words.length; offset += 16) {
    const w = words.slice(offset, offset + 16);
    const old = hash.slice(0, 8);
    for (let i = 0; i < 64; i += 1) {
      const w15 = w[i - 15] ?? 0;
      const w2 = w[i - 2] ?? 0;
      if (i >= 16) {
        const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        w[i] = (((w[i - 16] + s0) | 0) + ((w[i - 7] + s1) | 0)) | 0;
      }
      const e = hash[4];
      const a = hash[0];
      const sigma1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const choice = (e & hash[5]) ^ (~e & hash[6]);
      const temp1 = (((((hash[7] + sigma1) | 0) + choice) | 0) + k[i] + w[i]) | 0;
      const sigma0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const majority = (a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (sigma0 + majority) | 0;
      hash.unshift((temp1 + temp2) | 0);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }
    for (let i = 0; i < 8; i += 1) hash[i] = (hash[i] + old[i]) | 0;
  }
  return hash.map(value => (value >>> 0).toString(16).padStart(8, "0")).join("");
}

export function hashCanonical(value: unknown): string {
  return `sha256:${sha256(canonicalJson(value))}`;
}
