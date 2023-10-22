import fetch from 'node-fetch';
import { FetchAll } from './FetchAll';
import { Load } from './Load';

//let sources : string[];

/*beforeAll(() => {
    sources = ['http://www.google.com', 'http://www.yahoo.com'];
});*/

it('should fetch data', async () => {
    let sources = ['http://www.google.com', 'http://www.yahoo.com'];
    let fetchAll = new FetchAll(sources, fetch, new Load(fetch));
});