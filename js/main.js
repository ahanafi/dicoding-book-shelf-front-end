document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#inputBook');
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addBookShelf();
  });

  const addBookBtn = document.querySelector('#addBook');
  addBookBtn.addEventListener('click', () => showBookForm(true));

  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => showBookForm(false));
});

document.addEventListener('ondatasaved', () => alert('Bookshelf saved!'));

document.addEventListener('ondataloaded', () => refreshBookShelfData());