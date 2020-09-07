import * as url from "url";

export function isVideoUrl(path) {
  if (!path || typeof path !== 'string') return false;

  const p = url.parse(path).pathname;
  if (!p) {
    return false;
  }
  if (path.startsWith('https://youtu.be/')
	|| path.startsWith('http://youtu.be/')
	|| path.startsWith('https://vimeo.com/')
	|| path.startsWith('http://vimeo.com/')
	|| path.startsWith('https://soundcloud.com/')
	|| path.startsWith('http://soundcloud.com/')
	|| path.startsWith('https://streamable.com/')
	|| path.startsWith('http://streamable.com/')
	|| path.startsWith('https://home.wistia.com/medias/')
	|| path.startsWith('http://home.wistia.com/medias')
	|| path.startsWith('https://video.vidyard.com/watch/')
	|| path.startsWith('http://video.vidyard.com/watch/')
	|| path.startsWith('https://www.mixcloud.com/mixcloud/')
	|| path.startsWith('http://www.mixcloud.com/mixcloud/')
	|| path.startsWith('https://www.facebook.com/facebook/videos/')
	|| path.startsWith('https://www.facebook.com/FacebookDevelopers/videos/')
	|| path.startsWith('http://www.facebook.com/facebook/videos/')
	|| path.startsWith('http://www.facebook.com/FacebookDevelopers/videos/')
	|| path.startsWith('https://www.twitch.tv/')
	|| path.startsWith('http://www.twitch.tv/')) {
    return true;
  }
  let ext = p.split('.').slice(-1).pop();
  ext = ext ? ext.toLowerCase() : undefined;
  return ext && /webm|mkv|flv|vob|ogv|ogg|gif|avi|mov|wmv|mp4|mpg|mpeg|m4v|3gp/.test(ext);
}

export function formatCurrency(num) {
	return parseFloat((num / 100).toFixed(2)).toLocaleString();
}

export function joinWords(separator) {
  let args = Array.prototype.slice.call(arguments, 1);
  args = args.filter(arg => typeof arg !== 'undefined' && arg !== null && arg !== '');
  return args.join(separator);
}
