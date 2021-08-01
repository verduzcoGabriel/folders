const readline = require('readline');
const folder   = {};
const Commands = require('./libs/commands');

try {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', function (line) {
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
