import {ParsedUrl} from './UrlParser';

export class RedditApiHandler {
    getDiscussionPost(parsedUrl: ParsedUrl): Promise<Response> {
        const url = new URL('https://api.reddit.com/r/anime/search');
        const urlSearchParams = new URLSearchParams({
            q: parsedUrl.title + ' episode ' + parsedUrl.episodeNumber + ' discussion',
            restrict_sr: 'true'
        });
        url.search = urlSearchParams.toString();
        return fetch(url.toString());
    }
}