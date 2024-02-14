function createTable(tableRows) {
  const container = document.querySelector('.result-container');

  for (let i = -1; i < tableRows; i++) {
      const tableRow = createRow(i);
      container.appendChild(tableRow);
  }
}
