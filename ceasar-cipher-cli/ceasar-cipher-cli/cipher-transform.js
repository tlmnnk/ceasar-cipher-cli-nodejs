const stream = require('stream');

class cipherTransform extends stream.Transform {
  constructor(codeFn, shift, isStdInput) {
      super();
      this.codeFn = codeFn;
      this.shift = shift;
      this.isStdInput = isStdInput
  };
  _transform(data, encoding, callback) {
      if (data.toString().charCodeAt() !== 13) {
        this.push(this.codeFn(data.toString(), this.shift));
      }
      this.isStdInput && this.push('\n');
      callback();
  };
};

module.exports = cipherTransform;