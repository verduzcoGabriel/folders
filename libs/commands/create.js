module.exports = function (folder, path) {
  let namePaths     = path[0].split('/'); // Get yhe name of the path
  // let actualFolder  = folder; // set actual folder by reference
  for (let i = 0; i < namePaths.length; i++) { // Iterate each name
    if (!folder[namePaths[i]]) { // If the name is not in the folfer, init the path
      folder[namePaths[i]] = {};
    }
    folder = folder[namePaths[i]];
  }
};
