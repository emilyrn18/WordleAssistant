var EnglishWords = require('english-words')
var usedwordlewords = require("./usedworddictionary.json");
const fs = require('fs');


function arrayContains(thearray, wordtofind)
{
    return (thearray.indexOf(wordtofind) > -1);
}

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

function createdictionary(){
    EnglishWords.getWords(
        function(words){
            words = words.filter(word => word.length == 5);
            var new_words = removewords(words);
            fs.writeFile("./parseddictionary.txt", JSON.stringify(new_words), err => {
                if (err) {
                  console.error(err)
                  return
                }
              });
        }
    )
}

createdictionary();