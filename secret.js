


/** 
  * 
  * ARCEGA SECRET STRING
  * 
  * There is a secret string which is unknown to you. Given a collection of random triplets from the
  * string, recover the original string.
  * 
  * A triplet here is defined as a sequence of three letters such that each letter occu
  * 
  * 
  * @desc This file has a logic with a function that will hold a syntax 
  *       to deliver a simple way to figure out what's the Secret Word that in first place is unknown. 
  * 
  *       To run this project just install Node.Js latest version, them run node.js {nameOfTheFile.js}
  * 
  * @dateCreation 05/06/2019 
  * @author Ricardo C. Arcega - ricardoarcega[at]gmail.com
*/


let secret_1 = "whatisup"; //This is unknown, 

let secret_array = Array.from(secret_1); // transforming the secret word in a array.

// triplet 2d Array that contains a "cript" vision of what kind of letters we have in the Secret Word... still not knowing what it's :)
let triplets_1 = [ 
    ['t', 'u', 'p'],
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['w', 'h', 's']
];

var temp_triplets_array = [];

// reserving space in the array. It's work only for small words. In a huge implementation this method should be changed. Fallow the business rulles.
secret_array.forEach(function (letter) {
    temp_triplets_array.push(0);
});

triplets_1.forEach(function (value) { 
    value.forEach(function (arrayLetter) {

        secret_array.forEach(function (letter) {

            // If the letter exists in the array and is already added in the final result, them  the letter is added at the same place it was found.
            if (letter == arrayLetter && !temp_triplets_array.some(letterTmp => letterTmp == arrayLetter)) {
                temp_triplets_array[secret_array.indexOf(letter)] =  letter;
            }

        });


    });
});

//prints the word after it's been reconized.
var printingResult = "";
temp_triplets_array.forEach(function (currentValue) {
    printingResult += currentValue;
});

console.log("The secret word is: " + printingResult);
