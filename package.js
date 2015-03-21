Package.describe({
  name: 'adain:meteor-https',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple https proxy server package for meteor using npm http-proxy',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ADAIN/meteor-https.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({'http-proxy' : '1.9.0'});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4.2');
  api.addFiles('https.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('adain:meteor-https');
  api.addFiles('https-tests.js');
});
