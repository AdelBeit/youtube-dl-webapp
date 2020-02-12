'use strict';
const fs = require('fs');
const dl = require('ytdl-core');
const koa = require('koa');
const app = new koa();

let videourl = "http://www.youtube.com/watch?v=A02s8omM_hI";
videourl = "https://www.youtube.com/watch?v=EzKImzjwGyM";



app.use(async (ctx, next) => {
     try{
          await next();
          dl(videourl, {quality: 'highest'}).then(str => {
               str.pipe(fs.createWriteStream('video.mp4')).then(() => {
               ctx.body+= 'finished downloading';
          }).catch((err) => {if(err) throw err});
          ctx.body = 'Hello Wrold'; 
     } catch(err) {
          ctx.status = err.status || 500;
          ctx.body = err.message;
          ctx.app.emit('error', err, ctx);
     }
});

app.on('error', (err, ctx) => {
     console.log(err);
});

app.listen(3000);