var spawn = require('child_process').spawn;

var DEFAULT = {
  bin: 'scss-lint',
  args: []
};

module.exports = function (file, options, cb) {
  var scssLint = spawn(
    options.bin || DEFAULT.bin,
    (options.args || DEFAULT.args).concat(['--format=JSON', file.path])
  );
  var stdout = '';
  var stderr = '';
  scssLint.stdout.on('data', function (data) { stdout += data; });
  scssLint.stderr.on('data', function (data) { stderr += data; });
  scssLint.on('error', cb);
  scssLint.on('close', function (code) {

    // No error or just warnings are okay to pass through.
    // https://github.com/brigade/scss-lint#exit-status-codes
    if (code < 2) return cb(null, {});

    // If there is stderr output, something is broken so just report it.
    if (stderr) return cb(new Error(stderr));

    // Try to parse the JSON output and report the first lint with error
    // severity. If this fails, just error with the raw stdout.
    try {
      var ers = JSON.parse(stdout)[file.path];
      for (var i = 0, l = ers.length; i < l; ++i) {
        var er = ers[i];
        if (er.severity !== 'error') continue;
        return cb(new Error(
          file.path + ': line ' + er.line + ', column ' + er.column + ', ' +
          er.reason + (er.linter ? ' (' + er.linter + ')' : '')
        ));
      }
    } catch (er) {
      // Either JSON parsing failed or the parsed object wasn't the shape that
      // was expected.
    }

    cb(new Error(stdout));
  });
};
