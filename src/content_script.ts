import { browser } from "webextension-polyfill-ts";

const urlElement = document.querySelector('link[rel=alternate][hreflang=en-us]');
const showmediaSubmenu = document.querySelector('.showmedia-submenu');

if (urlElement && showmediaSubmenu) {
    browser.runtime.sendMessage(null).then(postUrl => {
        const element = document.createElement('a');
        element.text = 'Reddit Thread';
        element.setAttribute('href', postUrl);
        element.setAttribute('target', '_blank');
        showmediaSubmenu.append(element);
    }).catch(e => console.log(e));

}