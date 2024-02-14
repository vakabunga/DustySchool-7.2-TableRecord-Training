function renderTable() {
  const appContainer = document.createElement('div');
  appContainer.classList.add('result-container');
  page.appendChild(appContainer);


  createTable(TOP_SCORES_NUMBERS);
}
