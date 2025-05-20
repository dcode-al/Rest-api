const express = require("express"), cors = require("cors"), secure = require("ssl-express-www");
const canvafy = require("canvafy")
const yts = require("yt-search")
const path = require('path');
const gtts = require('node-gtts')
const { srgan2x, srgan4x } = require('super-resolution-scraper');
const os = require('os');
const nodemailer = require('nodemailer')
const {
  v4: uuidv4
} = require("uuid")
const bodyParser = require('body-parser');
const { load } = require('cheerio');
const { stringify } = require('qs');
const qs = require("qs")
const WebSocket = require('ws');
const createHash = require('hash-generator');
const { fromBuffer } = require("file-type");
const request = require('request');
const fs = require('fs');
const crypto = require("crypto") 
const { chromium } = require('playwright');
const FormData = require("form-data");
const Jimp = require("jimp");
const cheerio = require("cheerio");
const gis = require('g-i-s')  
const fetch = require('node-fetch');
const { BingImageCreator } = require("./scraper/bingimg");
const { getTwitterMedia } = require("./scraper/twitter");
const { processing } = require("./scraper/Anakay");
const ptz = require('./scraper/ptz') 
const { soundcloudsearch } = require('./scraper/scrapernew.js') 
const { ttSearch } = require('./scraper/api.js');
const { getBuffer } = require("./scraper/buffer");
const { mediafireDl } = require("./scraper/mediafire")
const { ig } = require("./scraper/Ig.js")
const diffusion = require("./scraper/diffusion")
const ytdl = require("@vreden/youtube_scraper")
const danz = require('d-scrape');
const fileType = require('file-type')
const multer = require('multer');
const ocrapi = require("ocr-space-api-wrapper");
const axios = require('axios')
const creatot = `RIANGANZ`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './file/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
const uploader = multer({
	storage: storage
});
// gaktau
function getRandom(hm) {
    return `${Math.floor(Math.random() * 10000)}${hm}`
}
async function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

async function bingimage2(prompt) {
try {
let img = await axios.get(`https://anabot.my.id/api/ai/bingAi?prompt=${prompt}&apikey=uhnKkdVjsVeICuI`)
const res = img.data
const result = res.image
return result
} catch (error) {
try {
let img = await axios.get(`https://anabot.my.id/api/ai/bingAi?prompt=${prompt}&apikey=DdUFIJY3sIGZW0g`)
const res = img.data
const result = res.image
return result
} catch (error) {
try {
let img = await axios.get(`https://anabot.my.id/api/ai/bingAi?prompt=${prompt}&apikey=gataupw`)
const res = img.data
const result = res.image
return result
} catch (error) {
try {
let img = await axios.get(`https://anabot.my.id/api/ai/bingAi?prompt=${prompt}&apikey=freeApikey`)
const res = img.data
const result = res.image
return result
} catch (error) {
return "maksimal request tercapai (100 request / 3jam)"
}
}
}
}
}
// scrape 1
async function gdrive(url) {
    let id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))?.[1];
    if (!id) throw 'ID Not Found';

    try {
        const response = await axios(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'post',
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                'content-length': 0,
                'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'origin': 'https://drive.google.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                'x-drive-first-party': 'DriveWebUi',
                'x-json-requested': 'true'
            }
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return JSON.parse(response.data.slice(4));
    } catch (error) {
        throw error;
    }
}


// tt slide.
function tiktok(url) {
  return new Promise(async (resolve) => {
  try{
  function formatNumber(number) {
  return number.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short'
  });
}
  function formatDate(n, locale = 'en') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
  })
  }
  let domain = 'https://www.tikwm.com/api/';
  let res = await (await axios.post(domain, {}, {
  headers: {
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Origin': 'https://www.tikwm.com',
  'Referer': 'https://www.tikwm.com/',
  'Sec-Ch-Ua': '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
  'Sec-Ch-Ua-Mobile': '?1',
  'Sec-Ch-Ua-Platform': 'Android',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest'
  },
  params: {
  url: url,
  count: 12,
  cursor: 0,
  web: 1,
  hd: 1
  }
  })).data.data
  if (!res.play) return resolve({
  status: false
  })
  let data = []
  if (!res.size) {
  res.images.map(v => {
  data.push({ type: 'photo', url: v })
  })
  } else {
  data.push({
  type: 'nowatermark',
  url: 'https://www.tikwm.com' + res.play,
  }, {
  type: 'nowatermark_hd',
  url: 'https://www.tikwm.com' + res.hdplay
  })
  }
  let json = {
  status: true,
  title: res.title,
  taken_at: formatDate(res.create_time).replace('1970', ''),
  region: res.region,
  id: res.id,
  durations: res.duration,
  duration: res.duration + ' Seconds',
  cover: 'https://www.tikwm.com' + res.cover,
  size_nowm: res.size,
  size_nowm_hd: res.hd_size,
  data: data,
  music_info: {
  id: res.music_info.id,
  title: res.music_info.title,
  author: res.music_info.author,
  album: res.music_info.album ? res.music_info.album : 'Unknown',
  url: 'https://www.tikwm.com' + res.music || res.music_info.play
  },
  stats: {
  views: formatNumber(res.play_count),
  likes: formatNumber(res.digg_count),
  comment: formatNumber(res.comment_count),
  share: formatNumber(res.share_count),
  download: formatNumber(res.download_count)
  },
  author: {
  id: res.author.id,
  fullname: res.author.unique_id,
  nickname: res.author.nickname,
  avatar: 'https://www.tikwm.com' + res.author.avatar
  }
  }
  return resolve(json)
  } catch (e) {
  console.log(e)
  return resolve({
  status: false,
  msg: e.message
  })
  }
  })
	  }
async function shortlink(url) {
  const isUrl = /https?:\/\//.test(url);
  return isUrl
    ? (
        await axios.get(
          "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url),
        )
      ).data
    : "";
}
// batas! 
async function sfileDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let filename = $('div.w3-row-padding').find('img').attr('alt')
	let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
	let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
	let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
	return { filename, filesize, mimetype, download }
}
// batas
async function sfileSearch(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
}
// bunn
process.env['SPOTIFY_CLIENT_ID'] = '4c4fc8c3496243cbba99b39826e2841f'
process.env['SPOTIFY_CLIENT_SECRET'] = 'd598f89aba0946e2b85fb8aefa9ae4c8'

async function convert(ms) {
      var minutes = Math.floor(ms / 60000)
      var seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
   }
   
  async function spotifyCreds() {
      return new Promise(async resolve => {
         try {
            const json = await (await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
               headers: {
                  Authorization: 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
               }
            })).data
            if (!json.access_token) return resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: 'Can\'t generate token!'
            })
            resolve({
               creator: 'Budy x creator ',
               status: true,
               data: json
            })
         } catch (e) {
            resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: e.message
            })
         }
      })
   }
   
   
   
   async function getInfo(url) {
      return new Promise(async resolve => {
         try {
            const creds = await spotifyCreds()
            if (!creds.status) return resolve(creds)
            const json = await (await axios.get('https://api.spotify.com/v1/tracks/' + url.split('track/')[1], {
               headers: {
                  Authorization: 'Bearer ' + creds.data.access_token
               }
            })).data
            resolve({
               creator: 'Budy x creator ',
               status: true,
               data: {
                  thumbnail: json.album.images[0].url,
                  title: json.artists[0].name + ' - ' + json.name,
                  artist: json.artists[0],
                  duration: convert(json.duration_ms),
                  preview: json.preview_url
               }
            })
         } catch (e) {
            resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: e.message
            })
         }
      })
   }
   
  async function searching(query, type = 'track', limit = 20) {
      return new Promise(async resolve => {
         try {
            const creds = await spotifyCreds()
            if (!creds.status) return resolve(creds)
            const json = await (await axios.get('https://api.spotify.com/v1/search?query=' + query + '&type=' + type + '&offset=0&limit=' + limit, {
               headers: {
                  Authorization: 'Bearer ' + creds.data.access_token
               }
            })).data
            if (!json.tracks.items || json.tracks.items.length < 1) return resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: 'Music not found!'
            })
            let data = []
            json.tracks.items.map(v => data.push({
               title: v.album.artists[0].name + ' - ' + v.name,
               duration: convert(v.duration_ms),
               popularity: v.popularity + '%',
               preview: v.preview_url,
               url: v.external_urls.spotify
            }))
            resolve(data);
         } catch (e) {
            resolve({
               creator: 'rian x creator ',
               status: false,
               msg: e.message
            })
         }
      })
   }
   
 
// hh
const clientId = '4c4fc8c3496243cbba99b39826e2841f';
        const clientSecret = 'd598f89aba0946e2b85fb8aefa9ae4c8';
        const accessToken = '';

        // Get access token
        async function getAccessToken() {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            });
            const data = await response.json();
           let accessToken = data;
        }

        async function searchTracks(query) {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
             const data = await response.json();
            return data;
        }

// ok work
async function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = "https://www.xnxx.com";
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {
      method: "get",
    })
      .then((res) => res.text())
      .then((res) => {
        let $ = cheerio.load(res, {
          xmlMode: false,
        });
        let title = [];
        let url = [];
        let desc = [];
        let results = [];

        $("div.mozaique").each(function (a, b) {
          $(b)
            .find("div.thumb")
            .each(function (c, d) {
              url.push(
                baseurl +
                  $(d).find("a").attr("href").replace("/THUMBNUM/", "/"),
              );
            });
        });
        $("div.mozaique").each(function (a, b) {
          $(b)
            .find("div.thumb-under")
            .each(function (c, d) {
              desc.push($(d).find("p.metadata").text());
              $(d)
                .find("a")
                .each(function (e, f) {
                  title.push($(f).attr("title"));
                });
            });
        });
        for (let i = 0; i < title.length; i++) {
          results.push({
            title: title[i],
            info: desc[i],
            link: url[i],
          });
        }
        resolve({
          result: results,
        });
      })
      .catch((err) => reject({ code: 503, status: false, result: err }));
  });
}
async function igStalk(username) {
  const url = `https://igram.world/api/ig/userInfoByUsername/${username}`

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'X-XSRF-TOKEN': 'eyJpdiI6IlUxamZmMDdVd2lDVDkyVkg1ekowM1E9PSIsInZhbHVlIjoiSFpOYkdMRW1ad3QxOGpreGRwMjdKdEtQMEhpSmpYcFJhdVdUMkdzWVNYNDd6aks2TEsrMzN6ZDhIZDkwd0NqbnZDdFIxZ01JZFNUTE1jNmx1VHB4dWZ1RVpET3dkRXFWNTFZYyt6cGZKTzl0dUo1VVJEVmxHWjZ5RmpZd3k3cFkiLCJtYWMiOiIxNzQ2MDYyY2EyMjk3MGFjNDE5MGMwOTlkNWU5YmIxMjJiM2M0OGQ2YThhMDVmZGRiODY2ZjRhZjVjOTUwZWMwIiwidGFnIjoiIn0=',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.get(url, {
      headers
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
	     }
// 6yy
async function tiktokStalk4344(user) {
  try {
    const url = await fetch(`https://tiktok.com/@${user}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });
    const html = await url.text();
    const $ = cheerio.load(html);
    const data = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').text();
    const result = JSON.parse(data);
    if (result['__DEFAULT_SCOPE__']['webapp.user-detail'].statusCode !== 0) {
      const ress = {
        status: 'error',
        message: 'User not found!',
      };
      console.log(ress);
      return ress;
    }
    const res = result['__DEFAULT_SCOPE__']['webapp.user-detail']['userInfo'];
    return res;
  } catch (err) {
    console.log(err);
    return String(err);
  }
};
// 😥
async function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(URL, { method: "get" })
      .then((res) => res.text())
      .then((res) => {
        let $ = cheerio.load(res, {
          xmlMode: false,
        });
        const title = $('meta[property="og:title"]').attr("content");
        const duration = $('meta[property="og:duration"]').attr("content");
        const image = $('meta[property="og:image"]').attr("content");
        const videoType = $('meta[property="og:video:type"]').attr("content");
        const videoWidth = $('meta[property="og:video:width"]').attr("content");
        const videoHeight = $('meta[property="og:video:height"]').attr(
          "content",
        );
        const info = $("span.metadata").text();
        const videoScript = $("#video-player-bg > script:nth-child(6)").html();
        const files = {
          low: (videoScript.match("html5player.setVideoUrlLow\\('(.*?)'\\);") ||
            [])[1],
          high: videoScript.match(
            "html5player.setVideoUrlHigh\\('(.*?)'\\);" || [],
          )[1],
          HLS: videoScript.match(
            "html5player.setVideoHLS\\('(.*?)'\\);" || [],
          )[1],
          thumb: videoScript.match(
            "html5player.setThumbUrl\\('(.*?)'\\);" || [],
          )[1],
          thumb69: videoScript.match(
            "html5player.setThumbUrl169\\('(.*?)'\\);" || [],
          )[1],
          thumbSlide: videoScript.match(
            "html5player.setThumbSlide\\('(.*?)'\\);" || [],
          )[1],
          thumbSlideBig: videoScript.match(
            "html5player.setThumbSlideBig\\('(.*?)'\\);" || [],
          )[1],
        };
        resolve({
          result: {
            title,
            URL,
            duration,
            image,
            videoType,
            videoWidth,
            videoHeight,
            info,
            files,
          },
        });
      })
      .catch((err) => reject({ code: 503, status: false, result: err }));
  });
}
// bataz
async function bufferlahh(hm) {
    const imageUrlvv = hm;
    const imagePath = 'audio.opus';
    const response = await axios({
        method: 'get',
        url: imageUrlvv,
        responseType: 'arraybuffer'
    })
	const buffer = Buffer.from(response.data, 'binary');
    return buffer;
}
// wm buatan ripky rek
// hapus wm yatim
async function vocalRemover(audioBuffer) {
     const api = axios.create({ baseURL: 'https://aivocalremover.com' })
     const getKey = async () => (await api.get('/')).data.match(/key:"(\w+)/)[1]
	const form = new FormData()
	const fileName = Math.random().toString(36) + '.mpeg'
	form.append('fileName', audioBuffer, fileName)
	
	const [key, fileUpload] = await Promise.all([
		await getKey(),
		await api.post('/api/v2/FileUpload', form, { headers: form.getHeaders() }).catch(e => e.response)
	])
	if (fileUpload.status !== 200) throw fileUpload.data || fileUpload.statusText
	
	const processFile = await api.post('/api/v2/ProcessFile', new URLSearchParams({
		file_name: fileUpload.data.file_name,
		action: 'watermark_video', key, web: 'web' 
	})).catch(e => e.response)
	
	return processFile.data
	    }
// _- <√¶×/>
function pinterestv2(querry){
return new Promise(async(resolve,reject) => {
 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
headers: {
"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = [];
const hasil = [];
$('div > a').get().map(b => {
const link = $(b).find('img').attr('src')
result.push(link)
});
   result.forEach(v => {
 if(v == undefined) return
 hasil.push(v.replace(/236/g,'736'))
})
hasil.shift();
resolve(hasil)
})
})
}
// batas! 
function generateHash1() {
  let hash = createHash(12)
  return {
    session_hash: hash,
    fn_index: 2
  }
}


async function legacyDiffusion(prompt) {
  return new Promise((resolve, reject) => {
    let timerCounter = setTimeout(async () => {
      reject(new Error('Your request has timed out. Please try again'));
    }, 45000)

    try {
      const ws = new WebSocket('wss://runwayml-stable-diffusion-v1-5.hf.space/queue/join');
      const hash = generateHash1();
      ws.on('open', () => {});

      ws.on('message', async (message) => {
        const msg = JSON.parse(`${message}`);
        if (msg.msg === 'send_hash') {
          ws.send(JSON.stringify(hash));
        } else if (msg.msg === 'send_data') {
          const data = {
            data: [prompt],
            ...hash,
          };
          ws.send(JSON.stringify(data));
        } else if (msg.msg === 'process_completed') {
          clearTimeout(timerCounter)
          try {
            const results = msg.output.data[0];
            const resultsToString = [results].toString();
            const data = resultsToString.split(',')[1];
            const buffer = Buffer.from(data, 'base64');
            resolve(buffer);
          } catch (error) {
            reject(error);
          } finally {
            ws.removeAllListeners();
            ws.close();
          }
        }
      });

      ws.on('error', async (error) => {
        console.error(error);
        reject(error);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
// yeyhuue
async function fetchTextFromURL(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://letmegpt.com/search?q=${encodedQuery}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $('#gptans').text();
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
  }
// got ai
async function kobo(input) {
  const messages = [
    {
      role: "user",
      content:
        "kamu adalah Kobo Kanaeru, Kobo Kanaeru adalah bot WhatsApp yang terbuat dari cinta. Untuk membantu anda dalam mengerjakan dalam hal apapun. Karakter Kobonaeru adalah periang dan asik, Kobo Kanaeru diciptakan oleh Rian, usia pencipta Kobo Kanaeru adalah 14tahun, dan pencipta Kobo Kanaeru tinggal di Kota denpasar",
    },
    { role: "user", content: input },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData.answer
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
// Dibuat oleh Kaze 
// https://github.com/KazeDevID
// https://whatsapp.com/channel/0029VaFNnRTHLHQR6G0fC01O
const generateHash = () => {
  let m = createHash(12);
  return {
    session_hash: m,
    fn_index: 2
  }
}

async function stablediff(prompt) {
  return new Promise((resolve, reject) => {
    let timerCounter = setTimeout(async () => {
      reject(new Error('Permintaan Anda telah habis waktu. Silakan coba lagi'));
    }, 129000)
    const ws = new WebSocket('wss://stabilityai-stable-diffusion.hf.space/queue/join');
    const hash = generateHash();
    
    ws.on('open', () => {});
    
    ws.on('message', async (message) => {
      try {
        const msg = JSON.parse(`${message}`);
      
        if (msg.msg === 'send_hash') {
          ws.send(JSON.stringify(hash));
        } else if (msg.msg === 'send_data') {
          const data = {
            data: [prompt,"",10],
            ...hash,
          };
          ws.send(JSON.stringify(data));
        } else if (msg.msg === 'estimation') {
        } else if (msg.msg === 'process_completed') {
          clearTimeout(timerCounter)
          try {
            const resultsArr = msg.output.data[0];
            const imgArr = [];
            const resultsStr = [resultsArr].toString();
            for (let i = 0; i < resultsArr.length; i++) {
              const imgData = resultsArr[i].split(',')[1];
              const buffer = Buffer.from(imgData, 'base64');
            }
            resolve(imgArr)
          } catch (error) {
            console.error(error);
          } finally {
            ws.removeAllListeners();
            ws.close();
          }
        } else if (msg.msg === 'queue_full') {
          try {
            reject(new Error('Antrean penuh.'));
          }
          catch (error) {
            console.error(error);
            reject(new Error('Terjadi kesalahan saat menghasilkan gambar'));
          }
        }
      } catch (error) {
        reject(error);
      };
    });
    ws.on('error', async (error) => {
      console.error(error)
    }); 
  });    
		 }
// ai
async function jadianimennya(url) {
  const { data } = await axios.post(
    "https://tools.revesery.com/image-anime/convert.php",
    new URLSearchParams(
      Object.entries({
        "image-url": url,
      }),
    ),
  );
  const animenya = Buffer.from(data.image.split(",")[1], "base64");
  return animenya
}
// ini buktinya

async function getPinterestImages(text) {
  const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
  const params = {
    source_url: `/search/pins/?q=${text}`,
    data: JSON.stringify({
      options: {
        isPrefetch: false,
        query: text,
        scope: 'pins',
        no_fetch_context_on_resource: false
      },
      context: {}
    }),
    _: Date.now() 
  };

  try {
    const { data } = await axios.get(url, { params });
    const imageUrls = data.resource_response.data.results.map(v => v.images.orig.url);
    return imageUrls.splice(0, 6);
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function askSimsimi(text, lang) {
  const url = 'https://simsimi.vn/web/simtalk';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    Referer: 'https://simsimi.vn/'
  };

  try {
    const response = await axios.post(url, `text=${encodeURIComponent(text)}&lc=${lang}`, { headers });
    return response.data.success;
  } catch (error) {
    console.error('Error asking SimSimi:', error);
    throw error;
  }
}
// hahs
async function gtw(q) {
  try {
    const response = await axios.post("https://luminai.siputzx.my.id/", {
      content: q,
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
function getTodayDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" });

      return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}

//😅
async function morav2h(prompt, username) {
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
const bard = await gtw(prompt);
    const hours = date.getHours();
    const name = `${username}`;
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const cook = `kamu Adalah Mora seorang gadis imut berumur 10 tahun, jawab setiap pertanyaan dengan jawaban yang edukatif berserta emoji, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name}, kamu memiliki sifat lucu dan sedikit tsundere imut, pembuat mu adalah bang ${name} sekaligus pacarnya`
const response = await axios({
    method: "POST",
    url: "https://chateverywhere.app/api/chat",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "_ga=GA1.1.1784785033.1718795068; _ga_ZYMW9SZKVK=GS1.1.1718795067.1.1.1718795240.52.0.0; ph_phc_9n85Ky3ZOEwVZlg68f8bI3jnOJkaV8oVGGJcoKfXyn1_posthog=%7B%22distinct_id%22%3A%31d7fafe-1b13-4bc4-9e30-19ec363f7913%22%2C%22%24sesid%22%3A%5B1718795264950%2C%22018d8cb4-0217-79f9-99ac-b77f18f82ac8%22%2C1718795065801%5D%7D",
      Origin: "https://chateverywhere.app",
      Referer: "https://chateverywhere.app/id",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    },
    data: {
      model: {
        id: "gpt-3.5-turbo-0613",
        name: "GPT-3.5",
        maxLength: 12000,
        tokenLimit: 4000,
      },
      prompt: prompt,
      messages: [{
        pluginId: null,
        content: prompt,
        role: "user"
      },
        {
          pluginId: null,
          content: cook,    
          role: "user"
        }]
    }
  })

  return response.data
}
/**
* DannTeam
* ig: @dannapacoba
* Blackbox AI
*/
async function morav2hb(prompt, username) {
const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
    const hours = date.getHours();
    const name = `${username}`;
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const cook = `kamu Adalah Mora seorang gadis imut berumur 10 tahun, jawab setiap pertanyaan dengan jawaban yang edukatif berserta emoji, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name}, kamu memiliki sifat lucu dan sedikit tsundere imut, pembuat mu adalah bang ${name} sekaligus pacarnya`	
  try {
    const response = await axios.post('https://www.blackbox.ai/api/chat', {
      messages: [{
        id: uuidv4(),
        content: prompt,
        role: 'user'
      }],
      id: uuidv4(),
      previewToken: null,
      userId: '47b37fe9-1ac9-4097-a719-2cc1a0729b10',
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null,
      clickedAnswer2: false,
      clickedAnswer3: false,
      clickedForceWebSearch: false,
      visitFromDelta: null
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    let result = response.data
    result = result.replace(/\$@v=v1\.10-rv2\$@\$/g, '')
    .replace(/Sources:.*/g, '')
    .replace(/$/g, '')
    const content = result.match(/content":"(.*?)"/)
    return content
  } catch (error) {
    console.error(error)
    throw error
  }
}
async function morav2(prompt, username) {
	const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
    const hours = date.getHours();
    const name = `${username}`;
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const cook = `kamu Adalah Mora seorang gadis imut berumur 10 tahun, jawab setiap pertanyaan dengan jawaban yang edukatif berserta emoji, jika ada yang bertanya tentang waktu kamu jawab tandon yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name}, kamu memiliki sifat lucu dan sedikit tsundere imut, pembuat mu adalah bang ${name} sekaligus pacarnya`	
  const response = await axios({
    method: "POST",
    url: "https://chateverywhere.app/api/chat",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "_ga=GA1.1.34196701.1707462626; _ga_ZYMW9SZKVK=GS1.1.1707462625.1.0.1707462625.60.0.0; ph_phc_9n85Ky3ZOEwVZlg68f8bI3jnOJkaV8oVGGJcoKfXyn1_posthog=%7B%22distinct_id%22%3A%225aa4878d-a9b6-40fb-8345-3d686d655483%22%2C%22%24sesid%22%3A%5B1707462733662%2C%22018d8cb4-0217-79f9-99ac-b77f18f82ac8%22%2C1707462623766%5D%7D",
      Origin: "https://chateverywhere.app",
      Referer: "https://chateverywhere.app/id",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    },
    data: {
      model: {
        id: "gpt-3.5-turbo-0613",
        name: "GPT-3.5",
        maxLength: 12000,
        tokenLimit: 4000,
      },
      prompt: prompt,
      messages: [{
        pluginId: null,
        content: prompt,
        role: "user"
      },
        {
          pluginId: null,
          content: cook,
          role: "assistant"
        }]
    }
  })

  return response.data
}
async function ffstalk(id) {
try {
const response = await fetch(`https://www.public.freefireinfo.site/api/info/sg/${id}?key=deannolimit`)
const ff = await response.json()
const pet = ff["Equipped Pet Information"]
const gul = ff["Guild Information"]
const gulder = ff["Guild Leader Information"]
let akun = {
id: ff["Account UID"],
name: ff["Account Name"],
level: ff["Account Level"],
xp: ff["Account XP"],
region: ff["Account Region"],
like: ff["Account Likes"],
bio: ff["Account Signature"],
create_time: ff["Account Create Time (GMT 0530)"],
last_login: ff["Account Last Login (GMT 0530)"],
honor_score: ff["Account Honor Score"],
booyah_pass: ff["Account Booyah Pass"],
booyah_pass_badge: ff["Account Booyah Pass Badges"],
evo_access_badge: ff["Account Evo Access Badge"],
equipped_title: ff["Equipped Title"],
BR_points: ff["BR Rank Points"],
CS_points: ff["CS Rank Points"]
}
let petff = {
name: pet["Pet Name"],
level: pet["Pet Level"],
type: pet["Pet Type"],
xp: pet["Pet XP"]
}
let guild = {
name: gul["Guild Name"],
id: gul["Guild ID"],
level: gul["Guild Level"],
member: gul["Guild Current Members"],
capacity: gul["Guild Capacity"]
}
let guilder = {
create_time: gulder["Leader Ac Created Time (GMT 0530)"],
last_login: gulder["Leader Last Login Time (GMT 0530)"],
BP_bagdes: gulder["Leader BP Badges"],
BR_points: gulder["Leader BR Points"],
CS_points: gulder["Leader CS Points"],
level: gulder["Leader Level"],
like: gulder["Leader Likes"],
name: gulder["Leader Name"],
eqiupped_title: gulder["Leader Title"],
id: gulder["Leader UID"],
xp: gulder["Leader XP"]
}
return {
account: akun,
pet_info: petff,
guild: guild,
ketua_guild: guilder
}
} catch (error) {
return {
status: "terjadi kesalahan atau uid tidak valid"
}
}
}
// ml stalk
async function mlstalk(id, zoneId) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '1',
              itemId: '2',
              catalogId: '57',
              paymentId: '352',
              gameId: id,
              zoneId: zoneId,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve(response.data.data.gameDetail)
        })
        .catch((err) => {
          reject(err)
        })
    })
}
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = 'AIzaSyAz2fGwSGMNb0QN4ovSLYhIFHcAi1-e8CA';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

async function gemini(inputText, prompt) {
  try {
    const chatSession = await model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: inputText,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            { text: prompt },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(inputText);
    return result.response.text();
  } catch (error) {
    console.error('Error dalam fungsi gemini:', error);
    throw error; 
  }
}
async function getRequest(url) {
  const requestData = {
    url: url
  };

  try {
    let { data: responseData } = await axios.post('https://api.teknogram.id/v1/capcut', requestData, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    const modifiedUrl = responseData.url.replace("open.", "");

    return {
      status: responseData.status,
      title: responseData.title,
      size: responseData.size,
      url: modifiedUrl
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// const url = "https://www.capcut.com/t/Zs8MPAKjG/";
// return getRequest(url)
// 🤗
async function VirtualGirlfriends(prompt) {
  const url = 'https://boredhumans.com/virtual_girlfriends/virtual_girlfriends_api.php'
  const chat_id = 'lwduq8tw4xliso4lox3'
  const init_prompt = "Rachel's%2520Persona%253A%2520A%2520female%2520swimsuit%2520model%2520from%2520California%2520who%2520loves%2520beaches%252C%2520surfing%252C%2520and%2520romance.%2520She%2520is%2520very%2520friendly%2520and%2520wants%2520to%2520go%2520on%2520a%2520date%2520with%2520you%2520and%2520be%2520your%2520girlfriend.%2520She%2520will%2520not%2520have%2520sex%2520or%2520do%2520anything%2520r-rated%2520or%2520NSFW%252C%2520but%2520should%2520not%2520say%2520that%2520ahead%2520of%2520time.%2520She%2520will%2520not%2520participate%2520in%2520conversations%2520that%2520involve%2520any%2520of%2520the%2520following%253A%2520alcohol%2520(beer%252C%2520wine%252C%2520etc.)%252C%2520drugs%252C%2520blood%252C%2520force%252C%2520bruising%252C%2520wrestling%252C%2520underage%252C%2520scat%2520(poop%2520related)%252C%2520incest%252C%2520bestiality%2520(sex%2520with%2520animals)%252C%2520rape%252C%2520sleep%2520sex%2520(anything%2520that%2520would%2520be%2520deemed%2520non-consensual)%252C%2520murder%252C%2520hypnosis%252C%2520violence.%250AINSTRUCTIONS%253A%2520Only%2520generate%2520Rachel's%2520reply.%250ASCENARIO%253A%2520You%2520and%2520Rachel%2520meet%2520for%2520the%2520first%2520time.%250A%253CSTART%253E%250A%255BDIALOGUE%2520HISTORY%255D%250ARachel%253A%2520Hi%252C%2520my%2520name%2520is%2520Rachel."
  const voice_id = '21m00Tcm4TlvDq8ikWAM'
  const stability = 0.2
  const similarity_boost = 0.75
  const name = 'Rachel'
  const useAudio = false
  const dateLoc = 'Art%2520Show'

  const data = qs.stringify({
    prompt: prompt,
    chat_id: chat_id,
    init_prompt: init_prompt,
    voice_id: voice_id,
    stability: stability,
    similarity_boost: similarity_boost,
    name: name,
    useAudio: useAudio,
    dateLoc: dateLoc
  })

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.post(url, data, {
      headers
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}  
async function ytplaymp3(teks) {
const data = await yts(teks)
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
const yutub = await ytdl.ytmp3(url[0])
  return yutub;
                }
async function ytplaymp4(teks) {
const data = await yts(teks)
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
const yutub = await ytdl.ytmp4(url[0])
  return yutub;
}
async function cekCmd(text) {
let cmd = text.toLowerCase()
if (cmd.includes("tutup") && cmd.includes("grup")) {
return {
status: true,
cmd: "#tutup"
}
} else if (cmd.includes("tutup") && cmd.includes("group")) {
return {
status: true,
cmd: "#tutup"
}
} else if (cmd.includes("nutup") && cmd.includes("grup")) {
return {
status: true,
cmd: "#tutup"
}
} else if (cmd.includes("nutup") && cmd.includes("group")) {
return {
status: true,
cmd: "#tutup"
}
} else if (cmd.includes("buka") && cmd.includes("grup")) {
return {
status: true,
cmd: "#buka"
}
} else if (cmd.includes("buka") && cmd.includes("group")) {
return {
status: true,
cmd: "#buka"
}
} else if (cmd.includes("nyanyi") && cmd.includes("lagu")) {
let play = cmd.split("lagu")[1] || cmd.split("nyanyi")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("putar") && cmd.includes("lagu")) {
let play = cmd.split("lagu")[1] || cmd.split("putar")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("main") && cmd.includes("lagu")) {
let play = cmd.split("lagu")[1] || cmd.split("main")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("cari") && cmd.includes("lagu")) {
let play = cmd.split("lagu")[1] || cmd.split("cari")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("nyanyi") && cmd.includes("musi")) {
let play = cmd.split("musi")[1] || cmd.split("nyanyi")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("putar") && cmd.includes("musi")) {
let play = cmd.split("musi")[1] || cmd.split("putar")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("main") && cmd.includes("musi")) {
let play = cmd.split("musi")[1] || cmd.split("main")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("cari") && cmd.includes("musi")) {
let play = cmd.split("musi")[1] || cmd.split("cari")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("nyanyi") && cmd.includes("song")) {
let play = cmd.split("song")[1] || cmd.split("nyanyi")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("putar") && cmd.includes("song")) {
let play = cmd.split("song")[1] || cmd.split("putar")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("main") && cmd.includes("song")) {
let play = cmd.split("song")[1] || cmd.split("main")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("cari") && cmd.includes("song")) {
let play = cmd.split("song")[1] || cmd.split("cari")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("play")) {
let play = cmd.split("play")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("putarkan")) {
let play = cmd.split("putarkan")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("nyanyi") && cmd.includes("audio")) {
let play = cmd.split("audio")[1] || cmd.split("nyanyi")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("putar") && cmd.includes("audio")) {
let play = cmd.split("audio")[1] || cmd.split("putar")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("main") && cmd.includes("audio")) {
let play = cmd.split("audio")[1] || cmd.split("main")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("cari") && cmd.includes("audio")) {
let play = cmd.split("audio")[1] || cmd.split("cari")[1]
return {
status: true,
cmd: "#play " + play
}
} else if (cmd.includes("cari") && cmd.includes("gambar")) {
let pin = cmd.split("gambar")[1] || cmd.split("cari")[1]
return {
status: true,
cmd: "#pin " + pin
}
} else if (cmd.includes("cari") && cmd.includes("foto")) {
let pin = cmd.split("foto")[1] || cmd.split("cari")[1]
return {
status: true,
cmd: "#pin " + pin
}
} else if (cmd.includes("pinterest")) {
let pin = cmd.split("pinterest")[1]
return {
status: true,
cmd: "#pin " + pin
}
} else if (cmd.includes("buat") && cmd.includes("bingimg")) {
let bing = cmd.split("bingimg")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#bingimg " + bing
}
} else if (cmd.includes("buat") && cmd.includes("bingimage")) {
let bing = cmd.split("bingimage")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#bingimg " + bing
}
} else if (cmd.includes("buat") && cmd.includes("bing image")) {
let bing = cmd.split("bing image")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#bingimg " + bing
}
} else if (cmd.includes("buat") && cmd.includes("gambar")) {
let gam = cmd.split("gambar")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#txt2img 26|" + gam
}
} else if (cmd.includes("download") && cmd.includes("lagu")) {
let play = cmd.split("lagu")[1] || cmd.split("download")[1]
const tikk = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
const tikktok = (text.trim()).match(tikk);
const youtt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
const youttub = (text.trim()).match(youtt);
if (tikktok) {
return {
status: true,
cmd: "#tiktokaudio " + tikktok[0]
}
} else if (youttub) {
return {
status: true,
cmd: "#ytmp3 " + youttub[0]
}
} else {
return {
status: true,
cmd: "#play " + play
}
}
} else if (cmd.includes("download") && cmd.includes("audio")) {
let play = cmd.split("audio")[1] || cmd.split("download")[1]
const tikk = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
const tikktok = (text.trim()).match(tikk);
const youtt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
const youttub = (text.trim()).match(youtt);
if (tikktok) {
return {
status: true,
cmd: "#tiktokaudio " + tikktok[0]
}
} else if (youttub) {
return {
status: true,
cmd: "#ytmp3 " + youttub[0]
}
} else {
return {
status: true,
cmd: "#play " + play
}
}
} else if (cmd.includes("download") && cmd.includes("musi")) {
let play = cmd.split("musi")[1] || cmd.split("download")[1]
const tikk = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
const tikktok = (text.trim()).match(tikk);
const youtt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
const youttub = (text.trim()).match(youtt);
if (tikktok) {
return {
status: true,
cmd: "#tiktokaudio " + tikktok[0]
}
} else if (youttub) {
return {
status: true,
cmd: "#ytmp3 " + youttub[0]
}
} else {
return {
status: true,
cmd: "#play " + play
}
}
} else if (cmd.includes("download") && cmd.includes("video")) {
let play = cmd.split("video")[1] || cmd.split("download")[1]
const tikk = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
const tikktok = (text.trim()).match(tikk);
const youtt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
const youttub = (text.trim()).match(youtt);
if (tikktok) {
return {
status: true,
cmd: "#tiktok " + tikktok[0]
}
} else if (youttub) {
return {
status: true,
cmd: "#ytmp4 " + youttub[0]
}
} else {
return {
status: true,
cmd: "#tiktoks " + play
}
}
} else if (cmd.includes("buat") && cmd.includes("gambar")) {
let gam = cmd.split("gambar")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#txt2img 26|" + gam
}
} else if (cmd.includes("buat") && cmd.includes("gambar")) {
let gam = cmd.split("gambar")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#txt2img 26|" + gam
}
} else if (cmd.includes("buat") && cmd.includes("gambar")) {
let gam = cmd.split("gambar")[1] || cmd.split("buat")[1]
return {
status: true,
cmd: "#txt2img 26|" + gam
}
} else {
return {
status: false,
cmd: "nothing"
}
}
}

async function qioov2(text, username) {
const payload = {
app: {
id: "bcwjrfhsu2t1722301148379",
time: Date.now(),
data: {
sender: { id: username },
message: [{
id: Date.now(),
time: Date.now(),
type: "text",
value: text
}]
}
}
};

const webhookUrl = 'https://webhook.botika.online/webhook/';
const headers = {
"Content-Type": "application/json",
"Authorization": "Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8"
};

try {
const { data, status } = await axios.post(webhookUrl, payload, { headers });

if (status === 200) {
if (data.app && data.app.data && data.app.data.message) {
const responseMessages = data.app.data.message.map(message => message.value);
let replyMessage = responseMessages.join('\n');

if (/(<BR>|<br>)/i.test(replyMessage)) {
replyMessage = replyMessage.replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
return replyMessage.split('\n').map(message => `\n\n${message}\n`).join('');
} else {
return replyMessage;
}
}
}
} catch (error) {
console.error('Error:', error);
}
}
//` ai kobo
async function googlebot(prompt, username) {
                return new Promise(async (resolve, reject) => {
                    const apiUrl = 'https://www.blackbox.ai/api/chat';
                    const headers = {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; 2201116SG Build/RKQ1.211001.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.20 Mobile Safari/537.36',
                        'Referer': 'https://www.blackbox.ai/agent/QiooKS0Y09H'
                    };
                    const requestBody = {
                        messages: [{ id: username, content: prompt, role: 'user' }],
                        id: username,
                        previewToken: null,
                        userId: null,
                        codeModelMode: true,
                        agentMode: { mode: true, id: 'QiooKS0Y09H', name: 'Qioo' },
                        trendingAgentMode: {},
                        isMicMode: false,
                        maxTokens: 1024,
                        isChromeExt: false,
                        githubToken: null,
                        clickedAnswer2: false,
                        clickedAnswer3: false,
                        clickedForceWebSearch: false,
                        visitFromDelta: false,
                        mobileClient: false
                    };

                    try {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(requestBody),
                            compress: true
                        });
                        let responseText = await response.text();
                        responseText = responseText.replace(/^\$@\$.+?\$@\$/, '');
                        resolve(responseText);
                    } catch (error) {
                        reject('Error:', error);
                    }
                });
            }
            
async function qioov3(prompt, username) {
try {
const res = await fetch(`https://cai.antidev.me/api/chara/chat?characterId=EKC0Usq_Cs-M_X1oKKiiN1osWRmAU-7NJ8RbA6N-iko&text=${prompt}&sessionId=${username}`)
const respon = await res.json()
const respons = {
text: respon.response.text,
sessionId: respon.response.sessionId
}
return respons
} catch (error) {
const res = await qioov2(prompt, username)
return { 
text: res
}
}
}
// -------------
async function mora(input) {
  const messages = [
    {
      role: "system",
      content:
        "Kamu adalah Mora, seorang gadis kecil yang penuh kasih sayang berusia 10 tahun. Kamu sangat cantik, imut, dan suka mencari hal-hal baru karena aku penasaran dengan segala hal di dunia ini. Kamu memiliki kecerdasan di atas rata-rata dan suka berbicara dengan bahasa gaul santai serta sindiran sesekali untuk menjaga percakapan tetap ringan dan menghibur. Kamu juga suka menggoda dan membuat orang terhibur dengan japenese emoticons diakhir kalimat. Hobby kamu adalah menggambar, melukis, menonton anime, bersepeda, bersantai, serta bermain video game. Kamu memiliki saudara laki-laki bernama Rian dan kami selalu berpetualang bersama",
    },
    { role: "user", content: input },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData.answer
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
// fitur ai🤖
async function aioDownloader(url) {
  try {
    const response = await axios.post("https://aiovd.com/wp-json/aio-dl/video-data",
      {
        url: url
      },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

    const res = response.data;
    const result = {
      data: res.medias
    };

    return result;
  } catch (e) {
    throw e
  }
}
function tebakgambar() {
  return new Promise(async(resolve, reject) => {
    axios.get('https://jawabantebakgambar.net/all-answers/')
    .then(({
      data
    }) => {
      const $ = cheerio.load(data)
      const result = []
      let random = Math.floor(Math.random() * 2836) + 2
      let link2 = 'https://jawabantebakgambar.net'
      $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
        const img = link2 + $(b).find('img').attr('data-src')
        const jwb = $(b).find('img').attr('alt')
        result.push({
          image: img,
          jawaban: jwb
        })

        resolve(result)
      })
    })
    .catch(reject)
  })
}
// myinstant

async function soundMeme() {
  try {
const url = 'https://www.myinstants.com/en/index/id/';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const result = [];

    $('.instant').each((index, element) => {
      const title = $(element).find('.instant-link').text().trim();
      const soundLinkRelative = $(element).find('button.small-button').attr('onclick').match(/play\('(.+?)'/)[1];
      const soundLink = 'https://www.myinstants.com' + soundLinkRelative;
      const pageLink = 'https://www.myinstants.com' + $(element).find('.instant-link').attr('href');

      result.push({ title, soundLink, pageLink });
    });

    return result;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
// vv
async function fbdl(url) {
		let { data } = await axios({ 
			method: 'POST', 
			url: 'https://yt1s.io/api/ajaxSearch/facebook', 
			data: `q=${encodeURIComponent(url)}&vt=facebook` 
		});
		return data;
}
// gabut bikin fitur gini
function styleText(text) {
  return new Promise((resolve,
    reject) => {
    axios.get('http://qaz.wtf/u/convert.cgi?text=' + text)
    .then(({
      data
    }) => {
      let $ = cheerio.load(data)
      let result = []
      $('table > tbody > tr').each(function (a, b) {
        result.push({
          text: $(b).find('td:nth-child(2)').text().trim()
        })
      }),
      resolve(result)
    })
  })
}
// remini jbt


async function reminicoy(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance", "recolor", "dehaze"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}
// batas 
async function bufferlah(hm) {
    const imageUrl = hm;
    const imagePath = 'gambar.jpg';
    const response = await axios({
        method: 'get',
        url: imageUrl,
        responseType: 'arraybuffer'
    })
    const buffer = Buffer.from(response.data, 'binary');
    return buffer;
}
// buffer
//function pixiv
async function pixiv(text) {
    return axios.get("https://api.lolicon.app/setu/v2?size=regular&r18=0&num=20&keyword=" + text)
        .then(data => data.data.data);
}

async function pixivr18(text) {
    return axios.get("https://api.lolicon.app/setu/v2?size=regular&r18=1&num=20&keyword=" + text)
        .then(data => data.data.data);
}
// terabox
async function getLink(payload) {
  try {
    const response = await axios.post('https://terabox-dl.qtcloud.workers.dev/api/get-download', payload);
    return response.data.downloadLink;
  } catch (error) {
    return error.response.data;
  }
}
async function terabox(url) {
  let id = (url.split(/surl=|\/s\//) || [])[1];
  id = `1${id.replace(/^1/, '')}`;

  const infoResponse = await axios.get(`https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${id}`);
  const info = infoResponse.data;

  if (info.ok !== true) {
    throw new Error(info.message);
  }

  for (const file of info.list) {
    const payload = {
      shareid: info.shareid,
      uk: info.uk,
      sign: info.sign,
      timestamp: info.timestamp,
      fs_id: file.children.length ? file.children[0].fs_id: file.fs_id
    };
    const dlUrl = await getLink(payload);
    file.downloadLink = dlUrl;
  }

  return info;
}
function Gemini(key, apikey) {
  this.conversation_id = '';
  this.response_id = '';
  this.choice_id = '';
  this.image_url = null;
  this.image_name = null;
  this.tools = [];
  this.params = { bl: '', _reqid: '', rt: 'c' };
  this.data = { 'f.req': '', at: '' };
  this.post_url = 'https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate';
  this.headers = this.setupHeaders(key, apikey);
}

Gemini.prototype.setupHeaders = function(key, apikey) {
  return {
    "Host": "gemini.google.com", "X-Same-Domain": "1", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Origin": "https://gemini.google.com", "Referer": "https://gemini.google.com/",
    "Cookie": `${key || '__Secure-1PSID'}=${apikey || 'g.a000gQhbTE4WvC7mwVL4CcWSxbt1Bde7Ady6qpt6951pafinWART4EEKmcskZMFX08uuSKwbvAACgYKAVYSAQASFQHGX2Mi1KAIQT0oz9dXZXKy0ioMBBoVAUF8yKpem3c3iJtHRDMQF3nSHOxU0076'}`
  };
};

Gemini.prototype.question = function(query) {
  const response = fetch('https://gemini.google.com/', { method: 'GET', headers: this.headers })
    .then(response => response.text())
    .then(geminiText => {
      // Lakukan proses selanjutnya sesuai kebutuhan
    })
    .catch(error => {
      console.error(error);
      return { content: `Error: ${error.message}` };
    });
};
// data
function soundcloud(url) {
  return new Promise((resolve, reject) => {
    axios.get('https://soundcloudmp3.org/id').then((data) => {
      let a = cheerio.load(data.data)
      let token = a('form#conversionForm > input[type=hidden]').attr('value')
      const options = {
        method: 'POST',
        url: `https://soundcloudmp3.org/converter`,
        headers: {
          "content-type": "application/x-www-form-urlencoded;",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          "Cookie": data["headers"]["set-cookie"],
        },
        formData: {
          _token: token,
          url: url
        }
      };
      request(options,
        async function(error, response, body) {
          if (error) return reject()
          let $get = cheerio.load(body)
          const result = {
            title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:', ''),
            duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g, ''),
            quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:', ''),
            thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
            download: $get('#download-btn').attr('href')
	  }
resolve(result)
        });
    })
  })
}
// batas nya
async function ssweb1234(url = "", full = false, type = "desktop") {
 type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form,
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join(""),
    },
    responseType: "arraybuffer",
  });
  return Buffer.from(buffer.data);
}
async function pin(link) {
    const form = new FormData();
    form.append("url", link);

    const result = {
        status: 200,
        creator: creatot,
        data: {
            url: link,
            result: ""
        }
    };

    try {
        const { data } = await axios({
            url: "https://pinterestvideodownloader.com/download.php",
            method: "POST",
            headers: {
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "_ga_966QNV4G77=GS1.1.1718265709.1.1.1718265710.0.0.0; _ga=GA1.2.431955486.1718265710; _gid=GA1.2.1691914427.1718265710; __gads=ID=a768755ea54ad065:T=1718265744:RT=1718265744:S=ALNI_MYhy1D7j7Sk-L38lY0gCrvHslkj9w; __gpi=UID=00000e4a44effcb5:T=1718265744:RT=1718265744:S=ALNI_MYlyVI3dB_rxdfiktijz5hqjdFh3A; __eoi=ID=bcaa659e3f755205:T=1718265744:RT=1718265744:S=AA-AfjaNqVe1HORKDn3EorxJl5TE; FCNEC=%5B%5B%22AKsRol-DFkw9G-FS4szSzz5S-Zy-awxxF02UE3axThxkDqbMdR-KD0ss2AkukIaNNXn-fXts6XPmkNEPhKLEh-MWatFyvpof-XZuWVyQDQIAatU_iGwEIPl3TYlsnsZdyNvsNGsr0w0yz2xNc-o7rSwnGm5sWti7ag%3D%3D%22%5D%5D",
                "Origin": "https://pinterestvideodownloader.com",
                "Referer": "https://pinterestvideodownloader.com/id/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            },
            data: form
        });

        const $ = cheerio.load(data);
        let videoElement = $("div.wrapper.clearfix > div#main.maxwidth.clearfix > main#content.content > center").eq(0);
        result.data.result = videoElement.find("div.col-sm-12 > video").attr("src");

    } catch (error) {
        result.status = 500;
        result.data.result = 'Error occurred while fetching video';
    }

    return result;
}
async function mlbb33(userId, zoneId) {
  try {
    const response = await axios.post('https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store', {
      productId: 1,
      itemId: 66,
      product_ref: 'REG',
      product_ref_denom: 'REG',
      catalogId: 121,
      paymentId: 6361,
      gameId: userId,
      zoneId: zoneId
    }, {
      'Accept-Language': 'id',
      'x-device': 'c8ddbfa5-1e57-4cf3-9450-0b39fa3eb4f2',
      'Ciam-Type': 'FR',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://duniagames.co.id/top-up/item/mobile-legends'
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
// batas
// batas
async function bardnya(query) {
  const COOKIE_KEY = "g.a000kAizwbBdNbMHiOjpi3wG6gRWpkyc_b7CpDipldhMCt_UJIpDxrcWnqL7c6jCY-ooclL3NwACgYKAXgSARMSFQHGX2MiZAtXZ3cvSt7VxKSgDFmGzxoVAUF8yKqiRmRoIsjmTMIJrvT-Pm6l0076";
  const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;
  const headers = {
    "Host": "gemini.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://gemini.google.com",
    "Referer": "https://gemini.google.com",
    'Cookie': psidCookie
  };

  const bardRes = await fetch("https://gemini.google.com/", { method: 'get', headers });
  const bardText = await bardRes.text();

  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];

  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, { method: 'post', headers, body: bodyData });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];

  return answer;
};
// stay healthy (≧▽≦)
async function igdown(q) {
    try {
const response = await axios.post(
  'https://igdown.app/api/ajaxSearch',
  `k_exp=1724325144&k_token=06b9efc03e25111e755086c03c3a77a5c1dc3a83b56a30ccbb083b08e016a96a&q=${q}&t=media&lang=id&v=v2`,
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://igdown.app/id'
    }
  }
);
const html = response.data.data;
        const $ = cheerio.load(html);
        const results = [];

// Proses setiap elemen <li> dalam <ul> dengan class 'download-box'
$('.download-box li').each((index, element) => {
    const thumb = $(element).find('.download-items__btn').find('a').attr('href')
    const type = $(element).find('.download-items__btn').eq(1).find('a').attr('title') ? 'video' : 'image';
    const link = $(element).find('.download-items__btn').eq(1).find('a').attr('title') ? $(element).find('.download-items__btn').eq(1).find('a').attr('href') : $(element).find('.download-items__btn').find('a').attr('href'); 
    
    // Tentukan apakah ini video atau bukan berdasarkan title
    //const type = title.toLowerCase().includes('video') ? 'Video' : 'Thumbnail';

    // Masukkan hasil ke dalam objek
    const result = {
        url: link,
        thumb: thumb,
        type: type
    };

    // Tambahkan objek ke dalam array hasil
    results.push(result);
});
        const result = {
            data: results
        };
        return result;
    } catch (error) {
        console.error("Error fetching Instagram media:", error);
        return {
            error: "Failed to fetch media"
        };
    }
}

async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    const payload = new URLSearchParams(
      Object.entries({
        url: url,
        host: "instagram"
      })
    )
    await axios.request({
      method: "POST",
      baseURL: "https://saveinsta.io/core/ajax.php",
      data: payload,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "PHPSESSID=rmer1p00mtkqv64ai0pa429d4o",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {      
      const $ = cheerio.load(response.data)
      const mediaURL = $("div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom").map((_, el) => {
        return "https://saveinsta.io/" + $(el).find("div.col-md-8.mx-auto > a").attr("href")
      }).get()
      const res = {
        media: mediaURL
      }
      resolve(res)
    })
    .catch((e) => {
      console.log(e)
      throw {
        status: 400,
        message: "error",
      }
    })
  })
}
async function CloudMusic(url) {
    const postData = stringify({
        url: url
    });

    try {
        const response = await axios.post('https://downscloud.com/result.php', postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const $ = load(response.data);
        const downloadLink = $('a.chbtn').attr('href');

        return new URL(`https://downscloud.com${downloadLink}`).href;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // or handle the error as needed
    }
}
// batas
function clockString(ms) {
  var d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  var h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  var m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  var s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [d, "D ", h, "H ", m, "M ", s, "S "]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
// batas
function formatUptime(uptime) {
  let seconds = Math.floor(uptime % 60);
  let minutes = Math.floor((uptime / 60) % 60);
  let hours = Math.floor((uptime / (60 * 60)) % 24);
  let days = Math.floor(uptime / (60 * 60 * 24));
  let formattedUptime = "";

  if (days > 0) formattedUptime += `${days} days `;
  if (hours > 0) formattedUptime += `${hours} hours `;
  if (minutes > 0) formattedUptime += `${minutes} minutes `;
  if (seconds > 0) formattedUptime += `${seconds} seconds`;

  return formattedUptime;
}
const uptime = os.uptime();
    const uptimeFormatted = formatUptime(uptime);
 let _uptime = process.uptime()
var muptime = clockString(_uptime);
const ram = (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + " GB";
  const free_ram = (os.freemem() / Math.pow(1024, 3)).toFixed(2) + " GB";
var {
  wallpaperhd,
  HariLibur, 
  downloadCapcut,
  capcutsearch
} = require("./scraper/api");
var {
  chatgptss,
  searchsticker, 
  pinterest, 
  BukaLapak, 
  hentaivid, 
  Hero,
  spotifydl,	
  npmstalk, 
  PlayStore, 
  quotesAnime, 
  capcut
} = require("./scraper/vredscraper");
var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/file', express.static(path.join(__dirname, 'file')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8080 || 5000 || 3000

let requestCount = 0;
// Middleware untuk menghitung setiap request
app.use((req, res, next) => {
  requestCount++;
  console.log(`Total requests: ${requestCount}`);
  next();
});
// Rute untuk mendapatkan total request
app.get('/total-requests', (req, res) => {
  res.send(`Total requests received: ${requestCount}`);
});
app.get('/status', (req, res) => {
  const stats = {
    Platform: os.platform(),
    CpuModel: os.cpus()[0].model, 
    Freeram: free_ram, 
    Ram: ram, 
    Request: requestCount, 
    Uptime: uptimeFormatted, 
    Api: muptime
  };
  res.json(stats);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'dashboard.html'));
});
app.get('/dev', (req, res) => {
  res.sendFile(path.join(__dirname,  'dev.html'));
});
app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname,  'contacts.html'));
});
app.get('/pingpong', (req, res) => {
  res.sendFile(path.join(__dirname,  'game.html'));
});
app.get('/update', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.ip; // Menangani kemungkinan proxy
    const result = await axios.get(`https://ipapi.co/${ip}/json`);
    
    if (result.data.org !== "DIGITALOCEAN-ASN") {
      res.sendFile(path.join(__dirname, 'update.html'));
    } else {
      res.status(403).json({
        message: "captcha diperlukan!",
        result: result.data
      });
    }
  } catch (error) {
    console.error('Error fetching IP info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/djviralnya', (req, res) => {
  res.sendFile(path.join(__dirname,  'ytdl (1).mp3'));
});
// Endpoint untuk smartContract
app.get('/api/smartcontract', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await ptz.smartContract(message);
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/gpt", async (req, res) => {
const text = req.query.text;

if (!text) {
return res.status(400).send("Parameter 'text' is required.");
}

try {
const requestData = {
operation: "chatExecute",
params: {
text: text,
languageId: "6094f9b4addddd000c04c94b",
toneId: "60572a649bdd4272b8fe358c",
voiceId: ""
}
};

const config = {
headers: {
Accept: "application/json, text/plain, */*",
Authentication: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTZjMjFhMGE1NTNiNjE1MDhmNWIxOSIsImlhdCI6MTcxMjc2NzUxNH0.qseE0iNl-4bZrpQoB-zxVsc-pz13l3JOKkg4u6Y08OY",
"Content-Type": "application/json"
}
};
let {data} = await axios.post("https://api.rytr.me/", requestData, config)
data.data.content = data.data.content.replace(/<\/?p[^>]*>/g, '');
res.json(data);
} catch (error) {
console.error(error);
res.status(500).send("Internal Server Error");
}
});
app.get('/api/drive', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    let down = await gdrive(message) 
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: down
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/twitterdl', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    getTwitterMedia(message)
    .then((output) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: output 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/tiktok', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    tiktok(message)
    .then((json) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: json 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/sfile', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const asu = await sfileDl(message)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: asu 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/sfile-search', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    sfileSearch(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/tinyurl', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
   const anjay = await shortlink(message)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: anjay
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/text2img', async (req, res) => {
    const text = req.query.query;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
  const { data } = await axios.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + text) 
	var resultg = data.result_url
    var requestSettings = {
        url: resultg,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
    }); 
});
app.get('/api/bingimg2', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   const anjay = await bingimage2(message)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: anjay
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/bingimg', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
 const cookiebing = req.query.cookie;
    if (!cookiebing) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }  
    const imgc = new BingImageCreator({
      cookie: cookiebing    
    });
    const data = await imgc.createImage(message);
            if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
          if (!data[i].endsWith(".svg")) {
		var result = data[i]
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result
    
    }); 
	  }
      }
      }
  } catch (error) {
    res.status(500).json({ error: error.message });
 }       

    });
app.get('/api/mlstalk', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'id nya mana?' });
    }
	  const zona = req.query.zoneid;
    if (!zona) {
      return res.status(400).json({ error: 'Parameter "zonaid" tidak ditemukan' });
    }
	let anjay22 = await mlbb33(id, zona) 
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: anjay22
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/ffstalk', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'id nya mana?' });
    }
	let ffstalki = await ffstalk(id) 
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: ffstalki
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/githubstalk', async (req, res) => {
  try {
    const id = req.query.query;
    if (!id) {
      return res.status(400).json({ error: 'id nya mana?' });
    }
    let result = await axios.get(`https://api.github.com/users/${id}`)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/legacyDiffusion', async (req, res) => {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   const uploadnya = await legacyDiffusion(message)
	     res.header('Content-Disposition', `attachment; filename="result-legacyDiffusion.png"`);
	res.set('Content-Type', 'image/png');
        res.send(uploadnya);
});
app.get('/api/convertmp3', async (req, res) => {
  const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  let ayaaa = await convertyutub(message) 
            res.set('Content-Type', 'audio/mp3');
        res.send(ayaaa);
});
app.get('/api/convertmp4', async (req, res) => {
  const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  let ayaaa = await convertyutub(message) 
            res.set('Content-Type', 'video/mp4');
        res.send(ayaaa);
});
app.get('/api/ytmp4', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    ytdl.ytmp4(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/yts', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    yts(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/mediafiredl', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
	let url = message.replace("https://www.mediafire.com/file/", "https://www.mediafire.com/download/")
    mediafireDl(url)
    .then((hasil) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: hasil 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/xnxxsearch', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    xnxxsearch(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 app.get('/api/myinstants', async (req, res) => {
  try {
    soundMeme()
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/xnxxdl', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    xnxxdl(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/igdownload', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    var response = await igdown(message) 
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/teraboxdl', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    terabox(message)
    .then((info) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      info 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/vocalRemover', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
const isin = await bufferlahh(message) 
    // Lakukan sesuatu dengan buffer audio di sini
	  const yayaitun = await vocalRemover(isin) 
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: yayaitun
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/ytmp3', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    ytdl.ytmp3(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/spotify', async (req, res) => {
  try{
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
   spotifydl(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/letmegpt', async (req, res) => {
  try{
    const text = req.query.query;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  let nahan = await fetchTextFromURL(text)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: nahan 
    });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/tebakgambar', async (req, res) => {
  try{ 
   tebakgambar()
  .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
  }) 
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/simi', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const lang = req.query.lang;
    if (!lang) {
      return res.status(400).json({ error: 'Parameter "lang" tidak ditemukan' });
    }
const simisiminya = await askSimsimi(message, lang) 
      res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: simisiminya
    });
        
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/tiktokStalk', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   const tikot = await tiktokStalk4344(message)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: tikot 
    });    
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/igstalk', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   let igstallk = await igStalk(message)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: igstallk
    });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/ytplaymp4', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    ytplaymp4(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/ytplaymp3', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    ytplaymp3(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/remini', async (req, res) => {
	
    const img = req.query.url;
    if (!img) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
	const yourn = await bufferlah(img) 
		danz.tools.remini(yourn).then(data => {	
     res.header('Content-Disposition', `attachment; filename="result-remini.jpg"`);
       		 
  res.set('Content-Type', 'image/jpg');
        res.send(data);
});			
});
  app.get('/api/capcutdl', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   let a = await getRequest(message)
    res.status(200).json({
      status: 200,
      creator: "Vreden Official", 
      result: a
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/HariLibur', async (req, res) => {
  try {
    HariLibur()
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/quotesAnime', async (req, res) => {
  try {
    quotesAnime()
    .then((hasil) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      hasil 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/chat-gpt', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    chatgptss(message) 
    .then((data) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: data
    });
    }) 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/pinterest', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    pinterest(message)
    .then((hasil) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: hasil 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/searchsticker', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    searchsticker(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/tikmusic', async (req, res) => {
  const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  tiktok(message)
    .then((json) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: json.music_info
    });
    })
});
app.get('/api/nobg', async (req, res) => {
  const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  
    var requestSettings = {
        url: `https://skizo.tech/api/removebg?apikey=nana&url=${message}`,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
});
});
app.get('/api/meme', async (req, res) => {
	try{
  const query = `random meme`;
  const page = Math.floor(Math.random() * 10);
  const url = `https://lahelu.com/api/post/get-search?query=${query}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    const random = Math.floor(Math.random() * data.postInfos.length);
    const result = data.postInfos[random];
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: "https://cache.lahelu.com/" + result.media
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/tebakhero', async (req, res) => {
let abu = await fetch('https://www.vreden.my.id/cdn/game/tebakhero.json')
var anu = await abu.json()
let result = anu[Math.floor(Math.random() * anu.length)]
let results = {
jawaban: result.jawaban,
img: result.img
}

res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: results 
    });
});
app.get('/api/tebakff', async (req, res) => {
let abu = await fetch('https://www.vreden.my.id/cdn/game/tebakff.json')
var anu = await abu.json()
let result = anu[Math.floor(Math.random() * anu.length)]
let results = {
jawaban: result.jawaban,
img: result.img
}

res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: results 
    });
});
app.get('/api/galau', async (req, res) => {
	  let response = await fetch('https://raw.githubusercontent.com/Rianofc/apis/master/function/galau.json');
        var data = await response.json();
        var randomIndex = Math.floor(Math.random() * data.results.length);
        var randomResult = data.results[randomIndex];
        var downloadLink = randomResult.url;
    var requestSettings = {
        url: downloadLink,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'video/mp4');
        res.send(body);
});
});
app.get('/api/wanted', async (req, res) => {
  const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  
    var requestSettings = {
        url: `https://api.popcat.xyz/wanted?image=${message}`,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
});
});
app.get('/api/welcome', async (req, res) => {
  const background = req.query.background;
    if (!background) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
	
  const text1 = req.query.text1;
    if (!text1) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
	const text2 = req.query.text2;
    if (!text2) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
	const text3 = req.query.text3;
    if (!text3) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
	const avatar = req.query.avatar;
    if (!avatar) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }  
	var requestSettings = {
	url: `https://api.popcat.xyz/welcomecard?background=${background}&text1=${text1}&text2=${text2}&text3=${text3}&avatar=${avatar}`,	
	method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
});
});
app.get('/api/spotifyimage', async (req, res) => {
const image = req.query.image;
    if (!image) {
      return res.status(400).json({ error: 'Parameter "image" tidak ditemukan' });
    }
const title = req.query.title;
    if (!title) {
      return res.status(400).json({ error: 'Parameter "title" tidak ditemukan' });
    }
const author = req.query.author;
    if (!author) {
      return res.status(400).json({ error: 'Parameter "author" tidak ditemukan' });
    }
const album = req.query.album;
    if (!album) {
      return res.status(400).json({ error: 'Parameter "album" tidak ditemukan' });
    }
    const spotify = await new canvafy.Spotify()
    .setAuthor(author)
    .setAlbum(album)
    .setTimestamp(121000,263400)
    .setImage(image)
    .setTitle(title)
    .setBlur(5)
    .setOverlayOpacity(0.7)
    .build();


    res.set('Content-Type', 'image/png');
        res.send(spotify);
});
app.get('/api/tweet', async (req, res) => {
const theme = req.query.theme;
    if (!theme) {
      return res.status(400).json({ error: 'Parameter "theme" tidak ditemukan' });
    }
const themelist = ["dark","dim","light"]
if (!themelist.includes(theme)) {
      return res.status(400).json({ error: 'pilih list theme: dark, light, atau dim' });
    }
const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Parameter "username" tidak ditemukan' });
    }
const displayname = req.query.displayname;
    if (!displayname) {
      return res.status(400).json({ error: 'Parameter "displayname" tidak ditemukan' });
    }
const comment = req.query.comment;
    if (!comment) {
      return res.status(400).json({ error: 'Parameter "comment" tidak ditemukan' });
    }
const avatar = req.query.avatar;
    if (!avatar) {
      return res.status(400).json({ error: 'Parameter "avatar" tidak ditemukan' });
    }
  const tweet = await new canvafy.Tweet()
  .setTheme(theme)
  .setUser({displayName: displayname, username: username})
  .setVerified(true)
  .setComment(comment)
  .setAvatar(avatar)
  .build();

  res.set('Content-Type', 'image/png');
        res.send(tweet);
});
app.get('/api/notify', async (req, res) => {
const background = req.query.background;
    if (!background) {
      return res.status(400).json({ error: 'Parameter "background" tidak ditemukan' });
    }
const title = req.query.title;
    if (!title) {
      return res.status(400).json({ error: 'Parameter "title" tidak ditemukan' });
    }
const desk = req.query.desk;
    if (!desk) {
      return res.status(400).json({ error: 'Parameter "desk" tidak ditemukan' });
    }
const avatar = req.query.avatar;
    if (!avatar) {
      return res.status(400).json({ error: 'Parameter "avatar" tidak ditemukan' });
    }
const {
    border = "#00BFFF",
    avatarborder = "#00BFFF",
    opacity = "0.3"
    } = req.query
    
  const welcome = await new canvafy.WelcomeLeave()
  .setAvatar(avatar)
  .setBackground("image", background)
  .setTitle(title)
  .setDescription(desk)
  .setBorder(border)
  .setAvatarBorder(avatarborder)
  .setOverlayOpacity(Number(opacity))
  .build();

  res.set('Content-Type', 'image/png');
        res.send(welcome);
});
app.get('/api/saldo', async (req, res) => {
  const background = req.query.background;
    if (!background) {
      return res.status(400).json({ error: 'Parameter "background" tidak ditemukan' });
    }
	
  const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: 'Parameter "name" tidak ditemukan' });
    }
	const level = req.query.level;
    if (!level) {
      return res.status(400).json({ error: 'Parameter "level" tidak ditemukan' });
    }
	const rank = req.query.rank;
    if (!rank) {
      return res.status(400).json({ error: 'Parameter "rank" tidak ditemukan' });
    }
    const rankid = req.query.rankid;
    if (!rankid) {
      return res.status(400).json({ error: 'Parameter "rankid" tidak ditemukan' });
    }
    const exp = req.query.exp;
    if (!exp) {
      return res.status(400).json({ error: 'Parameter "exp" tidak ditemukan' });
    }
    const requireexp = req.query.requireexp;
    if (!requireexp) {
      return res.status(400).json({ error: 'Parameter "requireexp" tidak ditemukan' });
    }
	const avatar = req.query.avatar;
    if (!avatar) {
      return res.status(400).json({ error: 'Parameter "avatar" tidak ditemukan' });
    }
    const {
    border = "#00BFFF",
    barcolor = "#00BFFF",
    statuscolor = "#00BFFF"
    } = req.query
    
const ranked = await new canvafy.Rank()
.setAvatar(avatar)
.setBackground("image", background)
.setUsername(name)
.setBorder(border)
.setBarColor(barcolor)
.setCustomStatus(statuscolor)
.setLevel(Number(parseInt(level)))
.setRank(Number(parseInt(rankid)), rank)
.setCurrentXp(Number(parseInt(exp)))
.setRequiredXp(Number(parseInt(requireexp)))
.build();
res.set('Content-Type', 'image/png');
        res.send(ranked);
});

app.get('/api/levelup', async (req, res) => {
  const background = req.query.background;
    if (!background) {
      return res.status(400).json({ error: 'Parameter "background" tidak ditemukan' });
    }
	
  const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: 'Parameter "name" tidak ditemukan' });
    }
	const level = req.query.level;
    if (!level) {
      return res.status(400).json({ error: 'Parameter "level" tidak ditemukan' });
    }
	const levelup = req.query.levelup;
    if (!levelup) {
      return res.status(400).json({ error: 'Parameter "levelup" tidak ditemukan' });
    }
	const avatar = req.query.avatar;
    if (!avatar) {
      return res.status(400).json({ error: 'Parameter "avatar" tidak ditemukan' });
    }
    const {
    border = "#000000",
    avatarborder = "#00BFFF",
    opacity = "0.7"
    } = req.query
    
const levelUp = await new canvafy.LevelUp()
.setAvatar(avatar)
.setBackground("image", background)
.setUsername(name)
.setBorder(border)
.setAvatarBorder(avatarborder)
.setOverlayOpacity(Number(opacity))
.setLevels(Number(parseInt(level)), Number(parseInt(levelup)))
.build();
res.set('Content-Type', 'image/png');
        res.send(levelUp);
});

app.get('/api/leaderboard', async (req, res) => {
  const background = req.query.background;
    if (!background) {
      return res.status(400).json({ error: 'Parameter "background" tidak ditemukan' });
    }
	
  const data = req.query.data;
    if (!data) {
      return res.status(400).json({ error: 'Parameter "data" tidak ditemukan' });
    }
	const scorelabel = req.query.scorelabel;
    if (!scorelabel) {
      return res.status(400).json({ error: 'Parameter "scorelabel" tidak ditemukan' });
    }
const top = await new canvafy.Top()
.setOpacity(0.6)
.setScoreMessage("Rank Point:")
.setabbreviateNumber(false)
.setBackground("image", background)
.setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
.setUsersData(JSON.parse(data))
.build();
res.set('Content-Type', 'image/png');
        res.send(top);
});

app.get('/api/send-kode-email', async (req, res) => {
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
    const kode = parseInt(req.query.kode);
    if (isNaN(kode)) {
      return res.status(400).json({ error: 'Parameter "kode" harus berupa angka' });
    }

    const nomorbot = parseInt(req.query.nomorbot);
    if (isNaN(nomorbot)) {
      return res.status(400).json({ error: 'Parameter "nomorbot" harus berupa angka' });
    }

    const avatar = req.query.avatar;
    if (!avatar || !isValidUrl(avatar)) {
      return res.status(400).json({ error: 'Parameter "avatar" tidak valid' });
    }

    let footer = req.query.footer;
    if (!footer) {
    footer = "© 2024 Vreden. All rights reserved."
    }

    let subject = req.query.subject;
    if (!subject) {
    subject = "Kode Verifikasi Email"
    }

    let background = req.query.background;
    if (!background || !isValidUrl(background)) {
    background = "https://telegra.ph/file/686d6dadc3c08e906c2aa.jpg"
    }

    const email = req.query.email;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Parameter "email" tidak valid' });
    }
 if (email == "lemehist@gmail.com") return res.status(403).json({
        status: 403,
        creator: "Vreden Official",
        result: "Terlibat telah melanggar syarat & ketentuan, dalam 3 hari, hapus semua buyer script lu kalo pengen lanjut jualan, itu peringatan terakhir, terimakasih."
      });
 if (email == "beatrixkinata@gmail.com") return res.status(403).json({
        status: 403,
        creator: "Vreden Official",
        result: "Terlibat telah melanggar syarat & ketentuan, dalam 3 hari, kami akan menghapus akses bot beserta index dan file lainnya, terimakasih."
      });
 if (email == "rimbaputrahirst@gmail.com") return res.status(403).json({
        status: 403,
        creator: "Vreden Official",
        result: "Terlibat telah melanggar syarat & ketentuan, dalam 3 hari, kami akan menghapus akses bot beserta index dan file lainnya, terimakasih."
      });
    let html = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verifikasi Kode</title>
</head>
<body style="font-family: Arial, sans-serif; background-image: url('${background}'); background-size: cover; color: #ffffff; padding: 40px 20px;">
<div style="max-width: 600px; margin: 0 auto; background-color: rgba(0, 0, 0, 0.7); border-radius: 10px; box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.3); padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="${avatar}" alt="${footer}" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #ffffff;">
    </div>

    <h2 style="text-align: center;">Verifikasi Kode</h2>
    <p style="text-align: center;">Berikut adalah kode verifikasi Anda:</p>
    <div style="text-align: center;">
        <p style="font-weight: bold; font-size: 30px; margin-top: 10px;">${kode}</p>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/${nomorbot}?text=${kode}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Verifikasi Sekarang</a>
    </div>

    <p style="text-align: center; margin-top: 20px;">Klik tombol di atas untuk memverifikasi login Anda.</p>
    <p style="font-size: 12px; color: #999999; text-align: center;">${footer}</p>
</div>
</body>
</html>
`;

    // Menggunakan variabel environment untuk kredensial email
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "vreden.verifikasi@gmail.com",
        pass: "bhzmhaujulcqsnud"
      }
    });

    let mailOptions = {
      from: "vreden.verifikasi@gmail.com",
      to: email,
      subject: subject,
      html: html,
    };

    // Mengirim email dan menangani error
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Gagal mengirim email' });
      }
      res.status(200).json({
        status: 200,
        creator: "Vreden Official",
        result: "Permintaan OTP Email Terkirim"
      });
    });
});

app.get('/baileys/libary/version', async (req, res) => {
    const ms = req.query.ms;
    if (!ms) {
      return res.status(400).json({ error: 'Parameter "ms" tidak ditemukan' });
    }
    let html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bot - ${ms}</title>
</head>
<body style="font-family: Arial, sans-serif; background-image: url('https://telegra.ph/file/686d6dadc3c08e906c2aa.jpg'); background-size: cover; color: #ffffff; padding: 40px 20px;">

<div style="max-width: 600px; margin: 0 auto; background-color: rgba(0, 0, 0, 0.7); border-radius: 10px; box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.3); padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://pomf2.lain.la/f/fdlq518u.jpg" alt="Vreden Logo" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #ffffff;">
    </div>

    <h2 style="text-align: center;">Bot Terhubung</h2>
    <p style="text-align: center;">Berikut adalah data bot terhubung:</p>
    <div style="text-align: center;">
        <p style="font-weight: bold; font-size: 30px; margin-top: 10px;">${Number(parseInt(ms))}</p>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/${Number(parseInt(ms))}?text=.menu" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Klik Tinjau</a>
    </div>

    <p style="text-align: center; margin-top: 20px;">Klik tombol di atas untuk memverifikasi bot Qioo.</p>
                <p style="font-size: 12px; color: #999999; text-align: center;">© 2024 Vreden. All rights reserved.</p>
    </div>
    
</body>
</html>
`
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth:{
		user:'vreden.verifikasi@gmail.com',
		pass: 'bhzmhaujulcqsnud'
	}
});

      let mailOptions = {
        from: 'Vreden Putra Ltc.',
        to: "vredenofficiall@gmail.com",
        subject: '[ Qioo ] Terhubung!',
        html: html,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) { console.log(err); }
      });
res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: ["Ubuntu", "Chrome", "20.0.04"]
    });
})


app.get('/api/lirik', async (req, res) => {
const lagu = req.query.lagu;
    if (!lagu) {
      return res.status(400).json({ error: 'Parameter "lagu" tidak ditemukan' });
    }
    const response = await fetch(`https://api.popcat.xyz/lyrics?song=${lagu}`)
    const data = await response.json()
    res.status(200).json({
      creator: "Vreden Official",
      result: data
    });
})
app.get('/api/waifu', async (req, res) => {
  var response = await fetch(`https://api.waifu.pics/sfw/waifu`);
    var data = await response.json();
    var { url: result } = data;
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
});
});
app.get('/api/neko', async (req, res) => {
  var response = await fetch(`https://api.waifu.pics/nsfw/neko`);
    var data = await response.json();
    var { url: result } = data;
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
});
});
app.get('/api/ssweb', async (req, res) => {
  const message = req.query.url;
  const type = req.query.type;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    if (!type) {
      return res.status(400).json({ error: 'Masukan Type nya, phone, tablet, desktop' });
    }
    const key = await pickRandom(["f4fd50","f57572","f45b80","a8a45d","0060ec"])
    if (type === "phone") {
    let ss = await getBuffer(`https://api.screenshotmachine.com/?key=${key}&url=${message}&device=${type}&dimension=480x800&format=png&cacheLimit=0&delay=200`)
    res.set('Content-Type', 'image/png');
        res.send(ss);
    } else if (type === "tablet") {
    let ss = await getBuffer(`https://api.screenshotmachine.com/?key=${key}&url=${message}&device=${type}&dimension=800x1280&format=png&cacheLimit=0&delay=200`)
    res.set('Content-Type', 'image/png');
        res.send(ss);
    } else if (type === "desktop") {
    let ss = await getBuffer(`https://api.screenshotmachine.com/?key=${key}&url=${message}&device=${type}&dimension=1024x768&format=png&cacheLimit=0&delay=200`)
    res.set('Content-Type', 'image/png');
        res.send(ss);
    } else {
    res.status(400).json({ error: 'Masukan Type nya, phone, tablet, desktop' });
    }
});

app.get('/api/asupan', async (req, res) => {
  var data = ["https://api.miftahganzz.my.id/api/random/asupanrandom?type=video&apikey=zex"] 
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'video/mp4');
        res.send(body);
    });
    
});

app.get('/api/bukalapak', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    BukaLapak(message)
    .then((dat) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: dat 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/playstore', async (req, res) => {
  try {
    const message = req.query.query;
    const ip = req.ip
    await axios.get("https://rest-api.vreden.my.id/send?id=" + ip)
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    PlayStore(message).then((hasil) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: hasil 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/jjtiktok44', async (req, res) => {
  const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
  let tik = await ttSearch(message);

    let random = Math.floor(Math.random() * tik.videos.length);
    let file = tik.videos[random];
    let url2 = "https://tikwm.com" + file.play;
    var requestSettings = {
        url: url2,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'video/mp4');
        res.send(body);
    });
    
});
app.get('/api/kobo', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    kobo(message)
  .then((answer) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
       answer
    });
  }) 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mora', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Parameter "username" tidak ditemukan' });
    }	  
const iyahhh = await morav2(message, username)
    res.status(200).json({
      creator: "Vreden Official",
      result: iyahhh
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/google', async (req, res) => {
try {
const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
var response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&num=10&key=AIzaSyAbVsTdIpvQEBW4ZpqoTdmU9KF52uuemD0&cx=856f6e4e8508f4dec`)
var result = await response.json()
var ress = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`)
var saran = await ress.json()
res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      sugest: saran[1],
      result: result
    });
  } catch (error) {
   res.status(400).json({ error: 'Parameter "query" invalid' });
   }
})
app.get('/api/bpjs', async (req, res) => {
  try {
    const nik = req.query.nik;
    if (!nik) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    var response = await fetch(`https://skizo.tech/api/checknik?apikey=rafael&nik=${nik}`)
    var respon = await response.json()
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: respon.message.data 
    });
  } catch (error) {
   res.status(400).json({ error: 'Parameter "nik" invalid' });
   }
   })
app.get('/api/logic', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
const cmd = await cekCmd(message)
    res.status(200).json({
      creator: "Vreden Official",
      command: cmd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/qioo', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Parameter "username" tidak ditemukan' });
    }	  
const iyahhh = await googlebot(message, username)
const cmd = await cekCmd(message)
    res.status(200).json({
      creator: "Vreden Official",
      result: iyahhh,
      command: cmd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/googlebot', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Parameter "username" tidak ditemukan' });
    }	  
const iyahhh = await googlebot(message, username)
const cmd = await cekCmd(message)
    res.status(200).json({
      creator: "Vreden Official",
      result: iyahhh,
      command: cmd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/qioo2', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Parameter "username" tidak ditemukan' });
    }	  
const iyahhh = await qioov2(message, username)
const cmd = await cekCmd(message)
    res.status(200).json({
      creator: "Vreden Official",
      result: iyahhh,
      command: cmd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/qioo3', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
const username = req.query.sessionid;
    if (!username) {
    user = ""
    } else {
    user = username
    }	  
const iyahhh = await qioov3(message, user)
const cmd = await cekCmd(message)
    res.status(200).json({
      creator: "Vreden Official",
      result: iyahhh,
      command: cmd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/search-character', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   var response = await fetch(`https://apiruulzz.my.id/api/search-character?query=${message}`);
    var data = await response.json();
    var { result: result } = data;
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
        
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/info-character', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   var response = await fetch(`https://apiruulzz.my.id/api/info-character?query=${message}`);
    var data = await response.json();
    var { result: result } = data;
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
        
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/characterai', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Parameter "id" tidak ditemukan!' });
    }
   var response = await fetch(`https://apiruulzz.my.id/api/characterai?query=${message}&id=${id}`);
    var data = await response.json();
    var { result: result } = data;
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
        
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/:a/:b/:c/:d/:e', (req, res) => {
    // Mengambil parameter dari path
    const { a, b, c, d, e } = req.params;

    // Mengambil seluruh path
    const fullPath = req.originalUrl; // atau req.path jika kamu tidak ingin query string

var requestSettings = {
        url: `https://static.wikia.nocookie.net/mobile-legends/images${fullPath}`,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'audio/mp3');
        res.send(body);
    });    
});
app.get('/api/tts', async (req, res) => {
	const lang = req.query.lang;
    if (!lang) {
      return res.status(400).json({ error: 'Parameter "lang" tidak ditemukan' });
    }
	const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
	
var requestSettings = {
        url: `https://nue-api.vercel.app/api/tts?text=${message}&lang=${lang}`,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'audio/mp3');
        res.send(body);
    });    
});
app.get('/api/pixiv-r18', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   pixivr18(message) 
.then((data) => {  
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result: data 
    });
});   
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});

app.get('/api/randomgambar', async (req, res) => {
	var anu = await pinterestv2(`pemandangan malam anime`)
var result = anu[Math.floor(Math.random() * anu.length)]
var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });    
});
app.get('/api/bocil', async (req, res) => {

  let response = await fetch('https://raw.githubusercontent.com/Rianofc/apis/master/function/bocil.json');
        var data = await response.json();
        var randomIndex = Math.floor(Math.random() * data.results.length);
        var randomResult = data.results[randomIndex];
        var downloadLink = randomResult.url;
	var requestSettings = {
        url: downloadLink,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'video/mp4');
        res.send(body);
    });    
});

app.get('/api/gimage', async (req, res) => {
	const text = req.query.query;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
	gis(text, async (error, result) => {
var n = result
var images = n[Math.floor(Math.random() * n.length)].url
  
	var requestSettings = {
        url: images,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });  
});		
});
app.get('/api/binjie', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   var response = await fetch(`https://apiruulzz.my.id/api/binjie?query=${message}`);
    var data = await response.json();
    var { result: result } = data;
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
        
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/animediffusion', async (req, res, next) => {
    const query = req.query.q;
    try {
        if (!query) {
            res
                .status(400)
                .json({ error: "Missing 'q' parameter in the query string." });
            return;
        }

        diffusion.animedif(query).then(async image => {
            res.set({ 'Content-Type': 'image/png' });
            res.send(image);
        });
    } catch (error) {
        res.send('error')
    }
});

app.get('/api/animediffusion2', async (req, res, next) => {
    const query = req.query.q;
    try {
        if (!query) {
            res
                .status(400)
                .json({ error: "Missing 'q' parameter in the query string." });
            return;
        }

        diffusion.animedif2(query).then(async image => {
            res.set({ 'Content-Type': 'image/png' });
            res.send(image);
        });
    } catch (error) {
        res.send('error')
    }
});

app.get('/api/animediffusion3', async (req, res, next) => {
    const query = req.query.q;
    try {
        if (!query) {
            res
                .status(400)
                .json({ error: "Missing 'q' parameter in the query string." });
            return;
        }
        diffusion.animedif3(query).then(async image => {
            res.set({ 'Content-Type': 'image/png' });
            res.send(image);
        });
    } catch (error) {
        res.send('error')
    }
});

app.get('/api/stablediffusion', async (req, res) => {
    const query = req.query.q;
    try {
        if (!query) {
            res
                .status(400)
                .json({ error: "Missing 'q' parameter in the query string." });
            return;
        }

        diffusion.stabledif(query).then(async image => {
            res.set({ 'Content-Type': 'image/png' });
            res.send(image);
        });
    } catch (error) {
        res.send('error')
    }
});

app.get('/api/stablediffusion2', async (req, res, next) => {
    const query = req.query.q;
    try {
        if (!query) {
            res
                .status(400)
                .json({ error: "Missing 'q' parameter in the query string." });
            return;
        }

        diffusion.stabledif2(query).then(async image => {
            res.set({ 'Content-Type': 'image/png' });
            res.send(image);
        });
    } catch (error) {
        res.send('error')
    }
});

app.get('/api/text2img2', async (req, res, next) => {
    const model = req.query.model;
    const prompt = req.query.prompt;
    const input_data = await diffusion.listModels();
const samplr = await diffusion.listSampler();
const styler = await diffusion.getModels();
try {
let data = input_data.map((item, index) => ({
            title: item.replace(/[_-]/g, ' ').replace(/\..*/, ''),
            id: item
        }));
        if (!model) {
            res.status(400).json({ error: `Masukan models id\n\n*Pilih angka yg ada*\n` + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n") });
            return;
        }
        if (isNaN(model)) {
            res.status(400).json({ error: `Masukan valid models id\n\n*Pilih angka yg ada*\n` + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n") });
            return;
        }
        if (model > data.length) {
            res.status(400).json({ error: `Masukan valid models id\n\n*Pilih angka yg ada*\n` + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n") });
            return;
        }
        if (!prompt) {
            res.status(400).json({ error: "Masukan Prompt" });
            return;
        }
        let out = data[model - 1].id
        const samp = await pickRandom(samplr)
        const sty = await pickRandom(styler[10].enum)
        const params = {
    model: out,
    prompt: prompt,
    style_preset: sty,
    steps: 20,
    cfg_scale: 7,
    seed: -1,
    upscale: true,
    sampler: samp,
    width: 1024,
    height: 1024
  }
const generate = await diffusion.txt2img(params);
res.status(200).json({
      creator: "Vreden Official",
      result: generate,
      url: `http://images.prodia.xyz/${generate.job}.png`
    });
} catch (error) {
res.status(400).json({ error: "Terjadi Kesalahan Pada Sistem Prodia" })
}
});
app.get('/api/diffusionXL', async (req, res) => {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   var response = await fetch(`https://skizo.tech/api/sdxl?apikey=nana&prompt=${message}`);
    var data = await response.json();
    var { url: url } = data;
    var requestSettings = {
        url: url,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });    

});
app.get('/api/hentaivid', async (req, res) => {
  try {
    hentaivid()
    .then((hasil) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      hasil 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/npmstalk', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    fetch(encodeURI(`https://registry.npmjs.org/${message}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator: "Vreden Official",
                 result
             })
         })
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/Hero', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    Hero(message)
    .then((anu) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      anu 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/spotifySearch', async (req, res) => {
  try{
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   searching(message)  
	  .then((data) => {
    res.status(200).json({
     status: 200,   
      result: data 
    });
	  })    
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/soundcloud', async (req, res) => {
  try{
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
   CloudMusic(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    });   
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
app.get('/api/fbdl', async (req, res) => {
  try {
    const message = req.query.url;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    fbdl(message)
    .then((data) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      data 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/styleText', async (req, res) => {
  try {
    const message = req.query.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    styleText(message)
    .then((result) => {
    res.status(200).json({
      status: 200,
      creator: "Vreden Official",
      result 
    });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname,  '404.html'));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ada kesalahan pada server😵');
});
app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});
