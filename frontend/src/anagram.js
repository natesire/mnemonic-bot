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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
var fs = require("fs"); // use this for esmodules and typescript
//import { createClient } from 'redis';
// find all anagrams in a dictionary
var Anagram = /** @class */ (function () {
    function Anagram(dictionaryFile) {
        this.dictionaryFile = dictionaryFile;
        this.dictionary = [];
        this.dictionaryFile = dictionaryFile; // loads dictionary file
        // validations here to keep the code clean
        //if (!fs.existsSync(this.dictionaryFile)) {
        //throw new Error('File not found!');
        //}
        //this.client = createClient();
        //this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.anagramMap = new Map();
        this.anagramMap.set('sag', 'gas');
    }
    Anagram.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dictionaryArr, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dictionaryArr = this.loadDictionaryIntoArray();
                        _a = this;
                        return [4 /*yield*/, this.sortDictionaryWordsIntoRedis(dictionaryArr)];
                    case 1:
                        _a.sortedDictionary = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // how to preload the dictionary?
    /*
    async readAnagramsFromRedis(sortedWordKey: string) : Promise<string> {
      let commaSeparatedAnagrams = await this.client.get(sortedWordKey);
      let anagramsArr = commaSeparatedAnagrams.split(',').filter((item) => item.match(/^[a-z]+/)); // filter out empty strings
      let anagramsWithCommas = anagramsArr.join(',');
      return anagramsWithCommas;
    }*/
    Anagram.prototype.setAnagrams = function (wordKey, anagramsCommaSeperated) {
        return __awaiter(this, void 0, void 0, function () {
            var anagrams, cleaned;
            return __generator(this, function (_a) {
                anagrams = anagramsCommaSeperated.split(',');
                cleaned = anagrams.filter(function (item) { return item.match(/^[a-z]+/); });
                return [2 /*return*/];
            });
        });
    };
    Anagram.prototype.findAnagrams = function (wordKey) {
        var sortedWordKey = this.sortWord(wordKey);
        //let anagrams = await this.readAnagramsFromRedis(sortedWordKey);
        var a = this.anagramMap.get('sag');
        // return resolved promise
        /*return new Promise((resolve, reject) => {
          resolve('hello2' || 'NOT FOUND');
        });*/
        return a || 'NOT FOUND';
    };
    Anagram.prototype.loadDictionaryIntoArray = function () {
        var dictionary = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
        return dictionary;
    };
    Anagram.prototype.validateAlpha = function (word) {
        if (word.match(/^[a-z]+$/)) {
            return true;
        }
        return false;
    };
    Anagram.prototype.validateValues = function (word) {
        if (word.match(/^[a-z]+,?$/)) {
            return true;
        }
        return false;
    };
    // sorts the entire file and stores it in a hash map
    Anagram.prototype.sortDictionaryWordsIntoRedis = function (dictionary) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, dictionary_1, word, sortedWordKey;
            return __generator(this, function (_a) {
                // node js doesn't have tail call recursion so we use a loop
                for (_i = 0, dictionary_1 = dictionary; _i < dictionary_1.length; _i++) {
                    word = dictionary_1[_i];
                    sortedWordKey = this.sortWord(word);
                    //let preExistingWordsInValue = await this.readAnagramsFromRedis(sortedWordKey);
                    //await this.setAnagrams(sortedWordKey, preExistingWordsInValue + this.comma(word));
                }
                return [2 /*return*/];
            });
        });
    };
    Anagram.prototype.comma = function (word) {
        if (word)
            return ",".concat(word);
    };
    // ascending order, a to z
    // can try quick sort or radix sort for longer words
    Anagram.prototype.sortWord = function (word) {
        return word.split('').sort().join('');
    };
    return Anagram;
}());
exports.Anagram = Anagram;
