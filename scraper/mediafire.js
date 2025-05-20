
const axios = require('axios')
const cheerio = require('cheerio')

const mediafireDl = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace(/Download|\(|\)|\n|\s+/g, '').trim()
const sizeB = parseFloat(size) * (/MB$/.test(size) ? 1000 : 1)
const seplit = link.split('/')
const nama = seplit[5]
mime = nama.split('.')
mime = mime[1]
hasil.push({ nama, mime, size, sizeB, link })
return hasil
}


module.exports = { mediafireDl }