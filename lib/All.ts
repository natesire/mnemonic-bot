// proven way to fetch data from multiple sources
export class All {
    public sources : string[];
    public fetch : any;
    public load : any;

    constructor(fetch : any, sources : string[]) {
        this.sources = sources;
        this.fetch = fetch;
    }

    async fetchFirst() {
        let source = this.sources[0];
        let response = await this.fetch(source);
        return response;
    }

    fetchIt() {
        return this.fetch(this.sources[0]);
    }

    process(response : Promise<Response>) {
        response.then(async (response) => {
            //let t = await response.text();
        });
    }
}