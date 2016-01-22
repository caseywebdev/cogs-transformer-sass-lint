var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/clean.scss': {
      path: 'test/clean.scss',
      buffer: helper.getFileBuffer('test/clean.scss'),
      hash: helper.getFileHash('test/clean.scss'),
      requires: [{
        path: 'test/clean.scss',
        hash: helper.getFileHash('test/clean.scss')
      }],
      links: [],
      globs: []
    },
    'test/warn.sass': {
      path: 'test/warn.sass',
      buffer: helper.getFileBuffer('test/warn.sass'),
      hash: helper.getFileHash('test/warn.sass'),
      requires: [{
        path: 'test/warn.sass',
        hash: helper.getFileHash('test/warn.sass')
      }],
      links: [],
      globs: []
    },
    'test/error.scss': Error,
    'test/error2.scss': Error
  }
});
