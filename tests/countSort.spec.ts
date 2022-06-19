import { CountSort } from '../source/CountSort';



describe("should find anagram", () => {

  let countSort: CountSort;

  beforeAll(async () => {
    countSort = new CountSort();
  });

  it('count sort word', async () => {
    expect(await countSort.sortWordByCount('iceman')).toEqual('aceimn');
  });

  /*
  // count sort word
  it('populateBuckets', async () => {
    let map = new Map();
    map.set('i', 1);
    map.set('c', 1);
    map.set('e', 1);
    expect(countSort.populateBuckets('ice').get('i')).toEqual(1);
  });

  it('buckets to word', async () => {
    let map = new Map();
    map.set('i', 1);
    map.set('c', 1);
    map.set('e', 1);
    expect(countSort.bucketsToWord(map)).toEqual('ice');
  });

  it('repeat letters', async () => {
    expect(countSort.repeatLetters('a', 5)).toEqual('aaaaa');
  });

  it('random string', async () => {
    expect(countSort.randomString(10_000)).toHaveLength(10_000);
  });

  it('random string', async () => {
    expect(countSort.randomString(5)).toMatch(/[a-z]{5}/);
  });

  it('verifies sorted string', async () => {
    expect(countSort.isSorted('aabbccddeeff')).toBe(true);
  });

  it('sort random string', async () => {
    let randomString = countSort.randomString(10_000_000);
    //get time before sort
    const start = Date.now();
    let sortedString = countSort.sortWordByCount(randomString);
    //get time after sort
    const end = Date.now();
    //get time difference
    const timeDiff = end - start;
    console.log(timeDiff);
    expect(countSort.isSorted(sortedString)).toBe(true);
  });*/
});