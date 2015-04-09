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
    'test/warn.scss': {
      path: 'test/warn.scss',
      buffer: helper.getFileBuffer('test/warn.scss'),
      hash: helper.getFileHash('test/warn.scss'),
      requires: [{
        path: 'test/warn.scss',
        hash: helper.getFileHash('test/warn.scss')
      }],
      links: [],
      globs: []
    },
    'test/error.scss': Error,
    'test/error2.scss': Error
  },
  'test/bad-config.json': {
    'test/clean.scss': Error
  }
});
