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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const FetchAll_1 = require("./FetchAll");
const Load_1 = require("./Load");
//let sources : string[];
/*beforeAll(() => {
    sources = ['http://www.google.com', 'http://www.yahoo.com'];
});*/
it('should fetch data', () => __awaiter(void 0, void 0, void 0, function* () {
    let sources = ['http://www.google.com', 'http://www.yahoo.com'];
    let fetchAll = new FetchAll_1.FetchAll(sources, node_fetch_1.default, new Load_1.Load(node_fetch_1.default));
}));
