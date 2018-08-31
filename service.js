/**
 * Created by lollipop on 2018/8/31
 */
const join = require('path').join,
    express = require('express'),
    app = express();
app.use(express.static(join(__dirname, 'dist')));
app.listen(8088, ()=>{
    console.log('app listen on 8088! ')
});