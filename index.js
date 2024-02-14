const page = document.querySelector('.page');
const SERVER_DOMAIN_NAME = 'http://localhost:3000';
const TOP_SCORES_NUMBERS = 10;


renderTable();
getTopScores();
sendResultForm();
