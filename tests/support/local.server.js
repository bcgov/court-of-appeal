let http = require('http');

let LocalServer = function(handler) {
    this.handler = handler;
};
LocalServer.prototype.start = function(done) {
    let self = this;
    self.port = 5001;
    let tryAgain = true;
    self.server = http.createServer(self.handler);
    self.server.on('error', (e)=>{
        self.port++;
        self.server.listen(self.port);
    });
    self.server.on('listening', ()=>{
        done();
    });
    self.server.listen(self.port);   
};
LocalServer.prototype.stop = function(done) {
    if (this.server.listening) { this.server.close(done); }
    else { done(); }
};

module.exports = LocalServer;