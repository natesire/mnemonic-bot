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
exports.All = void 0;
// proven way to fetch data from multiple sources
class All {
    constructor(fetch, sources) {
        this.sources = sources;
        this.fetch = fetch;
    }
    fetchFirst() {
        return __awaiter(this, void 0, void 0, function* () {
            let source = this.sources[0];
            let response = yield this.fetch(source);
            return response;
        });
    }
    fetchIt() {
        return this.fetch(this.sources[0]);
    }
    process(response) {
        response.then((response) => __awaiter(this, void 0, void 0, function* () {
            //let t = await response.text();
        }));
    }
}
exports.All = All;
