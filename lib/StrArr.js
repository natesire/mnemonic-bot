"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrArr = void 0;
// Usage example: anagram
// Anagram can be three types
// prefer in order of ease of use
// map, array of strings and then string with commas
class StrArr {
    constructor(record) {
        this.record = this.strWithCommasToArray(record);
    }
    strWithCommasToArray(strOrArrayStr) {
        if (typeof (strOrArrayStr) == "string")
            return strOrArrayStr.split(",");
        if (typeof (strOrArrayStr) == "object")
            return strOrArrayStr;
        throw new Error("strWithCommasToArray: unknown type");
    }
}
exports.StrArr = StrArr;
