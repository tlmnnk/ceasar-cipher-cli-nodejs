const encode = (str, shift) => {
  let output;
  const charCodedArr = str.split('').map((char) => {
      const charCode = char.charCodeAt()

      if ((charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && charCode <= 187)) {
          return (((charCode - 97 + shift) % 26) + 97)
      } else {
          return charCode;
      }
  });

  output = String.fromCharCode(...charCodedArr);

  return output;
}

module.exports = encode;