const stream = require('stream');

class cipherTransform extends stream.Transform {
  constructor(codeFn, shift) {
      super();
      this.codeFn = codeFn;
      this.shift = shift;
  };
  _transform(data, encoding, callback) {
      this.push(this.codeFn(data.toString(), this.shift));
      this.push('\n');
      callback();
  };
};

module.exports = cipherTransform;