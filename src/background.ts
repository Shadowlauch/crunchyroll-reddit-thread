import {browser} from 'webextension-polyfill-ts';
import {RedditApiHandler} from './classes/RedditApiHandler';
import moment = require('moment');

browser.runtime.onMessage.addListener(async (message, sender) => {
  const sessionId = await browser.cookies.get({
    name: 'session_id',
    url: sender.url
  }).then(session => session.value);

  const regex = new RegExp(/([^\-]+$)/);
  const urlMatches = sender.url.match(regex);
  const mediaId = parseInt(urlMatches[1]);

  const episodeInfoResponse = await fetch('https://api.crunchyroll.com/info.0.json?&session_id=' + sessionId + '&media_id=' + mediaId);
  const episodeInfo = await episodeInfoResponse.json();

  if (episodeInfo.error === true) {
    throw new Error('Could not fetch episode info:' + episodeInfo.message);
  }

  const seriesInfoResponse = await fetch('https://api.crunchyroll.com/info.0.json?&session_id=' + sessionId + '&series_id=' + episodeInfo.data.series_id);
  const seriesInfo = await seriesInfoResponse.json();

  if (seriesInfo.error === true) {
    throw new Error('Could not fetch episode info:' + seriesInfo.message);
  }

  const svc = new RedditApiHandler();

  const searchString = seriesInfo.data.name + ' episode ' + episodeInfo.data.episode_number + ' discussion';
  const res = await svc.getDiscussionPost(searchString);
  const resData = await res.json();

  if (resData.data.dist === 0) {
    throw new Error('No Reddit Thread found');
  }

  const children = resData.data.children;
  const releaseDate = moment(episodeInfo.data.premium_available_time);

  for (const child of children) {
    const postDate = moment.unix(child.data.created);
    if (Math.abs(releaseDate.diff(postDate, 'days')) < 3) {
      return child.data.url;
    }
  }

  return resData.data.children[0].data.url;
});
