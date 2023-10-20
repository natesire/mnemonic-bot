"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Anagram = void 0;
const fs = __importStar(require("fs")); // use this for esmodules and typescript
class Anagram {
    constructor(dictionaryFile) {
        this.dictionaryFile = dictionaryFile;
        this.dictionary = [];
        this.sortedDictionary = [];
        // easier to read tweak vars up front
        this.anagramSources = ["http://localhost:3000/", "http://localhost:3000/anagrams/anagram.txt", "http://localhost:3000/anagrams/anagram.sample.txt"];
        this.anagramMap = new Map();
        this.dictionaryFile = dictionaryFile; // loads dictionary file
        /*if (!fs.existsSync(this.dictionaryFile)) {
          throw new Error('File not found!');
        }*/
        // open closed principle (SOLID)
        Object.freeze(this.anagramSources);
        this.anagramSources.forEach((source) => this.loadAnagrams(source));
    }
    loadAnagrams(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let lines;
            try {
                let responseTextMultiLine = yield this.fetchAnagram(source);
                lines = responseTextMultiLine === null || responseTextMultiLine === void 0 ? void 0 : responseTextMultiLine.split('\r\n');
                lines === null || lines === void 0 ? void 0 : lines.forEach((line) => {
                    this.lineToMap(line);
                });
            }
            catch (err) {
                console.log(`Error fetching ${source}: ${err}`);
            }
        });
    }
    lineToMap(line) {
        try {
            let anagramEntry = line.split(',');
            this.anagramMap.set(anagramEntry[0], this.nToEnd(1, anagramEntry).join(','));
        }
        catch (err) {
            console.log(`Error parsing line: ${line}`);
        }
    }
    nToEnd(n, arr) {
        return arr.slice(n);
    }
    fetchAnagram(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseTextMultiLine;
            try {
                let response = yield fetch(source); // timeout?, json?
                responseTextMultiLine = yield response.text();
                return responseTextMultiLine;
            }
            catch (err) {
                console.log(`Error fetching ${source}: ${err}`);
            }
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.client.connect();
            let dictionaryArr = this.loadDictionaryIntoArray();
            //this.sortedDictionary = await this.sortDictionaryWordsIntoRedis(dictionaryArr);
        });
    }
    // how to preload the dictionary?
    /*
    async readAnagramsFromRedis(sortedWordKey: string) : Promise<string> {
      let commaSeparatedAnagrams = await this.client.get(sortedWordKey);
      let anagramsArr = commaSeparatedAnagrams.split(',').filter((item) => item.match(/^[a-z]+/)); // filter out empty strings
      let anagramsWithCommas = anagramsArr.join(',');
      return anagramsWithCommas;
    }*/
    setAnagrams(wordKey, anagramsCommaSeperated) {
        return __awaiter(this, void 0, void 0, function* () {
            let anagrams = anagramsCommaSeperated.split(',');
            let cleaned = anagrams.filter((item) => item.match(/^[a-z]+/));
            //let uniqueAnagrams = [...new Set(cleaned)];
            //let anagramsUniqueCommaSeperated = uniqueAnagrams.join(',');
            //await this.client.set(wordKey, anagramsUniqueCommaSeperated);
        });
    }
    search(word) {
        let sortedWordKey = this.sortStr(word);
        let anagrams = this.anagramMap.get(sortedWordKey);
        return anagrams || 'Anagrams not found';
        /*return new Promise((resolve, reject) => {
          resolve(anagrams || 'Anagrams not found');
        });*/
    }
    loadDictionaryIntoArray() {
        // get current working directory
        let cwd = console.log(process.cwd());
        var dictionary = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
        return dictionary;
    }
    validateAlpha(word) {
        if (word.match(/^[a-z]+$/)) {
            return true;
        }
        return false;
    }
    validateValues(word) {
        if (word.match(/^[a-z]+,?$/)) {
            return true;
        }
        return false;
    }
    // sorts the entire file and stores it in a hash map
    sortDictionaryWordsIntoRedis(dictionary) {
        return __awaiter(this, void 0, void 0, function* () {
            // node js doesn't have tail call recursion so we use a loop
            for (let word of dictionary) {
                // will compare words by sorting each char in ascending order
                let sortedWordKey = this.sortStr(word);
                //let preExistingWordsInValue = await this.readAnagramsFromRedis(sortedWordKey);
                //await this.setAnagrams(sortedWordKey, preExistingWordsInValue + this.comma(word));
            }
        });
    }
    preCommaWord(word) {
        if (word)
            return `,${word}`;
    }
    // NodeJS is probably using merge sort
    sortStr(word) {
        return word.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
//# sourceMappingURL=Anagram.js.map