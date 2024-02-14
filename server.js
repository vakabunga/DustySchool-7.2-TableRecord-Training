const express = require('express');
const cors = require('cors');
const queryString = require('querystring');
const fs = require('fs');

const app = express();
const port = 3000;

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

if (!checkFileExistsSync('results.txt')) {
  fs.writeFileSync('results.txt', '[{"name": "computer", "result": "10"}]');
}

const results = JSON.parse(fs.readFileSync('results.txt', 'utf-8'));

app.use(cors());
app.use(express.json());

app.get('/results', (req, res) => {
  res.json(results);
});

app.post('/result', (req, res) => {
  const params = queryString.parse(String(req.url).slice(8));
  let playerPlace;

  const newResult = {
    'name': params.name,
    'result': +params.result
  }

  if (results.length < 11 || results.some(element => newResult.result > element.result)) {
    results.push(newResult);
    results.sort((a, b) => b.result - a.result);
  }

  if (results.length === 11) {
    results.pop();
  }

  fs.writeFileSync('results.txt', JSON.stringify(results));

  playerPlace = results.findIndex((element, index) => {
    if (element.result === newResult.result && element.name === newResult.name) {
      return element.result === newResult.result;
    }
  }) + 1;

  responseText = playerPlace ? `Результат в таблице рекордов на ${playerPlace} месте` : 'Результат не попал в список рекордов';
  res.json(responseText);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
