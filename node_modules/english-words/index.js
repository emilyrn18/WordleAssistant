var fs = require('fs')
var path = require('path')

var EnglishWords= {
  getWords: getWords
}

function getWords(callback){
  words = []
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/english-words.txt')
  });

  rl.on('line', function(line) {
    words.push(line)
  });
  rl.on('close', function(){
    callback(words)
  })
}

module.exports = EnglishWords
