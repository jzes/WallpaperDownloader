const reqPromise = require('request-promise-native')
const request = require('request')
const fs = require('fs')

const domain = 'https://www.reddit.com'
const mainURL = domain + '/r/wallpaper/'
const extensions = ['.jpg', '.png']
const location = './images/'


async function fetchHtmlMainPage() {
    let html = await reqPromise(mainURL)
    return html
}

async function fetchHtmlPosts(postsURLs) {
    let htmlsPosts = []
    let html = ''
    for (let i = 0; i < postsURLs.length; i++) {
        html = await reqPromise(domain + postsURLs[i])
        htmlsPosts.push(html)
    }
    return htmlsPosts
}

async function getImages(imagesURLs) {
    images = []
    let image = ''
    for (let i = 0; i < imagesURLs.length; i++) {
        let url = imagesURLs[i]
        let name = ''
        url.split('/').forEach(urlSlice=>{
            extensions.forEach(ext=>{
                if (urlSlice.includes(ext)){
                    name = urlSlice.split(ext)[0]+ext
                }
            })
        })
        await download(url, location+name)
    }
    return images
}

async function download(uri, absolutePath) {
    return new Promise(resolve=>{
        request.head(uri, function () {
            request(uri).pipe(fs.createWriteStream(absolutePath)).on('close', ()=>{
                resolve(absolutePath+'....saved')
            });
        });
    })
};

module.exports = { fetchHtmlMainPage: fetchHtmlMainPage, fetchHtmlPosts: fetchHtmlPosts, getImages: getImages } 