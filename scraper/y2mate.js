const axios = require('axios');
const fetch = require('node-fetch')


function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const baseurl = 'https://snaptik.biz';

async function search(url, type) {
        const requestData = new URLSearchParams({
            q: url,
            vt: type
        });

        const requestHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://snaptik.biz/id/youtube-to-mp4'
        };

        try {
            const response = await axios.post(`${baseurl}/api/ajaxSearch`, requestData, {
                headers: requestHeaders
            });

            const responseData = response.data;
            return responseData;
        } catch (error) {
            if (error.response) {
                console.error(`[ search ] HTTP error! status: ${error.response.status}`);
            } else {
                console.error('Axios error: ', error.message);
            }
        }
    }

async function convert(videoId, type, quality, fname, token, timeExpire) {
        const requestData = new URLSearchParams({
            v_id: videoId,
            ftype: type,
            fquality: quality,
            fname: fname,
            token: token,
            timeExpire: timeExpire
        });

        const requestHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://snaptik.biz/id/youtube-to-mp4'
        };

        try {
            const response = await axios.post(`https://cv95.ytcdn.app/api/json/convert`, requestData, {
                headers: requestHeaders
            });

            const responseData = response.data;
            return responseData;
        } catch (error) {
            if (error.response) {
                console.error(`HTTP2 error! status: ${error.response.status}`);
            } else {
                console.error('Axios error: ', error.message);
            }
        }
    }
    
async function ytvideo(url) {
        let { links, vid, title, fn, token, timeExpires } = await search(url, "mp4");
        let video = {}
        let thumbnail = `https://i.ytimg.com/vi/${vid}/hq720.jpg`

        for (let i in links.mp4) {
            let input = links.mp4[i];
            video[input.q] = {
                size: input.size,
                url: convert.bind(null, vid, input.f, input.q, fn, token, timeExpires)
            };
        }

        const result = { vid, title, thumbnail, video };
        return result
    }
    
async function y2matemp3(link) {
try {
const response = await axios.post(
  'https://dws5.ezmp3.cc/api/convert',
  {
    'url': link,
    'quality': 128,
    'trim': false,
    'startT': 0,
    'endT': 0
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://ezmp3.cc/'
    }
  }
);
const url = response.data.url
const title = response.data.title
const id = getYouTubeVideoId(link)
const thumb = `https://i.ytimg.com/vi/${id}/hq720.jpg`
const res = {
vid: id,
title: title,
thumbnail: thumb,
url: url
}
return res
} catch (error) {
console.log(error)
}
}

async function y2matemp4(link) {
               try {
const response = await ytvideo(link)
const id = response.vid
const judul = response.title
const quality = "360p"
const size = response.video[quality].size
const url = await response.video[quality].url()
const thumb = `https://i.ytimg.com/vi/${id}/hq720.jpg`
const res = {
vid: id,
title: judul,
thumbnail: thumb,
url: url.result,
quality: quality,
size: size
}
return res
} catch (error) {
try {
const response = await ytvideo(link)
const id = response.vid
const judul = response.title
const quality = "144p"
const size = response.video[quality].size
const url = await response.video[quality].url()
const thumb = `https://i.ytimg.com/vi/${id}/hq720.jpg`
const res = {
vid: id,
title: judul,
thumbnail: thumb,
url: url.result,
quality: quality,
size: size
}
return res
} catch (error) {
console.log(error)
return "data tidak ditemukan\n\n" + error
}
}
}

module.exports = { ytvideo, y2matemp3, y2matemp4 }