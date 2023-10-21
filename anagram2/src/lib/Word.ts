// sub type string, add sorting functions
export class Word {
    constructor(public word: string) {
        this.word = word;
    }

    sort() : string {
        return this.word.split('').sort().join('');
    }
}