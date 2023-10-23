import { All as All } from './All';
//import fetch from 'node-fetch';
let fetch = require('node-fetch');

//let sources : string[];

/*beforeAll(() => {
    sources = ['http://www.google.com', 'http://www.yahoo.com'];
});*/

jest.mock('node-fetch');

it('should fetch data without duplicates', async () => {
    // mock fetch
    fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ "anagram" : "act,cat,tac" }),
      });

    let sources = ['http://localhost:3000/anagrams/anagrams.txt'];
    let response = await fetch(sources[0]);

    if (response.ok) {
        const data = await response.json();
        expect(data).toEqual({ "anagram" : "act,cat,tac" });
    } else {
        throw new Error(`Failed to fetch data from`);
    }
});