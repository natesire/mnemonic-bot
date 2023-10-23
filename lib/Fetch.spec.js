"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("./Cache");
let fetch = require('node-fetch');
jest.mock('node-fetch');
const sources = ['http://localhost:3000/anagrams/anagrams.txt'];
it('should fetch data without duplicates', () => __awaiter(void 0, void 0, void 0, function* () {
    fetch.mockResolvedValue({
        ok: true,
        json: () => __awaiter(void 0, void 0, void 0, function* () { return ({ "anagram": "act,cat,tac" }); }),
    });
    let response = yield fetch(sources[0]);
    if (response.ok) {
        const data = yield response.json();
        expect(data).toEqual({ "anagram": "act,cat,tac" });
    }
    else {
        throw new Error(`Failed to fetch data from`);
    }
}));
// client side fallback in case internet download fails
it('should try fetching client side cache', () => __awaiter(void 0, void 0, void 0, function* () {
    fetch.mockResolvedValue({
        ok: false,
        json: () => __awaiter(void 0, void 0, void 0, function* () { return ({ "anagram": "act,cat,tac" }); }),
    });
    let response = yield fetch(sources[0]);
    if (!response.ok) {
        const cache = new Cache_1.Cache();
        expect(cache.exists(sources[0])).toBe(false);
    }
    else {
        throw new Error(`should be missing anagrams and trigger rebuild`);
    }
}));
