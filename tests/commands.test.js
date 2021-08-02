
let expect          = require('chai').expect;
const Commands      = require('../libs/commands');
const folder        = {};
const ServiceReader = require('../libs/services/reader');


describe('Commands', () => {
  it('Should have the properties in the Object', async () => {
    let Reader   = ServiceReader.init({ file:'create.txt' });
    for await (const line of Reader) {
      console.log(line);
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

  it('Should move objects', async () => {
    let Reader   = ServiceReader.init({ file:'move.txt' });
    for await (const line of Reader) {
      console.log(line);
      let instruction = line.split(' ')[0];
      let path        = line.split(/\s/);
      let properties  = path.slice(1)[0].split('/');
      Commands[instruction.toLowerCase()](folder, path.slice(1));
      if (instruction === 'MOVE') {
        // expect(folder[path[2]]).to.have.nested.property(properties.join('.'));
      }
    }
  });

  it('List folder', () => {
    Commands['list'](folder);
  });

  it('Should delete the properties in the Object', async () => {
    let Reader   = ServiceReader.init({ file:'delete.txt' });
    for await (const line of Reader) {
      console.log(line);
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
