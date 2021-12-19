const randInt = require('./randInt');

const randArrEl = (arr) => arr[randInt(arr.length - 1)];

module.exports = randArrEl;
