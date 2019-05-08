
/** 
  * 
  * ARCEGA FLUENT CALCULATOR
  * 
  * There are only four operations that are supported (plus, minus, times, divided_by) and 10 digits
  * (zero, one, two, three, four, five, six, seven, eight, nine).
  * 
  * Each calculation consists of one operation only and will return an integer.
  * 
  * Note: This is not a string parsing problem. The calls above are a chain of methods. Some languages may require parenthesis 
  * in method calls. That is OK, but consider a different language what would support the above syntax if possible.
  * 
  *  
  * @desc This file has a logic with a function that will hold a syntax 
  *       to deliver a simple Math calculation using Fluent Interface (Chaining) perspective. 
  * 
  *       To run this project just install Node.Js latest version, them run node.js {nameOfTheFile.js}
  * 
  * @dateCreation 05/06/2019 
  * @author Ricardo C. Arcega - ricardoarcega[at]gmail.com
*/




let numbers = [ //instance of numbers available. The IndexOf each position reflects it's value. E.g indexOf('four') == 4 is true.
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
];

let operators = { //operations and with arrow function a subMethod being called as well.
  'plus': (a, b) => a + b,
  'minus': (a, b) => a - b,
  'times': (a, b) => a * b,
  'divided_by': (a, b) => a / b
};

let textOperation = []; //auxiliary Array to support the calculation. It holds a pattern and chain from the Object (Calc.new.one.plus.two) for future calculations.



/**
  * @desc With a get and set, the FluentInterfaceCalc method encapsulate the value of the Property handling with ES6 Proxy pattern.
  *       Using this we have the abilitly to run over the Chain pattern (Calc.new.one.plus.two) when requested in the runtime.
  * 
  * @param @object Object Property
  * @return {Proxy}.
*/
const FluentInterfaceCalc = {

  get(target, key) { 

    if (typeof target[key] === 'object' && target[key] !== null) {
      textOperation.push(key);

      //recursively call the method when find a chain in the calcProperties properties and returns another instance of the Proxy.
      return new Proxy(target[key], FluentInterfaceCalc)

    } else {

      textOperation.push(key);

      /** Important Block */
      if (textOperation.length == 4) {

        console.log("Result: " +
          // calculation being done here, calling the suyb method from operators -> Plus, Minus, etc.
          operators[textOperation[2]](numbers.indexOf(textOperation[1]), numbers.indexOf(textOperation[3]))); 

      }

      //returning the property value from the target of the Proxy. E.g. 'plus' from target.
      return target[key];
    }

  },
  set(target, key, value) { //#TODO Arcega will create a method that creates property dinamicly.

    return true
  }

}

/*
The calcProperties it's a Metamodel and for Jobber test purposes I created  manually, 
however, my plan here is to create a method that generates automanticly basend on the {numbers} and {operators} Arrays.

It means that one the instance of calProperties will be needed.
*/
var calcProperties = {
  new: {
    one: { plus: { one: 1, two: 2 } },
    two: { plus: { two: 2 } },
    three: { plus: { two: 2 } },
    five: { minus: { six: 6 } },
    seven: { times: { two: 2 } },
    nine: {
      divided_by: { three: 3 }
    }
  }
}


/** -- Execution Block - - */

// Creating a instance of a Proxy to handle the Call from the e.g. - Calc.new.nine.divided_by.three.
// It's not a String parsing, the Object it`s being capture and system validates the FluentInterfaceCalc() 
// chains against and execute options as needed.
let Calc = new Proxy(calcProperties, FluentInterfaceCalc);

/** Just discoment the line you want to run */

Calc.new.one.plus.two
//Calc.new.five.minus.six
//Calc.new.seven.times.two
//Calc.new.nine.divided_by.three
