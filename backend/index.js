const cors = require('cors');
const express = require('express')
const app = express()
const fs = require('fs');
const events = require('events');
const readline = require('readline');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    res.setHeader('Access-Control-Allow-Origin', req.header('origin') 
    || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({ credentials: false }));

app.get('/', function (req, res) {
    res.json({ anagramsResults: 'dusty, study' });
    console.log('anagrams requested for word: ' + req.query.word);
    console.log("origin " + req.header('origin'));
    console.log("host " + req.header('host'));
})

app.listen(3000)

if (!fs.existsSync('dictionary.txt')) {
        console.log('exiting because dictionary file does NOT exist. cannot build anagrams');
        process.exit();
    }

if (!fs.existsSync('anagram.txt')) {
    console.log('anagram.txt file does NOT exist');
    processAnagrams();
}

async function processAnagrams() {
    let anagramMap = new Map();
    try {
      const rlDictionary = readline.createInterface({
        input: fs.createReadStream('dictionary.txt'),
        crlfDelay: Infinity
      });
  
      rlDictionary.on('line', (line) => {
        let sortedWordKey = line.split('').sort().join('').toLowerCase();
        anagramMap.get(sortedWordKey)?.push(line) || anagramMap.set(sortedWordKey, [line]);
      });
  
      await events.once(rlDictionary, 'close');

      var writeAnagram = fs.createWriteStream('anagram.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
        })

        // which of these have commas in the output?
        anagramMap.forEach(function(value, key) {
            console.log(key + ' = ' + value);
            writeAnagram.write(key + ',' + value + '\n');
        });

        writeAnagram.end();

      console.log('Reading file line by line with readline done.');
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    } catch (err) {
      console.error(err);
    }
  }