export class RedditApiHandler {
    getDiscussionPost(searchString: string): Promise<Response> {
        const url = new URL('https://api.reddit.com/r/anime/search');
        const urlSearchParams = new URLSearchParams({
            q: searchString,
            restrict_sr: 'true'
        });
        url.search = urlSearchParams.toString();
        return fetch(url.toString());
    }
}