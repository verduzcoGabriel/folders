const Reader        = require('../interfaces/reader');
const ReaderService = { };
const folder        = {};
const Commands      = require('../commands');

ReaderService.init = function (settings) {
  let reader = new Reader(settings);
  reader.interface.on('line', ReaderService.readCommands);
  console.log('Ready for read! Read Service init!')
  return reader.interface;
};

ReaderService.readCommands = function (line) {
  let instruction = line.split(' ')[0];
  let path        = line.split(/\s/);
  if (!Commands[instruction.toLowerCase()]) {
    console.log(`${instruction} is not valid, and you should write  a path`);
  } else {
    Commands[instruction.toLowerCase()](folder, path.slice(1));
  }
};

module.exports = ReaderService;
