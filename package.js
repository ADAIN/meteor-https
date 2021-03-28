Package.describe({
  name: 'adain:meteor-https',
  version: '1.1.1',
  summary: 'Simple https proxy server package for meteor using npm http-proxy',
  git: 'https://github.com/ADAIN/meteor-https.git',
  documentation: 'README.md'
});

Npm.depends({'http-proxy' : '1.9.0'});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2');

  api.use('webapp', 'server');
  api.use('underscore');
  // make sure we come after livedata, so we load after the sockjs
  // server has been instantiated.
  api.use('ddp', 'server');

  api.addFiles('force_ssl_common.js', ['client', 'server']);
  api.addFiles('force_ssl_server.js', 'server');
  api.addFiles('https.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('adain:meteor-https');
  api.addFiles('https-tests.js');
});
