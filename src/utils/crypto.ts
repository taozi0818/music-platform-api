const crypto = require('crypto');
const bigInt = require('big-integer');

const secretKey = '0CoJUm6Qyw8W8jud';
const iv = '0102030405060708';
const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
const publicExponent = '010001';

function getRandomString(length: number) {
  const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = "";
  for (let i = 0; length > i; i += 1) {
    const index = Math.floor(Math.random() * charSet.length);
    result += charSet.charAt(index);
  }
  return result
}

function encryptAES(text: string, key: string, iv: string) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  return cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
}

function encryptRSA(text: string, exponent: string, modulus: string) {
  let reverseText = '';
  let radix = 16;

  for (let i = text.length - 1; i >= 0; i--) {
    reverseText += text[i];
  }

  const _text = bigInt(new Buffer(reverseText).toString('hex'), radix);
  const _ex = bigInt(exponent, radix);
  const _mod = bigInt(modulus, radix);
  let r = _text.modPow(_ex, _mod).toString(radix);

  while (r.length < 256) {
    r = '0' + r;
  }

  return r;
}

export function encryptData(text: string) {
  const randomStr = getRandomString(16);
  return {
    encText: encryptAES(encryptAES(text, secretKey, iv), randomStr, iv),
    encSecKey: encryptRSA(randomStr, publicExponent, modulus),
  };
}
