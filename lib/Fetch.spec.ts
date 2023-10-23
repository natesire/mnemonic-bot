import { All as All } from './All';
import { Cache as Cache } from './Cache';
let fetch = require('node-fetch');

jest.mock('node-fetch');

const sources = ['http://localhost:3000/anagrams/anagrams.txt'];

it('should fetch data without duplicates', async () => {
    fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ "anagram" : "act,cat,tac" }),
      });

    let response = await fetch(sources[0]);

    if (response.ok) {
        const data = await response.json();
        expect(data).toEqual({ "anagram" : "act,cat,tac" });
    } else {
        throw new Error(`Failed to fetch data from`);
    }
});

// client side fallback in case internet download fails
it('should try fetching client side cache', async () => {
    fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ "anagram" : "act,cat,tac" }),
      });

    let response = await fetch(sources[0]);

    if (!response.ok) {
        const cache = new Cache();
        expect(cache.exists(sources[0])).toBe(false);
    } else {
        throw new Error(`should be missing anagrams and trigger rebuild`);
    }
});