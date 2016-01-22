const _ = require('underscore');
const path = require('path');
const sassLint = require('sass-lint');

const formatMessage = m =>
  `  Line ${m.line} Column ${m.column} [${m.ruleId}] ${m.message}`;

const formatMessages = messages =>
  'Sass Lint Errors:\n' +
    _.map(_.filter(messages, {severity: 2}), formatMessage).join('\n');

module.exports = (file, options, cb) => {
  try {
    const result = sassLint.lintText({
      text: file.buffer.toString(),
      format: path.extname(file.path).slice(1),
      filename: file.path
    }, options);
    if (!result.errorCount) return cb(null, file);
    cb(new Error(formatMessages(result.messages)));
  } catch (er) { cb(er); }
};
