const cheer = require('cheerio')

async function getPostsURLs(html) {

    let postsURL = []
    let $ = cheer.load(html)
    let images = $("[alt='Post image']").toArray()
    images.forEach(im => {
        postsURL.push(im.parentNode.parentNode.parentNode.attribs.href)
    })
    return (postsURL)
}

function getImageURLs(postsHTMLs) {
    return postsHTMLs.map(html => {
        let $ = cheer.load(html)
        let image = $("[alt='Post image']").toArray()
        return image[0].parentNode.attribs.href;
    })
}


module.exports = { getPostsURLs: getPostsURLs, getImageURLs: getImageURLs }