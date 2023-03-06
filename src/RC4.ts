function KSA(key: number[]): number[] {
  const S = new Array(256);
  for (let i = 0; i < 256; i++) {
    S[i] = i;
  }
  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + key[i % key.length]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
  }
  return S;
}

function PRGA(S: number[]): number[] {
  const K = [];
  let i = 0;
  let j = 0;
  while (K.length < 256) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
    K.push(S[(S[i] + S[j]) % 256]);
  }
  return K;
}

export function encrypt(data: string, key: string): string {
  const _data = new Uint8Array(new TextEncoder().encode(data));
  const _key = new Uint8Array(new TextEncoder().encode(key));
  const S = KSA(Array.from(_key));
  const gen = PRGA(Array.from(S));
  const result = new Uint8Array(_data.length);
  for (let i = 0; i < _data.length; i++) {
    result[i] = _data[i] ^ gen[i];
  }
  return btoa(String.fromCharCode.apply(null, result));
}

export function decrypt(data: string, key: string): string {
  const _data = new Uint8Array(
    atob(unescape(encodeURIComponent(data)))
      .split('')
      .map((char) => char.charCodeAt(0))
  );
  const _key = new Uint8Array(new TextEncoder().encode(key));
  const S = KSA(Array.from(_key));
  const gen = PRGA(Array.from(S));
  const result = new Uint8Array(_data.length);
  for (let i = 0; i < _data.length; i++) {
    result[i] = _data[i] ^ gen[i];
  }
  return new TextDecoder().decode(result);
}
