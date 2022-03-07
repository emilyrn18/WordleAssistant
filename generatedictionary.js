var EnglishWords = require('english-words')
var usedwordlewords = require("./usedworddictionary.json");
const fs = require('fs');

//This determines to the word is within an array
function arrayContains(thearray, wordtofind)
{
    return (thearray.indexOf(wordtofind) > -1);
}

//Removes all words that have already been used in wordle
//from the english dictionary array and it returns
//a no array
function removewords(englisharray){
    var arr = englisharray;
    for (var year of Object.keys(usedwordlewords)) {
        for(var index of Object.keys(usedwordlewords[year])){
            var word = usedwordlewords[year][index];
            var word = word.toLowerCase();
            if(arrayContains(arr, word)){
                arr = arr.filter(e => e !== word);
            }
        }
    }
    return arr;
}

//This function creates the new dictionary by pulling out
//all 5 letter words and removing already used words.
//Then it outputs a text file of the new dictionary
function createdictionary(){
    EnglishWords.getWords(
        function(words){
            words = words.filter(word => word.length == 5);
            var new_words = removewords(words);
            fs.writeFile("./parseddictionary.json", JSON.stringify(new_words), err => {
                if (err) {
                  console.error(err)
                  return
                }
              });
        }
    )
}

createdictionary();