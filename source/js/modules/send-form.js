const sendForm = () => {
  const mainForms = document.querySelectorAll('[data-form]');

  const message = {
    loading: 'img/svg/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  // функция отвечет за привязку постинга
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      }).then(() => {
        showStatusModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showStatusModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  mainForms.forEach((item) => {
    bindPostData(item);
  });
};

function showStatusModal(message) {
  const prevModal = document.querySelector('[data-modal="reserve"]');
  const statusModal = document.querySelector('[data-modal="feedback"]');
  const closeModalBtns = statusModal.querySelectorAll('[data-close-modal]');
  const content = statusModal.querySelector('.modal-feedback');

  prevModal.classList.remove('is-active');
  statusModal.classList.add('is-active');
  content.innerHTML = `
    <p class="modal__title">${message}</p>
  `;

  closeModalBtns.forEach((item) => {
    item.addEventListener('click', () => {
      statusModal.classList.remove('is-active');
    });
  });

  setTimeout(() => {
    statusModal.classList.remove('is-active');
    const p = content.querySelector('p');
    p.remove();
  }, 4000);
}

export {sendForm};
