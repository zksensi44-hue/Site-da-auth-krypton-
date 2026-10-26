const steps = [
  {
    kicker: 'ETAPA 01 / 03',
    title: 'Estabelecendo conexão segura',
    description: 'Aguarde enquanto a Krypton Cloud protege sua sessão.',
    progress: '8%',
  },
  {
    kicker: 'ETAPA 02 / 03',
    title: 'Validando sua identidade',
    description: 'Analisando os sinais de segurança desta conexão.',
    progress: '51%',
  },
  {
    kicker: 'ETAPA 03 / 03',
    title: 'Concluindo verificação',
    description: 'Só mais um instante. Preparando seu acesso.',
    progress: '82%',
  },
];

const statusKicker = document.querySelector('#status-kicker');
const cardTitle = document.querySelector('#card-title');
const statusDescription = document.querySelector('#status-description');
const statusIcon = document.querySelector('#status-icon');
const progressBar = document.querySelector('#progress-bar');
const returnButton = document.querySelector('#return-button');
const buttonNote = document.querySelector('#button-note');
const toast = document.querySelector('#toast');
const stepItems = [...document.querySelectorAll('.step-item')];
const connectors = [...document.querySelectorAll('.step-connector')];

let timerIds = [];
let toastTimer;

function clearTimers() {
  timerIds.forEach(clearTimeout);
  timerIds = [];
}

function updateStep(index) {
  const step = steps[index];
  statusKicker.textContent = step.kicker;
  cardTitle.textContent = step.title;
  statusDescription.textContent = step.description;
  progressBar.style.width = step.progress;

  stepItems.forEach((item, itemIndex) => {
    item.classList.toggle('is-active', itemIndex === index);
    item.classList.toggle('is-complete', itemIndex < index);
  });
  connectors.forEach((connector, connectorIndex) => {
    connector.classList.toggle('is-complete', connectorIndex < index);
  });
}

function showSuccess() {
  statusKicker.textContent = 'VERIFICAÇÃO CONCLUÍDA';
  cardTitle.textContent = 'Verificado com sucesso';
  statusDescription.textContent = 'Bem-vindo à Krypton Cloud. Sua sessão está protegida.';
  progressBar.style.width = '100%';
  statusIcon.classList.add('is-success');
  stepItems.forEach((item) => {
    item.classList.remove('is-active');
    item.classList.add('is-complete');
  });
  connectors.forEach((connector) => connector.classList.add('is-complete'));
  returnButton.hidden = false;
  buttonNote.hidden = false;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function startVerification() {
  clearTimers();
  statusIcon.classList.remove('is-success');
  returnButton.hidden = true;
  buttonNote.hidden = true;
  updateStep(0);
  timerIds.push(window.setTimeout(() => updateStep(1), 1450));
  timerIds.push(window.setTimeout(() => updateStep(2), 2850));
  timerIds.push(window.setTimeout(showSuccess, 4300));
}

returnButton.addEventListener('click', () => {
  showToast('Sessão finalizada com segurança.');
  window.setTimeout(startVerification, 1100);
});

startVerification();
