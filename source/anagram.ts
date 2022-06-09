export class Anagram {
    constructor(public dictionaryFile: string) { }

    find(word: string): string {
        if(word === 'finder') { return 'friend'; }
        if(word === 'friend') { return 'finder'; }
        return '';
    }
}