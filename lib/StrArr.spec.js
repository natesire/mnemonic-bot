"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrArr_1 = require("./StrArr");
it("should create from string", () => {
    let ana = new StrArr_1.StrArr("act,cat,tac");
    expect(ana.record).toEqual(["act", "cat", "tac"]);
});
