const ServiceReader = require('./libs/services/reader');
const setting = {
  input: process.stdin,
  output: process.stdout,
  terminal: false
};

try {
  ServiceReader.init(setting);
} catch (error) {
  console.log(error);
  process.exit(1);
}
