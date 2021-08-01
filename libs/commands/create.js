module.exports = function (folder, path) {
  let namePaths     = path[0].split('/'); // Get yhe name of the path
  let actualFolder  = folder; // set actual folder by reference
  for (let i = 0; i < namePaths.length; i++) { // Iterate each name
    if (!actualFolder[namePaths[i]]) { // If the name is not in the folfer, init the path
      actualFolder[namePaths[i]] = {};
    }
    actualFolder = actualFolder[namePaths[i]];
  }
  console.log(JSON.stringify(folder));
};
