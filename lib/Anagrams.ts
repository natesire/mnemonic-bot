//import { StrArr } from './StrArr';
// usage: 
// anagram breathes depthes map

import { helloNpm } from 'natejs'

export class Anagrams {
    public map : Map<String, unknown>;
    constructor(map : Map<String, unknown>) {
        this.map = map;
    }

    test() {
        console.log(helloNpm());
    }
}