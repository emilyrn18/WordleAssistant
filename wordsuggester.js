import * as dict from './parseddictionary.js';
var dictionary = dict.dictionary;

// Import or implement letter frequency in English language
//Percentage of occurances in the English Language
import * as englishLettersFreq from './englishProb.js';
var letterFreq = englishLettersFreq.englishLettersFreq;



var frequency_words_order = ["E", "T", "A", "O", "I", "N", "S" , "H", "R", "D", "L", "C", "U", "M", "W", "F", "G", "Y", "P", "B", "V","K","J","X","Q","Z"]

var black_letters = [];
var yellow_letters = {};
var green_letters = {};
var top_twenty_five = [];

//This determines to the word is within an array
function arrayContains(thearray, wordtofind)
{
    return (thearray.indexOf(wordtofind) > -1);
}

// Include user input of words already tried and how many tries user has left
for(var tries=1; tries<7;tries++){
    var usedword = prompt("Insert Word "+ tries +": ");
    usedword = usedword.toLowerCase();
    if(arrayContains(dictionary, usedword)){
        dictionary = dictionary.filter(e => e !== usedword);
    }
    console.log(usedword);


    for(var i=0; i<5; i++){
        var letter_type = prompt("What color was letter "+usedword[i]+"? Type 'g' for green, 'y' for yellow, and 'b' for black.");
        if(letter_type == "b"){
            if(!arrayContains(black_letters, usedword[i])){
                black_letters.push(usedword[i]);
            }
        }

        if(letter_type == "y"){
            if(yellow_letters[usedword[i]] == null){
                yellow_letters[usedword[i]] = [i]; 
            }else{
                yellow_letters[usedword[i]].push(i);
            }
        }

        if(letter_type == "g"){
            if(green_letters[usedword[i]] == null){
                green_letters[usedword[i]] = [i]; 
            }else{
                green_letters[usedword[i]].push(i);
            }
        }
    }

    // console.log("Black letters: " + black_letters);
    // console.log("Yellow letters: " + yellow_letters["p"]);
    // console.log("Green letters: " + green_letters["a"]);

    console.log("Length of dictionary: " + dictionary.length);
    //Trying to remove words with b, and refining the list by g and y
    for (var i = 0; i < dictionary.length; i++){
        
        //remove the words with b

        var word = dictionary[i].toLowerCase();
        //green
        var idc = false;
        var cont = false;
        for (const [key, value] of Object.entries(green_letters)) {
            // console.log(key, value);
            for(var h=0;h<value.length;h++){
                if(word[value[h]] != key){
                    dictionary.splice(i, 1); //remove the word
                    i--;
                    idc = true;
                    cont = true;
                    break;
                }
            }
            if(idc){
                break;
            }
        }

        if(cont){
            continue;
        }

        //black
        for (var x = 0; x < 5; x++){
            if(arrayContains(black_letters, word[x])){
                dictionary.splice(i, 1); //remove and skip the word
                i--;
                cont = true;
                break; 
            }
        }

        if(cont){
            continue;
        }
        //yellow
        var doICont = false;
        for (var z = 0; z < 5; z++){
            doICont = false;
            if (yellow_letters[word[z]] != null){
                for (var m = 0; m < yellow_letters[word[z]].length; m++){
                    if (yellow_letters[word[z]][m] == z){
                        dictionary.splice(i, 1); //remove the word
                        i--;
                        doICont = true;
                        cont = true;
                        break;
                    }
                }
                if(doICont){break;}
            }
        }

        if(cont){
            continue;
        }
    }
    console.log("Length of new dictionary: " + dictionary.length);
    console.log(dictionary);

    // TODO: Include letters that are guaranteed to be in word and the location the letter should be in if provided

    // TODO: Produce up to top 10 word suggestions based on above criteria

    //At the current state of user's mind and options left 
    //eg. apple, eagle, bride, 
    //check the letters that are green at this stage, black, and yellow
    //this gives us the list ----- [brize, brine, brise]
    //Now, we try to see the positions that are left for the correct letters
    // bri?e ---- b??n?    4th try [a, l] ---- brute force, bl?n?       
    // start at the first unknown pos - then if there are yellow list [check the highest probability among those] - apply that and conitue
    //suggest sth like that,  
    //yellow letter in green???? co[rr]ect ---- orlrol //edge case -----crane

    //SUGGEST

    for (var p = 0; p < dictionary.length; p++){ //iterates through the new refined list
        // n ? ? o ? ---- yellow_letters: 'n' - [0]   'o' - [3]     MANGO
        var word_2 = dictionary[p];
        var pos_found = []
        var pos_left = []
        var keys_green = []
        for (const [key, value] of Object.entries(green_letters)) {
            keys_green.push(key);
            for(h=0;h<value.length;h++){
                pos_found.push(value[h]);
            }
        }

        for(var f=0; f<5; f++){
            if(!pos_found.includes(f)){
                pos_left.push(f)
            }
        }
        
        for(var g=0; g<frequency_words_order.length;g++){
            
            if(!arrayContains(keys_green, frequency_words_order[g].toLowerCase())){
                if(arrayContains(word_2, frequency_words_order[g].toLowerCase())){
                    top_twenty_five.push(word_2);
                    break;
                }
            }
        }

        if(top_twenty_five.length >= 25 || top_twenty_five.length >= dictionary.length){
            break;
        }

        console.log(pos_left);

    }
    console.log("TOP 25:");
    console.log(top_twenty_five);
    top_twenty_five = [];
}