function createRow(rowNumber) {
  const tableRow = document.createElement('div');
  tableRow.classList.add('table-row');
  const posCell = document.createElement('div');
  const nameCell = document.createElement('div');
  const scoreCell = document.createElement('div');
  posCell.dataset.cell = rowNumber + '.1';
  nameCell.dataset.cell = rowNumber + '.2';
  scoreCell.dataset.cell = rowNumber + '.3';
  tableRow.appendChild(posCell);
  tableRow.appendChild(nameCell);
  tableRow.appendChild(scoreCell);

  if (posCell.dataset.cell === '-1.1') {
    posCell.classList.add('pos-header');
    posCell.textContent = 'Поз.';
  } else {
    posCell.classList.add('pos-cell', 'table-row-next', 'table-cell');
    posCell.textContent = rowNumber + 1;
  }

  if (nameCell.dataset.cell === '-1.2') {
    nameCell.classList.add('name-header');
    nameCell.textContent = 'Имя';
  } else {
    nameCell.classList.add('name-cell', 'table-row-next', 'table-cell');
    nameCell.textContent = '';
  }

  if (scoreCell.dataset.cell === '-1.3') {
    scoreCell.classList.add('score-header');
    scoreCell.textContent = 'Результат';
  } else {
    scoreCell.classList.add('score-cell', 'table-row-next', 'table-cell');
    scoreCell.textContent = '';
  }

  return tableRow;
}
