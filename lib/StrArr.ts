
// Usage example: anagram
// Anagram can be three types
// prefer in order of ease of use
// map, array of strings and then string with commas
export class StrArr {
    public record: string[];

    constructor(record: string[] | string) {
        this.record = this.strWithCommasToArray(record);
    }

    strWithCommasToArray(strOrArrayStr: string | string[]): string[] {
        if(typeof(strOrArrayStr) == "string") return strOrArrayStr.split(",");
        if(typeof(strOrArrayStr) == "object") return strOrArrayStr;
        throw new Error("strWithCommasToArray: unknown type");
    }


}