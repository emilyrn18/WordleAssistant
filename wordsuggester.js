import { dictionary } from './parseddictionary.js';

// Import or implement letter frequency in English language
const englishLettersFreq = new Object();
//Percentage of occurances in the English Language
englishLettersFreq['A'] = 8.2; 
englishLettersFreq['B'] = 1.5;
englishLettersFreq['C'] = 2.81;
englishLettersFreq['D'] = 4.3;
englishLettersFreq['E'] = 12.7;
englishLettersFreq['F'] = 2.2;
englishLettersFreq['G'] = 2.1;
englishLettersFreq['H'] = 6.1;
englishLettersFreq['I'] = 7.0;
englishLettersFreq['J'] = 0.2;
englishLettersFreq['K'] = 0.8;
englishLettersFreq['L'] = 4.0;
englishLettersFreq['M'] = 2.4;
englishLettersFreq['N'] = 6.7;
englishLettersFreq['O'] = 7.5;
englishLettersFreq['P'] = 1.9;
englishLettersFreq['Q'] = 0.12;
englishLettersFreq['R'] = 6.0;
englishLettersFreq['S'] = 6.3;
englishLettersFreq['T'] = 9.1;
englishLettersFreq['U'] = 2.8;
englishLettersFreq['V'] = 1.0;
englishLettersFreq['W'] = 2.3;
englishLettersFreq['X'] = 0.11;
englishLettersFreq['Y'] = 2.0;
englishLettersFreq['Z'] = 0.10;

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
for(tries=1; tries<7;tries++){
    var usedword = prompt("Insert Word "+ tries +": ");
    usedword = usedword.toLowerCase();

    if(arrayContains(dictionary, usedword)){
        dictionary = dictionary.filter(e => e !== usedword);
    }
    console.log(usedword);


    for(i=0; i<5; i++){
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
    for (i = 0; i < dictionary.length; i++){
        
        //remove the words with b

        var word = dictionary[i].toLowerCase();
        //green
        var idc = false;
        var cont = false;
        for (const [key, value] of Object.entries(green_letters)) {
            // console.log(key, value);
            for(h=0;h<value.length;h++){
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
        for (x = 0; x < 5; x++){
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
        for (z = 0; z < 5; z++){
            doICont = false;
            if (yellow_letters[word[z]] != null){
                for (m = 0; m < yellow_letters[word[z]].length; m++){
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

    for (p = 0; p < dictionary.length; p++){ //iterates through the new refined list
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

        for(f=0; f<5; f++){
            if(!pos_found.includes(f)){
                pos_left.push(f)
            }
        }
        
        for(g=0; g<frequency_words_order.length;g++){
            
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