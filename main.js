const robot = require('./robot')
const parser = require('./parser')

async function main(){
    console.log('geting main page..');
    let html = await robot.fetchHtmlMainPage()
    console.log('geting posts..');
    let postsURLs = await parser.getPostsURLs(html)
    let postsHtml = await robot.fetchHtmlPosts(postsURLs)
    console.log('geting images..');
    let imageURLs = await parser.getImageURLs(postsHtml)
    console.log('saving images..');
    await robot.getImages(imageURLs)
    console.log('Finished');
}

main()