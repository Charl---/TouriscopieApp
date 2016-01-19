import gulp from 'gulp';
import webpack from 'webpack';
import del from 'del';
import wpConfig from '../webpack.config';

gulp.task('clean', (done)=>{
  del(['www/*']).then(function (paths) {
    console.info('Deleted files/folders:\n', paths.join('\n'));
    done();
  });
});

gulp.task('webpack:watch', ['clean'], (done)=> {
  webpack(Object.assign(wpConfig, {
    watch: true
  }), (err)=> {
    if (err) {
      console.error(err);
      done(err);
    }else {
      done();
    }
  });
});

gulp.task('webpack', ['clean'], (done)=> {
  webpack(wpConfig, (err)=> {
    if (err) {
      console.error(err);
      done(err);
    }else {
      done();
    }
  });
});
