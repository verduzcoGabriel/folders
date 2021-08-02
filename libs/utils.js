const Utils = {};

Utils.getUntil = (folder, index, path) => {
  if (index === path.length - 1) {
    if (!folder) { return false; }
    return folder[path[path.length - 1]];
  }
  return Utils.getUntil(folder[path[index]], index + 1, path);
};

module.exports = Utils;
