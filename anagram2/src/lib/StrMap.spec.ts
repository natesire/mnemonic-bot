import { StrArr } from "./StrMap";

it("should create from string", () => {
    let ana = new StrArr("act,cat,tac");
    expect(ana.record).toEqual(["act","cat","tac"]);
});
