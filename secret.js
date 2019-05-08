
/*

secret_1 = "whatisup";
triplets_1 = [
 ['t','u','p'],
 ['w','h','i'],
 ['t','s','u'],
 ['a','t','s'],
 ['h','a','p'],
 ['t','i','s'],
 ['w','h','s']
]

{w,h,a,t,i,s,u,p}

{0,1,2,3,4,5,6,7}
{w,h,a,t,i,s,u,p}



['t','u','p'], //first roll
['w','h','i'], //second roll
['t','s','u'], // If is already there, discart
['a','t','s'],

*/


let secret_1 = "whatisup";
let secret_array = Array.from(secret_1);


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

secret_array.forEach(function (letter) {
    temp_triplets_array.push(0);
});

triplets_1.forEach(function (value) {
    value.forEach(function (arrayLetter) {

        secret_array.forEach(function (letter) {
            if (letter == arrayLetter && !temp_triplets_array.some(letterTmp => letterTmp == arrayLetter)) {
                temp_triplets_array[secret_array.indexOf(letter)] =  letter;
            }

        });


    });
});

var printingResult = "";
temp_triplets_array.forEach(function (currentValue) {
    printingResult += currentValue;
});


console.log("The secret word is: " + printingResult);
