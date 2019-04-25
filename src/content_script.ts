import {UrlParser} from './classes/UrlParser';
import {RedditApiHandler} from './classes/RedditApiHandler';

const urlElement = document.querySelector('link[rel=alternate][hreflang=en-us]');
const showmediaSubmenu = document.querySelector('.showmedia-submenu');

console.log(showmediaSubmenu);
if (urlElement && showmediaSubmenu) {
    const url = urlElement.getAttribute('href');
    runSearch(url).then(postUrl => {
        const element = document.createElement('a');
        element.text = 'Reddit Thread';
        element.setAttribute('href', postUrl);
        element.setAttribute('target', '_blank');
        showmediaSubmenu.append(element);
    }).catch(e => console.log(e));

}

async function runSearch(url: string) {
    const parsedUrl = UrlParser.parse(url);

    const svc = new RedditApiHandler();

    const res = await svc.getDiscussionPost(parsedUrl);
    const resData = await res.json();

    if (resData.data.dist === 0) {
        throw new Error('No Thread found');
    }

    const children = resData.data.children;

    for (const child of children) {

    }
    console.log(resData);

    return resData.data.children[0].data.url;
}