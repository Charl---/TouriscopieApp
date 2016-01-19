import gulp from 'gulp';
import watch from 'gulp-watch';
import glob from 'glob-promise';
import jsonServer from 'json-server';
import bodyParser from 'body-parser';

let instance;

function initServer() {
  const server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(bodyParser.json());
  return glob('gulp/server/modules/**/index.js')
    .then((modules)=>{
      modules.forEach((module)=>{
        require(`./${module.replace('gulp/', '').replace('/index.js', '')}`).default(server);
      });
      return glob('gulp/server/mock/*.json');
    })
    .then((mocks)=>{
      let db = {};
      mocks.forEach((mock)=>{
        try {
          db[mock.replace('gulp/server/mock/', '').replace('.json', '')] = require(`./${mock.replace('gulp/', '')}`);
        }catch (err) {
          console.error(err);
        }
      });
      var router = jsonServer.router(db);
      server.use(router);
      instance = server.listen(3000, ()=>{
        console.log('server listening');
      });
    })
    .catch(err =>{
      console.error(err);
    });
}

gulp.task('json-server', ()=> {
  initServer();
  watch('gulp/server/mock/*', ()=>{
    instance.close();
    setTimeout(()=>{
      initServer();
    }, 1000);
  });
});
