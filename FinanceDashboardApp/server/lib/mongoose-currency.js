import mongoose from 'mongoose';
import util from 'util';

function Currency(path, options) {
  mongoose.SchemaTypes.Number.call(this, path, options);
}

util.inherits(Currency, mongoose.SchemaTypes.Number);

Currency.prototype.cast = function (val) {
  if (isType('String', val)) {
    var currencyAsString = val.toString();
    var findDigitsAndDotRegex = /\d*\.\d{1,2}/;
    var findCommasAndLettersRegex = /\,+|[a-zA-Z]+/g;
    var findNegativeRegex = /^-/;
    var currency;
    currencyAsString = currencyAsString.replace(findCommasAndLettersRegex, '');
    currency = findDigitsAndDotRegex.exec(currencyAsString + '.0')[0];
    if (findNegativeRegex.test(currencyAsString)) {
      return (currency * -100).toFixed(0) * 1;
    } else {
      return (currency * 100).toFixed(0) * 1;
    }
  } else if (isType('Number', val)) {
    return val.toFixed(0) * 1;
  } else {
    return new Error('Should pass in a number or string');
  }
};

const isType = (type, obj) => {
  return Object.prototype.toString.call(obj) == '[object ' + type + ']';
};

const loadType = mongoose => {
  mongoose.Types.Currency = mongoose.SchemaTypes.Currency = Currency;
  return Currency;
};

export { loadType };
