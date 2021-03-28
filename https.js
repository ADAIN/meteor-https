/**
 * author : SungYong Jang, jsy@adain.kr
 * Date : 15. 3. 21.
 */

if(process.env.USE_HTTPS !== undefined && process.env.USE_HTTPS === '1')
{
  var PATH_TO_KEY = 'server.key',
    PATH_TO_CERT = 'cert.pem',
    SSL_KEY_PASS = '',
    PATH_TO_CA = '',
    SSL_PORT = 8443,
    TARGET_IP = '127.0.0.1',
    TARGET_PORT = 3000;

  if(process.env.SSL_KEY_PATH !== undefined){
    PATH_TO_KEY = process.env.SSL_KEY_PATH;
  }

  if(process.env.SSL_CERT_PATH !== undefined){
    PATH_TO_CERT = process.env.SSL_CERT_PATH;
  }

  if(process.env.SSL_KEY_PASS !== undefined){
    SSL_KEY_PASS = process.env.SSL_KEY_PASS;
  }

  if(process.env.SSL_CA_PATH !== undefined){
    PATH_TO_CA = process.env.SSL_CA_PATH;
  }

  if(process.env.SSL_PORT !== undefined){
    SSL_PORT = process.env.SSL_PORT;
  }

  if(process.env.SSL_TARGET_IP !== undefined){
    TARGET_IP = process.env.SSL_TARGET_IP;
  }

  if(process.env.SSL_TARGET_PORT !== undefined){
    TARGET_PORT = process.env.SSL_TARGET_PORT;
  }

  if(process.env.NEVER_DIE !== undefined && process.env.NEVER_DIE === '1'){
    process.on('uncaughtException', function (err) {
      console.log((new Date()).toString() + ', Caught exception: ' + err);
    });
  }

  var fs = Npm.require('fs'),
    httpProxy = Npm.require('http-proxy');

  var options = {
    ssl: {
      key: fs.readFileSync(PATH_TO_KEY, 'utf8'),
      cert: fs.readFileSync(PATH_TO_CERT, 'utf8')
    },
    target : "http://" + TARGET_IP + ":" + TARGET_PORT,
    ws: true,
    xfwd: true,
    secure: true
  };

  if(PATH_TO_CA !== '')
  {
    options.ssl.ca = [fs.readFileSync(PATH_TO_CA, 'utf8')];
  }

  if(SSL_KEY_PASS !== '')
  {
    options.ssl.passphrase = SSL_KEY_PASS;
  }

  console.log("=======================================");
  console.log("Start https proxy server.");
  console.log("SSL_KEY_PATH : " + PATH_TO_KEY);
  console.log("SSL_CERT_PATH : " + PATH_TO_CERT);
  console.log("SSL_CA_PATH : " + PATH_TO_CA);
  console.log("SSL_PORT : " + SSL_PORT);
  console.log("SSL_TARGET_IP : " + TARGET_IP);
  console.log("SSL_TARGET_PORT : " + TARGET_PORT);
  console.log("---------------------------------------");

  const proxy = httpProxy.createProxyServer(options).listen(SSL_PORT);
  proxy.on('error', (err, req, res) => {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
  });
}