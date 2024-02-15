const express = require('express');
const cors = require('cors');
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
  const newRecord = req.body;
  const newName = newRecord.name;
  const newResult = newRecord.result;
  let playerPlace = -1;

  if (newName === '') {
    res.status(404);

    res.json({
      error: '1',
      message: 'Заполните все поля формы'
    });

    return;
  }

  if (isNaN(+newResult) || typeof +newResult !== 'number' || newResult === '') {
    res.status(404);

    res.json({
      error: '2',
      message: 'Введите число'
    });

    return;
  }

  for (let i = 0; i < results.length; i++) {
    const { result } = results[i];

    if (+newResult >= +result) {
      results.splice(i, 0, newRecord);
      playerPlace = i + 1;

      if (results.length === 11) {
        results.pop();
      }

      fs.writeFileSync('results.txt', JSON.stringify(results));

      res.json({
        error: 0,
        message: `Результат в таблице рекордов на ${playerPlace} месте`
      });

      return;
    }
  }

  if (results.length < 10) {
    results.push(newRecord);
    playerPlace = results.length;

    fs.writeFileSync('results.txt', JSON.stringify(results));

    res.json({
      error: 0,
      message: `Результат в таблице рекордов на ${playerPlace} месте`
    });

    return;
  }

  res.json({
    error: 0,
    message: `Результат не попал в таблицу рекордов`
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
