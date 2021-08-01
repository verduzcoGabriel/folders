
let expect     = require('chai').expect;
const fs       = require('fs');
const readline = require('readline');
const Commands = require('../libs/commands');
const folder   = {};

let loadFiles = async function (file) {
  const fileStream = fs.createReadStream(`${process.cwd()}/tests/files/${file}`);
  const read = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  return read;
};

describe('Commands', () => {
  it('Create folder', async () => {
    let read = await loadFiles('create.txt');
    for await (const line of read) {
      let instruction = line.split(' ')[0];
      let path        = line.split(/\s/);
      let properties  = path.slice(1)[0].split('/');
      Commands[instruction.toLowerCase()](folder, path.slice(1));
      for (let property of properties) {
        expect(JSON.stringify(folder)).to.include(property);
      }
    }
  });

  it('List folder', () => {
    Commands['list'](folder);
  });

  it('Move path', async () => {
    let read = await loadFiles('move.txt');
    for await (const line of read) {
      let instruction = line.split(' ')[0];
      let path        = line.split(/\s/);
      let properties  = path.slice(1)[0].split('/');
      Commands[instruction.toLowerCase()](folder, path.slice(1));
      if (instruction === 'MOVE') {
        expect(folder[path[2]]).to.have.nested.property(properties.join('.'))

      }
    }
  });

  it('Delete folder', async () => {
    let read = await loadFiles('delete.txt');
    for await (const line of read) {
      let instruction = line.split(' ')[0];
      let path        = line.split(/\s/);
      let properties  = path.slice(1)[0].split('/');
      Commands[instruction.toLowerCase()](folder, path.slice(1));
      expect(JSON.stringify(folder)).to.not.include(properties[properties.length - 1]);
    }
  });

  it('List folder', () => {
    Commands['list'](folder);
  });
});
