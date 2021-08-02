const fs       = require('fs');
const readline = require('readline');

module.exports =  class Reader {
  constructor (settings) {
    let config = {};
    if (settings.file) {
      config = {
        input:   fs.createReadStream(`${process.cwd()}/tests/files/${settings.file}`),
        crlfDelay: Infinity
      };
    } else { config = settings; }

    this.interface = readline.createInterface(config);
  }
};
