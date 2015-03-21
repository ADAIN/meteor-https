Package.describe({
  name: 'adain:meteor-https',
  version: '1.0.0',
  summary: 'Simple https proxy server package for meteor using npm http-proxy',
  git: 'https://github.com/ADAIN/meteor-https.git',
  documentation: 'README.md'
});

Npm.depends({'http-proxy' : '1.9.0'});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('https.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('adain:meteor-https');
  api.addFiles('https-tests.js');
});
