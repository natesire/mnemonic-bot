export class Load {
    constructor(fetch : any) {
    }

    async fetch(source : string) : Promise<string> {
        return await this.fetch.text();
    }
}