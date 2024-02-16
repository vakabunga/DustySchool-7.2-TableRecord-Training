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
    sendButton.disabled = true;
    inputName.classList.remove('cell_border-red')
    inputResult.classList.remove('cell_border-red');

    const name = inputName.value;
    const result = inputResult.value;

    fetch(`${SERVER_DOMAIN_NAME}/result`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "result": result
      })
    })
      .then(response => response.json())
      .then((data) => {
        statusField.textContent = data.message;

        if (data.error) {
          throw new Error('error', { cause: data });
        }

        inputName.value = '';
        inputResult.value = '';
        inputName.focus();
      })
      .catch(errorData => {
        const { error, message } = errorData.cause;
        statusField.textContent = message;

        if (error === '1') {
          inputName.classList.add('cell_border-red')
          inputResult.classList.add('cell_border-red');
        }

        if (error === '2') {
          inputResult.classList.add('cell_border-red');
        }
      })
      .finally(() => {
        sendButton.disabled = false;
      });
  });
};
