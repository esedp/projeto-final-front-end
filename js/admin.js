
function carregarUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function formatarData() {
  const data = new Date();
  return data.toLocaleString('pt-BR');
}

function renderizarLista(filtro = '') {
  const lista = document.getElementById('listaUsuarios');
  lista.innerHTML = '';
  const usuarios = carregarUsuarios();

  const filtrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    u.email.toLowerCase().includes(filtro.toLowerCase())
  );

  if (filtrados.length === 0) {
    lista.innerHTML = '<li>Nenhum usuário encontrado.</li>';
    return;
  }

  filtrados.forEach((usuario, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '10px';
    li.innerHTML = `
      <strong>${usuario.nome}</strong> - ${usuario.email} <br>
      <small>Data: ${usuario.data}</small>
      <button data-index="${index}" class="btn-excluir" style="margin-left: 10px;">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

// ------------------ EVENTOS ------------------

document.getElementById('formAdmin').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email) {
    alert('Preencha todos os campos!');
    return;
  }

  const usuarios = carregarUsuarios();
  usuarios.push({ nome, email, data: formatarData() });
  salvarUsuarios(usuarios);

  renderizarLista();
  this.reset();
});

document.getElementById('limparCampos').addEventListener('click', function() {
  document.getElementById('formAdmin').reset();
});

document.getElementById('excluirTodos').addEventListener('click', function() {
  if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
    localStorage.removeItem('usuarios');
    renderizarLista();
  }
});

document.getElementById('listaUsuarios').addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-excluir')) {
    const index = e.target.getAttribute('data-index');
    const usuarios = carregarUsuarios();
    usuarios.splice(index, 1);
    salvarUsuarios(usuarios);
    renderizarLista(document.getElementById('pesquisa').value);
  }
});

document.getElementById('pesquisa').addEventListener('input', function() {
  renderizarLista(this.value);
});



document.addEventListener('DOMContentLoaded', () => {
  renderizarLista();
});