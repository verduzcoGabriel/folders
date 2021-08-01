let create     = require('./create');
let deletePath = require('./delete');

module.exports = function (folder, path) {
  let keys = path[0].split('/');
  let childs = keys.reduce((obj, key) => obj[key], folder); // Get the child object to get the path completed
  let getProperties = (folder, stack) => {
    for (var property in folder) {
      if (Object.keys(folder[property]).length > 0) { // if the folder still contains an object, let  call the same function and concat "/"" to get all the name of the path completed
        return getProperties(folder[property], stack + '/' + property);
      } else {
        return stack + '/' + property;
      }
    }
  };
  let subPath = getProperties(childs, ''); // return the subpath (completed) that we need to change
  let deleted = deletePath(folder, path); // delete the older path
  if (deleted === false) { // validate the result of the delete function
    console.log(`Cannot move ${path}, it  does not exist `);
    return false;
  }
  let pathNew = subPath ? [path[1] + '/' + path[0] + subPath] : [path[1] + '/' + path[0]]; // if exists a subpath, we need to  concat the folder that we want to change, if not just concate the foler and the old
  create(folder, pathNew); // create new objet with the new path
};
