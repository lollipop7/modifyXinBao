/**
 * Created by lollipop on 2018/8/31
 */
const join = require('path').join,
    express = require('express'),
    app = express()
    ,proxy = require('http-proxy-middleware');
let apiProxy = proxy('/vita', {target: 'http://www.51jrq.com'});
app.use(apiProxy);
app.use(express.static(join(__dirname, 'dist')));
app.listen(8088, ()=>{
    console.log('app listen on 8088! ')
});