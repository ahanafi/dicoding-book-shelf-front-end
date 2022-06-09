/**
 * Toggle (show-hide) book form
 */
const showBookForm = (show) => {
  const inputSection = document.querySelector('.input_section');
  if (show) {
    inputSection.classList.remove('d-none');
  } else {
    inputSection.classList.add('d-none');
  }
}