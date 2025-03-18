import crypto from 'crypto';
import { getKeys } from './keys';

const algorithm = 'aes-256-cbc';

export function encrypt(text: string) {
  const keys = getKeys();
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(keys.key), keys.iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: keys.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(text: { iv?: string, encryptedData: string }) {
  const keys = getKeys();
  let iv = text.iv ? Buffer.from(text.iv, 'hex') : keys.iv;
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(keys.key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export function randomKey() {
  return crypto.randomBytes(32).toString('hex');
}