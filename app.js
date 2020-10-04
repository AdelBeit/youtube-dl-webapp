'use strict';
const fs = require('fs');
const dl = require('ytdl-core');
const koa = require('koa');
const app = new koa();
const logger = require('koa-morgan');
const Router = require('koa-router');
const path = require('path');

let videourl = "http://www.youtube.com/watch?v=A02s8omM_hI";
videourl = "https://www.youtube.com/watch?v=EzKImzjwGyM";

const filepath = path.resolve(__dirname, 'info.json');

dl.getInfo(videourl, (err, info) => {
  if (err) throw err;
  console.log('title:', info.title);
  console.log('rating:', info.avg_rating);
  console.log('uploaded by:', info.author.name);
  const json = JSON.stringify(info, null, 2)
    .replace(/(ip(?:=|%3D|\/))((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|[0-9a-f]{1,4}(?:(?::|%3A)[0-9a-f]{1,4}){7})/ig, '$10.0.0.0');
  fs.writeFile(filepath, json, err => {
    if (err) throw err;
  });
});


dl.getInfo(videourl, {filter: quality => 'highest'}).then(info => {
     
     let wstream = fs.createWriteStream('formats.json');
     let i = info.player_response.streamingData;
     wstream.write(JSON.stringify(i));
     wstream.end();
});

let filename = 'hi.mp4';

dl(videourl, {quality: 'highest'}).pipe(fs.createWriteStream(`./tmp/${filename}`));

const router = new Router();

router.get('/', ctx => {
     ctx.body = 'i am root'
});

router.get('/second_route', ctx => {
     ctx.body = 'i am second route'
});

router.post('/something', ctx => {
     ctx.body = {
          something: 'someting here'
     }
});


app.use(logger('tiny'));

app.use(router.routes());

app.on('error', (err, ctx) => {
     console.log(err);
});

app.listen(3000);


video: 
https://r5---sn-nx5e6nez.googlevideo.com/videoplayback?expire=1582024088&ei=OHFLXqOgJbOGsfIP9emTsAI&ip=73.225.252.218&id=o-AJeQ1DydkYXfhhbW8nnN02XTUgDyloVIVE5PIUlW8fwi&itag=243&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C597%2C598&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-nx5e6nez%2Csn-n4v7sn7s&ms=au%2Conr&mv=m&mvi=4&pl=16&initcwndbps=2242500&vprv=1&mime=video%2Fwebm&gir=yes&clen=6530401&dur=216.799&lmt=1581923024234226&mt=1582002450&fvip=5&keepalive=yes&fexp=23842630&c=WEB&txp=5431432&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRAIgIA831M9sccyIweTv5Cg5BG9fEwcTkGDm-U2h17dgSIgCIHrDebAUW_Gu0JinhEGFOtIjHQUsSU9opfk2T09dCYmA&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRAIgOQQIAtLsZKfVzPSCyWKKMmief6TTVw0k7JtxizQjKcMCICj1u9KNhP2g8l9vqkVLhoj0rxq_BLq-SJB9Dij2tEUi&alr=yes&cpn=x70dviM3D5CSMfYc&cver=2.20200214.04.00&rn=28&rbuf=0


audio:
https://r5---sn-nx5e6nez.googlevideo.com/videoplayback?expire=1582024088&ei=OHFLXqOgJbOGsfIP9emTsAI&ip=73.225.252.218&id=o-AJeQ1DydkYXfhhbW8nnN02XTUgDyloVIVE5PIUlW8fwi&itag=251&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-nx5e6nez%2Csn-n4v7sn7s&ms=au%2Conr&mv=m&mvi=4&pl=16&initcwndbps=2242500&vprv=1&mime=audio%2Fwebm&gir=yes&clen=3230490&dur=216.821&lmt=1581922708445990&mt=1582002450&fvip=5&keepalive=yes&fexp=23842630&c=WEB&txp=5431432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRgIhAOAGE0lTOr1u14sbZ974uqgyns6JZ8mi2AmqN86OvNLmAiEAtr662GfIuOVD2bb2qAjZO0ACMIwviVpe4KCuug_Iuno%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRAIgOQQIAtLsZKfVzPSCyWKKMmief6TTVw0k7JtxizQjKcMCICj1u9KNhP2g8l9vqkVLhoj0rxq_BLq-SJB9Dij2tEUi&alr=yes&cpn=x70dviM3D5CSMfYc&cver=2.20200214.04.00&rn=26&rbuf=97824