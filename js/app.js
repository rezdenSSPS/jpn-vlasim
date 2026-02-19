window.toggle = function(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');
  header.classList.toggle('open', !isOpen);
  body.style.display = isOpen ? 'none' : 'block';
}
