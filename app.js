
const folder        = {};
const Commands      = require('./libs/commands');
const ServiceReader = require('./libs/services/reader');
const setting = {
  input: process.stdin,
  output: process.stdout,
  terminal: false
};

try {
  let Reader = ServiceReader.init(setting);
  Reader.on('line', function (line) {
    let instruction = line.split(' ')[0];
    let path        = line.split(/\s/);
    if (!Commands[instruction.toLowerCase()]) {
      console.log(`${instruction} is not valid, and you should write  a path`);
    } else {
      Commands[instruction.toLowerCase()](folder, path.slice(1));
    }
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
