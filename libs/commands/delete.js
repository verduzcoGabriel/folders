module.exports = function (folder, path) {
  let keys = path[0].split('/');
  let prop = keys.pop(); // last prop
  let childs = keys.reduce((obj, key) => obj[key], folder); // Get the child object to delete them
  if (!childs || Object.keys(childs).length === 0) { // if I don't get the path, so we can not delete
    console.log(`Cannot delete ${path}, it  does not exist `);
    return false;
  }
  delete childs[prop]; // delete the child object
  console.log(JSON.stringify(folder));
  return true;
};
