function getTopScores() {
  fetch(`${SERVER_DOMAIN_NAME}/results`)
    .then(response => response.json())
    .then(data => {

      if (data.length === 0) {
        return;
      }

      for (i = 0; i < data.length; i++) {
        const posData = document.querySelector(`[data-cell='${i}.1']`);
        const nameData = document.querySelector(`[data-cell='${i}.2']`);
        const scoreData = document.querySelector(`[data-cell='${i}.3']`);
        nameData.textContent = data[i].name;
        scoreData.textContent = data[i].result;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(getTopScores, 5000);
    })
}
