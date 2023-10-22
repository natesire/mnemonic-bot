"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
// sub type string, add sorting functions
class Word {
    constructor(word) {
        this.word = word;
        this.word = word;
    }
    sort() {
        return this.word.split('').sort().join('');
    }
}
exports.Word = Word;
