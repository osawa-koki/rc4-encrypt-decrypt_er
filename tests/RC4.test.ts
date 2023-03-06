import { encrypt, decrypt } from "../src/RC4";

describe("RC4 encryption and decryption", () => {
  it("encrypts and decrypts data correctly", () => {
    const data = Math.random().toString(36).substr(2, 10);
    const key = Math.random().toString(36).substr(2, 10);

    const encryptedData = encrypt(data, key);
    const decryptedData = decrypt(encryptedData, key);

    expect(decryptedData).toBe(data);
  });

  it("produces different results with different keys", () => {
    const data = Math.random().toString(36).substr(2, 10);
    const key1 = Math.random().toString(36).substr(2, 10);
    const key2 = Math.random().toString(36).substr(2, 10);

    const encryptedData1 = encrypt(data, key1);
    const encryptedData2 = encrypt(data, key2);

    expect(encryptedData1).not.toBe(encryptedData2);

    const decryptedData1 = decrypt(encryptedData1, key1);
    const decryptedData2 = decrypt(encryptedData2, key2);

    expect(decryptedData1).toBe(data);
    expect(decryptedData2).toBe(data);
  });
});
