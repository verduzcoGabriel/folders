module.exports =  function print (list, spaces = 0) {
  for (let path of Object.keys(list)) {
    console.log('  '.repeat(spaces) + path);
    if (Object.keys(list[path]).length) {
      print(list[path], spaces + 1);
    }
  }
};
