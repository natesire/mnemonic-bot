export class FetchAll {
    public fetch : any;
    public load : any;
    constructor(sources : string[], fetch : any, load : any) {
        this.fetch = fetch;
        this.load = load;
    }

    fetchAll(sources : string[]) {
        sources.forEach((source) => this.process(fetch(source)));
    }

    process(response : Promise<Response>) {
        response.then(async (response) => {
            //let t = await response.text();
        });
    }
}