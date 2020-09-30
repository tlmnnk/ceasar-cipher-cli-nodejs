const decode = (str, shift) => {
  let output;
  const charCodedArr = str.split('').map((char) => {
      const charCode = char.charCodeAt()
      if ((charCode >= 65 && charCode <= 90) || 
          (charCode >= 97 && charCode <= 187)) {
              let shiftedCode = char.charCodeAt() - 97 - shift;

              shiftedCode < 0 && (shiftedCode += 26);
              return ((shiftedCode % 26) + 97);
      } else {
          return charCode;
      };
  });

  output = String.fromCharCode(...charCodedArr);

  return output;
}

module.exports = decode;
