export class UrlParser {
    static parse(url: string): ParsedUrl {
        const regex = new RegExp(/https:\/\/[^/]*\/([^\/]*)\/episode-([0-9]*)[^0-9]*([0-9]*)/m);

        const matches = url.match(regex);
        return {
            episodeNumber: parseInt(matches[2]),
            id: parseInt(matches[3]),
            title: matches[1]
        }
    }
}

export interface ParsedUrl {
    title: string;
    episodeNumber: number;
    id: number;
}

