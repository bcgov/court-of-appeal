var http = require('http');
var request = require('request');

var server = http.createServer((req, resp)=>{
    if (req.url.indexOf('/court-of-appeal') == 0) {
        let target = 'http://localhost:8081' + req.url.replace('/court-of-appeal', '');
        console.log(req.url + ' -> ' + target);

        var forward = request(target);
        req.headers['SMGOV_USERGUID'] = 'BA589724D21347DE81BAAEE02FA5D495';
        req.headers['SMGOV_USERDISPLAYNAME'] = 'Minnie Mouse';
        req.pipe(forward);
        forward.pipe(resp);
    }
    else {
        console.log('404 ' + req.url);
        resp.statusCode = 404;
        resp.end();
    }
});
server.listen(3333, ()=>{
    console.log('listening port 3333/court-of-appeal');
});