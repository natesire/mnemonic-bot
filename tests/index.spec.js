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
const Anagram_js_1 = require("../src/Anagram.js");
describe("should find anagram", () => {
    let anagram;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        anagram = new Anagram_js_1.Anagram('dictionary.test.txt');
        yield anagram.setup();
    }));
    it('should throw error if file does not exist', () => {
        expect(() => {
            new Anagram_js_1.Anagram('/path/to/file/that/does/not/exist.txt');
        }).toThrowError('File not found!');
    });
    it('should load dictionary into array', () => {
        const dictionary = anagram.loadDictionaryIntoArray();
        expect(dictionary).toContain('iceman');
    });
    // test the final result is less brittle
    it('gets cinema for iceman', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield anagram.search('iceman')).toContain('cinema');
    }));
    it('gets iceman for cinema', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield anagram.search('cinema')).toContain('iceman');
    }));
    it('validate word', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(anagram.validateAlpha('[object promise]')).toEqual(false);
    }));
});
//# sourceMappingURL=index.spec.js.map