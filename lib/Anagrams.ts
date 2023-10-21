import { StrArr } from './StrArr';
// usage: 
// anagram breathes depthes map
export class Anagrams {
    public map : Map<string, StrArr>;
    constructor(map : Map<string, StrArr>) {
        this.map = map;
    }
}