import { SYMBOLS } from './const.js';

function deepCloneArrayOrObject(data) {
  return JSON.parse(JSON.stringify(data));
}

function removeHashSymbol(text) {
  return text.replace(SYMBOLS.HASH, SYMBOLS.EMPTY);
}

export { deepCloneArrayOrObject, removeHashSymbol };
