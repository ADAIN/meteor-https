var url = Npm.require("url");

// Unfortunately we can't use a connect middleware here since
// sockjs installs itself prior to all existing listeners
// (meaning prior to any connect middlewares) so we need to take
// an approach similar to overshadowListeners in
// https://github.com/sockjs/sockjs-node/blob/cf820c55af6a9953e16558555a31decea554f70e/src/utils.coffee

if(process.env.FORCE_SSL === "1"){
  var httpServer = WebApp.httpServer;
  var oldHttpServerListeners = httpServer.listeners('request').slice(0);
  httpServer.removeAllListeners('request');
  httpServer.addListener('request', function (req, res) {

    // Determine if the connection was over SSL at any point. Either we
    // received it as SSL, or a proxy did and translated it for us.
    var isSsl = req.connection.pair ||
      (req.headers['x-forwarded-proto'] &&
      req.headers['x-forwarded-proto'].indexOf('https') !== -1);
    
    if (!isSsl) {
      // connection is not cool. send a 302 redirect!

      // strip off the port number. If we went to a URL with a custom
      // port, we don't know what the custom SSL port is anyway.
      var urlParts = url.parse(Meteor.absoluteUrl());
      var location;
      if(parseInt(process.env.SSL_PORT, 10) !== 443){
        location = 'https://' + urlParts.hostname + ":" + process.env.SSL_PORT + urlParts.path;
      }else{
        location = 'https://' + urlParts.hostname + urlParts.path;
      }
      res.writeHead(302, {
        'Location': location,
        'Access-Control-Allow-Origin': '*'
      });
      res.end();
      return;
    }

    // connection is OK. Proceed normally.
    var args = arguments;
    _.each(oldHttpServerListeners, function(oldListener) {
      oldListener.apply(httpServer, args);
    });
  });
}

// NOTE: this doesn't handle websockets!
//
// Websockets come in via the 'upgrade' request. We can override this,
// however the problem is we're not sure if the websocket is actually
// encrypted. We don't get x-forwarded-for or x-forwarded-proto on
// websockets. It's possible the 'sec-websocket-origin' header does
// what we want, but that's not clear.
//
// For now, this package allows raw unencrypted DDP connections over
// websockets.
