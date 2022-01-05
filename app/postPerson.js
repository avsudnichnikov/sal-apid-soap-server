const randArrEl = require('./randArrEl');
const randInt = require('./randInt');

const template = {
  name: {
    firstname: 'string',
    surname: 'string',
    patronymic: 'string',
  },
  age: 'integer',
  city: 'string',
  hobby: 'string',
  gender: 'gender',
  favoriteColor: 'color',
}

const values = {
  boolean: [
    'true',
    'false',
  ],
  gender: [
    'male',
    'female',
  ],
  color: [
    'red',
    'orange',
    'yellow',
    'green',
    'sky',
    'blue',
    'violet',
    'purple',
    'black',
    'white',
    'grey',
    'silver',
    'brown',
    'gold',
    'pink',
  ],
}

const isAvailableValue = (type, val = '') => {
  return values[type].includes(val.toLowerCase());
}

const checkSimpleType = (type, val) => {
  switch (type) {
    case 'string':
      if (typeof val === 'string') {
        return type;
      }
      break;
    case 'integer':
      if (!Number.isNaN(Number.parseInt(val))) {
        return type;
      }
      break;
    case 'boolean':
    case 'gender':
    case 'color':
      if (isAvailableValue(type, val)) {
        return type;
      }
      break;
  }
  return undefined;
}

function postPersonValidate(template, person) {
  const recursiveTypeCheck = (temp, obj, nameOfProp = 'obj') => {
    if ((typeof obj === 'object') && (typeof temp === 'object')) {
      Object.keys(temp).forEach((prop) => recursiveTypeCheck(temp[prop], obj[prop], prop));
    } else {
      if (!checkSimpleType(temp, obj)) {
        throw {
          Fault: {
            Code: 400,
            Reason: {Text: `Unexpected property value of "${nameOfProp}" (${obj})`}
          }
        }
      }
    }
  }
  recursiveTypeCheck(template, person);
}

function postPerson(person) {
  postPersonValidate(template, person);
  return {
    result: 'You are registered in the game',
  }
}

module.exports = postPerson;
