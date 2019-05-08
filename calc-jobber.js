


var numbers = [
  'zero', 'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten'
];

var operators = {
  'plus': (a, b) => a + b,
  'minus': (a, b) => a - b,
  'times': (a, b) => a * b,
  'divided_by': (a, b) => a / b
};

let textOperation = [];

var validator = {

  get(target, key) {

    if (typeof target[key] === 'object' && target[key] !== null) {


      textOperation.push(key);

      return new Proxy(target[key], validator)

    } else {


      textOperation.push(key);

      /** Important Block */
      if (textOperation.length == 4) {

        console.log("" +
          operators[textOperation[2]](numbers.indexOf(textOperation[1]), numbers.indexOf(textOperation[3])));

      }

      return target[key];
    }




  },
  set(target, key, value) {

    return true
  }




}


// This object can be created dinamicly. For the Jobber evaluation purposes this is only a Prototype.
var person = {
  firstName: "alfred",
  lastName: "john",
  new: {
    one: {
      plus: {
        two: 2
      }
    },
    five: {
      minus: {
        six: 6
      }
    },
    seven: {
      times: {
        two: 2
      }
    },
    nine: {
      divided_by: {
        three: 3
      }
    }
  }
}
var Calc = new Proxy(person, validator)


//Calc.new.one.plus.two
//Calc.new.five.minus.six
//Calc.new.seven.times.two
Calc.new.nine.divided_by.three
