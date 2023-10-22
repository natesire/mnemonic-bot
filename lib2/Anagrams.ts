import { StrArr } from './StrArr';
// usage: 
// anagram breathes depthes map
export class Anagrams {
    public map : Map<String, StrArr>;
    constructor(map : Map<String, StrArr>) {
        this.map = map;
    }
}