var spawn = require('child_process').spawn;

module.exports = function (file, options, cb) {
  var scssLint = spawn('scss-lint', [file.path, '--format=JSON']);
  var raw = '';
  scssLint.stdout.on('data', function (data) { raw += data; });
  scssLint.on('error', cb);
  scssLint.on('close', function (code) {
    if (code < 2) return cb(null, {});
    var ers;
    try { ers = JSON.parse(raw)[file.path]; } catch (er) { return cb(raw); }
    for (var i = 0, l = ers.length; i < l; ++i) {
      var er = ers[i];
      if (er.severity !== 'error') continue;
      return cb(new Error(
        file.path + ': line ' + er.line + ', column ' + er.column + ', ' +
        er.reason + (er.linter ? ' (' + er.linter + ')' : '')
      ));
    }
  });
};
