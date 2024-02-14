function sendResultForm() {
  const sendResultFormContainer = document.createElement('div');
  const resultForm = document.createElement('form');
  const inputName = document.createElement('input');
  const inputResult = document.createElement('input');
  const sendButton = document.createElement('button');
  const statusField = document.createElement('p');

  sendResultFormContainer.classList.add('form-container');
  resultForm.classList.add('result-form');
  sendButton.classList.add('send-button');

  inputName.placeholder = 'Введите имя игрока';
  inputResult.placeholder = 'Введите результат игрока';

  sendButton.textContent = 'Отправить результат';

  page.appendChild(sendResultFormContainer);
  sendResultFormContainer.appendChild(resultForm);
  resultForm.appendChild(inputName);
  resultForm.appendChild(inputResult);
  resultForm.appendChild(sendButton);
  sendResultFormContainer.appendChild(statusField);

  resultForm.addEventListener('submit', (event) => {
    event.preventDefault();
    statusField.textContent = '';
    inputResult.classList.remove('cell_border-red');

    const name = inputName.value;
    const result = inputResult.value;

    if (name === '' || result === '') {
      statusField.textContent = 'Заполните все поля формы';
      return;
    }

    if (isNaN(+result) || typeof result === 'number') {
      statusField.textContent = 'Введите число';
      inputResult.value = '';
      inputResult.classList.add('cell_border-red');
      return;
    }

    inputName.value = '';
    inputResult.value = '';
    inputName.focus();

    fetch(`${SERVER_DOMAIN_NAME}/result?name=${name}&result=${+result}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then((data) => {
        statusField.textContent = data;
      })
  })
}
