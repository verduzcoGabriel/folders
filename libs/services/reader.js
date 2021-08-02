const Reader        = require('../interfaces/reader');
const ReaderService = { interface: null };

ReaderService.init =  function (settings) {
  let reader = new Reader(settings);
  return reader.interface;
};

module.exports = ReaderService;
