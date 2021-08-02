const Utils = require('../utils');

module.exports = function (folder, path) {
  let del     = path[0];
  let to      = path[1].split('/').pop();
  let props   = del.split('/');
  let deleted = 'delete folder';
  let until   = Utils.getUntil(folder, 0, path[0].split('/'));
  let move    = `folder['${to}']['${props[props.length - 1]}'] = ${JSON.stringify(until)}`;
  for (let prop of props) {
    deleted += `['${prop}']`;
  }
  eval(move);
  eval(deleted);
};
