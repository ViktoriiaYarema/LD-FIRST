let project_folder= 'dist';
let source_folder='source';

let path={
    build:{
        // pug:project_folder+'/template/',
        html:project_folder+'',
        css:project_folder+'/css/',
        js:project_folder+'/js/',
        img:project_folder+'/images/',
        fonts:project_folder+'/fonts/',
    },
    src:{
        pug:[source_folder+'/template/*.pug', '!'+source_folder+'/template/_*.pug'],
        html:[source_folder+'/**/*.html', '!'+source_folder+'/**/_*.html'],
        css:[source_folder+'/**/*.scss', '!'+source_folder+'/**/_*.scss'],
        js:source_folder+'/js/script.js',
        img:source_folder+'/images/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts:source_folder+'/fonts/**/*',
    },
    watch:{
        pug:source_folder+'/template/',
        html:source_folder+'/**/*.html',
        css:source_folder+'/**/*.scss',
        js:source_folder+'/js/**/*.js',
        img:source_folder+'/images/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean:'./'+project_folder+'/'
}

import gulp from 'gulp';
const { src, dest, watch } = gulp;
// Browsersync
import sync from 'browser-sync';
const browserSync = sync.create();
// File include plugin
import fileinclude from 'gulp-file-include';
const fileInclude =fileinclude;
// Pug
import pug from 'gulp-pug';
const buildHtml = pug;
// Delete buid file
import del from 'del';
const delEte = del;
// Scss
import sass from 'gulp-sass';
const scss= sass;
// Autoprefixer
import autopref from 'gulp-autoprefixer';
const autoPref= autopref;
// Media-queries
import mqrs from 'gulp-group-css-media-queries';
const cmq = mqrs;
// Clean-css
import clean_css from 'gulp-clean-css';
const cl_css = clean_css;
// Rename
import reName from 'gulp-rename';
const rename =reName;
// JS
import ugliFy from 'gulp-uglify-es';
const uglify = ugliFy.default;
// Images
import imageMin from 'gulp-imagemin';
const imagemin = imageMin;
import webP from 'gulp-webp';
const webp = webP;
import webPhtml from 'gulp-webp-html';
const webphtml = webPhtml;
// // Sprite
// import svgSprite from 'gulp-svg-sprite';
// const svgsprite = svgSprite;
import spr from 'gulp.spritesmith';
const spritesmith = spr;
import mrg from 'merge-stream';
const merge= mrg;
import svs from 'svg-sprite';
const svgSprite = svs;
// // Fonts
// import ttf2Woff from 'gulp-ttf2woff';
// const ttf2woff = ttf2Woff;
// import ttf2Woff2 from 'gulp-ttf2woff2';
// const ttf2woff2 = ttf2Woff2;

//Scripts
import cnt from 'gulp-concat';
const concat = cnt;
import scm from 'gulp-sourcemaps';
const sourcemaps = scm;


// Browsersync
 export const  browsersync=()=> {
    browserSync.init({
        server:{
            baseDir: './'+project_folder+'/'
            // baseDir:'dist'
        },
       port:3000,
       notify:false,
       online:true 
    })
}



// HTML
 export const html=()=> {
    return gulp.src(path.src.html)
        .pipe(fileInclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

// Pug
export const buildPug=()=> {
    return gulp.src(path.src.pug)
        .pipe(fileInclude())
        .pipe(pug({
                pretty: true
              }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

// Delete file build

export const clean = ()=>{
    return delEte(path.clean);
}

// Scss
export const css=()=> {
    return gulp.src(path.src.css)
        .pipe(
            scss({
                outputStyle:"expanded"
            }))
            .pipe(
                autoPref({
                    overrideBrowserslist: ['last 5 versions'],
                    cascade:true,
                })
            )
        // .pipe(group-media())
        .pipe(dest(path.build.css))

        .pipe(
            rename({
                extname:'.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}



// JS
export const script=()=> {
    return gulp.src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname:'.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}


// Images
export const images=()=> {
    return gulp.src(path.src.img)
        .pipe(
            webp({
                quality:70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive:true,
                svgoPlugins:[{removeViewBox:false}],
                interlaced:true,
                optimizationLevel:3

            })
        )
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

// Fonts
export const fonts=()=> {
        // src(path.src.fonts)
        // .pipe(ttf2woff())
        // .pipe(dest(path.build.fonts))
        // .pipe(browserSync.stream())
    return gulp.src(path.src.fonts)
        // .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream())
}
// Sprite
export const spriteSMith=(cb)=> {
    // Генерируем спрайт
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../../images/sprite.png',
      cssName: 'sprite.scss',
      padding: 5,
    }));
  
    // Оптимизируем спрайт
    const imgStream = spriteData.img
    //   .pipe(imagemin())
      .pipe(gulp.dest('dist/images/'));
  
    // Собираем SCSS
    const cssStream = spriteData.css
      .pipe(gulp.dest('source/styles/global/'));
  
    return merge(imgStream, cssStream);
    cb()
  };

// export const SvgSptites=()=> {
//     return gulp.src(path.src.img)
//         .pipe(svgSprite({
//             mode:{
//                 stack:{
//                     sprite:'../sprite.svg'
//                 }
//             }
//         }))
//         .pipe(dest(path.build.img))
//         .pipe(browserSync.stream());
// }  
// Copy

// export const copy = () => {
//     return gulp.src([path.src.fonts], {
//             base: 'source'
//         })
//         .pipe(gulp.dest('dist'))
//         .pipe(browserSync.stream({
//             once: true
//         }));
// };
    // export const copy =() => {
    //     return gulp.src(path.src.fonts)
    //       .pipe(dest(path.build.fonts))
    //       .pipe(browserSync.stream())
    //   };



// Paths

export const paths = () => {
    return gulp.src('project_folder/*.html')
        
        .pipe(gulp.dest('project_folder'));
};




// // Watch

export const startwatch = () => {
    gulp.watch([path.watch.html], gulp.series(html, paths));
    gulp.watch([path.watch.pug], gulp.series(buildPug, paths));
    gulp.watch([path.watch.css], gulp.series(css, paths));
    gulp.watch([path.watch.js], gulp.series(script, paths));
    gulp.watch([path.watch.img], gulp.series(images, paths));
    // gulp.watch([path.watch.img], gulp.series(SvgSptites, paths));
    gulp.watch([path.watch.img], gulp.series(spriteSMith, paths));
    // gulp.watch([path.watch.fonts], gulp.series(fonts, paths));
};

//  Default

export default gulp.series(
    clean,fonts,
    gulp.parallel(
        css,
        html,
        buildPug,
        script,
        images,
        spriteSMith,
        // SvgSptites,
        // copy
    ),
    paths,
    gulp.parallel(
        startwatch,
        browsersync,
    ),
);












// Old baby
// let project_folder= 'dist';
// let source_folder='source';

// let path={
//     build:{
//         html:project_folder+'/',
//         css:project_folder+'/css/',
//         js:project_folder+'/js/',
//         img:project_folder+'/images/',
//         fonts:project_folder+'/fonts/',
//     },
//     src:{
//         html:source_folder+'/*.html',
//         css:source_folder+'/styles/style.scss',
//         js:source_folder+'/js/script.js',
//         img:source_folder+'/images/**/*.{jpg,png,svg,gif,ico,webp}',
//         fonts:source_folder+'/fonts/',
//     },
//     watch:{
//         html:source_folder+'/**/*.html',
//         css:source_folder+'/styles/**/*.scss',
//         js:source_folder+'/js/**/*.js',
//         img:source_folder+'/images/**/*.{jpg,png,svg,gif,ico,webp}',
//     },
//     clean:'./'+project_folder+'/'
// }

// import { task, watch, src, dest, parallel, series } from 'gulp';
// const browserSync = require('browser-sync').create();
// import pug from 'gulp-pug';
// import sass, { compiler, logError } from 'gulp-sass';
// import spritesmith from 'gulp.spritesmith';
// import rimraf from 'rimraf';
// import rename from 'gulp-rename';



// export const server = ()=> {
//     browserSync.init({
//         server: {
//             port:3000,
//             baseDir: './'+project_folder+'/'
//         }
//     });

//     watch('dist/**/*').on('change', browserSync.reload);
// });

// export const templates:compile =() =>{
//   return src('sourse/template/index.pug')
//   .pipe(pug({
//     pretty: true
//   }))

//   .pipe(dest('dist'))
// });

// /* ------------ Styles compile ------------- */
// compiler = require('node-sass');
 
// export const styles:compile=()=> {
//   return src('source/styles/main.scss')
//     .pipe(sass({outputStyle: 'compressed'}).on('error', logError))
//     .pipe(rename('main.min.css'))
//     .pipe(sass().on('error', logError))
//     .pipe(dest('.build/css'));
// });
 


// export const sprite =(cb)=> {
//    const spriteData = src('source/images/icons/*.png').pipe(spritesmith({
//       imgName: 'sprite.png',
//       imgPath: '../images/sprite.png',
//       cssName: 'sprite.css'
//     }));
//     spriteData.img.pipe(dest('build/images/'));
//   spriteData.css.pipe(dest('source/styles/global/'));
//   cb();
//   });
//   /* ------------ Delete ------------- */

//   exportn const clean=()=> {
//     return rimraf('build', cb);
//   });
  
//   /* ------------ Copy fonts ------------- */
//   export const copy:fonts=()=> {
//     return src('./source/fonts/**/*.*')
//       .pipe(dest('build/fonts'));
//   });
  
//   /* ------------ Copy images ------------- */
//   export const copy:images=()=>  {
//     return src('./source/images/**/*.*')
//       .pipe(dest('build/images'));
//   });
  
//   /* ------------ Copy ------------- */
//   // task('copy', parallel('copy:fonts', 'copy:images'));
  
//   /* ------------ Watchers ------------- */
//   export const watch =()=> {
//     watch('source/template/**/*.pug', series('templates'));
//     watch('source/styles/**/*.scss', series('styles'));
//   });
  
  
  
//   export default gulp.series(
//     gulp.parallel(
//         html,
//         styles,
//         scripts,
//         copy,
//         sprite,
//     ),
//     paths,
//     gulp.parallel(
//         watch,
//         server,
//     ),
// );
	