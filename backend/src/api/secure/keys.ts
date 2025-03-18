import crypto from 'crypto';
import fs from 'fs';

export interface KeyData {
  initialised: boolean;
  key: Buffer;
  iv: Buffer;
}

let currentKeys: KeyData = {
  initialised: false,
  key: Buffer.from([]),
  iv: Buffer.from([])
}

export function getKeys() {
  if (!currentKeys.initialised) {
    if (fs.existsSync('./keys.json')) {
      currentKeys = loadKeysFromFile();
    } else {
      currentKeys = generateKeys();
    }
  }

  return currentKeys;
}

function generateKeys() {
  const newKeys = {
    initialised: true,
    key: crypto.randomBytes(32),
    iv: crypto.randomBytes(16)
  };

  const data = JSON.stringify(newKeys);

  fs.writeFileSync('./keys.json', data);

  return newKeys;
}

function loadKeysFromFile() {
  const data = fs.readFileSync('./keys.json', 'utf8');
  const asJson = JSON.parse(data);

  return {
    initialised: true,
    key: Buffer.from(asJson.key, 'hex'),
    iv: Buffer.from(asJson.iv, 'hex')
  };
}