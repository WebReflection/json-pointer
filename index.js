var JSONPointer = (function (JSON) {
  /*! (c) Andrea Giammarchi - @WebReflection - ISC License */
  var
    isInteger = /^-?\d+$/,
    isIntegerish = /^'-?\d+'$/,
    re = /[.']/g,
    place = function (m) {
      return '%2' + (m === '.' ? 'E' : '7');
    }
  ;
  return {
    encode: function encode(arrayPath) {
      for (var
        key,
        i = 0,
        length = arrayPath.length,
        output = length < 1 ? [] : [''];
        i < length; i++
      ) {
        key = arrayPath[i];
        if (typeof key === 'number') {
          output.push(key);
        } else if (isInteger.test(key)) {
          output.push("'" + key + "'");
        } else {
          output.push(encodeURIComponent(key).replace(re, place));
        }
      }
      return output.join('.');
    },
    decode: function decode(stringPath) {
      for (var
        key,
        output = [],
        arrayPath = stringPath.split('.'),
        i = 0,
        length = arrayPath.length;
        i < length; i++
      ) {
        key = arrayPath[i];
        if (isInteger.test(key)) {
          output.push(parseInt(key, 10));
        } else if (isIntegerish.test(key)) {
          output.push(key.slice(1, -1));
        } else {
          output.push(decodeURIComponent(key));
        }
      }
      return output.slice(1);
    }
  };
}(JSON));

try { module.exports = JSONPointer; } catch(o_O) {}