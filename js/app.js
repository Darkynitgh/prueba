// === Menú perfil toggle ===
document.getElementById('perfilBtn').onclick = () => {
  const menu = document.getElementById('perfilMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};

// === Toggle submenus ===
['candidatoSubmenu', 'nuevoCandidatoSubmenu', 'empleoAnteriorSubmenu'].forEach(id => {
  const btn = document.getElementById(id.replace('Submenu', 'Btn'));
  const submenu = document.getElementById(id);
  if (btn && submenu) {
    btn.onclick = () => submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  }
});

// === Cerrar sesión ===
function cerrarSesion() {
  window.location.href = 'login_candidato.html';
}

// === Inicializar radios dentro de un modal ===
function initInformes(modal, radioName, divId) {
  if (!modal) return;
  const radios = modal.querySelectorAll(`input[name="${radioName}"]`);
  const div = modal.querySelector(`#${divId}`);
  if (!radios || !div) return;
  radios.forEach(radio => {
    radio.onclick = () => div.style.display = radio.value === 'no' ? 'block' : 'none';
  });
}

// === Abrir modal específico ===
async function abrirModal(modalId, trigger = null) {
  let modal = document.getElementById(modalId);

  if (!modal) {
    const response = await fetch('modales.html');
    const html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    modal = tempDiv.querySelector(`#${modalId}`);
    if (!modal) return;
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';

  // === Configuración específica de cada modal ===
  switch (modalId) {
    case 'modalNuevoCandidato':
      {
        const fechaSpan = modal.querySelector('#fechaNuevoCandidato');
        if (fechaSpan) fechaSpan.textContent = new Date().toLocaleString();
        initInformes(modal, 'informes', 'razonesInformesDiv');
      }
      break;
    case 'edicionModal':
      {
        if (trigger) {
          const nombre = trigger.parentElement.nextElementSibling.textContent;
          const nombreSpan = modal.querySelector('#modalNombreCandidato');
          if (nombreSpan) nombreSpan.textContent = nombre;
        }
        initInformes(modal, 'informesEditar', 'razonesInformesEditarDiv');
      }
      break;
    case 'modalEmpleoAnterior':
      initInformes(modal, 'informes', 'razonesInformesDiv');
      break;
    case 'modalEditarEmpleo':
      initInformes(modal, 'informesEditar', 'razonesInformesEditarDiv');
      break;
  }
}

// === Cerrar modal y eliminar del DOM ===
function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.remove();
}

// === Cerrar modal al hacer clic fuera ===
document.addEventListener('click', e => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (modal.style.display === 'flex' && e.target === modal) {
      modal.remove();
    }
  });
});
