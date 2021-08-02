const Utils = require('../utils');

module.exports = function (folder, path) {
  let validateObj = Utils.getUntil(folder, 0, path[0].split('/'));
  if (!validateObj) {
    // throw new Error(`Cannot delete ${path}, it  does not exist `);
    console.log(`Cannot delete ${path}, it  does not exist `);
    return false;
  }
  let keys = path[0].split('/');
  let deleted = 'delete folder';
  for (let prop of keys) {
    deleted += `['${prop}']`;
  }
  eval(deleted);

  return true;
};
