//import fetch from './Fetch';

describe('fetch', () => {
  it('should fetch data from the server', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    let txt = await response.text();
    let txtJ = JSON.parse(txt);
    expect(txtJ).toEqual({
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
    });
  });
});