
/**
 * RC4暗号化における鍵スケジューリングアルゴリズム（KSA）を実行します。
 * @param {number[]} key - 鍵のバイト配列。
 * @returns {number[]} 初期化されたパーミュテーション値の配列。
 */
function KSA(key) {
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

/**
 * RC4暗号化における疑似ランダムビットジェネレータ（PRGA）を実行します。
 * @param {number[]} S - パーミュテーション値の配列。
 * @returns {number[]} 生成された疑似ランダムビットの配列。
 */
function PRGA(S) {
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

/**
 * 指定されたデータをRC4アルゴリズムを使用して暗号化します。
 * @param {string} data - 暗号化するデータ。
 * @param {string} key - 暗号化に使用するキー。
 * @returns {string} 暗号化されたデータのBASE64エンコードされた文字列。
 */
export function encrypt(data, key) {
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

/**
 * 指定されたBASE64エンコードされた文字列をRC4アルゴリズムを使用して復号化します。
 * @param {string} data - 復号化するBASE64エンコードされた文字列。
 * @param {string} key - 復号化に使用するキー。
 * @returns {string} 復号化されたデータ。
 */
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
