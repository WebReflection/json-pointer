var tressa = require('tressa');

var JSONPointer = require('./index.js');

tressa.title('Better JSON Pointer');

tressa.assert(
  JSONPointer.encode([]) === '',
  'empty path is allowed'
);

tressa.assert(
  JSON.stringify(JSONPointer.decode('')) === '[]',
  'and correctly decoded'
);

tressa.assert(
  JSONPointer.encode(['a', 0, "'b'", '.', '1']) === ".a.0.%27b%27.%2E.'1'",
  'numbers and strings are recognized'
);

tressa.assert(
  JSON.stringify(JSONPointer.decode(".a.0.%27b%27.%2E.'1'")) === '["a",0,"\'b\'",".","1"]',
  'and correctly decoded'
);