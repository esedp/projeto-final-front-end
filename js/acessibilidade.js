// Alternar modo de contraste
const btnContraste = document.getElementById('btn-contraste');
btnContraste?.addEventListener('click', () => {
  document.body.classList.toggle('alto-contraste');

  const modoAtivo = document.body.classList.contains('alto-contraste');
  localStorage.setItem('altoContraste', modoAtivo);
});

// Recuperar modo salvo
window.addEventListener('DOMContentLoaded', () => {
  const modoSalvo = localStorage.getItem('altoContraste') === 'true';
  if (modoSalvo) document.body.classList.add('alto-contraste');

  const fonteSalva = parseInt(localStorage.getItem('tamanhoFonte')) || 100;
  document.body.style.fontSize = fonteSalva + '%';
});

// Aumentar e diminuir fonte
const btnAumentar = document.getElementById('aumentar-fonte');
const btnDiminuir = document.getElementById('diminuir-fonte');

function ajustarFonte(delta) {
  let tamanhoAtual = parseInt(localStorage.getItem('tamanhoFonte')) || 100;
  tamanhoAtual = Math.min(Math.max(tamanhoAtual + delta, 80), 150); // Limite entre 80% e 150%
  document.body.style.fontSize = tamanhoAtual + '%';
  localStorage.setItem('tamanhoFonte', tamanhoAtual);
}

btnAumentar?.addEventListener('click', () => ajustarFonte(10));
btnDiminuir?.addEventListener('click', () => ajustarFonte(-10));
