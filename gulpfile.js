/**
 * Created by lollipop on 2018/8/31
 */
const fs = require('fs'),
    join = require('path').join,
    gulp = require('gulp'),
    ejs = require('ejs'),
    $ = require('gulp-load-plugins')(),
    srcDir = join(__dirname, 'src'),
    ejsDir = join(srcDir, 'ejs'),
    sassDir = join(srcDir, 'sass'),
    scriptDir = join(srcDir, 'script'),
    distDir = join(__dirname, 'dist'),
    mainDir = join(distDir, 'mainDir'),
    _ = require('lodash');

const mainPages = ['index', 'corp_welfare', 'hr_service', 'fubao_mall', 'about_us'];
const welfarePages = ['flex_benifit', 'staff_ME', 'insurance', 'festival_prc', 'staff_incent', 'exhibition'];
const hrServicePages = ['recruit_ad', 'yun_recruit', 'AI', 'advice'];

//compile ejs to html
gulp.task('maintpl', () => {
    mainPages.forEach((item)=>{
    //需要制定编码方式，否则返回原生buffer
        let templateStr = fs.readFileSync(join(ejsDir, `${item}/${item}.ejs`), 'utf8');
        let htmlTemplate = ejs.render(templateStr, {
            filename: join(ejsDir, `${item}/${item}.ejs`),
            dataJson: _.extend({}, require(join(srcDir, `data/dataJson.js`)), {filename: item})
        });
        if(!fs.existsSync(mainDir)){
            fs.mkdirSync(mainDir)
        }else{
            fs.writeFile(join(mainDir, `${item}.html`),
                htmlTemplate, err=>{
                    if(err) throw new Error(err);
                    console.log(`${item} is saved !`);
                }
            )
        }

    })
});

//compile watch
gulp.task('maintpl:watch', () => {
    gulp.watch(join(ejsDir, `**/*.ejs`), ['maintpl']);
});

//compile sass to css
gulp.task('scss', () => {
    return gulp.src(join(sassDir, '*.scss'))
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(join(distDir, 'css/')))
});
//sass watch
gulp.task('scss:watch', () => {
    gulp.watch(join(sassDir, '*.scss'), ['scss']);
});


/**
 * 图片base64
 */
gulp.task('base64', () => {
    return gulp.src(join(distDir, 'css', '*.css'))
        .pipe($.base64({
            extensions: ['svg', 'png', '\.jpg#datauri$/i'],
            maxImageSize: 15*1024,
            deleteAfterEncoding: false,
            debug: true
        }))
        .pipe(gulp.dest(join(distDir, 'css/')));
});

//compile base64 watch
gulp.task('base64:watch', () => {
    gulp.watch(join(distDir, 'css', '*.css'), ['base64'])
});

//js
gulp.task('js', () => {
    return gulp.src(join(scriptDir, '*.js'))
        .pipe($.babel())
        .pipe(gulp.dest(join(distDir, 'js/')))
    console.log(`js is saved`);
});
//js watch
gulp.task('js:watch', () => {
    gulp.watch(join(scriptDir, '*.js'), ['js']);
});

gulp.task('mainws', ['maintpl:watch', 'scss:watch', 'js:watch', 'base64:watch'], () => {});
